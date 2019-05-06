<template>
  <div class="form_popup_container">
    <!-- <div class="blank_gap"
         :style="{height: calcToRealPx(30) + 'px'}"></div> -->
    <div class="form_item form_item_1"
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
        <img :src="imgSrc || src"
             :style="{maxWidth: calcToRealPx(480) + 'px', maxHeight: calcToRealPx(480) + 'px'}">
      </div>
    </div>

    <div class="form_item">
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
                style="width: 150px;">发送</x-button>
      <x-button type="primary"
                :plain="true"
                style="width: 100px;">关闭</x-button>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .w100p {
    width: 100%;
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
</style>
<script>
  import { Group, XTextarea, XInput, XButton } from 'vux'
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
      XButton
    },
    data () {
      return {
        reader: null,
        formData: {
          file: null
        },
        imgSrc: ''
      }
    },
    created () {
      this.reader = new FileReader()
    },
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
      }
    }
  }
</script>
