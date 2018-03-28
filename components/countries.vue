<template>
  <div class="w-100 flex flex-column flex-row-m flex-row-l items-start">

    <div class="w-100 w-40-m w-30-l">
      <div class="flex flex-column shadow-4">
        <nav class="dt f5 silver flex items-center">
          <a href="#0" class="no-underline link dim black ph3 w-15" @click.prevent="searchToggle">
            <icon-search size="5"></icon-search>
          </a>
          <transition name="search" tag="div" mode="out-in" v-on:after-enter="afterSearchToggle">
            <div v-if="searchActive" key="search" class="pv3 ml2 pr3 w-100">
              <input ref="search" id="name" class="input-reset bl-0 bt-0 br-0 bb-1 db pv2" v-model="searchName" type="text">
              <span class="separator"> </span>
            </div>
            <div v-else class="pv3 ml2 w-100 flex items-center" key="header">
              <div class="w-40">
                <a href="#0" class="no-underline link dim black bb" 
                  :class="[sortField == 'name' ? 'b--silver' : 'b--transparent']" @click.prevent="orderBy('name')">
                  Name
                </a>
              </div>
              <div class="w-50 flex justify-start items-center tc one-line-text">
                <a href="#0" class="no-underline link dim black bb mr1 mr2-m mr3-l" 
                  :class="[sortField == 'population' ? 'b--silver' : 'b--transparent']" @click.prevent="orderBy('population')">
                  Population
                </a>
                <div class="w-100 flex justify-center">
                  <a href="#0" class="no-underline link dim black bb" 
                    :class="[sortField == 'area' ? 'b--silver' : 'b--transparent']" @click.prevent="orderBy('area')">
                    Area<br/><span class="f7 silver">km<sup>2</sup></span>
                  </a>
                </div>
              </div>
            </div>
          </transition>
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
      
      <!--<transition-group name="flip-list" tag="ul" class="w-100 vh-85 pa0 ma0 bb bw3 b--near-white" style="overflow-y:auto;">-->
      <div class="pt2 ml1 lh-copy vh-50 vh-85-ns bb bw3 b--near-white" style="overflow-y:auto;">
        <ul class="w-100 ma0 pa0">
          <li v-for="item in items" :key="item.name" class="mt3 flip-list-item ma0 pa0">
            <country-item :item="item" :is-current="current && current.name == item.name" @clicked="countryClicked" @region-clicked="filter('region', $event)"></country-item>
          </li>
        </ul>
      </div>
      <!--</transition-group>-->
    </div>

    <div class="w-100 w-60-m w-70-l mh0 mh3-ns flex flex-column">
      <div class="flex flex-column flex-column-reverse-ns flex-row-l">
        <country-card v-if="current" class="w-40-l shadow-4 mt3 mt0-l mr3-l" :country="current" @region-clicked="filter('region', $event)"></country-card>
        <google-map ref="map" class="w-100 mt3 mt0-ns min-vh-25 w-60-l shadow-4" name="countries"></google-map>  
      </div>
      <div v-if="current" class="vh-50-l mt3 flex flex-column flex-row-l">
        <div class="w-100 w-50-l flex flex-column mr2-l pa3 shadow-4" style="overflow-y:auto;">
          <country-languages :languages="current.languages" @clicked="filter('language', $event)"></country-languages>
          <country-currencies :currencies="current.currencies" @clicked="filter('currency', $event)" class="mt3"></country-currencies>
          <country-regional-blocks :regional-blocks="current.regionalBlocs" @clicked="filter('regionalBlock', $event)" class="mt3"></country-regional-blocks>
        </div>
        <div class="w-100 w-50-l mt3 mt0-l ml2-l pa3 shadow-4" style="overflow-y:auto;">
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
  import IconSearch from '@/components/icons/Search.vue'
  
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
      'icon-search': IconSearch
    },
    computed: {
      ...mapGetters(['countries']),
    },
    data () {
      return {
        items: this.countries,

        sortField: null,

        filters: {
          name: {title: 'Name', value: null},
          region: {title: 'Region', value: null},
          language: {title: 'Language', value: null},
          currency: {title: 'Currency', value: null},
          regionalBlock: {title: 'Block', value: null},
          border: {title: 'Neighbor', value: null},
        },

        current: null,

        searchActive: false,
        searchName: ""
      }
    },
    watch: {
      countries (val, old) {
        this.filter()
      },
      searchName (value, old) {
        if (value.trim()) {
          this.filter('name', { name: value })
        } else {
          this.filter('name', null)
        }
      }
    },
    mounted () {
      this.filter()
    },
    methods: {
      filter (filter, value) {
        if (filter) {
          this.filters[filter].value = value
          if (filter === 'name' && value == null) {
            this.searchName = ""
          } 
        }
        
        const worker = new Worker("worker.filter.js")
        
        worker.onmessage = e => {
          this.items = e.data.items
          this.countryClicked(e.data.current)
        }

        worker.postMessage({
          items: this.countries,
          filters: this.filters,
          sortField: this.sortField,
          current: this.current,
        })
      },

      orderBy (field) {
        this.sortField = field

        const worker = new Worker("worker.sort.js")

        worker.onmessage = e => {
          this.items = e.data.items
        }

        worker.postMessage({
          items: this.items,
          sortField: this.sortField,
        })
      },

      countryClicked (item) {
        if (!item) return
        if (this.current && this.current.name == item.name) return
        if(!this.$refs.map) return
        this.$refs.map.setCurrentCountry(item.name)
        this.current = item
      },

      searchToggle () {
        this.searchActive = !this.searchActive
      },
      afterSearchToggle () {
        if (!this.$refs.search) return
        this.$refs.search.focus()
      }
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


.search-enter-active, .search-leave-active {
  -webkit-transition: transform .1s cubic-bezier(.91,.93,.27,2.3);
  transition: transform .1s cubic-bezier(.91,.93,.27,2.3);
}
.search-enter, .search-leave-to {
  transform: rotateX(-80deg);
}


.collapsable-item {
  overflow: hidden;
  opacity: 1;
  max-height: 5em;
  -webkit-transition: max-height .25s, padding .25s, opacity .25s ease;
  transition: max-height .25s, padding .25s, opacity .25s ease;
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
.vh-60{height:  60vh;}
.vh-80{height:80vh}
.vh-85{height:85vh}
.vh-90{height:90vh}
.min-vh-10{min-height:10vh}
.min-vh-25{min-height:25vh}
@media screen and (min-width:30em) {
  .vh-85-ns {height:85vh;}
}
@media screen and (min-width:30em) and (max-width:60em) {
}
@media screen and (min-width:60em) {
  .vh-85-l {height:85vh;}
}
</style>
