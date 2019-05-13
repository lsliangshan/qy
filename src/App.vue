<template>
  <!-- App -->
  <f7-app :params="f7params"
          :theme-dark="themeDark"
          :class="'color-theme-' + activeThemeColor.value">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left
              reveal
              theme-dark>
      <f7-view url="/panel-left/"></f7-view>
    </f7-panel>

    <!-- Right Panel -->
    <f7-panel right
              cover
              theme-dark>
      <f7-view url="/panel-right/"></f7-view>
    </f7-panel>

    <!-- Main View -->
    <f7-view id="main-view"
             url="/"
             main
             class="safe-areas"></f7-view>

    <!-- Popup -->
    <f7-popup id="popup"
              class="test_popup">
      <f7-view>
        <f7-page ptr
                 @ptr:refresh="refresh"
                 @ptr:done="pullToRefreshDone">
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block-title large>Block Title Large</f7-block-title>
          <f7-block-header>Block Header</f7-block-header>
          <f7-block v-for="(item, index) in blocks"
                    :key="index">
            {{item}}
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <!-- Login Screen -->
    <f7-login-screen id="login-screen"
                     theme-dark>
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>
            <f7-list-input label="Username"
                           name="username"
                           placeholder="Username"
                           type="text" />
            <f7-list-input label="Password"
                           name="password"
                           type="password"
                           placeholder="Password" />
          </f7-list>
          <f7-list>
            <f7-list-button title="Sign In"
                            login-screen-close></f7-list-button>
            <f7-block-footer>
              <p>Click Sign In to close Login Screen</p>
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>

    <!-- <f7-fab position="right-bottom"
            slot="fixed"
            color="green">
      <f7-icon ios="f7:gear"
               aurora="f7:gear"
               md="material:gear"></f7-icon>
      <f7-icon ios="f7:close"
               aurora="f7:close"
               md="material:close"></f7-icon>
      <f7-fab-buttons position="center">
        <f7-fab-button>1</f7-fab-button>
        <f7-fab-button>2</f7-fab-button>
        <f7-fab-button>3</f7-fab-button>
        <f7-fab-button>4</f7-fab-button>
      </f7-fab-buttons>

    </f7-fab> -->

    <f7-fab position="right-bottom"
            slot="fixed"
            color="orange">
      <f7-icon ios="f7:add"
               aurora="f7:add"
               md="material:add"></f7-icon>
      <f7-icon ios="f7:close"
               aurora="f7:close"
               md="material:close"></f7-icon>
      <f7-fab-buttons position="top">
        <f7-fab-button label="Action 1">1</f7-fab-button>
        <f7-fab-button label="Action 2">2</f7-fab-button>
      </f7-fab-buttons>
    </f7-fab>

  </f7-app>
</template>

<script>
// Import Routes
import routes from './routes.js'
import * as types from './store/mutation-types'
import { StorageUtil } from './utils/index'

export default {
  data () {
    let osTheme = localStorage.getItem('local-os-theme') || 'ios'
    return {
      // Framework7 parameters here
      f7params: {
        id: 'io.framework7.testapp', // App bundle ID
        name: 'Framework7', // App name
        theme: osTheme, // Automatic theme detection
        // App routes
        routes: routes,
        toast: {
          closeTimeout: 3000,
          closeButton: true,
        },
      },
      blocks: []
    }
  },
  computed: {
    store () {
      return this.$store
    },
    themeDark () {
      return this.store.state.themeDark
    },
    localStorageKeys () {
      return this.store.state.localStorageKeys
    },
    activeThemeColor () {
      return this.store.state.activeThemeColor
    }
  },
  async created () {
    this.store.commit(types.SET_OS_THEME, {
      osTheme: this.f7params.theme
    })
  },
  methods: {
    sleep (ts = 2000) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true)
        }, ts)
      })
    },
    getOsTheme () {
      return new Promise(async (resolve) => {
        let localOsTheme = await StorageUtil.getItem(this.localStorageKeys.osTheme)
        if (!localOsTheme) {
          resolve('ios')
        } else {
          resolve(localOsTheme || 'ios')
        }
      })
    },
    async refresh (evt, done) {
      await this.sleep(3000)
      this.blocks = new Array(10).fill(Math.floor(Math.random() * 100) + ', Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.').concat(this.blocks)
      let toast = this.$f7.toast.create({
        // icon: this.$f7.theme === 'ios' ? '<i class="f7-icons">check</i>' : '<i class="material-icons">check</i>',
        text: '刷新成功',
        position: 'top'
      })
      toast.open()
      done()
    },
    pullToRefreshDone (evt) {

    }
  }
}
</script>
