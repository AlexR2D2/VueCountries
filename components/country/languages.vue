<template>
  <ul v-if="languages && languages.length > 0" class="ma0 pa0">
    <li class="flex silver bb b--black-10">
      <div class="w-80 pv2">Language</div>
      <div class="w-20 pv2"></div>
    </li>
    <li v-for="lang in languages" :key="lang.name" class="flex">
      <div class="w-80 pv2">
        <a href="#0" @click.prevent="clicked(lang)" class="no-underline blue pointer dim">{{lang.name}}</a>
      </div>
      <div class="w-20 pv2 silver">{{lang.iso639_1}}</div>
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['languages'],
    methods: {
      clicked (language) {
        this.$emit('clicked', language)
      }
    }
  }
</script>
