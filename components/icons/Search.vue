<script>
  import iconBase from '@/components/icons/Base.vue'

  export default {
    mixins: [iconBase],
    computed: {
      paths () {
        return '\
        <circle cx="14" cy="14" r="12" />\
        <path d="M23 23 L30 30"  />\
        '
      }
    }
  }

</script>
