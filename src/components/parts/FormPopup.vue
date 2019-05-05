<template>
  <div class="form_popup_container">
    <div class="blank_gap"
         :style="{height: calcToRealPx(30) + 'px'}"></div>
    <div class="form_item"
         :style="{height: calcToRealPx(600) + 'px'}">
      <div class="form_item_inner"
           :style="{width: calcToRealPx(600) + 'px', height: calcToRealPx(600) + 'px'}">
        <div class="file_input_container"
             :style="{width: calcToRealPx(600) + 'px', height: calcToRealPx(600) + 'px'}">
          <input class="js_upFile cover1"
                 type="file"
                 name="cover"
                 accept="image/*"
                 :style="{width: calcToRealPx(600) + 'px', height: calcToRealPx(600) + 'px'}"
                 @change="changePicFileHandler"
                 v-if="isIos" />
          <input class="js_upFile cover1"
                 type="file"
                 name="cover"
                 accept="image/*"
                 capture="camera"
                 :style="{width: calcToRealPx(600) + 'px', height: calcToRealPx(600) + 'px'}"
                 v-else />
        </div>
        <img :src="imgSrc || src"
             :style="{maxWidth: calcToRealPx(580) + 'px', maxHeight: calcToRealPx(580) + 'px'}">
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
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
.form_item_inner {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.file_input_container {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
<script>
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
