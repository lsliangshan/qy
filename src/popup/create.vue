<template>
  <f7-page>
    <f7-navbar title="创建"
               back-link="返回"></f7-navbar>
    <div class="popup_body">
      <div class="popup_inner">
        <img ref="originRef"
             :src="imgSrc"
             :style="{maxWidth: '100%', maxHeight: '90%', opacity: ((mosaicRangeOption.value >= 3)) ? 0 : 1}">
        <div ref="targetRef"
             class="target"
             :style="{width: originBox.width + 'px', height: originBox.height + 'px', opacity: (mosaicRangeOption.value < 3) ? 0 : 1}">
          <canvas ref="targetCanvasRef"></canvas>
        </div>
        <div class="popup_placeholder"
             v-if="!imgSrc">
          <f7-icon ios="f7:cloud_upload"
                   aurora="f7:cloud_upload"
                   md="material:cloud_upload"
                   size="40px"></f7-icon>
        </div>
        <div class="file_input_container w100p h100p">
          <input class="w100p h100p"
                 type="file"
                 name="cover"
                 accept="image/*"
                 @change="changePicFileHandler"
                 v-if="isIos" />
          <input class="w100p h100p"
                 type="file"
                 name="cover"
                 accept="image/*"
                 capture="camera"
                 @change="changePicFileHandler"
                 v-else />
        </div>
        <f7-block class="range_container"
                  v-if="imgSrc">
          <f7-range class="margin-right"
                    color="red"
                    style="height: 160px"
                    :vertical="true"
                    :vertical-reversed="true"
                    :max="mosaicRangeOption.max"
                    :min="mosaicRangeOption.min"
                    :label="true"
                    :step="1"
                    :value="mosaicRangeOption.value"
                    @range:changed="renderMosaicImage">
          </f7-range>
        </f7-block>
      </div>
    </div>

    <f7-fab position="right-bottom"
            style="bottom: 48px;"
            slot="fixed">
      <!-- <f7-icon ios="f7:gear"
               aurora="f7:gear"
               md="material:settings"></f7-icon> -->
      <f7-icon ios="f7:more_vertical_fill"
               aurora="f7:more_vertical_fill"
               md="material:more_vert"></f7-icon>
      <f7-icon ios="f7:close"
               aurora="f7:close"
               md="material:close"></f7-icon>
      <f7-fab-buttons position="top">
        <f7-fab-button label="设置"
                       :fab-close="true"
                       v-if="imgSrc"
                       @click="openPopupCreateSettings">
          <f7-icon ios="f7:gear"
                   aurora="f7:gear"
                   md="material:settings"></f7-icon>
        </f7-fab-button>
        <f7-fab-button label="返回"
                       :fab-close="true"
                       color="red"
                       @click="$f7router.back()">
          <f7-icon ios="f7:chevron_left"
                   aurora="f7:chevron_left"
                   md="material:arrow_back"></f7-icon>
        </f7-fab-button>
      </f7-fab-buttons>
    </f7-fab>

    <f7-popup class="popup-create-settings"
              swipe-to-close="to-bottom"
              swipe-handler=".popup-create-close-handler"
              @popup:closed="closePopupCreateSettings">
      <f7-page>
        <div slot="fixed"
             class="popup-create-close-handler"></div>
        <div class="popup_settings_body">
          <f7-list no-hairlines-md>
            <f7-list-input type="textarea"
                           floating-label
                           placeholder="请输入问题"
                           clear-button
                           :max="200"
                           :maxlength="200"
                           :value="formData.question"
                           @blur="questionInputBlur"
                           @focus="questionInputFocus"
                           @input="changeQuestion">
              <div slot="label"
                   class="form_item_label_container">
                <span>提问</span>
                <p class="limit_count"
                   v-if="!questionInputBlurred || (questionInputBlurred && formData.question.length > 0)">
                  (
                  <span>{{formData.question.length}}</span>
                  / 200
                  )
                </p>
              </div>
            </f7-list-input>
            <f7-list-input type="text"
                           floating-label
                           placeholder="请输入答案"
                           clear-button
                           :value="formData.answer"
                           @blur="answerInputBlur"
                           @input="changeAnswer">
              <div slot="label"
                   class="form_item_label_container">
                <span>答案</span>
              </div>
            </f7-list-input>
            <div class="blank_gap"
                 :style="{height: calcToRealPx(30) + 'px'}"></div>
            <f7-button fill
                       color="green"
                       class="btn_send"
                       icon-size="18px"
                       icon-f7="f7:paper_plane_fill"
                       icon-ios="f7:paper_plane_fill"
                       icon-md="material:send"
                       :disabled="!enableEncode"
                       @click="encode">发送</f7-button>
          </f7-list>

          <div class="form_item form_item_bottom">
            <!-- <x-button type="primary"
                      style="width: 150px;"
                      :disabled="!enableEncode"
                      @click.native="encode">发送</x-button>
            <x-button type="primary"
                      :plain="true"
                      @click.native="closeSettingPopup"
                      style="width: 100px;">关闭</x-button> -->
          </div>
        </div>
      </f7-page>
    </f7-popup>
  </f7-page>
