<template>
  <div class="flex flex-column">
    <div class="f4 silver pv3">Location</div>
    <table class="f5 w-100 center" cellspacing="0">
      <tbody class="lh-copy">
        <tr v-for="(item, index) in items" :key="index">
          <td class="pv1 pr3 bb b--black-10 w-30">{{item.title}}</td>
          <td class="pv1 pr3 bb b--black-10">{{item.value}}</td>
        </tr>
      </tbody>
    </table>
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
