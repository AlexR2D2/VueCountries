<template>
  <div class="flex justify-center">
    <countries></countries>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Countries from '~/components/countries.vue'
  import { detectClientLocation, detectClientCountry } from '~/tools/data_provider_api'

  export default {
    layout: 'default',
    components: {
      'countries': Countries,
    },
    mounted () {
      if (this.clientLocation) return
      detectClientLocation(this.$store)
    },
    watch: {
      clientLocation (val, old) {
        if (val) {
          detectClientCountry(this.$store)
        }
        else 
          this.$store.commit('setClientCountry', null)
      },
    },
    computed: {
      ...mapGetters(['clientLocation', 'clientCountry']),
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>
