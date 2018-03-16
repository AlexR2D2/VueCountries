<template>
  <ul v-if="regionalBlocks && regionalBlocks.length > 0" class="w-100 ma0 pa0">
    <li class="flex silver bb b--black-10">
      <div class="w-80 pv2 f6 ttu tracked">Regional block</div>
      <div class="w-20 pv2"></div>
    </li>
    <li v-for="block in regionalBlocks" :key="block.acronym" class="flex">
      <div class="w-80 pv2">
        <a href="#0" @click.prevent="clicked(block)" class="f5 no-underline blue dim">{{block.name}}</a>
      </div>
      <div class="w-20 pv2 silver">{{block.acronym}}</div>
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['regionalBlocks'],
    methods: {
      clicked (block) {
        this.$emit('clicked', block)
      }
    }
  }
</script>
