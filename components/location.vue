<template>
  <div class="flex flex-column shadow-4">
    <div class="f4 silver ph3 pv3 bb b--black-10">
      My autodetected location
    </div>
    <div>
      <ul class="f5 w-100 ph3 pt3 pb4">
        <li v-for="(item, index) in items" :key="index" class="flex pv2 bb b--black-10">
          <div class="pr3 w-30 silver">{{item.title}}</div>
          <div class="w-70">{{item.value}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'location'
  ],
  computed: {
    items () {
      if (!this.location) return []
      const loc = this.location
      return [
        { title: "as", value: loc.as },
        { title: "City", value: loc.city },
        { title: "Country", value: loc.country },
        { title: "Country code", value: loc.countryCode },
        { title: "ISP", value: loc.isp },
        { title: "Lat", value: loc.lat },
        { title: "Lon", value: loc.lon },
        { title: "Org", value: loc.org },
        { title: "IP", value: loc.query },
        { title: "Region", value: loc.region },
        { title: "Region name", value: loc.regionName },
        { title: "Timezone", value: loc.timezone },
        { title: "ZIP", value: loc.zip },
      ]
    }
  },
}
</script>
