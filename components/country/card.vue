<template>
  <section class="flex flex-column ba b--near-white">
    <div class="flex flex-column justify-between h4 bb b--near-white">
      <div class="pt3 bg-white tc" >
        <img v-if="country.flag" v-lazy="country.flag" class="flag shadow-4">
      </div>
      <div class="flex flex-column tc">
        <div class="pb2 f5 ttu tracked">{{country.name}}</div>
      </div>
    </div>
    <div class="flex mt2">
      <div class="w-50 flex flex-column f5 silver tr">
        <div class="pv2 pr2">Capital</div>
        <div class="pv2 pr2">Region</div>
        <div class="pv2 pr2">Population</div>
        <div class="pv2 pr2">Area <span class="f6">/ km<sup>2</sup></span></div>
      </div>
      <div class="w-50 flex flex-column f5 dark-gray one-line-text tl">
        <div class="pv2">&nbsp;{{country.capital}}</div>
        <div class="pv2">
          <a href="#0" @click.prevent="regionClicked" class="no-underline link blue pointer dim">&nbsp;{{country.region}}</a>
        </div>
        <div class="pv2">&nbsp;{{country.population}}</div>
        <div class="pv2">&nbsp;{{country.area}}</div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['country'],
    methods: {
      regionClicked () {
        this.$emit('region-clicked', {name: this.country.region})
      }
    }
  }
</script>
