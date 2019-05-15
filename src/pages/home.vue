<template>
  <f7-page hide-bars-on-scroll
           ptr
           :ptr-distance="50"
           @ptr:refresh="refresh">
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-f7="f7:bars"
                 icon-ios="f7:bars"
                 icon-md="material:menu"
                 panel-open="left"></f7-link>
      </f7-nav-left>
      <!-- <f7-nav-title>My App</f7-nav-title> -->
      <f7-nav-right>
        <f7-link icon-if-ios="f7:waterdrop_fill"
                 icon-if-md="material:waterdrop_fill"
                 popover-open=".theme-color-select"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-toolbar bottom
                ref="toolbar"
                class="custom_toolbar">
      <f7-link @click="closeFab">Left Link</f7-link>
      <f7-link href="/settings/">
        <f7-icon ios="f7:gear"
                 aurora="f7:gear"
                 md="material:settings"></f7-icon>
      </f7-link>
    </f7-toolbar>

    <!-- <f7-card expandable
             class="settings_container">
      <f7-card-content :padding="false">
        <div class="bg-color-yellow"
             :style="{height: '300px'}">
          <f7-card-header text-color="black"
                          class="display-block">
            Framework7
            <br />
            <small :style="{opacity: 0.7}">Build Mobile Apps</small>
          </f7-card-header>
          <f7-link card-close
                   color="black"
                   class="card-opened-fade-in"
                   :style="{position: 'absolute', right: '15px', top: '15px'}"
                   icon-f7="close_round_fill"></f7-link>
        </div>
        <div class="card-content-padding">
          <p>Framework7 - is a free and open source HTML mobile framework to develop hybrid mobile apps or web apps with iOS or Android (Material) native look and feel...</p>
        </div>
      </f7-card-content>
    </f7-card> -->
    <!-- <f7-block>
      <p>Here is your blank Framework7 app. Let's see what we have here.</p>
    </f7-block>
    <f7-block-title>Navigation</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/"
                    title="About"></f7-list-item>
      <f7-list-item link="/form/"
                    title="Form"></f7-list-item>
    </f7-list>
    <f7-block-title>Modals</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill
                     raised
                     popup-open="#popup">Popup</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill
                     raised
                     login-screen-open="#login-screen">Login Screen</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos maxime incidunt id ab culpa ipsa omnis eos, vel excepturi officiis neque illum perferendis dolorum magnam rerum natus dolore nulla ex.</p>
    </f7-block>
    <f7-block>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos maxime incidunt id ab culpa ipsa omnis eos, vel excepturi officiis neque illum perferendis dolorum magnam rerum natus dolore nulla ex.</p>
    </f7-block>
    <f7-block-title>Panels</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill
                     raised
                     panel-open="left">Left Panel</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill
                     raised
                     panel-open="right">Right Panel</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-list>
      <f7-list-item link="/dynamic-route/blog/45/post/125/?foo=bar#about"
                    title="Dynamic Route"></f7-list-item>
      <f7-list-item link="/load-something-that-doesnt-exist/"
                    title="Default Route (404)"></f7-list-item>
    </f7-list> -->
    <!-- <f7-photo-browser :photos="imgsArr"
                      theme="dark"
                      type="popup"
                      back-link-text="返回"
                      ref="imagePreviewerRef"></f7-photo-browser> -->

    <vue-waterfall-easy :imgsArr="imgsArr"
                        srcKey="url"
                        @scrollReachBottom="getData"
                        :reachBottomDistance="15"
                        @click="clickHandler">
      <f7-preloader slot="loading"></f7-preloader>
    </vue-waterfall-easy>

    <f7-popover class="theme-color-select">
      <div class="colors_container">
        <div class="color_item"
             v-for="(item, index) in themeColors"
             :key="index"
             :style="{backgroundColor: item.color}"
             @click="setActiveThemeColor(item)">
          <div class="color_item_status"
               v-if="activeThemeColor.value === item.value">
            <f7-icon ios="f7:check"
                     aurora="f7:check"
                     md="material:check"
                     color="white"></f7-icon>
          </div>
        </div>
      </div>
    </f7-popover>

    <!-- morph-to=".settings_container.fab-morph-target" -->
    <!-- @click="showPopupCreateHandler" -->
    <f7-fab position="right-bottom"
            id="setting_fab"
            href="/popup-create/"
            slot="fixed">
      <f7-icon ios="f7:add"
               aurora="f7:add"
               md="material:add"></f7-icon>
      <!-- <f7-icon ios="f7:close"
               aurora="f7:close"
               md="material:close"></f7-icon> -->
    </f7-fab>

    <!-- <popup-create :show="showPopupCreate"
                  @closed="hidePopupCreateHandler"></popup-create> -->
    <!-- <f7-popup class="popup-create"
              swipe-to-close
              swipe-handler=".swipe-handler">
      <f7-page>
        <f7-block-title large>Hello!</f7-block-title>
        <f7-block strong>
          <p class="swipe-handler"><b>Swipe works only on this paragraph</b></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
          <p>Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel, feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante. Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida adipiscing libero.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
          <p>Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel, feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante. Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida adipiscing libero.</p>
        </f7-block>
      </f7-page>
    </f7-popup> -->
    <!-- <f7-popup swipe-to-close="to-bottom"
              class="popup-create"
              swipe-handler=".popup-create-close-handler"
              ref='popupCreateRef'>
      <f7-page>
        <div class="swipe-handler popup-create-close-handler"
             slot="fixed"></div>
        <f7-block strong>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
          <p>Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel, feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante. Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida adipiscing libero.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
          <p>Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel, feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante. Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida adipiscing libero.</p>
        </f7-block>
      </f7-page>
    </f7-popup> -->

  </f7-page>
