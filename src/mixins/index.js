// import * as types from '../store/mutation-types'
// import {RouterUtil} from '../utils/index'
// import jsonp from 'jsonp'

export default {
  methods: {
    isPc () {
      let sUserAgent = navigator.userAgent.toLowerCase()
      let bIsIpad = sUserAgent.match(/ipad/i)
      let bIsIphoneOs = sUserAgent.match(/iphone os/i)
      let bIsMidp = sUserAgent.match(/midp/i)
      let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i)
      let bIsUc = sUserAgent.match(/ucweb/i)
      let bIsAndroid = sUserAgent.match(/android/i)
      let bIsCE = sUserAgent.match(/windows ce/i)
      let bIsWM = sUserAgent.match(/windows mobile/i)
      return !(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)
    },
    __S4 () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    },
    getUUID (prefix) {
      return ((prefix || '') + this.__S4() + this.__S4() + '-' + this.__S4() + '-' + this.__S4() + '-' + this.__S4() + '-' + this.__S4() + this.__S4() + this.__S4())
    },
    isEmptyObject (obj) {
      return !!obj && Object.keys(obj).length === 0 && obj.constructor === Object
    },
    rgbToHex (color) {
      let rgb = color.split(',')
      let r = parseInt(rgb[0].split('(')[1])
      let g = parseInt(rgb[1])
      let b = parseInt(rgb[2].split(')')[0])

      let hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
      return hex
    },
    formatQueryParams () {
      let search = location.href.replace(/^.*\?/, '').trim()
      if (!search) {
        return {}
      } else {
        let params = search.split('&')
        let i = 0
        let outParams = {}
        for (i; i < params.length; i++) {
          outParams[params[i].split('=')[0]] = params[i].split('=')[1]
        }
        return outParams
      }
    },
    getTheme () {
      let allThemes = ['ios', 'md']
      let tempTheme = this.formatQueryParams()
      if (!tempTheme.theme) {
        return 'ios'
      } else {
        if (allThemes.indexOf(tempTheme.theme.trim()) < 0) {
          return 'ios'
        } else {
          return tempTheme.theme.trim()
        }
      }
    },
    reloadWithTheme (theme) {
      let href = location.href
      location.replace(href.replace(/^(.*theme=)([^&^=])*(&?.*)$/, '$1' + theme + '$3'))
    }
  }
}
