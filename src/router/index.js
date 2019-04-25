import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// export const ProfilePages = {
//   path: '/profile/detail',
//   meta: {
//     title: '个人信息',
//     index: 2
//   },
//   components: {
//     HomeRouter: () => import('../components/profile/Detail.vue')
//   }
// }

export const ProfilePages = [
  {
    path: '/profile/detail',
    meta: {
      title: '个人信息',
      index: 2
    },
    components: {
      HomeRouter: () => import('../components/profile/Detail.vue')
    }
  },
  {
    path: '/profile/detail/headicon',
    name: 'DetailHeadIcon',
    meta: {
      title: '头像',
      index: 3
    },
    components: {
      HomeRouter: () => import('../components/profile/detail/HeadIcon.vue')
    }
  }
]

export const HomeRouter = {
  path: '/',
  name: 'Home',
  meta: {
    title: 'RQQ',
    index: 1
  },
  components: {
    HomeRouter: () => import('../components/Home.vue')
  },
  children: [
    {
      path: '/activity',
      redirect: '/activity/index'
    },
    {
      path: '/activity/index',
      name: 'ActivityIndex',
      meta: {
        title: '热门活动',
        index: 1
      },
      components: {
        ContentRouter: () => import('../components/activity/Index.vue')
      }
    },
    {
      path: '/course',
      redirect: '/course/index'
    },
    {
      path: '/course/index',
      name: 'CourseIndex',
      meta: {
        title: '精彩课程',
        index: 1
      },
      components: {
        ContentRouter: () => import('../components/course/Index.vue')
      }
    },
    {
      path: '/profile',
      redirect: '/profile/index'
    },
    {
      path: '/profile/index',
      name: 'ProfileIndex',
      meta: {
        title: '个人中心',
        index: 1
      },
      components: {
        ContentRouter: () => import('../components/profile/Index.vue')
      }
    }
  ]
}

export const page404 = {
  path: '/*',
  name: 'NotFound',
  meta: {
    title: 'oooooooops...'
  },
  components: {
    HomeRouter: () => import('../components/pages/P404.vue')
  }
}

window.addEventListener('popstate', function (e) {
  Router.isBack = true
}, false)

export default new Router({
  mode: 'history',
  routes: [
    HomeRouter,
    ...ProfilePages,
    page404
  ]
})