</template>
<style scoped>
  .fs14 {
    font-size: 14px;
  }
  .theme-color-select {
    max-height: 300px;
  }
  .colors_container {
    width: 260px;
    height: 260px;
    padding: 10px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .color_item {
    width: 50px;
    height: 50px;
    margin: 5px;
    border: 1px solid #f5f5f5;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .settings_container {
    position: absolute;
    height: calc(100% - 44px);
    left: 0;
    right: 0;
    top: 44px;
    bottom: 0;
    background: #fff;
    z-index: 1600;
    border-radius: 5px 5px 0 0;
    box-shadow: 0px 3px 30px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    font-size: 14px;
  }
  .active_theme_color {
    width: 32px;
    height: 32px;
    border: 1px solid #c8c8c8;
  }
  @media (min-width: 768px) {
    .settings_container {
      left: 20%;
      width: 60%;
      right: auto;
      height: 80%;
      top: auto;
    }
  }

  .popup-create-close-handler {
    height: 16px;
    position: absolute;
    left: 0;
    width: 100%;
    top: 0;
    background: #f00;
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
</style>

<script>
  import * as types from '../store/mutation-types'
  import axios from 'axios'
  import vueWaterfallEasy from 'vue-waterfall-easy'
  import PopupCreate from '../popup/create.vue'
  export default {
    name: 'home',
    data () {
      return {
        showPreloader: true,
        imgsArr: [],
        group: 0,
        pageIndex: 1,
        pageSize: 30,
        photoBrowser: null,
        showPopupCreate: false
      }
    },
    components: {
      vueWaterfallEasy,
      PopupCreate
    },
    computed: {
      store () {
        return this.$store
      },
      userSettings () {
        return this.store.state.userSettings
      },
      themeColors () {
        return this.store.state.themeColors
      },
      activeThemeColor () {
        return this.userSettings.activeThemeColor
      }
    },
    created () {
      this.getData()
    },
    methods: {
      showPopupCreateHandler () {
        this.showPopupCreate = true
      },
      hidePopupCreateHandler () {
        this.showPopupCreate = false
      },
      async refresh (event, done) {
        this.pageIndex = 1
        await this.getData()
        setTimeout(() => {
          done()
        }, 800)
      },
      getData () {
        return new Promise(async (resolve) => {
          await axios.get('../../static/mock/data.json?group=' + this.pageIndex) // 真实环境中，后端会根据参数group返回新的图片数组，这里我用一个惊呆json文件模拟
            .then(res => {
              if ((this.pageIndex !== 1) && (this.imgsArr.length >= 200)) {
                // this.showPreloader = false;
                // return;
                this.imgsArr.splice(0, this.pageSize)
              }
              if (this.pageIndex === 1) {
                this.imgsArr = res.data
              } else {
                this.imgsArr = this.imgsArr.concat(res.data)
              }
              this.pageIndex++
              resolve(true)
            }).catch(() => {
              resolve(true)
            })
        })
      },
      clickHandler (e, { index, value }) {
        e.preventDefault()
        this.photoBrowser = this.$f7.photoBrowser.create({
          photos: this.imgsArr,
          type: 'popup',
          backLinkText: '返回',
          theme: 'dark',
          navbarOfText: 'in'
        })
        this.photoBrowser.open(Number(index))
      },
      setActiveThemeColor (color) {
        this.store.commit(types.SET_ACTIVE_THEME_COLOR, {
          activeThemeColor: color
        })
      },
      closeFab () {
        this.$f7.fab.close()
      },
      openPopupCreate () {
        this.$refs.popupCreateRef.open()
      }
    }
  }
</script>
