<template>
  <section class="h-100 flex flex-column">
    <div class="silver bb b--black-10 pv2 f6 ttu tracked">Neighboring countries</div>
    <ul v-if="borders && borders.length > 0" class="ma0 pa0" style="overflow-y:auto;">
      <li v-for="neighbor in neighbors" :key="neighbor.code" class="flex pv2">
        <a href="#0" @click.prevent="clicked(neighbor)" class="no-underline blue pointer dim">{{neighbor.name}}</a>
      </li>
    </ul>
    <ul v-else class="ma0 pa0" style="overflow-y:auto;">
      <li v-if="!borders || borders.length == 0" class="silver list pv2">
        <a href="#0" @click.prevent="clicked(noNeighbor)" class="no-underline blue pointer dim">{{noNeighbor.name}}</a>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['borders'],
  computed: {
    ...mapGetters(['countries']),
    neighbors () {
      return this.borders.map(code => {
        let countries = this.countries.filter(country => country.alpha3Code === code)
        return { 
          name: countries.length > 0 ? countries[0].name : code,
          code: code 
        }
      })
    },
    noNeighbor () {
      return {
        name: 'there are no neighbors',
        code: null
      } 
    }
  },
  methods: {
    clicked (border) {
      this.$emit('clicked', border)
    }
  }
}
</script>
