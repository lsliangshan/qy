<template>
  <div class="form_popup_container">
    <!-- <div class="form_item form_item_1"
         :style="{height: calcToRealPx(500) + 'px'}">
      <div class="form_item_inner"
           :style="{width: calcToRealPx(500) + 'px', height: calcToRealPx(500) + 'px'}">
        <div class="file_input_container"
             :style="{width: calcToRealPx(500) + 'px', height: calcToRealPx(500) + 'px'}">
          <input class="js_upFile cover1"
                 type="file"
                 name="cover"
                 accept="image/*"
                 :style="{width: calcToRealPx(500) + 'px', height: calcToRealPx(500) + 'px'}"
                 @change="changePicFileHandler"
                 v-if="isIos" />
          <input class="js_upFile cover1"
                 type="file"
                 name="cover"
                 accept="image/*"
                 capture="camera"
                 :style="{width: calcToRealPx(500) + 'px', height: calcToRealPx(500) + 'px'}"
                 v-else />
        </div>
        <img ref="originRef"
             :src="imgSrc || src"
             :style="{maxWidth: calcToRealPx(480) + 'px', maxHeight: calcToRealPx(480) + 'px'}">
        <div ref="targetRef"
             class="target"
             :style="{width: originBox.width + 'px', height: originBox.height + 'px'}"></div>
      </div>
    </div> -->

    <div class="form_item form_item_1 h100p">
      <div class="form_item_inner w100p h100p">
        <!-- <img :src="imgSrc || src"
             :style="{maxWidth: calcToRealPx(480) + 'px', maxHeight: calcToRealPx(480) + 'px'}"> -->
        <img ref="originRef"
             :src="imgSrc || src"
             :style="{maxWidth: '100%', maxHeight: '90%', opacity: (photomosaic && (mosaicRangeOption.value >= 3)) ? 0 : 1}">
        <div ref="targetRef"
             class="target"
             :style="{width: originBox.width + 'px', height: originBox.height + 'px', opacity: (mosaicRangeOption.value < 3) ? 0 : 1}">
          <canvas ref="targetCanvasRef"></canvas>
        </div>
        <div class="file_input_container w100p h100p">
          <input class="js_upFile cover1 w100p h100p"
                 type="file"
                 name="cover"
                 accept="image/*"
                 @change="changePicFileHandler"
                 v-if="isIos" />
          <input class="js_upFile cover1 w100p h100p"
                 type="file"
                 name="cover"
                 accept="image/*"
                 capture="camera"
                 v-else />
        </div>
      </div>
    </div>

    <div class="form_item form_item_slider">
      <!-- <range :value="mosaicRangeOption.value"
             style="width: 100%;"
             :max="mosaicRangeOption.max"
             :min="mosaicRangeOption.min"
             :step="mosaicRangeOption.step"
             :rangeHandleHeight="mosaicRangeOption.rangeHandleHeight"
             @on-touchend="renderMosaicImage"></range> -->
      <vue-slider v-model="mosaicRangeOption.value"
                  style="width: 50%;"
                  :max="mosaicRangeOption.max"
                  :min="mosaicRangeOption.min"
                  :dotSize="mosaicRangeOption.dotSize"
                  @change="renderMosaicImage">
      </vue-slider>

      <div class="setting_btn_container">
        <x-button type="primary"
                  :mini="true"
                  @click.native="openSettingPopup">设置</x-button>
      </div>
    </div>

    <div v-transfer-dom>
      <popup v-model="showInnerFormPopup"
             height="100%"
             :is-transparent="true">
        <!-- <popup-header class="form_popup_header"
                      left-text="取消"
                      right-text="保存"
                      title="新建"
                      :show-bottom-border="false"
                      @on-click-left="closeFormPopup"></popup-header> -->
        <div class="custom_popup_mask"
             ref="customPopupMaskRef"
             @click="closeSettingPopup"></div>
        <div class="popup_body">
          <div class="form_item">
            <group title="提问"
                   class="w100p">
              <x-textarea :max="200"
                          name="detail"
                          placeholder="请输入问题"
                          :show-counter="true"
                          v-model="formData.question"></x-textarea>
            </group>
          </div>

          <div class="form_item">
            <group title="答案"
                   class="w100p">
              <x-input placeholder="请输入答案"
                       v-model="formData.answer"></x-input>
            </group>
          </div>

          <div class="blank_gap"
               :style="{height: calcToRealPx(30) + 'px'}"></div>

          <div class="form_item form_item_bottom">
            <x-button type="primary"
                      style="width: 150px;"
                      :disabled="!enableEncode"
                      @click.native="encode">发送</x-button>
            <x-button type="primary"
                      :plain="true"
                      @click.native="closeSettingPopup"
                      style="width: 100px;">关闭</x-button>
          </div>
        </div>
      </popup>
    </div>

    <!-- <div class="form_item">
      <group title="提问"
             class="w100p">
        <x-textarea :max="200"
                    name="detail"
                    placeholder="请输入问题"
                    :show-counter="true"></x-textarea>
      </group>
    </div>

    <div class="form_item">
      <group title="答案"
             class="w100p">
        <x-input placeholder="请输入答案"></x-input>
      </group>
    </div>

    <div class="blank_gap"
         :style="{height: calcToRealPx(30) + 'px'}"></div>

    <div class="form_item form_item_bottom">
      <x-button type="primary"
                style="width: 150px;"
                @click.native="renderMosaicImage">发送</x-button>
      <x-button type="primary"
                :plain="true"
                style="width: 100px;">关闭</x-button>
    </div> -->
  </div>
