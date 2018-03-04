<template>
  <div class="flex justify-center">
    <countries :countries="countries" class="w-100 w-70-m w-40-l ph2"></countries>
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
    computed: {
      ...mapGetters(['countries']),
    },
  }
</script>
