import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

interface OSMUser {
	id: number
	display_name: string
	account_created: string
	description?: string
	contributor_terms?: {
		agreed: boolean
		pd: boolean
	}
	img?: {
		href: string
	}
	roles?: string[]
	changesets?: {
		count: number
	}
	traces?: {
		count: number
	}
	blocks?: {
		received: {
			count: number
			active: number
		}
	}
}

export const useAuthStore = defineStore('auth', () => {
	const isAuthenticated = ref(false)
	const user = ref<OSMUser | null>(null)
	const accessToken = ref<string | null>(null)
	const isLoading = ref(false)
	const error = ref<string | null>(null)

	// OAuth 2.0 configuration for OpenStreetMap
	const CLIENT_ID = import.meta.env.VITE_OSM_CLIENT_ID || 'YOUR_CLIENT_ID'
	const REDIRECT_URI = import.meta.env.VITE_OSM_REDIRECT_URI || `${window.location.origin}/auth/callback`
	const SCOPE = 'read_prefs read_gpx'
	const OSM_AUTH_URL = 'https://www.openstreetmap.org/oauth2/authorize'
	const OSM_TOKEN_URL = 'https://www.openstreetmap.org/oauth2/token'
	const OSM_API_URL = 'https://api.openstreetmap.org/api/0.6'

	// Generate a random state parameter for CSRF protection
	const generateState = () => {
		const array = new Uint8Array(16)
		crypto.getRandomValues(array)
		return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
	}

	// Generate PKCE code verifier and challenge
	const generateCodeVerifier = () => {
		const array = new Uint8Array(32)
		crypto.getRandomValues(array)
		return btoa(String.fromCharCode.apply(null, Array.from(array)))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=/g, '')
	}

	const generateCodeChallenge = async (verifier: string) => {
		const encoder = new TextEncoder()
		const data = encoder.encode(verifier)
		const digest = await crypto.subtle.digest('SHA-256', data)
		return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=/g, '')
	}

	// Start OAuth 2.0 flow
	const login = async () => {
		try {
			error.value = null
			isLoading.value = true

			// Validate client ID
			if (!CLIENT_ID || CLIENT_ID === 'YOUR_CLIENT_ID') {
				throw new Error('OpenStreetMap Client ID is not configured. Please check your .env file.')
			}

			// Clear any previous OAuth state
			sessionStorage.removeItem('oauth_code_verifier')
			sessionStorage.removeItem('oauth_state')
			localStorage.removeItem('oauth_state_backup')

			// Generate PKCE parameters
			const codeVerifier = generateCodeVerifier()
			const codeChallenge = await generateCodeChallenge(codeVerifier)
			const state = generateState()

			// Store PKCE parameters and state in sessionStorage AND localStorage as backup
			sessionStorage.setItem('oauth_code_verifier', codeVerifier)
			sessionStorage.setItem('oauth_state', state)
			localStorage.setItem('oauth_state_backup', state) // Backup in localStorage

			console.log('Stored OAuth state:', state)
			console.log('SessionStorage after storing:', {
				codeVerifier: sessionStorage.getItem('oauth_code_verifier')?.substring(0, 10) + '...',
				state: sessionStorage.getItem('oauth_state')
			})

			// Build authorization URL
			const params = new URLSearchParams({
				client_id: CLIENT_ID,
				response_type: 'code',
				redirect_uri: REDIRECT_URI,
				scope: SCOPE,
				state: state,
				code_challenge: codeChallenge,
				code_challenge_method: 'S256'
			})

			const authUrl = `${OSM_AUTH_URL}?${params.toString()}`

			console.log('Starting OAuth flow with:', {
				client_id: CLIENT_ID,
				redirect_uri: REDIRECT_URI,
				scope: SCOPE
			})

			// Redirect to OpenStreetMap authorization page
			window.location.href = authUrl
		} catch (err) {
			error.value = err instanceof Error ? err.message : 'Failed to start authentication'
			isLoading.value = false
		}
	}

	// Handle OAuth callback
	const handleCallback = async (code: string, state: string) => {
		try {
			error.value = null
			isLoading.value = true

			console.log('OAuth callback received:', { code: code?.substring(0, 10) + '...', state })

			// Verify state parameter with fallback to localStorage
			let storedState = sessionStorage.getItem('oauth_state')
			if (!storedState) {
				storedState = localStorage.getItem('oauth_state_backup')
				console.log('Using backup state from localStorage')
			}

			console.log('Stored state:', storedState)
			console.log('Received state:', state)

			if (!storedState) {
				throw new Error('No stored state found. Please try logging in again.')
			}

			if (state !== storedState) {
				throw new Error(`Invalid state parameter. Expected: ${storedState}, Got: ${state}`)
			}

			// Get stored code verifier
			const codeVerifier = sessionStorage.getItem('oauth_code_verifier')
			if (!codeVerifier) {
				throw new Error('Missing code verifier')
			}

			// Exchange code for access token
			const tokenResponse = await fetch(OSM_TOKEN_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
				},
				body: new URLSearchParams({
					grant_type: 'authorization_code',
					client_id: CLIENT_ID,
					code: code,
					redirect_uri: REDIRECT_URI,
					code_verifier: codeVerifier,
				}),
			})

			if (!tokenResponse.ok) {
				const errorData = await tokenResponse.text()
				console.error('Token exchange failed:', errorData)
				throw new Error(`Failed to exchange code for token: ${tokenResponse.status} ${errorData}`)
			}

			const tokenData = await tokenResponse.json()
			accessToken.value = tokenData.access_token

			// Clean up stored parameters
			sessionStorage.removeItem('oauth_code_verifier')
			sessionStorage.removeItem('oauth_state')
			localStorage.removeItem('oauth_state_backup')

			// Fetch user information
			await fetchUser()

			isAuthenticated.value = true
			isLoading.value = false
		} catch (err) {
			error.value = err instanceof Error ? err.message : 'Authentication failed'
			isLoading.value = false
		}
	}

	// Fetch user information from OSM API
	const fetchUser = async () => {
		if (!accessToken.value) {
			throw new Error('No access token available')
		}

		const response = await fetch(`${OSM_API_URL}/user/details.json`, {
			headers: {
				'Authorization': `Bearer ${accessToken.value}`,
			},
		})

		if (!response.ok) {
			throw new Error('Failed to fetch user details')
		}

		const data = await response.json()
		user.value = data.user
	}

	// Logout
	const logout = () => {
		isAuthenticated.value = false
		user.value = null
		accessToken.value = null
		error.value = null

		// Clear any stored tokens and OAuth state
		sessionStorage.removeItem('oauth_code_verifier')
		sessionStorage.removeItem('oauth_state')
		localStorage.removeItem('oauth_state_backup')
		localStorage.removeItem('osm_access_token')

		router.push({ name: 'landing' })
	}

	// Load saved authentication state
	const loadSavedAuth = async () => {
		const savedToken = localStorage.getItem('osm_access_token')
		if (savedToken) {
			accessToken.value = savedToken
			try {
				await fetchUser()
				isAuthenticated.value = true
			} catch {
				// Token might be expired, clear it
				logout()
			}
		}
	}

	// Save token to localStorage for persistence
	const saveToken = () => {
		if (accessToken.value) {
			localStorage.setItem('osm_access_token', accessToken.value)
		}
	}

	const displayName = computed(() => user.value?.display_name || '')
	const userTraceCount = computed(() => user.value?.traces?.count || 0)

	return {
		isAuthenticated,
		user,
		accessToken,
		isLoading,
		error,
		displayName,
		userTraceCount,
		login,
		logout,
		handleCallback,
		loadSavedAuth,
		saveToken,
		CLIENT_ID,
		REDIRECT_URI
	}
})
