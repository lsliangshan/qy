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

Vue.use(Vuex)

const store = new Vuex.Store({
  actions: actions.actions,
  mutations: mutations.mutations,
  getters: getters.getters,
  state: {
    username: 'ls',
    author: '智愚',
    appName: 'RQQ WX',
    fullAppName: 'RQQ',
    shortAppName: 'R',
    tabbars: [
      {
        name: 'activity',
        text: '活动',
        pathName: 'ActivityIndex',
        path: '/activity/index'
      },
      {
        name: 'course',
        text: '课程',
        pathName: 'CourseIndex',
        path: '/course/index'
      },
      {
        name: 'profile',
        text: '我的',
        pathName: 'ProfileIndex',
        path: '/profile/index'
      }
    ],
    assets: {
      maleAvatar: '/static/images/avatar_male_1.jpg',
      femaleAvatar: '/static/images/avatar_female_1.jpg'
    },
    requestInfo: {
    },
    isLoading: false, // 页面是否在加载中
    loginInfo: {'username': 'ls', 'phonenum': '18000000001', 'email': '', 'nickname': '前端开荒牛', 'headIcon': 'https://static.dei2.com/plugins_admin/img/upload_dacaabf0a8bd16a5d24bc2feb7f0dbdc.png', 'lastLoginTime': '1526375120974', 'lastLoginIp': '', 'birthday': '1515922620952', 'gender': 1, 'website': '', 'status': 1, 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoibHMifSwiaWF0IjoxNTI2OTc0NzY3LCJleHAiOjE1Mjc1Nzk1Njd9.20AF6k9X9wR-_C4ZmRLcY5JWGWkDWAWNLkixbH8mu14', 'plugins': '', 'role': 3, 'createdAt': '2018-01-14T09:55:13.000Z', 'updatedAt': '2018-05-15T09:05:20.000Z'},
    needlessLogin: ['Login', 'Register', 'Forget', 'ActivityPreview', 'ArticleList', 'ArticleView'] // 不需要登录的页面
  }
})

export default store

global.store = store