</template>
<style lang="less" scoped>
.w100p {
  width: 100%;
}
.h100p {
  height: 100%;
}
.form_popup_container {
  width: 100%;
  height: 100%;
}
.blank_gap {
  width: 100%;
}
.form_item {
  width: 100%;
  // height: 300px;
  // margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.form_item_1 {
  // background-color: #fbf9fe;
  background-color: #ffffff;
}
.form_item_inner {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.popup_body {
  width: 100%;
  height: 300px;
  background-color: #eee;
  position: absolute;
  bottom: 0;
  left: 0;
}
.form_item textarea,
.form_item input {
  // background-color: #fbf9fe !important;
}
.form_item_bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.form_item_bottom button {
  margin: 0 15px 0 0;
}
.file_input_container {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.target {
  position: absolute;
  pointer-events: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.target canvas {
  pointer-events: none;
  width: 100% !important;
  height: 100% !important;
}

.custom_popup_mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease-in-out;
}

.form_item_slider {
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 100%;
  padding-left: 10px;
  box-sizing: border-box;
}

.setting_btn_container {
  margin-left: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
<script>
import { Group, XTextarea, XInput, XButton, Range, Popup, TransferDom } from 'vux'
import VueSlider from 'vue-slider-component'
import * as StackBlur from 'stackblur-canvas'
import * as types from '../../store/mutation-types'
require('photomosaic.js')
const sjcl = require('../../../static/js/sjcl.js')
export default {
  name: 'FormPopup',
  props: {
    src: {
      type: String,
      default: ''
    },
    isIos: {
      type: Boolean,
      default: true
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Group,
    XTextarea,
    XInput,
    XButton,
    Range,
    VueSlider,
    Popup
  },
  data () {
    return {
      reader: null,
      formData: {
        file: null,
        question: 'question',
        answer: '123'
      },
      imgSrc: '',
      mosaicRangeOption: {
        max: 60,
        min: 0,
        value: 0,
        step: 1,
        dotSize: 30,
        // data: [3, 4, 6, 8, 10, 16, 20],
        rangeHandleHeight: 30
      },
      photomosaic: null,
      originBox: {},
      sliderCustomzie: {
        val: 9,
        lineHeight: 10,
        processStyle: {
          backgroundColor: '#42b883'
        },
        tooltipStyles: {
          backgroundColor: '#42b883',
          borderColor: '#42b883'
        }
      },
      showInnerFormPopup: false
    }
  },
  computed: {
    store () {
      return this.$store
    },
    requestInfo () {
      return this.store.state.requestInfo
    },
    enableEncode () {
      return !!this.formData.question.trim() && !!this.formData.answer.trim()
    }
  },
  created () {
    this.reader = new FileReader()
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.initOriginBox()
      }, 200)
    })
  },
  methods: {
    async changePicFileHandler (e) {
      if (e.target.files.length > 0) {
        this.resetMosaic()
        this.formData.file = e.target.files[0]
        await this.formatImgSrc(this.formData.file)
      }
    },
    formatImgSrc (file) {
      return new Promise((resolve) => {
        this.reader.readAsDataURL(file)
        this.reader.onload = (e) => {
          this.imgSrc = e.target.result
          resolve(true)
        }
      })
    },
    resetMosaic () {
      this.mosaicRangeOption.value = 0
    },
    renderMosaicImage (e) {
      // this.$refs.targetRef.innerHTML = ''
      // let origin = this.$refs.originRef
      // let originBox = origin.getBoundingClientRect()
      // this.originBox = originBox

      // this.photomosaic = new window.PhotoMosaic({
      //   image: this.$refs.originRef,
      //   targetElement: this.$refs.targetRef,
      //   width: this.originBox.width,
      //   height: this.originBox.height,
      //   tileHeight: this.mosaicRangeOption.value,
      //   tileWidth: this.mosaicRangeOption.value,
      //   tileShape: 'rectangle',
      //   opacity: 1
      // })

      StackBlur.image(this.$refs.originRef, this.$refs.targetCanvasRef, e)
    },
    initOriginBox () {
      let origin = this.$refs.originRef
      let originBox = origin.getBoundingClientRect()
      this.originBox = originBox
    },
    openSettingPopup () {
      this.showInnerFormPopup = true
      let tr = setTimeout(() => {
        this.$refs.customPopupMaskRef.style.opacity = 1
        clearTimeout(tr)
      }, 250)
    },
    closeSettingPopup () {
      this.$refs.customPopupMaskRef.style.opacity = 0
      let tr = setTimeout(() => {
        this.showInnerFormPopup = false
        clearTimeout(tr)
      }, 200)
    },
    getBit (number, location) {
      return (number >> location) & 1
    },
    setBit (number, location, bit) {
      return (number & ~(1 << location)) | (bit << location)
    },
    getNextLocation (history, hash, total) {
      var pos = history.length
      var loc = Math.abs(hash[pos % hash.length] * (pos + 1)) % total
      while (true) {
        if (loc >= total) {
          loc = 0
        } else if (history.indexOf(loc) >= 0) {
          loc++
        } else if ((loc + 1) % 4 === 0) {
          loc++
        } else {
          history.push(loc)
          return loc
        }
      }
    },
    getMessageBits (message) {
      var messageBits = []
      for (var i = 0; i < message.length; i++) {
        var code = message.charCodeAt(i)
        messageBits = messageBits.concat(this.getBitsFromNumber(code))
      }
      return messageBits
    },
    getBitsFromNumber (number) {
      var bits = []
      for (var i = 0; i < 16; i++) {
        bits.push(this.getBit(number, i))
      }
      return bits
    },
    encodeMessage (colors, hash, message) {
      // make an array of bits from the message
      var messageBits = this.getBitsFromNumber(message.length)
      messageBits = messageBits.concat(this.getMessageBits(message))

      // this will store the color values we've already modified
      var history = []

      // encode the bits into the pixels
      var pos = 0
      while (pos < messageBits.length) {
        // set the next color value to the next bit
        var loc = this.getNextLocation(history, hash, colors.length)
        colors[loc] = this.setBit(colors[loc], 0, messageBits[pos])

        // set the alpha value in this pixel to 255
        // we have to do this because browsers do premultiplied alpha
        // see for example: http://stackoverflow.com/q/4309364
        while ((loc + 1) % 4 !== 0) {
          loc++
        }
        colors[loc] = 255

        pos++
      }
    },
    async encode () {
      let canvas = this.$refs.targetCanvasRef
      let ctx = canvas.getContext('2d')

      let question = this.formData.question.trim()
      let answer = this.formData.answer

      if (question.length > 0) {
        question = sjcl.encrypt(answer, question)
      } else {
        return
      }

      let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
      this.encodeMessage(imageData.data, sjcl.hash.sha256.hash(answer), question)
      ctx.putImageData(imageData, 0, 0)
      await this.create(canvas.toDataURL())
    },
    create (d) {
      return new Promise(async (resolve) => {
        let createdData = await this.store.dispatch(types.AJAX, {
          url: this.requestInfo.create,
          data: Object.assign({}, this.formData, {
            origin: this.src,
            blurred: d
          })
        })
        console.log('created data: ', createdData)
        resolve(createdData)
      })
    }
  },
  watch: {
    imgSrc () {
      this.initOriginBox()
    }
  }
}
</script>
