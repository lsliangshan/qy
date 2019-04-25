<template>
  <div class="profile_detail_container">
    <div class="gap_12"></div>
    <div class="profile_detail_items">
      <div class="profile_detail_item" data-path-name="DetailHeadIcon" :data-image="assets.maleAvatar" @click="navTo">
        <div class="profile_detail_item_label pen" :style="{width: calcToRealPx(300) + 'px', height: calcToRealPx(150) + 'px'}">
          头像
        </div>
        <div class="profile_detail_item_value pen" :style="{width: calcToRealPx(300) + 'px', height: calcToRealPx(150) + 'px'}">
          <div class="avatar_container pen" :style="{width: calcToRealPx(150) + 'px', height: calcToRealPx(150) + 'px'}">
            <img class="avatar_img" :default-src="assets.maleAvatar" :src="loginInfo.headIcon">
          </div>
          <x-icon type="ios-arrow-right" size="16" class="icon_color_normal"></x-icon>
        </div>
      </div>

      <div class="main_operation_item" v-for="(op, index) in detailItems" :key="index" :data-type="op.type" :data-name="op.name" :data-title="op.label" :data-component="op.component" @click="detailItemClick">
        <div class="main_operation_item_inner pen">
          <div class="main_operation_item_label" v-text="op.label" :style="{width: calcToRealPx(200) + 'px'}"></div>
          <div class="main_operation_item_right" :style="{width: calcToRealPx(400) + 'px'}">
            <div class="main_operation_item_right_value" v-if="op.name.toLowerCase() === 'phonenum'">{{personInfo[op.name.toLowerCase()] | phonenum}}</div>
            <!--<div class="main_operation_item_right_value" v-else-if="(op.name.toLowerCase() === 'industry') || (op.name.toLowerCase() === 'city')" v-html="personInfo[op.name.toLowerCase()].name.replace(/;/, '<br>')"></div>-->
            <div class="main_operation_item_right_value" v-else-if="op.name.toLowerCase() === 'industry'" v-html="personInfo[op.name.toLowerCase()].name.replace(/;/, '<br>')"></div>
            <div class="main_operation_item_right_value" v-else-if="op.name.toLowerCase() === 'city'" v-html="formatCity(personInfo[op.name.toLowerCase()].name)"></div>
            <div class="main_operation_item_right_value" v-else v-text="personInfo[op.name.toLowerCase()]"></div>
            <x-icon type="ios-arrow-right" size="16" class="icon_color_normal" style="margin-left: 4px;" v-if="op.type !== ''"></x-icon>
          </div>
        </div>
      </div>

      <!-- Popup -->
      <div v-transfer-dom>
        <popup :height="popupHeight"
               position="bottom"
               :is-transparent="true"
               v-model="popupOptions.shown">
          <!--<popup-header :left-text="'取消'"-->
          <!--:right-text="'保存'"-->
          <!--:title="'修改' + popupOptions.title"-->
          <!--:show-bottom-border="false"-->
          <!--@on-click-left="closePopup"-->
          <!--@on-click-right="popupHandler"-->
          <!--&gt;-->
          <!--</popup-header>-->
          <div class="popup_inner">
            <keep-alive :exclude="['Username', 'Phonenum']">
              <component :is="popupOptions.component" :info="personInfo[popupOptions.name]" :name="popupOptions.name" @modify="modifyPersonInfo" @close="closePopup"></component>
            </keep-alive>
          </div>
        </popup>
      </div>
      <!-- Popup -->
    </div>

    <div class="btns_container" :class="{shown: hasChanged}">
      <x-button type="primary" text="修改"></x-button>
    </div>
  </div>
