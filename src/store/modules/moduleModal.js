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
const moduleModal = {
  namespaced: true,
  state: {
    requestParams: {
      key: '26412474748748',
      s: '1d4f0ci9e2e4d8cz591e13eiu39ok487f',
      baseUrl: 'https://capi.zhaopin.com'
    },
    requestUrl: {
      baseUrl: 'http://grayconfig.zhaopin.com'
    },
    operations: [],
    templates: [
      {
        type: 'text',
        describe: "文字版弹框",
        imgUrl: "/static/images/modals/text.jpg",
        label: "弹框-文字版",
        name: "MODAL-VV88W8J-TEXT",
        url: "",
        template: {
          title: '尊敬的用户您好',
          content: '为了更好的服务广大用户，智联招聘将于2018年10月26日晚22:00 - 2018年10月27日晚18:00进行消息系统升级，届时APP消息频道暂停服务。由此给您带来的不便敬请谅解，感谢您对智联招聘的支持。',
          bottom: '知道了',
          styles: {
            container: {
              position: 'relative',
              width: '600px',
              height: 'auto',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              overflow: 'hidden',
              // backgroundImage: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554051916426&di=44541b88897e203f7401adafd878cbf1&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fb5dba9bbf6fd891f76300a0a4b86fdac95b1e3fa21d2f-0Un97z_fw658)',
              backgroundImage: '',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              backgroundPosition: 'bottom'
            },
            top: {
              width: '100%'
            },
            title: {
              fontSize: '32px',
              color: '#282828',
              fontWeight: '400',
              textAlign: 'left',
              lineHeight: 1.5,
              textDecoration: 'none',
              padding: '54px 54px 0',
              borderStyle: '',
              borderWidth: '0px',
              borderColor: ''
            },
            content: {
              fontSize: '28px',
              color: '#282828',
              fontWeight: '300',
              textAlign: 'justify',
              lineHeight: 1.5,
              textDecoration: 'none',
              wordBreak: 'break-all',
              padding: '26px 54px 54px',
              borderStyle: '',
              borderWidth: '0px',
              borderColor: ''
            },
            bottom: {
              width: '100%',
              height: '88px',
              borderTop: '2px solid #cccccc',
              fontSize: '32px',
              lineHeight: 2.8,
              fontWeight: 'normal',
              color: '#1A8AFA',
              textAlign: 'center',
              textDecoration: 'none',
              padding: '0px',
              borderStyle: 'solid',
              borderWidth: '2px 0px 0px 0px',
              borderColor: '#cccccc'
            }
          }
        }
      },
      {
        type: 'image',
        describe: "图片版弹框",
        imgUrl: "/static/images/modals/image2.png",
        label: "弹框-图片版",
        name: "MODAL-VV66W6J-IMAGE",
        url: "",
        template: {
          bg: 'http://img09.zhaopin.cn/2012/other/mobile/weex/modals/f_bg2.png',
          btn: 'http://img09.zhaopin.cn/2012/other/mobile/weex/modals/f_btn.png',
          close: 'http://img09.zhaopin.cn/2012/other/mobile/weex/modals/f_close.png',
          styles: {
            container: {
              position: 'relative',
              width: 'auto',
              height: 'auto',
              backgroundColor: 'rgba(255, 255, 255, 0)',
              borderRadius: '6px',
              // backgroundImage: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554051916426&di=44541b88897e203f7401adafd878cbf1&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fb5dba9bbf6fd891f76300a0a4b86fdac95b1e3fa21d2f-0Un97z_fw658)',
              backgroundImage: '',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              backgroundPosition: 'bottom',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            },
            bgContainer: {
              position: 'relative',
              left: '0px',
              top: '0px',
              marginLeft: '0px',
              marginTop: '0px',
              width: '533px',
              height: '678px'
            },
            bg: {
              width: '533px',
              height: '678px'
            },
            btnContainer: {
              position: 'absolute',
              width: '533px',
              height: '51px',
              left: '0px',
              top: '653px',
              marginLeft: '0px',
              marginTop: '0px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            },
            btn: {
              width: '238px',
              height: '51px'
            },
            closeContainer: {
              position: 'absolute',
              width: '80px',
              height: '80px',
              left: '453px',
              top: '0px',
              marginLeft: '0px',
              marginTop: '0px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-end'
            },
            close: {
              width: '36px',
              height: '36px'
            }
          }
        }
      }
    ]
  },
  getters: {
  },
  actions: {
    get ({ state, commit }) {
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
    }
  }
}

export default moduleModal
