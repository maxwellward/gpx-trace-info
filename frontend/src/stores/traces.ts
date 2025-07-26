import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue-sonner'
import { ref } from 'vue'
import {
  CalendarDate,
} from '@internationalized/date'

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

export interface Trace {
  id?: string
  filename: string
  description: string
  distance: number // meters
  points: number
  visibility: 'public' | 'private' | 'trackable' | 'identifiable'
  uploaded_at: Date
  elevation_gain?: number // meters
  average_speed?: number // m/s
  duration?: number // seconds
  start_point?: { lat: number; lon: number }
  end_point?: { lat: number; lon: number }
  geom?: string
}

export type TraceRange = {
  start: CalendarDate
  end: CalendarDate
}

export const useTraceStore = defineStore('traces', () => {
  const authStore = useAuthStore()

  const selectedTraceRange = ref<TraceRange>({
    start: new CalendarDate(2003, 11, 8),
    end: new CalendarDate(2003, 11, 8),
  });

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
        description:
          'This may take up to 5~ minutes depending on your trace count and server load.',
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

  const getTraces = async (): Promise<Trace[]> => {
    const { data } = await axios.get(import.meta.env.VITE_BACKEND_URI + '/gpx', {
      headers: {
        Authorization: authStore.accessToken,
      },
    })

    const traces: Trace[] = data.traces;

    console.log('setting range');

    const first = new Date(traces[0].uploaded_at);
    const last = new Date(traces[traces.length - 1].uploaded_at);

    selectedTraceRange.value = {
      start: new CalendarDate(first.getFullYear(), first.getMonth() + 1, first.getDate()),
      end: new CalendarDate(last.getFullYear(), last.getMonth() + 1, last.getDate()),
    }

    console.log(selectedTraceRange.value);

    return traces;
  }

  const getTrace = async (tid: number): Promise<Trace> => {
    const { data } = await axios.get(import.meta.env.VITE_BACKEND_URI + '/gpx/' + tid, {
      headers: {
        Authorization: authStore.accessToken,
      },
    })

    return data.trace
  }

  const downloadTrace = async (id: string, filename: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_OSM_API_BASE_URI}/gpx/${id}/data`,
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
          responseType: 'blob',
        },
      )

      const blob = new Blob([response.data], { type: 'application/gpx+xml' })
      const url = window.URL.createObjectURL(blob)

      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a')
      a.href = url
      a.download = filename // Filename for the download
      document.body.appendChild(a)
      a.click()

      // Clean up
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      toast.error('Something went wrong while download your GPX file.', {
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
    getTraces,
    getTrace,
    downloadTrace,
    selectedTraceRange
  }
})
