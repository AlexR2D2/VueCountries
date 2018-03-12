<template>
  <ul v-if="currencies && currencies.length > 0" class="ma0 pa0">
    <li class="flex silver bb b--black-10">
      <div class="w-80 pv2">Currency</div>
      <div class="w-20 pv2"></div>
    </li>
    <li v-for="cur in currencies" :key="cur.code" class="flex">
      <div class="w-80 pv2">
        <a href="#0" @click.prevent="clicked(cur)" class="no-underline blue pointer dim">
          {{cur.name}} <span class="green ml3 f5">{{cur.symbol}}</span>
        </a>
      </div>
      <div class="w-20 pv2 silver">{{cur.code}}</div>
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['currencies'],
    methods: {
      clicked (currency) {
        this.$emit('clicked', currency)
      }
    }
  }
</script>
