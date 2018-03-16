<template>
  <div class="flex justify-center ph0 ph2-m ph3-l">
    <countries></countries>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Countries from '~/components/countries.vue'

  export default {
    layout: 'default',
    components: {
      'countries': Countries,
    },
  }
</script>
