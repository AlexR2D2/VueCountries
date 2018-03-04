<template>
  <div class="flex">
    <table class="f6 w-100 mw8 center" cellspacing="0">
      <thead>
        <tr class="f5 tl silver">
          <th class="hover-dark-gray pv3 bb b--black-20 w-50 pointer"  @click="orderBy('name')">Name</th>
          <th class="hover-dark-gray pv3 bb b--black-20 w-25 pointer" @click="orderBy('population')">Population</th>
          <th class="hover-dark-gray pv3 bb b--black-20 w-25 pointer" @click="orderBy('area')">Area</th>
        </tr>
        <tr v-if="region" class="f6 tl silver">
          <th colspan="3" class="pv2 hover-dark-gray w-100 pointer"  @click="resetRegionFilter">
            <span >{{region}} only X</span>
          </th>
        </tr>
      </thead>
      <transition-group name="flip-list" tag="tbody" class="lh-copy">
        <tr v-for="item in items" v-bind:key="item.name">
          <td class="pv1 bb b--black-10">
            <span class="f5">{{item.name}}</span><br/>
            <span class="f6 silver" @click="setRegionFilter(item.region)">{{item.region}}</span>
          </td>
          <td class="bb b--black-10">{{item.population}}</td>
          <td class="bb b--black-10">{{item.area}}</td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script>
  export default {
    props: [
      'countries'
    ],
    data () {
      return {
        items: this.initialItems(this.countries),
        region: null,
      }
    },
    watch: {
      region (value, old) {
        value == null 
          ? this.items = this.initialItems(this.countries)
          : this.items = this.items.filter(item => item.region === value)
      }
    },
    methods: {
      initialItems (items) {
        //return items.filter(item => Math.floor(item['population']) > 66710000)
        return items
      },
      shuffle () {
        //this.items = this.shuffleArray(this.items)
        //this.items = _.shuffle(this.items)
        this.items.sort( (left, right) => left.population < right.population);
      },
      orderBy (field) {
        if (field === 'name') {
          this.items.sort( (left, right) => right[field] < left[field] ? -1 : 1);
        } else {
          this.items.sort( (left, right) => Math.floor(right[field]) - Math.floor(left[field]));
        }
      },
      setRegionFilter (region) {
        this.region = region
      },
      resetRegionFilter () {
        this.region = null
      },
      shuffleArray (a) {
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
          return
        }
        return a;
      }
    },
  }
</script>

<style>
  .flip-list-move {
    transition: transform 0.7s cubic-bezier(0.415, 0.490, 0.020, 0.990);
  }
</style>
