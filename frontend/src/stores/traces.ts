import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue-sonner'

export enum TraceVisibility {
  PRIVATE = 'private',
  PUBLIC = 'public',
  TRACKABLE = 'trackable',
  IDENTIFIABLE = 'identifiable',
}

export interface OSMTrace {
  file: File
  description: string
  tags: string[]
  visibility: TraceVisibility
}

export const useTraceStore = defineStore('traces', () => {
  const authStore = useAuthStore()

  const upload = async (trace: OSMTrace) => {
    try {
      // TODO: Add auth token to axios middleware
      const { data } = await axios.post(
        import.meta.env.VITE_OSM_API_BASE_URI + '/gpx',
        {
          file: trace.file,
          description: trace.description,
          tags: 'GPXS,' + trace.tags.toString(),
          visibility: trace.visibility,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        },
      )

      toast.success('Your GPX trace has been uploaded.', {
        description:
          "You will recieve an email from OpenStreetMap once it's processed on their servers.",
        action: {
          label: 'View on OSM',
          onClick: () =>
            window.open(
              `https://master.apis.dev.openstreetmap.org/user/${authStore.user?.display_name}/traces/${data}`,
            ),
        },
      })
    } catch (err) {
      toast.error('Something went wrong while uploading your GPX trace.', {
        description: err instanceof Error ? err.message : String(err),
        action: {
          label: 'Report Bug',
          onClick: () => window.open('https://github.com/maxwellward/gpx-trace-info/issues'),
        },
      })
    }
  }

  const sync = async () => {
    try {
      // TODO: Add auth token to axios middleware
      await axios.post(import.meta.env.VITE_BACKEND_URI + '/users/sync', {
        token: authStore.accessToken,
      })

      toast.success('Sync started', {
        description: 'This may take up to an hour depending on your trace count.',
      })
    } catch (err) {
      toast.error('Something went wrong while syncing your GPX traces.', {
        description: err instanceof Error ? err.message : String(err),
        action: {
          label: 'Report Bug',
          onClick: () => window.open('https://github.com/maxwellward/gpx-trace-info/issues'),
        },
      })
    }
  }

  return {
    upload,
    sync,
  }
})
