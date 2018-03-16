<template>
  <div class="flex justify-center ph0 ph2-m ph3-l">
    <div class="flex flex-column-reverse items-center flex-row-l w-100 w-80-l">
      <location :location="clientLocation" class="w-100 w-80-m w-40-l"></location>
      <google-map :options="options" ref="map" class="h5 h-100-l min-vh-50-l w-100 w-80-m w-60-l shadow-4 mb3 mt0-l ml3-l" name="location"></google-map>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { detectClientLocation } from '~/tools/data_provider_api'
import UserLocation from '~/components/Location.vue'
import GoogleMap from '~/components/GoogleMap.vue'

export default {
  created () {
    setTimeout(() => {
      if (this.$store.getters.clientLocation) return
      detectClientLocation(this.$store)
    })
  },
  layout: 'default',
  components: {
    'location': UserLocation,
    'google-map': GoogleMap,
  },
  computed: {
    ...mapGetters(['clientLocation']),
    options () {
      return { zoom: 8 }
    },
  },
  mounted () {
    this.updateGoogleMaps()
    console.log(window.innerWidth)
  },
  watch: {
    clientLocation (loc, old) {
      this.updateGoogleMaps()
    }
  },
  methods: {
    updateGoogleMaps () {
      if (!this.clientLocation) return 
      this.$refs.map.setCurrentCountry(this.clientLocation.city)
    }
  }
}
</script>
