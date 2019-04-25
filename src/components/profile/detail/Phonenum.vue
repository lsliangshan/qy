<template>
  <div class="detail_phonenum_container">
    <div class="detail_phonenum_header">修改手机号</div>
    <group gutter="0px" class="detail_phonenum_inner">
      <x-input type="tel" label-width="70px" title="新手机号"
               placeholder="请输入手机号"
               class="phonenum_input"
               :is-type="validatePhonenum"
               autofocus="autofocus"
               required
               v-model="newPhonenum"
               @on-click-error-icon="showError"></x-input>
      <x-input type="number"
               label-width="70px"
               title="验证码"
               placeholder="请输入验证码"
               required
               v-model="verifyCode"
               @on-click-error-icon="showError('验证码不能为空')"
               class="phonenum_input">
        <x-button slot="right" type="primary"
                  mini
                  :disabled="verifyCodeBtn.loading"
                  :text="verifyCodeBtn.loading ? (verifyCodeBtn.countdown + '秒') : verifyCodeBtn.text"
                  @click.native="getVerifyCode"></x-button>
      </x-input>

      <x-button class="modify_phonenum_btn" type="primary" text="保存" @click.native="modifyPhonenum"></x-button>
    </group>
  </div>
</template>
<style scoped>
  .detail_phonenum_container {
    width: 100%;
    height: 100%;
  }
  .detail_phonenum_header {
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;

  }
  .detail_phonenum_inner{
    width: 100%;
    height: calc(100% - 44px);
    padding: 15px 10px;
    box-sizing: border-box;
  }
  .phonenum_input {
    background-color: #fafafa;
  }

  .modify_phonenum_btn {
    margin-top: 15px;
  }
</style>
<script>
  import { Group, XInput, XButton } from 'vux'
  export default {
    name: 'Phonenum',
    props: {
      info: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        value: this.info,
        newPhonenum: '',
        verifyCode: '',
        verifyCodeBtn: {
          text: '获取',
          duration: 60, // 单位s
          countdown: 0, // 倒计时，单位s
          loading: false, // 是否正在获取验证码
          interval: -1
        },
        validatePhonenum (val) {
          let _val = val || ''
          if (!_val || (_val.trim() === '')) {
            return {
              valid: false,
              msg: '手机号不能为空'
            }
          } else if (!/^1[345678]\d{9}$/.test(_val)) {
            return {
              valid: false,
              msg: '手机号格式不正确'
            }
          } else {
            return {
              valid: true
            }
          }
        }
      }
    },
    methods: {
      getVerifyCode () {
        let _phonenumValidation = this.validatePhonenum(this.newPhonenum)
        if (!_phonenumValidation.valid) {
          this.$vux.toast.show({
            type: 'text',
            text: _phonenumValidation.msg
          })
        } else {
          if (this.verifyCodeBtn.interval) {
            clearInterval(this.verifyCodeBtn.interval)
          }
          /**
           * TODO:调用获取短信验证码接口
           */
          this.verifyCodeBtn.loading = true
          this.verifyCodeBtn.countdown = this.verifyCodeBtn.duration
          this.verifyCodeBtn.interval = setInterval(() => {
            if (this.verifyCodeBtn.countdown === 1) {
              // 倒计时结束
              this.verifyCodeBtn.loading = false
              clearInterval(this.verifyCodeBtn.interval)
            }
            this.verifyCodeBtn.countdown -= 1
          }, 1000)
        }
      },
      showError (msg) {
        this.$vux.toast.show({
          type: 'text',
          text: msg
        })
      },
      resetFormData () {
        this.newPhonenum = ''
        this.verifyCode = ''
      },
      modifyPhonenum () {
        // 保存手机号
        let _phonenumValidation = this.validatePhonenum(this.newPhonenum)
        if (!_phonenumValidation.valid) {
          this.$vux.toast.show({
            type: 'text',
            text: _phonenumValidation.msg
          })
        } else {
          if (!this.verifyCode || (this.verifyCode.trim() === '')) {
            this.$vux.toast.show({
              type: 'text',
              text: '验证码不能为空'
            })
          } else {
            // 表单输入验证通过，提交数据
            /**
             * TODO:调用保存手机号接口
             */
            // ...
            this.$emit('modify', {
              name: this.name,
              value: this.newPhonenum
            })
            this.$emit('close')
          }
        }
      }
    },
    components: {
      Group,
      XInput,
      XButton
    }
  }
</script>
