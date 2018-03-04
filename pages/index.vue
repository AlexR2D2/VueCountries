<template>
  <section class="flex flex-column items-center justify-center mt5">
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { detectClientLocation, detectClientCountry, getCountriesList } from '~/tools/data_provider_api'

  export default {
    layout: 'default',

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
      clientCountry (val, old) {
        getCountriesList(this.$store)
      }
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