</template>
<style scoped>
  .w100p {
    width: 100%;
  }
  .h100p {
    height: 100%;
  }
  .popup-create-settings {
    --f7-popup-border-radius: 15px 15px 0 0;
    --f7-popup-tablet-border-radius: 15px;
    /* --f7-page-bg-color: #fff; */
    --f7-block-strong-border-color: transparent;
    /* height: calc(100% - var(--f7-navbar-height) - var(--f7-statusbar-height));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          top: calc(var(--f7-navbar-height) + var(--f7-statusbar-height)); */
    height: 340px;
    top: calc(100% - var(--f7-statusbar-height) - 340px);
  }
  .popup-create-close-handler {
    height: 40px;
    position: absolute;
    left: 0;
    width: 100%;
    top: 0;
    /* background: #fff; */
    cursor: pointer;
    z-index: 10;
  }
  .popup-create-close-handler:after {
    content: "";
    width: 36px;
    height: 6px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -18px;
    margin-top: -3px;
    border-radius: 3px;
    background: #666;
  }
  .popup_body {
    width: 100%;
    height: 100%;
    /* background-color: #fff; */
  }
  .popup_inner {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .popup_placeholder {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .popup_placeholder i {
    color: #c8c8c8;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .file_input_container {
    position: absolute;
    width: 100%;
    height: 100%;
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
  .range_container {
    position: absolute;
    width: var(--f7-range-size);
    height: 160px;
    right: 20px;
    top: 200px;
  }
  .popup_settings_body {
    width: 100%;
    height: calc(100% - 40px);
    margin-top: 40px;
  }
  .form_item {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .form_item_label_container {
    width: 100%;
    height: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .form_item_label_container .limit_count {
    margin-left: 10px;
  }
  .form_item_label_container .limit_count span {
    color: red;
    font-size: 16px;
  }
  .btn_send {
    position: absolute;
    right: 10px;
    width: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>

<script>
  import * as StackBlur from 'stackblur-canvas'
  import * as types from '../store/mutation-types'
  export default {
    name: 'PopupCreate',
    props: {
    },
    data () {
      return {
        createPopup: null,
        imgSrc: '',
        isIos: this.$f7.device.ios,
        originBox: {},
        mosaicRangeOption: {
          max: 100,
          min: 0,
          value: 0,
          step: 1,
          dotSize: 30,
          // data: [3, 4, 6, 8, 10, 16, 20],
          rangeHandleHeight: 30
        },
        formData: {
          file: null,
          question: 'question',
          answer: '123'
        },
        reader: null,
        questionInputBlurred: true,
        notification: null,
        toaster: null
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
      // this.notificate()
      // this.toast({
      //   type: 'info',
      //   position: 'bottom'
      // })
    },
    mounted () {
      this.createPopup = this.$f7.popup.create({
        el: '.popup-create-settings',
        swipeToClose: true,
        swipeHandler: '.popup-create-close-handler'
      })
    },
    methods: {
      changeQuestion (e) {
        this.formData.question = e.target.value.trim()
      },
      changeAnswer (e) {
        this.formData.answer = e.target.value.trim()
      },
      questionInputBlur () {
        this.questionInputBlurred = true
        this.resetPage()
      },
      questionInputFocus () {
        this.questionInputBlurred = false
      },
      answerInputBlur () {
        this.resetPage()
      },
      resetMosaic () {
        this.mosaicRangeOption.value = 0
      },
      renderMosaicImage (e) {
        this.mosaicRangeOption.value = Number(e)
        StackBlur.image(this.$refs.originRef, this.$refs.targetCanvasRef, e)
      },
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
      initOriginBox () {
        let origin = this.$refs.originRef
        return new Promise((resolve) => {
          origin.onload = (e) => {
            let originBox = origin.getBoundingClientRect()
            this.originBox = originBox
            resolve(true)
          }
        })
      },
      openPopupCreateSettings () {
        this.createPopup.open()
      },
      closePopupCreateSettings () {
        this.createPopup.close()
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
        let createdData = await this.create(canvas.toDataURL())
        if (createdData.status !== 200) {
          this.toast({
            type: 'error',
            text: createdData.message || '失败'
          })
        } else {
          this.closePopupCreateSettings()
          this.toast({
            type: 'success',
            text: '发送成功'
          })
        }
      },
      create (d) {
        return new Promise(async (resolve, reject) => {
          let createdData = await this.store.dispatch(types.AJAX, {
            url: this.requestInfo.create,
            data: Object.assign({}, this.formData, {
              origin: this.imgSrc,
              blurred: d
            })
          })
          resolve(createdData)
        })
      },
      notificate (args = {}) {
        this.notification = this.$f7.notification.create({
          icon: args.icon || '<svg width="16" height="16" style="width: 16px; height: 16px;" stroke="#202121" fill="none"><use xlink:href="#image-logo"></use></svg>',
          title: args.title || 'QY' || '<svg width="16" height="16" style="width: 16px; height: 16px;" stroke="#202121"><use xlink:href="#text-logo"></use></svg>',
          titleRightText: 'now',
          closeButton: true,
          subtitle: args.subtitle || 'This is a subtitle',
          text: args.text || 'This is a simple notification message',
          closeTimeout: args.duration || 2000,
        })
        this.notification.open()
      },
      toast (args = {}) {
        let icon = ''
        let theme = this.$f7.theme
        switch (args.type) {
          case 'success':
            icon = (theme === 'ios' ? ('<i class="f7-icons">check</i>') : ('<i class="material-icons">done</i>'))
            break
          case 'error':
            icon = (theme === 'ios' ? ('<i class="f7-icons">close</i>') : ('<i class="material-icons">close</i>'))
            break
          case 'info':
            icon = '<i class="f7-icons">info</i>'
            break
          case 'warning':
            icon = (theme === 'ios' ? ('<i class="f7-icons">warning</i>') : ('<i class="material-icons">priority_high</i>'))
            break
          default:
            break
        }
        let toastOption = {
          text: args.text || 'toast',
          position: args.position || 'top',
          closeTimeout: args.duration || 2000,
          closeButton: args.closeButton || (args.position && (args.position !== 'center')),
          closeButtonText: args.closeButtonText || 'ok'
        }
        if (args.type) {
          toastOption.position = 'center'
          if (icon) {
            toastOption.icon = icon
          }
        }
        if (args.on) {
          toastOption.on = args.on
        }
        this.toaster = this.$f7.toast.create(toastOption)
        this.toaster.open()
      }
    },
    watch: {
      async imgSrc () {
        await this.initOriginBox()
      }
    }
  }
</script>
