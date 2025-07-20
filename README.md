# GPX Trace Info

A Vue 3 application for viewing and analyzing GPX tracks from your OpenStreetMap account.

## Features

- 🔐 OAuth 2.0 authentication with OpenStreetMap
- 📊 View GPX trace statistics
- 🗺️ Interactive map visualization
- 📱 Responsive design with Tailwind CSS

## Setup Instructions

### 1. Register OAuth Application

Before running the application, you need to register it with OpenStreetMap:

1. Go to [OpenStreetMap OAuth Applications](https://www.openstreetmap.org/oauth2/applications)
2. Click "Register new application"
3. Fill in the form:
   - **Name**: Your application name (e.g., "GPX Trace Info")
   - **Redirect URI**: For development use `http://127.0.0.1:5173/auth/callback` (Note: OSM doesn't allow localhost)
   - **Scopes**: Select `read_prefs` and `read_gpx`
4. Save the application and note down your **Client ID**

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```sh
   cp .env.example .env
   ```

2. Edit `.env` and add your OpenStreetMap Client ID:
   ```env
   VITE_OSM_CLIENT_ID=your_actual_client_id_here
   VITE_OSM_REDIRECT_URI=http://127.0.0.1:5173/auth/callback
   ```

### 3. Install Dependencies

```sh
npm install
```

### 4. Run Development Server

```sh
npm run dev
```

The application will be available at `http://127.0.0.1:5173`

## OAuth 2.0 Flow

The application uses OAuth 2.0 with PKCE (Proof Key for Code Exchange) for secure authentication:

1. User clicks "Sign in with OpenStreetMap"
2. User is redirected to OpenStreetMap for authorization
3. After approval, user is redirected back with an authorization code
4. The application exchanges the code for an access token
5. User information and GPX traces are fetched using the token

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Available Scripts

### Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).
