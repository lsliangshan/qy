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
        <!-- <img :src="imgSrc || src"
             :style="{maxWidth: calcToRealPx(480) + 'px', maxHeight: calcToRealPx(480) + 'px'}"> -->
        <img ref="originRef"
             :src="imgSrc || src"
             :style="{maxWidth: '100%', maxHeight: '100%', opacity: (photomosaic && (mosaicRangeOption.value >= 3)) ? 0 : 1}">
        <div ref="targetRef"
             class="target"
             :style="{width: originBox.width + 'px', height: originBox.height + 'px', opacity: (mosaicRangeOption.value < 3) ? 0 : 1}"></div>
      </div>
    </div>

    <div class="form_item"
         style="position: absolute; bottom: 20px; left: 0; width: 100%;">
      <!-- <range :value="mosaicRangeOption.value"
             style="width: 100%;"
             :max="mosaicRangeOption.max"
             :min="mosaicRangeOption.min"
             :step="mosaicRangeOption.step"
             :rangeHandleHeight="mosaicRangeOption.rangeHandleHeight"
             @on-touchend="renderMosaicImage"></range> -->
      <vue-slider v-model="mosaicRangeOption.value"
                  style="width: 80%;"
                  :max="mosaicRangeOption.max"
                  :min="mosaicRangeOption.min"
                  :dotSize="mosaicRangeOption.dotSize"
                  @change="renderMosaicImage">
      </vue-slider>
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
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // top: 0;
}
</style>
<script>
import { Group, XTextarea, XInput, XButton, Range } from 'vux'
import VueSlider from 'vue-slider-component'
require('photomosaic.js')
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
  components: {
    Group,
    XTextarea,
    XInput,
    XButton,
    Range,
    VueSlider
  },
  data () {
    return {
      reader: null,
      formData: {
        file: null
      },
      imgSrc: '',
      mosaicSize: 8, // 马赛克尺寸
      mosaicRangeOption: {
        max: 60,
        min: 0,
        value: 8,
        step: 1,
        dotSize: 20,
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
      }
    }
  },
  created () {
    this.reader = new FileReader()
  },
  mounted () { },
  methods: {
    async changePicFileHandler (e) {
      if (e.target.files.length > 0) {
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
    renderMosaicImage () {
      this.$refs.targetRef.innerHTML = ''
      let origin = this.$refs.originRef
      let originBox = origin.getBoundingClientRect()
      this.originBox = originBox
      console.log('...box: ', originBox)
      this.photomosaic = new window.PhotoMosaic({
        image: this.$refs.originRef,
        targetElement: this.$refs.targetRef,
        width: originBox.width,
        height: originBox.height,
        tileHeight: this.mosaicRangeOption.value,
        tileWidth: this.mosaicRangeOption.value,
        tileShape: 'rectangle',
        opacity: 1
      })
    }
  }
}
</script>
