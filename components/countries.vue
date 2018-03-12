<template>
  <div class="w-100 flex items-start ph3">
    <div class="w-50 w-40-m w-30-l">
      <div class="w-100 flex flex-column shadow-4">
        <nav class="dt f5 silver w-100 ph2 pv3">
          <div class="dtc w-50">
            <a href="#0" class="no-underline link dim black ph2 pv1" :class="[sortField == 'name' ? 'bb b--silver' : '']" @click="orderBy('name')">Name</a>
          </div>
          <div class="dtc w-25">
            <a href="#0" class="no-underline link dim black ph2 pv1" :class="[sortField == 'population' ? 'bb b--silver' : '']" @click="orderBy('population')">Population</a>
          </div>
          <div class="dtc w-25">
            <a href="#0" class="no-underline link dim black ph2 pv1" :class="[sortField == 'area' ? 'bb b--silver' : '']" @click="orderBy('area')">Area <span class="f6">/ km<sup>2</sup></span></a>
          </div>
        </nav>
        <ul class="w-100 bt b--near-white flex flex-column justify-around ma0 pa0">
          <li v-for="key in Object.keys(filters)" :key="key" 
            :class="[filters[key].value ? '' : 'collapsed']" 
            class="f5 silver w-100 pa2 flex justify-end collapsable-item">
            <div class="mr1">{{ filters[key].title }}:</div>
            <div class="w5 tl black">{{ filters[key].value ? filters[key].value.name : '' }}</div>
            <a class="w2 tc link dim silver" href="#0" @click.prevent="filter(key, null)">&#8855;</a>
          </li>
        </ul>
      </div>
      <!--<transition-group name="flip-list" tag="div" class="pt2 ml1 lh-copy w-100 vh-75" style="overflow-y:auto;">-->
      <div class="pt2 ml1 lh-copy w-100 vh-75" style="overflow-y:auto;">
        <ul v-for="item in items" v-bind:key="item.name" class="w-100 flip-list-item ma0 pa0">
          <li class="w-100 mt2">
            <country-item :item="item" :is-current="current && current.name == item.name" @clicked="countryClicked" @region-clicked="filter('region', $event)"></country-item>
          </li>
        </ul>
      </div>
      <!--</transition-group>-->
    </div>
    <div class="w-50 w-60-m w-70-l mh3 flex flex-column">
      <div class="flex">
        <country-card v-if="current" class="w-30 shadow-4 mr3" :country="current" @region-clicked="filter('region', $event)"></country-card>
        <google-map ref="map" class="w-70 shadow-4" name="example"></google-map>  
      </div>
      <div v-if="current" class="vh-50 mt3 flex">
        <div class="w-50 flex flex-column mr2 pa3 shadow-4" style="overflow-y:auto;">
          <country-languages :languages="current.languages" @clicked="filter('language', $event)"></country-languages>
          <country-currencies :currencies="current.currencies" @clicked="filter('currency', $event)" class="mt3"></country-currencies>
          <country-regional-blocks :regional-blocks="current.regionalBlocs" @clicked="filter('regionalBlock', $event)" class="mt3"></country-regional-blocks>
        </div>
        <div class="w-50 ml2 pa3 shadow-4" style="overflow-y:auto;">
          <country-borders :borders="current.borders" @clicked="filter('border', $event)"></country-borders>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getCountriesList } from '~/tools/data_provider_api'
  import GoogleMap from '~/components/GoogleMap.vue'
  import Country from '~/components/country/card.vue'
  import Languages from '~/components/country/languages.vue'
  import Currencies from  '~/components/country/currencies.vue'
  import RegionalBlocks from  '~/components/country/regional_blocks.vue'
  import Borders from  '~/components/country/borders.vue'
  import Item from  '~/components/country/item.vue'
  
  export default {
    created () {
      setTimeout(() => {
        if (this.$store.getters.countries.length > 0) return
        getCountriesList(this.$store)
      })
    },
    components: {
      'google-map': GoogleMap,
      'country-card': Country,
      'country-languages': Languages,
      'country-currencies': Currencies,
      'country-regional-blocks': RegionalBlocks,
      'country-item': Item,
      'country-borders': Borders,
    },
    computed: {
      ...mapGetters(['countries']),
    },
    data () {
      return {
        items: this.countries,

        sortField: null,

        filters: {
          region: {title: 'Region', value: null},
          language: {title: 'Language', value: null},
          currency: {title: 'Currency', value: null},
          regionalBlock: {title: 'Block', value: null},
          border: {title: 'Neighbor', value: null},
        },

        current: null,
      }
    },
    watch: {
      countries (val, old) {
        this.filter()
      }
    },
    mounted () {
      this.filter()
    },
    methods: {
      filter (filter, value) {
        if (filter) {
          this.filters[filter].value = value
        }

        const data = {
          items: this.countries,
          filters: this.filters,
          sortField: this.sortField,
          current: this.current,
        }

        const filterWorker = new Worker("filter.worker.js");
        filterWorker.onmessage = e => {
          this.items = e.data.items
          this.countryClicked(e.data.current)
        }

        filterWorker.postMessage(data)
      },

      orderBy (field) {
        this.sortField = field

        const data = {
          items: this.items,
          sortField: this.sortField,
        }

        const filterWorker = new Worker("sort.worker.js");
        filterWorker.onmessage = e => {
          this.items = e.data.items
        }

        filterWorker.postMessage(data)
      },

      countryClicked (item) {
        if (!item) return
        if (this.current && this.current.name == item.name) return
        this.$refs.map.setCurrentCountry(item.name)
        this.current = item
      },
    },
  }
</script>

<style>
.flip-list-move {
  transition: transform 0.8s cubic-bezier(0.415, 0.490, 0.020, 0.990);
}
.flip-list-item {
  overflow: hidden;
  max-height:120px;
}
.flip-list-enter-active {
  -webkit-transition: max-height 1.0s ease;
  transition: max-height 1.0s ease;
}
.flip-list-leave-active {
  -webkit-transition: max-height 1.0s ease;
  transition: max-height 1.0s ease;
}
.flip-list-enter, .flip-list-leave-to {
  max-height:0;
  
  /*-webkit-transform: scaleY(0.0);
  transform: scaleY(0.0);*/

  /*transform: rotateX(90deg);*/
}


.collapsable-item {
  overflow: hidden;
  opacity: 1;
  max-height: 5em;
  -webkit-transition: max-height .25s, padding .25s, opacity .25s linear;
  transition: max-height .25s, padding .25s, opacity .25s linear;
}
.collapsable-item.collapsed {
  opacity: 0;
  max-height:0;
  padding-top:0;
  padding-bottom:0;
}

.one-line-text {
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis;
}
.w-15{
  width:15%
}
.w-85{
  width:85%
}
.flag {
  max-width:6rem;
  max-height:4rem;
}
.vh-60 {
  height:  60vh;
}
</style>
