<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    :width="iconWidth"
    :height="iconHeight"
    :fill="fill"
    :stroke="stroke"
    :stroke-linecap="strokeLinecap"
    :stroke-linejoin="strokeLinejoin"
    :stroke-width="strokeWidth"
    class="custom-icon"
    v-html="paths">
  </svg>
</template>

<script>

  var iconsStyles = {
    data () {
      return {
        strokeLinecap: 'round', // round butt
        strokeLinejoin: 'round', // round bevel miter
      }
    }
  };

  var iconsProps = {
    props: {
      size: { // 1:"64px", 2:"32px", 3:"24px", 4:"20px", 5:"18px" , 6:"16px", 7:"14px"
        type: String,
        default: "5"
      },
      width: {
        type: String,
        default: "4" // 1:Ultra Light:0.5px, 2:Thin:1.0px  3:Light:1.5px 4:Regular:2px 5:Medium:2.5px 6:Bold:3px 7:Heavy:3.5px
      },
      fill: {
        type: String,
        default: "none"
      },
      stroke: {
        type: String,
        default: "currentcolor"
      }
    },
    computed: {
      iconWidth () {
        return this.toLenght(this.size)
      },
      iconHeight () {
        return this.toLenght(this.size)
      },
      strokeWidth () {
        return this.toWidth(this.width)
      },
    },
    methods: {
      toLenght (size) {
        if (size === '1') return '64'
        if (size === '2') return '32'
        if (size === '3') return '24'
        if (size === '4') return '20'
        if (size === '5') return '18'
        if (size === '6') return '16'
        if (size === '7') return '14'
        if (size === '8') return '12'
        return '18'
      },
      toWidth (width) {
        if (width === '1') return '0.5px'
        if (width === '2') return '1.0px'
        if (width === '3') return '1.5px'
        if (width === '4') return '2.0px'
        if (width === '5') return '2.5px'
        if (width === '6') return '3.0px'
        if (width === '7') return '3.5px'
        
        if (this.size === '7') return '1.5px'
        if (this.size === '6') return '2.0px'

        return '2.5px'
      }
    }
  };

  export default {
    mixins: [iconsProps, iconsStyles],
  };

</script>

<style>
.custom-icon {
  display: block;
  margin: auto;
}
</style>
