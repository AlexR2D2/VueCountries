<template>
  <div class="w-100 flex items-center">
    <div class="w-15 flex items-center pointer pa1" @click="clicked">
      <img v-lazy="imgObject" class="shadow-4">
    </div>
    <div class="w-85 ml2 pl2" :class="[isCurrent ? 'bg-blue white' : '' ]">
      <div class="w-100 f6 pointer dim ttu tracked" @click="clicked">
        {{item.name}}
      </div>
      <div class="dt w-100" :class="[isCurrent ? 'white-90' : 'silver']">
        <div class="dtc w-40">
          <a href="#0" @click.prevent="regionClicked" class="f6 no-underline pointer dim" :class="[isCurrent ? 'white-90' : 'silver']">
            {{item.region}}
          </a>
        </div>
        <div class="dtc f6 w-30">{{item.population}}</div>
        <div class="dtc f6 w-30 pl1">{{item.area}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'isCurrent'],
    computed: {
      loadingSpinImg: function () {
        return require('~/assets/loading-spin.svg')
      },
      imgObject () {
        const fileName = this.item.flag.substring(this.item.flag.lastIndexOf('/') + 1)
        const name = fileName.substring(0, fileName.lastIndexOf('.'))
        return {
          //src: 'flags/' + name + '.png',
          src: this.item.flag,
          loading: this.loadingSpinImg
        }
      },
    },
    methods: {
      clicked () {
        this.$emit('clicked', this.item)
      },
      regionClicked () {
        this.$emit('region-clicked', {name: this.item.region})
      }
    }
  }
</script>
