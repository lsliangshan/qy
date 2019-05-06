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
    <div class="create_btn_container">
      <div class="camera_container">
        <input class="js_upFile cover1"
               type="file"
               name="cover"
               accept="image/*"
               @change="changePicFileHandler"
               v-if="isIos" />
        <input class="js_upFile cover1"
               type="file"
               name="cover"
               accept="image/*"
               capture="camera"
               v-else />
      </div>
      <div class="create_btn_inner">
        <svg>
          <use xlink:href="#plus"></use>
        </svg>
      </div>
    </div>
    <div v-transfer-dom>
      <previewer ref="previewerRef"
                 :list="imgsArr"
                 :options="previewerOptions"
                 @on-close="closePreviewer"
                 @on-index-change="previewIndexChangedHandler">
      </previewer>
    </div>

    <div v-transfer-dom>
      <actionsheet v-model="showPicSelector"
                   :menus="picSelectMenu"
                   @on-click-menu="choosePic"
                   show-cancel></actionsheet>
    </div>

    <div v-transfer-dom>
      <popup v-model="showFormPopup"
             :popup-style="formPopupStyles"
             height="100%">
        <!-- <popup-header class="form_popup_header"
                      left-text="取消"
                      right-text="保存"
                      title="新建"
                      :show-bottom-border="false"
                      @on-click-left="closeFormPopup"></popup-header> -->
        <div class="popup_body">
          <form-popup :src="imgSrc"
                      :is-ios="isIos"></form-popup>
        </div>
      </popup>
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
  .create_btn_container {
    position: fixed;
    width: 72px;
    height: 72px;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .create_btn_inner {
    z-index: 0;
    width: 56px;
    height: 56px;
    border-radius: 28px;
    box-shadow: 0 0 10px 1px #c8c8c8;
    padding: 0;
    background-color: #f5f5f5;
  }
  .camera_container {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
  .camera_container input {
    width: 100%;
    height: 100%;
  }
  .create_btn_container svg {
    width: 56px;
    height: 56px;
    opacity: 1;
    fill: @theme-color;
  }
  .create_btn_container:active svg {
    opacity: 0.7;
  }

  .form_popup_header {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .popup_body {
    width: 100%;
    height: 100%;
    // height: calc(~"100% - 44px");
  }
</style>
<script>
  import axios from 'axios'
  import { ViewBox, Previewer, Actionsheet, Popup, PopupHeader, Group, TransferDom } from 'vux'
  import Headers from '../parts/Headers.vue'
  import FormPopup from '../parts/FormPopup.vue'
  import vueWaterfallEasy from 'vue-waterfall-easy'
  export default {
    name: 'MainIndex',
    directives: {
      TransferDom
    },
    components: {
      Headers,
      FormPopup,
      ViewBox,
      vueWaterfallEasy,
      Previewer,
      Popup,
      PopupHeader,
      Group,
      Actionsheet
    },
    data () {
      const ua = navigator.userAgent.toLowerCase()
      return {
        imgsArr: [],
        group: 0,
        previewIndexChanged: false,
        showPicSelector: false,
        picSelectMenu: {
          camera: '拍照',
          albums: '从相册选择'
        },
        showFormPopup: false,
        imgSrc: '',
        reader: null,
        formPopupStyles: {
          // backgroundColor: '#ffffff'
        },
        isIos: (ua.indexOf('iphone') !== -1) || (ua.indexOf('ipad') !== -1),
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
      this.reader = new FileReader()
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
      },
      showPicSelectorHandler () {
        this.showPicSelector = true
      },
      choosePic (e) {
        if (e !== 'cancel') {
          console.log('choose pic: ', e)
          alert('from ' + e)
        }
      },
      async changePicFileHandler (e) {
        console.log('changePicFileHandler: ', e)
        if (e.target.files.length > 0) {
          await this.formatImgSrc(e.target.files[0])
          this.showFormPopupHandler()
        }
      },
      showFormPopupHandler () {
        this.showFormPopup = true
      },
      closeFormPopup () {
        this.showFormPopup = false
      },
      formatImgSrc (file) {
        return new Promise((resolve) => {
          this.reader.readAsDataURL(file)
          this.reader.onload = (e) => {
            this.imgSrc = e.target.result
            resolve(true)
          }
        })
      }
    }
  }
</script>
