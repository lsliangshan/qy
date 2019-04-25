<template>
  <div class="ls_loading_container">
    <img :src="loaders[Number(loader)].path" :width="width">
  </div>
</template>
<style scoped>
  .ls_loading_container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<script>
export default {
  name: 'LsLoading',
  props: {
    loader: {
      type: Number
    },
    width: {
      type: Number
    }
  },
  data () {
    return {
      loaders: [
        {
          path: '/static/svgs/audio.svg'
        },
        {
          path: '/static/svgs/ball-triangle.svg'
        },
        {
          path: '/static/svgs/bars.svg'
        },
        {
          path: '/static/svgs/circles.svg'
        },
        {
          path: '/static/svgs/grid.svg'
        },
        {
          path: '/static/svgs/hearts.svg'
        },
        {
          path: '/static/svgs/oval.svg'
        },
        {
          path: '/static/svgs/puff.svg'
        },
        {
          path: '/static/svgs/rings.svg'
        },
        {
          path: '/static/svgs/spinning-circles.svg'
        },
        {
          path: '/static/svgs/tail-spin.svg'
        },
        {
          path: '/static/svgs/three-dots.svg'
        }
      ]
    }
  },
  components: {}
}
</script>
