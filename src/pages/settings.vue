<template>
  <f7-page :theme-dark="themeDark">
    <f7-block-title class="settings_title">
      <span>设置</span>
      <div @click="closeFab">
        <f7-icon ios="f7:close"
                 aurora="f7:close"
                 md="material:close"></f7-icon>
      </div>
    </f7-block-title>
    <f7-list>
      <f7-list-item class="fs14"
                    title="主题颜色">
        <f7-link class="fs14"
                 slot="after"
                 title="主题颜色"
                 href="#"
                 popover-open=".settings-theme-color-select">
          <div class="active_theme_color"
               :style="{backgroundColor: activeThemeColor.color}"></div>
        </f7-link>
      </f7-list-item>
      <f7-list-item class="fs14"
                    title="夜间模式">
        <f7-toggle :checked="themeDark"
                   @toggle:change="toggleThemeDark"></f7-toggle>
      </f7-list-item>
      <f7-list-item class="fs14"
                    title="风格主题"
                    smart-select
                    :smart-select-params="{openIn: 'popover', closeOnSelect: true, on: {
                      closed: changeOsTheme
                    }}"
                    link="#">
        <select name="osTheme"
                slot="after">
          <option v-for="(item, index) in allOsThemes"
                  :key="index"
                  :value="item.value"
                  :selected="item.value === osTheme">{{item.label}}</option>
        </select>
      </f7-list-item>
    </f7-list>

    <f7-popover class="settings-theme-color-select">
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
  </f7-page>
</template>

<script>
import * as types from '../store/mutation-types'
export default {
  name: 'settings',
  data () {
    return {
      themeColorSheetShown: false
    }
  },
  computed: {
    store () {
      return this.$store
    },
    allOsThemes () {
      return this.store.state.allOsThemes
    },
    themeColors () {
      return this.store.state.themeColors
    },
    activeThemeColor () {
      return this.store.state.activeThemeColor
    },
    themeDark () {
      return this.store.state.themeDark
    },
    osTheme () {
      return this.store.state.osTheme
    }
  },
  methods: {
    setActiveThemeColor (color) {
      this.store.commit(types.SET_ACTIVE_THEME_COLOR, {
        activeThemeColor: color
      })
    },
    openThemeColorSheet () {
      // this.themeColorSheetShown = true
      this.$f7.popover.open('.settings-theme-color-select')
    },
    closeFab () {
      this.$f7.fab.close('#setting_fab')
    },
    toggleThemeDark (e) {
      this.store.commit(types.SET_THEME_DARK, {
        themeDark: e
      })
    },
    changeOsTheme (e) {
      // console.log(this.$f7route)
      let selectedTheme = this.allOsThemes[Number(e.selectEl.selectedIndex)].value
      this.store.commit(types.SET_OS_THEME, {
        osTheme: selectedTheme
      })
      location.reload()
    }
  }
}
</script>

<style scoped>
.fs14 {
  font-size: 14px;
}
.active_theme_color {
  width: 32px;
  height: 32px;
  border: 1px solid #c8c8c8;
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

.settings_title {
  margin-top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>


