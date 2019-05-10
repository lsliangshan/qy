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
 * Created by liangshan on 2018/8/6.
 */

import axios from 'axios'
const instance = axios.create({
  timeout: 3000
})

const moduleBaseData = {
  namespaced: true,
  state: {
    requestParams: {
      key: '26412474748748',
      s: '1d4f0ci9e2e4d8cz591e13eiu39ok487f',
      baseUrl: 'https://capi.zhaopin.com'
    }
  },
  getters: {
  },
  actions: {
    getAllCities ({ state, rootState }, data) {
      let outCities = []
      for (let i = 0; i < data.length; i++) {
        if (['530', '551', '531', '561', '562', '563', '538'].indexOf(data[i].code) > -1) {
          outCities.push({
            en_name: data[i].en_name,
            name: data[i].name,
            code: data[i].code
          })
        } else {
          outCities = outCities.concat(data[i].sublist.slice(1))
        }
      }
      rootState.cities = outCities
      return outCities
    },
    getProvince ({ state, dispatch, rootState }) {
      return new Promise(resolve => {
        if (rootState.province.length > 0) {
          resolve(true)
        } else {
          instance.get('https://img09.zhaopin.cn/2012/other/mobile/weex/province.json').then(({ data }) => {
            rootState.province = data
            dispatch('getAllCities', data)
            resolve(true)
          }).catch(err => {
            resolve(true)
          })
        }
      })
    }
  }
}

export default moduleBaseData
