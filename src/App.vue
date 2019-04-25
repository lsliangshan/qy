<template>
  <div id="app"
       @touchmove="touchmove">
    <div class="home_router_container">
      <!--<transition :name="transitionName">-->
      <!--<router-view name="HomeRouter"></router-view>-->
      <!--</transition>-->
      <!--<transition :name="transitionName" :css="!isBack || (isBack && !isTouchMove)">-->
      <!--<keep-alive>-->
      <!--<router-view name="HomeRouter" class="Router" v-if="$route.meta.keepAlive"></router-view>-->
      <!--</keep-alive>-->
      <!--</transition>-->

      <!--<transition :name="transitionName" :css="!isBack || (isBack && !isTouchMove)">-->
      <!--<router-view name="HomeRouter" class="Router" v-if="!$route.meta.keepAlive"></router-view>-->
      <!--</transition>-->

      <transition :name="transitionName"
                  :css="cssFlag">
        <navigation>
          <router-view name="HomeRouter"
                       class="Router"></router-view>
        </navigation>
      </transition>
    </div>

    <all-svg></all-svg>

    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import { Loading } from 'vux'
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left',
      isBack: false,
      navigationType: '',
      isTouchMove: false,
      touchMoveTimeout: null
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    cssFlag () {
      if (this.navigationType === 'forward' || this.navigationType === 'back') {
        return !this.isTouchMove
      } else {
        return false
      }
    }
  },
  created () {
    // this.$http.get('http://grayconfig.zhaopin.com/grayconfig/cmsappversion/getVersionGroup').then(({data}) => {
    //   console.log('........', data)
    // })
  },
  mounted () {
    const that = this
    this.$navigation.on('forward', (to, from) => {
      // alert('forward')
      that.navigationType = 'forward'
      that.transitionName = 'slide-left'
    })
    this.$navigation.on('back', (to, from) => {
      // alert('back')
      that.navigationType = 'back'
      that.transitionName = 'slide-right'
    })
  },
  methods: {
    touchmove (e) {
      this.isTouchMove = true
    }
  },
  watch: {
    '$route' (to, from) {
      if (!from.meta.index || (to.meta.index === from.meta.index)) {
        this.transitionName = ''
      }
      setTimeout(() => {
        this.isTouchMove = false
      }, 1)
      // let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
      // this.isBack = (to.meta.index < from.meta.index)
      // if (isBack) {
      //   this.transitionName = 'slide-right'
      //   // from.meta.keepAlive = false
      //   // to.meta.keepAlive = true
      //   // console.log('退后不缓存from' + JSON.stringify(from.path))
      //   // console.log('退后缓存to' + JSON.stringify(to.path))
      // } else {
      //   from.meta.keepAlive = true
      //   to.meta.keepAlive = false
      //   // console.log('前进缓存from' + JSON.stringify(from.path))
      //   // console.log('前进不缓存to' + JSON.stringify(to.path))
      //   if (!from.meta.index) {
      //     this.transitionName = ''
      //   } else {
      //     if (to.meta.index > from.meta.index) {
      //       this.transitionName = 'slide-left'
      //     } else {
      //       this.transitionName = 'slide-right'
      //     }
      //   }
      // }
      // this.$router.isBack = false
    }
  },
  components: {
    AllSvg: () => import('./components/svgs.vue'),
    Loading
  }
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
* {
  margin: 0;
  padding: 0;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
*:not(input, textarea) {
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
html,
body {
  height: 100%;
}
body {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #fbf9fe;
}
#app {
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #fbf9fe;
}
.home_router_container {
  width: 100%;
  height: 100%;
  /*height: calc(~"100% - 53px");*/
}
a {
  text-decoration: none;
}
.weui-cells:after {
  border-bottom: 1px solid #f5f5f5 !important;
}
.weui-cells:before {
  border-top: none !important;
}

.gap_12 {
  width: 100%;
  height: 12px;
}
.gap_24 {
  width: 100%;
  height: 24px;
}
.pen {
  pointer-events: none;
}
.ml8 {
  margin-left: 8px;
}
.custom_active:active {
  opacity: 0.7;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  /*opacity: 0;*/
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  /*opacity: 0;*/
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  /*opacity: 0;*/
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  /*opacity: 0;*/
  transform: translate3d(-100%, 0, 0);
}

/*.slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active {*/
/*transition: transform .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
/*}*/
/*!*.slide-right-enter {*!*/
/*!*transform: translate3d(0%, 0, 0);*!*/
/*!*}*!*/
/*!*.slide-left-leave {*!*/
/*!*transform: translate3d(0%, 0, 0);*!*/
/*!*}*!*/
/*.slide-left-enter {*/
/*transform: translate3d(-100%, 0, 0);*/
/*}*/
/*.slide-right-leave {*/
/*transform: translate3d(100%, 0, 0);*/
/*}*/
</style>
