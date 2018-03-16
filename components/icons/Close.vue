<script>
  import iconBase from '@/components/icons/Base.vue'

  export default {
    mixins: [iconBase],
    computed: {
      paths () {
        return '<path d="M2 30 L30 2 M30 30 L2 2" />'
      }
    }
  }

</script>