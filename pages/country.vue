<template>
  <div class="flex justify-center">
    <country :country="clientCountry" class="w-100 w-70-m w-40-l ph2"></country>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Country from '~/components/country.vue'

  export default {
    layout: 'default',
    components: {
      'country': Country,
    },
    computed: {
      ...mapGetters(['clientCountry']),
    },
  }
</script>




 