/***
 **                                                          _ooOoo_
 **                                                         o8888888o
 **                                                         88' . '88
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
 **                                              .'' '< `.___\_<|>_/___.' >'''.
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
import axios from 'axios'
// import utils from '../utils'
const querystring = require('querystring')
const instance = axios.create({
  timeout: 3000
})
const noop = function () { }
export const actions = {
  async [types.LOGIN] ({ commit, state }, data) {
    let callback = noop
    let error = noop
    if (data.callback) {
      callback = data.callback
      delete data.callback
    }
    if (data.error) {
      error = data.error
      delete data.error
    }
    let loginData = await instance({
      method: 'post',
      baseURL: state.requestInfo.baseUrl,
      url: state.requestInfo.login,
      data: querystring.stringify(data)
    })
    if (loginData.config) {
      delete loginData.config
    }
    if (loginData.status === 200) {
      callback(loginData.data)
    } else {
      error(loginData)
    }
  },
  async [types.REGISTER] ({ commit, state }, data) {
    let callback = noop
    let error = noop
    if (data.callback) {
      callback = data.callback
      delete data.callback
    }
    if (data.error) {
      error = data.error
      delete data.error
    }
    let registerData = await instance({
      method: 'post',
      baseURL: state.requestInfo.baseUrl,
      url: state.requestInfo.register,
      data: querystring.stringify(data)
    })
    if (registerData.config) {
      delete registerData.config
    }
    if (registerData.status === 200) {
      callback(registerData.data)
    } else {
      error(registerData)
    }
  },
  [types.AJAX] ({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      let params = Object.assign({}, data)
      if (params.url === '') {
        reject(new Error('url不能为空'))
      }
      // 自动添加token,phonenum
      if (!params.data.token) {
        params.data.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoibHMifSwiaWF0IjoxNTU1Njk3MjQ0LCJleHAiOjE1NTYzMDIwNDR9.LFLLF169rRiTOVE9XFBtU17s-b7CA_9-UTLBWdEseYw' || state.loginInfo.token
      }
      if (!params.data.phonenum) {
        params.data.phonenum = '18000000000' || state.loginInfo.phonenum
      }
      instance({
        method: params.method || 'post',
        baseURL: params.baseUrl || state.requestInfo.baseUrl,
        url: params.url,
        data: querystring.stringify(params.data)
      }).then((res) => {
        if (res.config) {
          delete res.config
        }
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  [types.AJAX_FORM] ({ state }, data) {
    return new Promise((resolve, reject) => {
      let params = Object.assign({}, data)
      if (params.url === '') {
        reject(new Error('url不能为空'))
      }
      let formData = new FormData()
      formData.append('file', params.data.file)
      if (params.data.hasOwnProperty('file')) {
        delete params.data.file
      }
      for (let p in params.data) {
        if (params.data.hasOwnProperty(p)) {
          formData.append(p, params.data[p])
        }
      }
      // 自动添加token,phonenum
      if (!params.data.token) {
        formData.append('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoibHMifSwiaWF0IjoxNTU1Njk3MjQ0LCJleHAiOjE1NTYzMDIwNDR9.LFLLF169rRiTOVE9XFBtU17s-b7CA_9-UTLBWdEseYw')
        // params.data.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoibHMifSwiaWF0IjoxNTU1Njk3MjQ0LCJleHAiOjE1NTYzMDIwNDR9.LFLLF169rRiTOVE9XFBtU17s-b7CA_9-UTLBWdEseYw' || state.loginInfo.token
      }
      if (!params.data.phonenum) {
        formData.append('phonenum', '18000000000')
        // params.data.phonenum = '18000000000' || state.loginInfo.phonenum
      }
      instance({
        method: params.method || 'post',
        baseURL: params.baseUrl || state.requestInfo.baseUrl,
        url: params.url,
        data: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        if (res.config) {
          delete res.config
        }
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  [types.AJAX2] ({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      let params = Object.assign({}, data)
      if (params.url === '') {
        reject(new Error('url不能为空'))
      }
      instance({
        method: params.method || 'post',
        baseURL: params.baseUrl || state.requestInfo.baseUrl,
        url: params.url,
        data: querystring.stringify(params.data)
      }).then((res) => {
        if (res.config) {
          delete res.config
        }
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取用户信息
  async [types.GET_USER_INFO] ({ commit, state }, data) {
    let callback = noop
    let error = noop
    if (data.callback) {
      callback = data.callback
      delete data.callback
    }
    if (data.error) {
      error = data.error
      delete data.error
    }
    let userData = await instance({
      method: 'post',
      baseURL: state.requestInfo.baseUrl,
      url: state.requestInfo.getUserInfo,
      data: querystring.stringify(data)
    })
    if (userData.config) {
      delete userData.config
    }
    if (userData.status === 200) {
      callback(userData.data)
    } else {
      error(userData)
    }
  },
  // 更新用户信息
  async [types.UPDATE_USER_INFO] ({ commit, state }, data) {
    let callback = noop
    let error = noop
    if (data.callback) {
      callback = data.callback
      delete data.callback
    }
    if (data.error) {
      error = data.error
      delete data.error
    }
    let userData = await instance({
      method: 'post',
      baseURL: state.requestInfo.baseUrl,
      url: state.requestInfo.updateUserInfo,
      data: querystring.stringify(data)
    })
    if (userData.config) {
      delete userData.config
    }
    if (userData.status === 200) {
      callback(userData.data)
    } else {
      error(userData)
    }
  },
  // 修改密码
  async [types.MODIFY_PASSWORD] ({ commit, state }, data) {
    let callback = noop
    let error = noop
    if (data.callback) {
      callback = data.callback
      delete data.callback
    }
    if (data.error) {
      error = data.error
      delete data.error
    }
    let userData = await instance({
      method: 'post',
      baseURL: state.requestInfo.baseUrl,
      url: state.requestInfo.modifyPassword,
      data: querystring.stringify(data)
    })
    if (userData.config) {
      delete userData.config
    }
    if (userData.status === 200) {
      callback(userData.data)
    } else {
      error(userData)
    }
  },
  // async [types.SEND_MESSAGE] ({commit, state}, data) {
  //   let _from = {
  //     phonenum: state.loginInfo.phonenum,
  //     username: state.loginInfo.username,
  //     role: state.loginInfo.role
  //   }
  //   let _to = {
  //     username: state.robot.name,
  //     id: state.robot.id
  //   }
  //   let _message = Object.assign({}, data)
  //
  //   let _data = {
  //     from: _from,
  //     to: _to,
  //     message: _message
  //   }
  //   state.socket.client.emit(state.socket.event, _data)
  // },
  async [types.SEND_MESSAGE] ({ commit, state }, data) {
    let _from = {
      phonenum: state.loginInfo.phonenum,
      username: state.loginInfo.username,
      role: state.loginInfo.role
    }
    let _to = {
      username: state.robot.name,
      id: state.robot.id
    }
    let _message = Object.assign({}, data.data)

    let _data = {
      from: _from,
      to: _to,
      message: _message
    }
    return new Promise((resolve, reject) => {
      let params = Object.assign({}, data)
      if (params.url === '') {
        reject(new Error('url不能为空'))
      }
      instance({
        method: 'post',
        baseURL: params.baseUrl || state.requestInfo.baseUrl,
        url: params.url,
        data: querystring.stringify({
          id: state.robot.id,
          type: 'command',
          data: JSON.stringify(_data)
        })
      }).then((res) => {
        if (res.config) {
          delete res.config
        }
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}
