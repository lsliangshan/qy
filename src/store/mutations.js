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

import * as types from './mutation-types'
import { StorageUtil } from '../utils/index'

export const mutations = {
  [types.SET_ACTIVE_THEME_COLOR] (state, data) {
    state.userSettings.activeThemeColor = JSON.parse(JSON.stringify(data.activeThemeColor))
    StorageUtil.setItem(state.localStorageKeys.userSettings, state.userSettings)
  },
  [types.SET_THEME_DARK] (state, data) {
    state.userSettings.themeDark = data.themeDark
    StorageUtil.setItem(state.localStorageKeys.userSettings, state.userSettings)
  },
  [types.SET_OS_THEME] (state, data) {
    /**
     * 修改osTheme需要重新加载页面，所以要独立于userSettings
     */
    state.osTheme = data.osTheme
    StorageUtil.setItem(state.localStorageKeys.osTheme, state.osTheme)
  },
  [types.SET_USER_SETTINGS] (state, data) {
    state.userSettings = JSON.parse(JSON.stringify(data.userSettings))
    console.log('set storage: ', data.userSettings)
    StorageUtil.setItem(state.localStorageKeys.userSettings, state.userSettings)
  }
}
