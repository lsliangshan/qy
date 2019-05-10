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

import utils from '../../utils/index'
import axios from 'axios'
import qs from 'querystring'
const http = axios.create({
  timeout: 3000,
  baseURL: 'http://m-capi-extimpl.zpidc.com'
})
axios.interceptors.response.use((response) => {
  return response
})
const noop = function () { }
// 获取随机数
function random () {
  return Math.floor(Math.random() * 10000 + 500)
}
function formatParams (data) {
  let arr = []
  for (let name in data) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
  }
  // 添加一个随机数，防止缓存
  arr.push('v=' + random())
  return arr.join('&')
}
const moduleExtimpl = {
  namespaced: true,
  state: {
    list: [],
    historyList: [],
    envs: [],
    requestUrl: {
      baseUrl: 'http://m-capi-extimpl.zpidc.com',
      getConfigSettingList: '/extapi/configmanage/getConfigSettingList',
      saveConfigSetting: '/extapi/configmanage/saveConfigSetting',
      delConfigSetting: '/extapi/configmanage/delConfigSetting',
      getConfigSettingHistroy: '/extapi/configmanage/getConfigSettingHistroy',
      getEnvs: '/extapi/configmanage/getConfigEnv'
    }
  },
  getters: {
  },
  actions: {
    getEnvs ({ state }, data) {
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.getEnvs
        }).then(({ data }) => {
          if (Number(data.code) === 200 && (Object.keys(data.data).length > 0)) {
            let outEnvs = []
            for (let k in data.data) {
              if (data.data.hasOwnProperty(k)) {
                outEnvs.push({
                  name: k,
                  value: data.data[k]
                })
              }
            }
            state.envs = outEnvs
            resolve(true)
          } else {
            state.envs = []
            resolve([])
          }
        }).catch(err => {
          state.envs = []
          resolve([])
        })
      })
    },
    getList ({ state }, data) {
      /**
       * 根据环境获取远程配置列表
       * Method: GET
       * Data: ?env=3
       */
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.getConfigSettingList + '?' + formatParams(data)
        }).then(({ data }) => {
          if (Number(data.code) === 200) {
            state.list = (data.data || [])
            resolve(data.data)
          } else {
            resolve([])
          }
        }).catch(err => {
          resolve([])
        })
      })
    },
    getListBatch ({ state, dispatch }, data) {
      return new Promise(async (resolve, reject) => {
        if (data.env && (data.env.length > 0)) {
          let promises = []
          for (let i = 0; i < data.env.length; i++) {
            promises.push(dispatch('getList', {
              env: data.env[i].value
            }))
          }
          await Promise.all(promises).then(res => {
            state.list = res
            resolve(true)
          }).catch(err => {
            state.list = []
            resolve(true)
          })
        }
      })
    },
    save ({ state }, data) {
      /**
       * 保存远程配置
       * Method: POST
       * Data: projname=capiimpl&projremark=capi&confver=1&env=3&conftxt={"weexJsState":"1","resumeTopService":"16608a08e69b475e886f1ac22db0d8cc","zLSTSCLog":"1","batchdelivery":"销售,销售代表"}
       */
      return new Promise((resolve, reject) => {
        http({
          method: 'post',
          url: state.requestUrl.saveConfigSetting,
          data: qs.stringify(data)
        }).then(({ data }) => {
          if ((Number(data.code) === 200) && data.data) {
            resolve(data.data)
          } else {
            reject(new Error((data.message !== '成功') ? data.message : '保存失败，请稍后再试'))
          }
        }).catch(err => {
          reject(new Error((err.message !== '成功') ? data.message : '保存失败，请稍后再试'))
        })
      })
    },
    delete ({ state }, data) {
      /**
       * 删除远程配置
       * Method: GET
       * Data: ?projname=test12&env=3
       */
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.delConfigSetting + '?' + formatParams(data)
        }).then(({ data }) => {
          if ((Number(data.code) === 200) && data.data) {
            resolve(data.data)
          } else {
            reject(new Error((data.message !== '成功') ? data.message : '删除失败，请稍后再试'))
          }
        }).catch(err => {
          reject(new Error((err.message !== '成功') ? data.message : '删除失败，请稍后再试'))
        })
      })
    },
    getHistory ({ state }, data) {
      /**
       * 根据环境获取历史操作
       * Method: GET
       * Data: ?env=3
       */
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.getConfigSettingHistroy + '?' + formatParams(data)
        }).then(({ data }) => {
          if ((Number(data.code) === 200) && data.data) {
            state.historyList = (data.data || [])
          } else {
          }
          resolve(true)
        }).catch(err => {
          resolve(true)
        })
      })
    }
  }
}

export default moduleExtimpl
