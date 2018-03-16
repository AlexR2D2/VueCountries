<template>
  <div ref="map" class="google-map"></div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => { return {} }
    }
  },
  data: function () {
    return {
      map: null,
      bounds: null,
      geocoder: null,
      markers: [],
    }
  },
  mounted: function () {
    const element = this.$refs.map
    const options =  Object.assign({
      zoom: 3
    }, this.options)
    this.map = new google.maps.Map(element, options);
    this.bounds = new google.maps.LatLngBounds();
    this.geocoder = new google.maps.Geocoder();
  },
  methods: {
    setCurrent (latitude, longitude) {
      const position = new google.maps.LatLng(latitude, longitude);
      //this.map.fitBounds(this.bounds.extend(position))
      const marker = new google.maps.Marker({ 
        position,
        map: this.map
      });
      this.markers = []
      this.markers.push(marker)
    },
    setCurrentCountry (country) {
      this.geocoder.geocode( {'address' : country}, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          this.map.setCenter(results[0].geometry.location)

          const marker = new google.maps.Marker({ 
            position: results[0].geometry.location,
            animation: google.maps.Animation.DROP,
            map: this.map,
          });
          for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
          }
          this.markers.push(marker)
        }
      })
    },
  }
};
</script>

<style scoped>
.google-map {
  min-width: 50;
  min-height: 50;
  background: gray;
}
</style>