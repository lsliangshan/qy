/***
 **                                                          _ooOoo_
 **                                                         o8888888o
 **                                                         88" . "88
 **                                                         (| -_- |)
 **                                                          O\ = /O
 **                                                      ____/`---'\____
 **                                                    .   ' \\| |// `.
 **                                                     / \\||| : |||// \
 **                                                   / _||||| -:- |||||- \
 **                                                     | | \\\ - /// | |
 **                                                   | \_| ''\---/'' | |
 **                                                    \ .-\__ `-` ___/-. /
 **                                                 ___`. .' /--.--\ `. . __
 **                                              ."" '< `.___\_<|>_/___.' >'"".
 **                                             | | : `- \`.;`\ _ /`;.`/ - ` : | |
 **                                               \ \ `-. \_ __\ /__ _/ .-` / /
 **                                       ======`-.____`-.___\_____/___.-`____.-'======
 **                                                          `=---='
 **
 **                                       .............................................
 **                                              佛祖保佑             永无BUG
 **                                      佛曰:
 **                                              写字楼里写字间，写字间里程序员；
 **                                              程序人员写程序，又拿程序换酒钱。
 **                                              酒醒只在网上坐，酒醉还来网下眠；
 **                                              酒醉酒醒日复日，网上网下年复年。
 **                                              但愿老死电脑间，不愿鞠躬老板前；
 **                                              奔驰宝马贵者趣，公交自行程序员。
 **                                              别人笑我忒疯癫，我笑自己命太贱；
 **                                              不见满街漂亮妹，哪个归得程序员？
 */
/**
 * Created by liangshan on 2017/7/13.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import routes from '../routes.js'
// import moduleEntrance from './modules/moduleEntrance'
// import moduleBaseData from './modules/moduleBaseData'
// import moduleUserInfo from './modules/moduleUserInfo'
// import moduleExtimpl from './modules/moduleExtimpl'
// import moduleWhiteList from './modules/moduleWhiteList'
// import moduleOperation from './modules/moduleOperation'
// import moduleModal from './modules/moduleModal'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions: actions.actions,
  mutations: mutations.mutations,
  getters: getters.getters,
  modules: {
    // moduleEntrance,
    // moduleBaseData,
    // moduleUserInfo,
    // moduleExtimpl,
    // moduleWhiteList,
    // moduleOperation,
    // moduleModal
  },
  state: {
    AppName: 'QY',
    defaultColorTheme: {
      label: '紫色',
      value: 'purple',
      color: '#9c27b0'
    },
    osTheme: '',
    userSettings: {
    },
    allOsThemes: [
      {
        label: 'ios',
        value: 'ios'
      },
      {
        label: 'md',
        value: 'md'
      }
    ],
    themeColors: [
      {
        label: '红色',
        value: 'red',
        color: '#ff3b30'
      },
      {
        label: '绿色',
        value: 'green',
        color: '#4cd964'
      },
      {
        label: '蓝色',
        value: 'blue',
        color: '#2196f3'
      },
      {
        label: '粉色',
        value: 'pink',
        color: '#ff2d55'
      },
      {
        label: '黄色',
        value: 'yellow',
        color: '#ffcc00'
      },
      {
        label: '橘黄',
        value: 'orange',
        color: '#ff9500'
      },
      {
        label: '紫色',
        value: 'purple',
        color: '#9c27b0'
      },
      {
        label: '深紫',
        value: 'deeppurple',
        color: '#673ab7'
      },
      {
        label: '浅蓝',
        value: 'lightblue',
        color: '#5ac8fa'
      },
      {
        label: '水鸭',
        value: 'teal',
        color: '#009688'
      },
      {
        label: '绿黄',
        value: 'lime',
        color: '#cddc39'
      },
      {
        label: '深桔黄',
        value: 'deeporange',
        color: '#ff6b22'
      },
      {
        label: '灰色',
        value: 'gray',
        color: '#8e8e93'
      },
      // {
      //   label: '白色',
      //   value: 'white',
      //   color: 'white'
      // },
      {
        label: '黑色',
        value: 'black',
        color: 'black'
      }
    ],
    localStorageKeys: {
      userInfo: 'user-info',
      osTheme: 'local-os-theme',
      userSettings: 'local-user-settings'
    },
    eventHub: new Vue(),
    events: {
      getNewMessage: 'get-new-message', // 获取到新消息
      updatePluginFileContent: 'update-plugin-file-content', // 更新插件内容
      updatePluginList: 'update-plugin-list', // 更新我的插件列表
      updateAvatar: 'update-avatar', // 更新我的头像
      readMessage: 'read-message' // 消息置为已读
    },
    assets: {
      maleAvatar: '/static/images/avatar_male_1.jpg',
      femaleAvatar: '/static/images/avatar_female_1.jpg',
      logo1: 'http://img09.zhaopin.cn/2012/other/mobile/weex/grayconfig/1.png',
      logo2: 'http://img09.zhaopin.cn/2012/other/mobile/weex/grayconfig/2.png',
      logo3: 'http://img09.zhaopin.cn/2012/other/mobile/weex/grayconfig/3.png',
      logo4: 'http://img09.zhaopin.cn/2012/other/mobile/weex/grayconfig/4.png',
      logo5: 'http://img09.zhaopin.cn/2012/other/mobile/weex/grayconfig/5.png'
    },
    requestInfo: {
      // baseUrl: 'http://172.30.24.71:8081',
      baseUrl: 'http://grayconfig.zhaopin.com',
      getGrayConfigLine: '/grayconfig/cmsappversion/getGrayConfigLine'
    },
    loginInfo: {
      username: '',
      loginTime: ''
    }
  }
})

export default store

global.store = store
