<template>
  <div class="detail_industry_container">
    <div class="detail_industry_header">
      修改行业
      <div class="popup_save_btn" @click="changeIndustry">保存</div>
    </div>
    <group gutter="0px" class="detail_industry_inner">
      <picker :data="industry" :fixed-columns="2" :columns="2" v-model="selected" ref="industryRef"></picker>
    </group>
  </div>
</template>
<style scoped>
  .detail_industry_container {
    width: 100%;
    height: 100%;
  }
  .detail_industry_header {
    position: relative;
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
  .popup_save_btn {
    position: absolute;
    right: 10px;
    top: 0;
    width: 40px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1AAD19;
    pointer-events: auto;
  }
  .popup_save_btn:active {
    opacity: .7;
  }
  .detail_industry_inner{
    width: 100%;
    height: calc(100% - 44px);
    padding: 5px 10px;
    box-sizing: border-box;
    overflow: hidden;
  }
</style>
<script>
  import { Picker, PopupPicker, Group, XButton } from 'vux'
  import { INDUSTRY } from '../../../utils/data'
  export default {
    name: 'Industry',
    props: {
      info: {
        type: Object,
        default: function () {
          return {
            name: '',
            value: ''
          }
        }
      },
      name: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        industry: [],
        selected: []
      }
    },
    created () {
      this.$nextTick(() => {
        this.selected = this.info.value.split(';')
        this.formatIndustry()
      })
    },
    methods: {
      formatIndustry () {
        let _industry = Object.assign([], INDUSTRY)
        let _sublist = []
        for (let i = 0; i < _industry.length; i++) {
          _industry[i].value = _industry[i].code
          _industry[i].parent = '0'
          if (_industry[i].sublist && _industry[i].sublist.length > 0) {
            for (let j = 0; j < _industry[i].sublist.length; j++) {
              _industry[i].sublist[j].value = _industry[i].sublist[j].code
              _industry[i].sublist[j].parent = _industry[i].code
            }
          }
          _sublist = _sublist.concat(Object.assign([], _industry[i].sublist))
          delete _industry[i].sublist
        }
        this.industry = _industry.concat(_sublist)
      },
      changeIndustry () {
        this.$emit('modify', {
          name: this.name,
          value: {
            name: this.$refs.industryRef.getNameValues().replace(/\s/, ';'),
            value: this.selected.join(';')
          }
        })
        this.$emit('close')
      }
    },
    components: {
      PopupPicker,
      Picker,
      Group,
      XButton
    }
  }
</script>
