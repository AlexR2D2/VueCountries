<template>
  <div class="flex justify-center">
    <location :location="clientLocation" class="w-100 w-70-m w-40-l ph2"></location>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import UserLocation from '~/components/Location.vue'

  export default {
    layout: 'default',
    components: {
      'location': UserLocation,
    },
    computed: {
      ...mapGetters(['clientLocation']),
    },
  }
</script>
