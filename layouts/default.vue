<template>
  <div>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDquyfsGtMpIM8AN_0ru23GJJkK2hfFzzY"></script>
    <!--<script src="anime.min.js"></script>-->
    <nav-bar/>
    <nuxt class="mt3 ph1"/>
    <site-footer/>
  </div>
</template>

<script>
import NavBar from '~/components/nav.vue'
import SiteFooter from '~/components/footer.vue'
export default {
  head: {
    meta: [
      { name: 'viewport', content: 'initial-scale=1.0, width=device-width' }
    ],
    link: [
    ]
  },
  components: {
    'nav-bar': NavBar,
    'site-footer': SiteFooter
  }
}
</script>
