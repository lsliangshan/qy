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
import * as types from '../mutation-types'
import axios from 'axios'
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
const moduleEntrance = {
  namespaced: true,
  state: {
    requestParams: {
      key: '26412474748748',
      s: '1d4f0ci9e2e4d8cz591e13eiu39ok487f',
      baseUrl: 'https://capi.zhaopin.com'
    },
    requestUrl: {
      baseUrl: 'http://grayconfig.zhaopin.com',
      getOperationEntranceGroup: '/grayconfig/cmsoperation/getOperationEntranceGroup',
      insertOperationEntrance: '/grayconfig/cmsoperation/insertOperationEntrance',
      updateOperationEntranceInfo: '/grayconfig/cmsoperation/updateOperationEntranceInfo',
      setOperationEntranceState: '/grayconfig/cmsoperation/setOperationEntranceState',
      getEntranceConfigInfoGroup: '/grayconfig/cmsentrance/getEntranceConfigInfoGroup', // 获取所有带灰度规则的入口
      insertEntranceConfigInfo: '/grayconfig/cmsentrance/insertEntranceConfigInfo', // 新增一条带灰度规则的入口
      updateEntranceConfigInfo: '/grayconfig/cmsentrance/updateEntranceConfigInfo', // 更新入口的灰度规则
      delEntranceConfigInfo: '/grayconfig/cmsentrance/delEntranceConfigInfo', // 删除灰度入口
      getEntranceOperationConfig: '/grayconfig/cmsentrance/getEntranceOperationConfig' // 获取用户的灰度入口，用于预览
    },
    entrances: []
  },
  getters: {
  },
  actions: {
    query ({ state, commit }) {
      /**
       * 查询所有四大入口的原始数据
       */
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.getOperationEntranceGroup + '?post=1'
        }).then(({ data }) => {
          if (data.data.action && (data.data.data.length > 0) && (data.data.data[0].list.length > 0)) {
            commit(types.SET_ALL_ENTRANCES, data.data.data[0].list, { root: true })
            resolve(true)
          } else {
            commit(types.SET_ALL_ENTRANCES, [], { root: true })
            resolve(true)
          }
        }).catch(err => {
          commit(types.SET_ALL_ENTRANCES, [], { root: true })
          resolve(true)
        })
      })
    },
    insert ({ state, dispatch }, data) {
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.insertOperationEntrance + '?' + formatParams(Object.assign({}, data, {
            post: '1'
          }))
        }).then(({ data }) => {
          if (data.data.action) {
            dispatch('insertEntranceList', data.data.data)
            resolve(data.data.data)
          } else {
            reject(new Error(data.data.message || '新增失败，请稍后再试'))
          }
        }).catch(err => {
          reject(new Error(err.message || '新增失败，请稍后再试'))
        })
      })
    },
    update ({ state, dispatch }, data) {
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.updateOperationEntranceInfo + '?' + formatParams(data)
        }).then(({ data }) => {
          if (data.data.action) {
            dispatch('updateEntranceList', data.data.data)
            resolve(data.data.data)
          } else {
            reject(new Error(data.data.message || '更新失败，请稍后再试'))
          }
        }).catch(err => {
          reject(new Error(err.message || '更新失败，请稍后再试'))
        })
      })
    },
    ban ({ state, dispatch }, data) {
      /**
       * 禁用单个入口
       */
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.setOperationEntranceState + '?' + formatParams(data)
        }).then(({ data }) => {
          if (data.data.action) {
            dispatch('updateEntranceList', data.data.data)
            resolve(data.data.data)
          } else {
            reject(new Error(data.data.message || '禁用失败，请稍后再试'))
          }
        }).catch(err => {
          reject(new Error(err.message || '禁用失败，请稍后再试'))
        })
      })
    },
    queryGray ({ state, commit }) {
      /**
       * 查询所有带灰度规则的入口
       */
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.getEntranceConfigInfoGroup + '?post=1'
        }).then(({ data }) => {
          if (data.data.action && (data.data.data.length > 0)) {
            commit(types.SET_ALL_GRAY_ENTRANCES, data.data.data, { root: true })
            resolve(true)
          } else {
            commit(types.SET_ALL_GRAY_ENTRANCES, [], { root: true })
            resolve(true)
          }
        }).catch(err => {
          commit(types.SET_ALL_GRAY_ENTRANCES, [], { root: true })
          resolve(true)
        })
      })
    },
    insertGray ({ state, dispatch }, data) {
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.insertEntranceConfigInfo + '?' + formatParams(Object.assign({
            post: '1'
          }, data))
        }).then(({ data }) => {
          if (data.data.action) {
            dispatch('insertGrayEntranceList', data.data.data)
            resolve(data.data.data)
          } else {
            reject(new Error(data.data.message || '新增失败，请稍后再试'))
          }
        }).catch(err => {
          reject(new Error(err.message || '新增失败，请稍后再试'))
        })
      })
    },
    updateGray ({ state, dispatch }, data) {
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.updateEntranceConfigInfo + '?' + formatParams(Object.assign({
            post: '1'
          }, data))
        }).then(({ data }) => {
          if (data.data.action) {
            dispatch('updateGrayEntranceList', data.data.data)
            resolve(data.data.data)
          } else {
            reject(new Error(data.data.message || '更新失败，请稍后再试'))
          }
        }).catch(err => {
          reject(new Error(err.message || '更新失败，请稍后再试'))
        })
      })
    },
    deleteGray ({ state, dispatch }, data) {
      let params = data
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.delEntranceConfigInfo + '?' + formatParams(Object.assign({
            post: '1'
          }, data))
        }).then(({ data }) => {
          if (data.data.action) {
            dispatch('deleteGrayEntranceList', params)
            resolve(params)
          } else {
            reject(new Error(data.data.message || '更新失败，请稍后再试'))
          }
        }).catch(err => {
          reject(new Error(err.message || '更新失败，请稍后再试'))
        })
      })
    },
    getUserEntranceGray ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.getEntranceOperationConfig + '?' + formatParams(Object.assign({
            post: '1',
            platform: '5'
          }, data))
        }).then(({ data }) => {
          if (data.data.action && (data.data.data.length > 0)) {
            commit(types.SET_USER_GRAY_ENTRANCES, data.data.data, { root: true })
            resolve(true)
          } else {
            commit(types.SET_USER_GRAY_ENTRANCES, [], { root: true })
            resolve(true)
          }
        }).catch(err => {
          commit(types.SET_USER_GRAY_ENTRANCES, [], { root: true })
          resolve(true)
        })
      })
    },
    updateEntranceList ({ commit, rootState }, data) {
      let entrances = JSON.parse(JSON.stringify(rootState.allEntrances))
      let i = 0
      for (i; i < entrances.length; i++) {
        if (String(entrances[i].id) === String(data.id)) {
          entrances.splice(i, 1, data)
        }
      }
      commit(types.SET_ALL_ENTRANCES, entrances, { root: true })
    },
    insertEntranceList ({ commit, rootState }, data) {
      let entrances = JSON.parse(JSON.stringify(rootState.allEntrances))
      entrances.unshift(data)
      commit(types.SET_ALL_ENTRANCES, entrances, { root: true })
    },
    updateGrayEntranceList ({ commit, rootState }, data) {
      let entrances = JSON.parse(JSON.stringify(rootState.allGrayEntrances))
      let i = 0
      for (i; i < entrances[Number(data.modularId) - 1].list.length; i++) {
        if (String(entrances[Number(data.modularId) - 1].list[i].id) === String(data.id)) {
          entrances[Number(data.modularId) - 1].list.splice(i, 1, data)
        }
      }
      commit(types.SET_ALL_GRAY_ENTRANCES, entrances, { root: true })
    },
    deleteGrayEntranceList ({ commit, rootState }, data) {
      let entrances = JSON.parse(JSON.stringify(rootState.allGrayEntrances))
      let i = 0
      for (i; i < entrances[Number(data.modularId) - 1].list.length; i++) {
        if (String(entrances[Number(data.modularId) - 1].list[i].id) === String(data.id)) {
          entrances[Number(data.modularId) - 1].list.splice(i, 1)
        }
      }
      commit(types.SET_ALL_GRAY_ENTRANCES, entrances, { root: true })
    },
    insertGrayEntranceList ({ commit, rootState }, data) {
      let entrances = JSON.parse(JSON.stringify(rootState.allGrayEntrances))
      entrances[Number(data.modularId) - 1].list.unshift(data)
      commit(types.SET_ALL_GRAY_ENTRANCES, entrances, { root: true })
    },
    getGreyConfig ({ state, rootState }) {
      return new Promise(resolve => {
        let greyConfig = [
          {
            name: 'entrance1',
            list: [
              {
                id: 1,
                min: 0,
                max: 200,
                city: ['530', '789', '541'],
                default: true,
                start: 1552233600000,
                end: 1561046400000
              },
              {
                id: 2,
                min: 200,
                max: 1000,
                city: [],
                default: false,
                start: 1552233600000,
                end: 1561046400000
              }
            ]
          },
          {
            name: 'entrance2',
            list: [
              {
                id: 3,
                min: 0,
                max: 500,
                city: ['541'],
                default: false,
                start: 1552233600000,
                end: 1561046400000
              },
              {
                id: 4,
                min: 500,
                max: 1000,
                city: [],
                default: true,
                start: 1552233600000,
                end: 1561046400000
              }
            ]
          },
          {
            name: 'entrance3',
            list: [
              {
                id: 1,
                min: 0,
                max: 200,
                city: ['530'],
                default: false,
                start: 1552233600000,
                end: 1561046400000
              },
              {
                id: 3,
                min: 200,
                max: 500,
                city: [],
                default: false,
                start: 1552233600000,
                end: 1561046400000
              },
              {
                id: 5,
                min: 500,
                max: 1000,
                city: ['530'],
                default: true,
                start: 1552233600000,
                end: 1561046400000
              }
            ]
          },
          {
            name: 'entrance4',
            list: [
              {
                id: 2,
                min: 0,
                max: 500,
                city: ['736'],
                default: true,
                start: 1552233600000,
                end: 1561046400000
              },
              {
                id: 6,
                min: 500,
                max: 1000,
                city: ['530'],
                default: false,
                start: 1552233600000,
                end: 1561046400000
              }
            ]
          }
        ]
        rootState.greyEntrances = greyConfig
        resolve(true)
      })
    }
  }
}

export default moduleEntrance