</template>
<style scoped>
  .icon_color_normal {
    fill: #999999;
  }
  .profile_detail_container {
    width: 100%;
    height: 100%;
  }
  .profile_detail_items {
    width: 100%;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #ffffff;
  }
  .profile_detail_item {
    width: 100%;
    padding: 0 10px 0 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .profile_detail_item:active {
    background-color: #f5f5f5;
  }
  .profile_detail_item_label {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
  }
  .profile_detail_item_value {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
  }
  .avatar_container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .avatar_img {
    border-radius: 8px;
    overflow: hidden;
    width: 70%;
    height: 70%;
    border: 1px solid #f5f5f5;
  }

  .main_operation_items {
    width: 100%;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    /*margin-top: 24px;*/
    background-color: #ffffff;
  }
  .main_operation_item {
    padding: 0 10px 0 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .main_operation_item:active {
    background-color: #f5f5f5;
  }
  .main_operation_item_inner {
    width: 100%;
    height: 100%;
    padding: 10px 0 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #f5f5f5;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .main_operation_item_label {
    height: 36px;
    display: flex;
    align-items: center;
    border: none;
  }
  .main_operation_item_right {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
  }
  .main_operation_item_right_value {
    color: #999999;
    font-size: 13px;
    text-align: right;
  }

  .popup_inner {
    /*width: 100%;*/
    /*height: calc(100% - 44px);*/
    /*background-color: #ffffff;*/
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #ffffff;
    margin: 0 auto;
    border-radius: 5px;
  }

  .btns_container {
    width: 100%;
    margin-top: 24px;
    padding: 0 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    opacity: 0;
    -webkit-transition: opacity .3s ease-in-out;
    -moz-transition: opacity .3s ease-in-out;
    -ms-transition: opacity .3s ease-in-out;
    -o-transition: opacity .3s ease-in-out;
    transition: opacity .3s ease-in-out;
  }
  .btns_container.shown {
    opacity: 1;
  }
</style>
<script>
  import { TransferDom, XImg, XButton, Popup, PopupHeader } from 'vux'
  export default {
    name: 'ProfileDetail',
    data () {
      return {
        detailItems: [
          {
            label: '姓名',
            type: 'popup',
            name: 'nickname',
            component: 'Username'
          },
          {
            label: '手机号',
            type: 'popup',
            name: 'phonenum',
            component: 'Phonenum'
          },
          {
            label: '微信号',
            type: '',
            name: 'wechat',
            component: 'Wechat'
          },
          {
            label: '行业',
            type: 'popup',
            name: 'industry',
            component: 'Industry'
          },
          {
            label: '职位',
            type: 'popup',
            name: 'position',
            component: 'Position'
          },
          {
            label: '公司名称',
            type: 'popup',
            name: 'company',
            component: 'Company'
          },
          {
            label: '城市',
            type: 'popup',
            name: 'city',
            component: 'City'
          }
        ],
        popupOptions: {
          shown: false,
          title: '',
          name: '',
          component: ''
        },
        startWatch: false,
        hasChanged: false,
        cachePersonInfo: {},
        personInfo: {
          nickname: 'Keith',
          phonenum: '18000000000',
          wechat: 'enkel00',
          industry: {
            name: '商业服务<br>广告/会展/公关',
            value: '10900;200302'
          },
          position: 'web前端工程师',
          company: '智联招聘',
          city: {
            name: '北京;北京',
            value: '530;530'
          }
        }
      }
    },
    computed: {
      assets () {
        return this.$store.state.assets
      },
      loginInfo () {
        return this.$store.state.loginInfo
      },
      popupHeight () {
        return [].indexOf(this.popupOptions.component.toLowerCase()) > -1 ? '95%' : '50%'
      }
    },
    created () {
      this.$nextTick(() => {
        this.personInfo = Object.assign({}, this.personInfo, this.$store.state.loginInfo)
        this.cachePersonInfo = Object.assign({}, this.personInfo)
        setTimeout(() => {
          this.startWatch = true
        }, 1000)
      })
    },
    methods: {
      detailItemClick (e) {
        if (e.target.dataset.type === '') {
          return
        }
        this.popupOptions.component = e.target.dataset.component
        this.popupOptions.title = e.target.dataset.title
        this.popupOptions.name = e.target.dataset.name.toLowerCase()
        this.openPopup()
      },
      openPopup () {
        this.popupOptions.shown = true
      },
      closePopup () {
        this.popupOptions.shown = false
        this.popupOptions.component = ''
      },
      popupHandler (e) {
        this.closePopup()
      },
      modifyPersonInfo (args) {
        // 修改个人信息的某一项
        this.personInfo[args.name.toLowerCase()] = args.value
      },
      formatCity (text) {
        let _textArr = text.split(';')
        if (_textArr[0] === _textArr[1]) {
          return _textArr[0]
        } else {
          return _textArr.join('<br>')
        }
      },
      navTo (evt) {
        this.$router.push({
          name: evt.target.dataset.pathName
        })
      }
    },
    watch: {
      personInfo: {
        deep: true,
        handler (val) {
          if (this.startWatch) {
            this.hasChanged = (JSON.stringify(val) !== JSON.stringify(this.cachePersonInfo))
          }
        }
      }
    },
    directives: {
      TransferDom
    },
    components: {
      XImg,
      XButton,
      Popup,
      PopupHeader,
      Username: () => import('./detail/Username'),
      Phonenum: () => import('./detail/Phonenum'),
      City: () => import('./detail/City'),
      Company: () => import('./detail/Company'),
      Industry: () => import('./detail/Industry'),
      Position: () => import('./detail/Position')
    }
  }
</script>
