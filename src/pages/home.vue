<template>
  <f7-page hide-toolbar-on-scroll>
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-if-ios="f7:menu"
                 icon-if-md="material:menu"
                 panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>My App</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-if-ios="f7:waterdrop_fill"
                 icon-if-md="material:waterdrop_fill"
                 popover-open=".theme-color-select"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-toolbar bottom
                hidden
                class="custom_toolbar">
      <f7-link>Left Link</f7-link>
      <f7-link>Right Link</f7-link>
    </f7-toolbar>
    <f7-block strong>
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
    </f7-list>

    <f7-popover class="theme-color-select">
      <div class="colors_container">
        <div class="color_item"
             v-for="(item, index) in themeColors"
             :key="index"
             :style="{backgroundColor: item.color}"
             @click="setActiveThemeColor(item.value)">
          <div class="color_item_status"
               v-if="activeThemeColor === item.value">
            <f7-icon ios="f7:check"
                     aurora="f7:check"
                     md="material:check"
                     color="white"></f7-icon>
          </div>
        </div>
      </div>
    </f7-popover>

    <f7-fab position="right-bottom"
            morph-to=".toolbar.custom_toolbar"
            slot="fixed">
      <f7-icon ios="f7:gear"
               aurora="f7:gear"
               md="material:gear"></f7-icon>
      <f7-icon ios="f7:close"
               aurora="f7:close"
               md="material:close"></f7-icon>
      <!-- <f7-fab-buttons position="left">
        <f7-fab-button label="主题"></f7-fab-button>
        <f7-fab-button>2</f7-fab-button>
        <f7-fab-button>3</f7-fab-button>
        <f7-fab-button>4</f7-fab-button>
      </f7-fab-buttons> -->

    </f7-fab>
  </f7-page>
</template>
<style scoped>
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

  .custom_toolbar {
    opacity: 0;
  }
</style>

<script>
  import * as types from '../store/mutation-types'
  export default {
    name: 'home',
    data () {
      return {}
    },
    computed: {
      store () {
        return this.$store
      },
      themeColors () {
        return this.store.state.themeColors
      },
      activeThemeColor () {
        return this.store.state.activeThemeColor
      }
    },
    methods: {
      setActiveThemeColor (color) {
        this.store.commit(types.SET_ACTIVE_THEME_COLOR, {
          activeThemeColor: color
        })
      }
    }
  }
</script>
