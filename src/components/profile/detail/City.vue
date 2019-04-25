<template>
  <div class="detail_city_container">
    <div class="detail_city_header">
      修改城市
      <div class="popup_save_btn" @click="changeCity">保存</div>
    </div>
    <group gutter="0px" class="detail_city_inner">
      <picker :data="city" :fixed-columns="2" :columns="2" v-model="selected" ref="cityRef"></picker>
    </group>
  </div>
</template>
<style scoped>
  .detail_city_container {
    width: 100%;
    height: 100%;
  }
  .detail_city_header {
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
  .detail_city_inner{
    width: 100%;
    height: calc(100% - 44px);
    padding: 5px 10px;
    box-sizing: border-box;
    overflow: hidden;
  }
</style>
<script>
  import { Picker, PopupPicker, Group, XButton } from 'vux'
  import { CITY } from '../../../utils/data'
  export default {
    name: 'City',
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
        city: [],
        selected: []
      }
    },
    created () {
      this.$nextTick(() => {
        this.selected = this.info.value.split(';')
        this.formatCity()
      })
    },
    methods: {
      formatCity () {
        let _city = Object.assign([], CITY)
        let _sublist = []
        for (let i = 0; i < _city.length; i++) {
          _city[i].value = _city[i].code
          _city[i].parent = '0'
          if (_city[i].sublist && _city[i].sublist.length > 0) {
            for (let j = 0; j < _city[i].sublist.length; j++) {
              _city[i].sublist[j].value = _city[i].sublist[j].code
              _city[i].sublist[j].parent = _city[i].code
            }
          }
          _sublist = _sublist.concat(Object.assign([], _city[i].sublist))
          delete _city[i].sublist
        }
        this.city = _city.concat(_sublist)
      },
      changeCity () {
        this.$emit('modify', {
          name: this.name,
          value: {
            name: this.$refs.cityRef.getNameValues().replace(/\s/, ';'),
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
