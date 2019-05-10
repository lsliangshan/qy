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
 * Weex首页广告运营位
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
const moduleOperation = {
  namespaced: true,
  state: {
    requestParams: {
      key: '26412474748748',
      s: '1d4f0ci9e2e4d8cz591e13eiu39ok487f',
      baseUrl: 'https://capi.zhaopin.com'
    },
    requestUrl: {
      baseUrl: 'http://grayconfig.zhaopin.com',
      getOperationBitBaseGroup: '/grayconfig/cmsbit/getOperationBitBaseGroup',
      insertOperationBitBase: '/grayconfig/cmsbit/insertOperationBitBase',
      updateOperationBitBaseInfo: '/grayconfig/cmsbit/updateOperationBitBaseInfo',
      setOperationBitBaseState: '/grayconfig/cmsbit/setOperationBitBaseState',

      getOperationBitConfigGroup: '/grayconfig/cmsbitconfig/getOperationBitConfigGroup', // 获取所有带灰度规则的入口
      insertOperationBitConfigInfo: '/grayconfig/cmsbitconfig/insertOperationBitConfigInfo', // 新增一条带灰度规则的入口
      updateOperationBitConfigInfo: '/grayconfig/cmsbitconfig/updateOperationBitConfigInfo', // 更新入口的灰度规则
      delOperationBitConfigInfo: '/grayconfig/cmsbitconfig/delOperationBitConfigInfo', // 删除灰度入口
      getOperationBitConfig: '/grayconfig/cmsbitconfig/getOperationBitConfig' // 获取用户的灰度入口，用于预览
    },
    operations: []
  },
  getters: {
  },
  actions: {
    query ({ state, commit }) {
      /**
       * 查询所有运营位的原始数据
       */
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.getOperationBitBaseGroup + '?post=1'
        }).then(({ data }) => {
          if (data.data.action && (data.data.data.length > 0) && (data.data.data[0].list.length > 0)) {
            commit(types.SET_ALL_OPERATIONS, data.data.data[0].list, { root: true })
            resolve(true)
          } else {
            commit(types.SET_ALL_OPERATIONS, [], { root: true })
            resolve(true)
          }
        }).catch(err => {
          commit(types.SET_ALL_OPERATIONS, [], { root: true })
          resolve(true)
        })
      })
    },
    insert ({ state, dispatch }, data) {
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.insertOperationBitBase + '?' + formatParams(Object.assign({}, data, {
            post: '1'
          }))
        }).then(({ data }) => {
          if (data.data.action) {
            dispatch('insertOperationList', data.data.data)
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
          url: state.requestUrl.updateOperationBitBaseInfo + '?' + formatParams(data)
        }).then(({ data }) => {
          if (data.data.action) {
            dispatch('updateOperationList', data.data.data)
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
          url: state.requestUrl.setOperationBitBaseState + '?' + formatParams(data)
        }).then(({ data }) => {
          if (data.data.action) {
            dispatch('updateOperationList', data.data.data)
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
          url: state.requestUrl.getOperationBitConfigGroup + '?post=1'
        }).then(({ data }) => {
          if (data.data.action && (data.data.data.length > 0)) {
            commit(types.SET_ALL_GRAY_OPERATIONS, data.data.data, { root: true })
            resolve(true)
          } else {
            commit(types.SET_ALL_GRAY_OPERATIONS, [], { root: true })
            resolve(true)
          }
        }).catch(err => {
          commit(types.SET_ALL_GRAY_OPERATIONS, [], { root: true })
          resolve(true)
        })
      })
    },
    insertGray ({ state, dispatch }, data) {
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.insertOperationBitConfigInfo + '?' + formatParams(Object.assign({
            post: '1'
          }, data))
        }).then(({ data }) => {
          if (data.data.action) {
            dispatch('insertGrayOperationList', data.data.data)
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
          url: state.requestUrl.updateOperationBitConfigInfo + '?' + formatParams(Object.assign({
            post: '1'
          }, data))
        }).then(({ data }) => {
          if (data.data.action) {
            dispatch('updateGrayOperationList', data.data.data)
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
          url: state.requestUrl.delOperationBitConfigInfo + '?' + formatParams(Object.assign({
            post: '1'
          }, data))
        }).then(({ data }) => {
          if (data.data.action) {
            dispatch('deleteGrayOperationList', params)
            resolve(params)
          } else {
            reject(new Error(data.data.message || '更新失败，请稍后再试'))
          }
        }).catch(err => {
          reject(new Error(err.message || '更新失败，请稍后再试'))
        })
      })
    },
    getUserOperationGray ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: state.requestUrl.getOperationBitConfig + '?' + formatParams(Object.assign({
            post: '1',
            platform: '5'
          }, data))
        }).then(({ data }) => {
          if (data.data.action && (data.data.data.length > 0)) {
            commit(types.SET_USER_GRAY_OPERATIONS, data.data.data, { root: true })
            resolve(true)
          } else {
            commit(types.SET_USER_GRAY_OPERATIONS, [], { root: true })
            resolve(true)
          }
        }).catch(err => {
          commit(types.SET_USER_GRAY_OPERATIONS, [], { root: true })
          resolve(true)
        })
      })
    },
    updateOperationList ({ commit, rootState }, data) {
      let operations = JSON.parse(JSON.stringify(rootState.allOperations))
      let i = 0
      for (i; i < operations.length; i++) {
        if (String(operations[i].id) === String(data.id)) {
          operations.splice(i, 1, data)
        }
      }
      commit(types.SET_ALL_OPERATIONS, operations, { root: true })
    },
    insertOperationList ({ commit, rootState }, data) {
      let operations = JSON.parse(JSON.stringify(rootState.allOperations))
      operations.unshift(data)
      commit(types.SET_ALL_OPERATIONS, operations, { root: true })
    },
    updateGrayOperationList ({ commit, rootState }, data) {
      let operations = JSON.parse(JSON.stringify(rootState.allGrayOperations))
      let i = 0
      for (i; i < operations[Number(data.modularId) - 1].list.length; i++) {
        if (String(operations[Number(data.modularId) - 1].list[i].id) === String(data.id)) {
          operations[Number(data.modularId) - 1].list.splice(i, 1, data)
        }
      }
      commit(types.SET_ALL_GRAY_OPERATIONS, operations, { root: true })
    },
    deleteGrayOperationList ({ commit, rootState }, data) {
      let operations = JSON.parse(JSON.stringify(rootState.allGrayOperations))
      let i = 0
      for (i; i < operations[Number(data.modularId) - 1].list.length; i++) {
        if (String(operations[Number(data.modularId) - 1].list[i].id) === String(data.id)) {
          operations[Number(data.modularId) - 1].list.splice(i, 1)
        }
      }
      commit(types.SET_ALL_GRAY_OPERATIONS, operations, { root: true })
    },
    insertGrayOperationList ({ commit, rootState }, data) {
      let operations = JSON.parse(JSON.stringify(rootState.allGrayOperations))
      operations[Number(data.modularId) - 1].list.unshift(data)
      commit(types.SET_ALL_GRAY_OPERATIONS, operations, { root: true })
    }
  }
}

export default moduleOperation
