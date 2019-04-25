<template>
  <div class="detail_company_container">
    <div class="detail_company_header">修改姓名</div>
    <group gutter="0px" class="detail_company_inner">
      <x-input placeholder="请输入您的姓名"
               class="company_input"
               autofocus="autofocus"
               v-model="value"
               :required="true"
               :is-type="validateCompany"
               @on-click-error-icon="showError"
               @on-change="modifyValue"></x-input>
    </group>
  </div>
</template>
<style scoped>
  .detail_company_container {
    width: 100%;
    height: 100%;
  }
  .detail_company_header {
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;

  }
  .detail_company_inner{
    width: 100%;
    height: calc(100% - 44px);
    padding: 5px 10px;
    box-sizing: border-box;
  }
  .company_input {
    background-color: #fafafa;
  }
</style>
<script>
  import { Group, XInput } from 'vux'
  export default {
    name: 'Company',
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
        validateCompany (val) {
          let _val = val || ''
          if (!_val || (_val.trim() === '')) {
            return {
              valid: false,
              msg: '姓名不能为空'
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
      modifyValue () {
        this.$emit('modify', {
          name: this.name,
          value: this.value
        })
      },
      showError (msg) {
        this.$vux.toast.show({
          type: 'text',
          text: msg
        })
      }
    },
    components: {
      Group,
      XInput
    }
  }
</script>
