<template>
  <div class="head_icon_container">
    <div v-transfer-dom class="head_icon_inner" :class="{ready: pageLoaded}">
      <previewer ref="previewer" :list="previewerList" :options="previewerOptions" @on-close="navBack"></previewer>
    </div>
  </div>
</template>
<style scoped>
  .head_icon_container {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 1);
  }
  .head_icon_inner {
    width: 100%;
    height: 100%;
    opacity: 0;
    -webkit-transition: opacity .3s cubic-bezier(.4,0,.22,1);
    -moz-transition: opacity .3s cubic-bezier(.4,0,.22,1);
    -ms-transition: opacity .3s cubic-bezier(.4,0,.22,1);
    -o-transition: opacity .3s cubic-bezier(.4,0,.22,1);
    transition: opacity .3s cubic-bezier(.4,0,.22,1);
    transition-delay: 500ms;
  }
  .head_icon_inner.ready {
    opacity: 1;
  }
</style>
<script>
  import { Previewer, TransferDom } from 'vux'
  export default {
    name: 'DetailHeadIcon',
    data () {
      return {
        pageLoaded: false,
        previewerOptions: {
          tapToClose: false,
          closeElClasses: [],
          isClickableElement: function (el) {
            return true
          },
          getDoubleTapZoom: function (isMouseClick, item) {
            // isMouseClick          - true if mouse, false if double-tap
            // item                  - slide object that is zoomed, usually current
            // item.initialZoomLevel - initial scale ratio of image
            //                         e.g. if viewport is 700px and image is 1400px,
            //                              initialZoomLevel will be 0.5
            if (isMouseClick) {
              // is mouse click on image or zoom icon

              // zoom to original
              return 1
              // e.g. for 1400px image:
              // 0.5 - zooms to 700px
              // 2   - zooms to 2800px
            } else {
              // is double-tap

              // zoom to original if initial zoom is less than 0.7x,
              // otherwise to 1.5x, to make sure that double-tap gesture always zooms image
              return item.initialZoomLevel < 0.7 ? 1 : 2
            }
          }
        }
      }
    },
    computed: {
      assets () {
        return this.$store.state.assets
      },
      loginInfo () {
        return this.$store.state.loginInfo
      },
      previewerList () {
        let _headIcon = ''
        let _loginInfo = this.$store.state.loginInfo
        if (_loginInfo) {
          if (!_loginInfo.headIcon) {
            if (Number(_loginInfo.gender) === 2) {
              _headIcon = this.$store.state.assets.femaleAvatar
            } else {
              _headIcon = this.$store.state.assets.maleAvatar
            }
          } else {
            _headIcon = _loginInfo.headIcon
          }
        } else {
          _headIcon = this.$store.state.assets.maleAvatar
        }
        return [
          {
            src: _headIcon
          }
        ]
      }
    },
    created () {
      this.$nextTick(() => {
        this.$refs.previewer.show(0)
        setTimeout(() => {
          this.pageLoaded = true
        }, 100)
      })
    },
    methods: {
      navBack () {
        this.$router.back()
      }
    },
    directives: {
      TransferDom
    },
    components: {
      Previewer
    }
  }
</script>
