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
export const actions = {
  [types.AJAX] ({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      let params = Object.assign({}, data)
      console.log('...params: ', params)
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
  }
}
