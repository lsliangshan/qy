<template>
  <div class="container">
    <headers></headers>
    <view-box class="body"
              ref="viewBoxRef"
              body-padding-bottom="0px">
      <vue-waterfall-easy :imgsArr="imgsArr"
                          @scrollReachBottom="getData"
                          :reachBottomDistance="15"
                          @click="clickHandler">

      </vue-waterfall-easy>

    </view-box>
    <div v-transfer-dom>
      <previewer ref="previewerRef"
                 :list="imgsArr"
                 :options="previewerOptions"
                 @on-close="closePreviewer"
                 @on-index-change="previewIndexChangedHandler">
      </previewer>
    </div>
  </div>
</template>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
.body {
  width: 100%;
  height: calc(~"100% - 46px");
}
</style>
<script>
import axios from 'axios'
import { ViewBox, Previewer, TransferDom } from 'vux'
import Headers from '../parts/Headers.vue'
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
  name: 'MainIndex',
  directives: {
    TransferDom
  },
  components: {
    Headers,
    ViewBox,
    vueWaterfallEasy,
    Previewer
  },
  data () {
    return {
      imgsArr: [],
      group: 0,
      previewIndexChanged: false,
      previewerOptions: {
        isClickableElement: function (el) {
          return /previewer-delete-icon/.test(el.className)
        },
        getThumbBoundsFn (index, e) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.body img')[index]
          document.querySelector('.vue-waterfall-easy').parentNode.scrollTop = Math.abs(thumbnail.getBoundingClientRect().top)
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      axios.get('../../static/mock/data.json?group=' + this.group) // 真实环境中，后端会根据参数group返回新的图片数组，这里我用一个惊呆json文件模拟
        .then(res => {
          this.imgsArr = this.imgsArr.concat(res.data)
          this.group++
        })
    },
    clickHandler (e, { index, value }) {
      e.preventDefault()
      this.$refs.previewerRef.show(Number(index))
    },
    closePreviewer () {
      console.log('...', document.documentElement.scrollTop)
      this.previewIndexChanged = false
    },
    previewIndexChangedHandler () {
      console.log('index changed')
      this.previewIndexChanged = true
    }
  }
}
</script>
