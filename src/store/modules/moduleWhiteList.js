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
  baseURL: 'http://grayconfig.zhaopin.com'
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
const moduleWhiteList = {
  namespaced: true,
  state: {
    requestUrl: {
      baseUrl: 'http://grayconfig.zhaopin.com',
      insertWhitelist: '/grayconfig/cmsentrance/insertWhitelist', // 插入白名单
      deleteWhiteList: '/grayconfig/cmsentrance/delWhitelist', // 删除白名单
      isWhiteList: '/grayconfig/cmsentrance/getIsWhiteList' // 判断是否为白名单
    }
  },
  getters: {
  },
  actions: {
    insert ({ state }, data) {
      /**
       * 插入白名单
       * Method: GET
       * DATA: ?userId=680921371&modularId=2&operationGrayId=5&businessType=2
       */
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.insertWhitelist + '?' + formatParams(data)
        }).then(({ data }) => {
          if (data.data.action) {
            resolve(true)
          } else {
            reject(new Error(data.data.message || '白名单插入失败，请稍后再试'))
          }
        }).catch(err => {
          reject(new Error(err.message || '白名单插入失败，请稍后再试'))
        })
      })
    },
    delete ({ state }, data) {
      /**
       * 删除白名单
       * Method: GET
       * DATA: ?userId=680921371&modularId=2&operationGrayId=5&businessType=2
       */
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.deleteWhiteList + '?' + formatParams(data)
        }).then(({ data }) => {
          if (data.data.action) {
            resolve(true)
          } else {
            reject(new Error(data.data.message || '白名单删除失败，请稍后再试'))
          }
        }).catch(err => {
          reject(new Error(err.message || '白名单删除失败，请稍后再试'))
        })
      })
    },
    query ({ state }, data) {
      /**
       * 判断是否为白名单
       * Method: GET
       * DATA: ?userId=680921371&modularId=2&operationGrayId=5&businessType=2
       */
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.isWhiteList + '?' + formatParams(data)
        }).then(({ data }) => {
          if (data.data.action) {
            if (data.data.data) {
              resolve(true)
            } else {
              reject(new Error('该用户不是白名单'))
            }
          } else {
            reject(new Error(data.data.message || '白名单查询失败，请稍后再试'))
          }
        }).catch(err => {
          reject(new Error(err.message || '白名单查询失败，请稍后再试'))
        })
      })
    },
    list ({ state }, data) {
      /**
       * 查询白名单
       */
      return new Promise((resolve, reject) => {
        let outList = []
        for (let i = 0; i < 50; i++) {
          let ranId = Math.floor(Math.random() * 100000000) + 600000000
          if (outList.indexOf(ranId) < 0) {
            outList.push(ranId)
          } else {
            i--
          }
        }
        resolve(outList)
      })
    }
  }
}

export default moduleWhiteList
