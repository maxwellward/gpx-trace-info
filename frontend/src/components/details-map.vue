<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

interface Props {
  center?: [number, number] // [longitude, latitude]
  zoom?: number
  bearing?: number
  style?: 'osm' | 'satellite'
}

const props = withDefaults(defineProps<Props>(), {
  // Center defaults to a random point on land (approximate bounding box for Europe)
  center: () => [
    -10 + Math.random() * 40, // lon: -10 to 30
    35 + Math.random() * 35, // lat: 35 to 70
  ],
  zoom: 12,
  bearing: 0,
  style: 'osm',
})

const emit = defineEmits<{
  mapClick: [coordinates: [number, number]]
}>()

const mapContainer = ref<HTMLElement>()
const map = ref<maplibregl.Map>()

const getMapStyle = (style: string) => {
  const styles = {
    osm: {
      version: 8 as const,
      sources: {
        osm: {
          type: 'raster' as const,
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '© OpenStreetMap contributors',
        },
      },
      layers: [
        {
          id: 'osm',
          type: 'raster' as const,
          source: 'osm',
        },
      ],
    },
    satellite: 'https://demotiles.maplibre.org/style.json',
  }
  return styles[style as keyof typeof styles] || styles.osm
}

const initializeMap = () => {
  if (!mapContainer.value) return

  map.value = new maplibregl.Map({
    container: mapContainer.value,
    style: getMapStyle(props.style),
    center: props.center,
    zoom: props.zoom,
    bearing: props.bearing,
    pitch: 0, // Top-down view
  })

  map.value.on('load', () => {
    if (!map.value) return
    // Map is ready
  })

  // Handle map clicks
  map.value.on('click', (e) => {
    emit('mapClick', [e.lngLat.lng, e.lngLat.lat])
  })

  // Add navigation controls
  map.value.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
}

const updateMapView = () => {
  if (!map.value) return

  map.value.easeTo({
    center: props.center,
    zoom: props.zoom,
    bearing: props.bearing,
    pitch: 0, // Always top-down
    duration: 1000,
  })
}

// Watch for prop changes
watch(() => [props.center, props.zoom, props.bearing], updateMapView)

onMounted(() => {
  initializeMap()
})

onUnmounted(() => {
  if (map.value) {
    map.value.remove()
  }
})
</script>

<template>
  <div class="map-wrapper relative w-full h-full">
    <div ref="mapContainer" class="map-container w-full h-full rounded-lg overflow-hidden border border-border" />
  </div>
</template>

<style scoped>
.map-container {
  min-height: 400px;
}

:deep(.maplibregl-ctrl-group) {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
