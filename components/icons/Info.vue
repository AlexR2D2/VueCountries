<script>
  import iconBase from '@/components/icons/Base.vue'

  export default {
    mixins: [iconBase],
    computed: {
      paths () {
        return '\
          <path d="M16 14 L16 23 M16 8 L16 10" />\
          <circle cx="16" cy="16" r="14" />\
        '
      }
    }
  }

</script>
