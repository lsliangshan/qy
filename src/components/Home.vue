<template>
  <div class="home_container">
    <drawer :show.sync="drawer.shown"
            :drawer-style="{width: '200px'}"
            :show-mode="drawer.showMode">
      <drawer-content slot="drawer"></drawer-content>
      <div class="router_container">
        <router-view name="ContentRouter"></router-view>
      </div>
    </drawer>

    <greeting :hide="pageLoaded"
              @finish="greetingFinished">
    </greeting>
    <!--
                <view-box
                body-padding-bottom="53px">
        <ls-scroll class="main_scroll_container"
                   :options="scrollOptions">
          <router-view name="ContentRouter"></router-view>
        </ls-scroll>
        <div class="bottom_tabbars_container"
             slot="bottom">
          <rqq-tabbars></rqq-tabbars>
        </div>
        </view-box> -->
  </div>
</template>
<style scoped>
.home_container {
  width: 100%;
  height: 100%;
  background-color: lavender;
}
.main_scroll_container {
  width: 100%;
  height: 100%;
}
.bottom_tabbars_container {
  width: 100%;
  height: 53px;
}
.router_container {
  width: 100%;
  height: 100%;
}
</style>
<script>
import { ViewBox, Drawer } from 'vux'
import DrawerContent from './parts/Drawers.vue'
export default {
  name: 'Home',
  components: {
    Greeting: () => import('./Greeting.vue'),
    RqqTabbars: () => import('./RqqTabbars.vue'),
    LsScroll: () => import('./plugins/LsScroll/LsScroll.vue'),
    ViewBox,
    Drawer,
    DrawerContent
  },
  data () {
    return {
      pageLoaded: false,
      scrollOptions: {
        scrollbar: false
      }
    }
  },
  computed: {
    store () {
      return this.$store
    },
    drawer () {
      return this.store.state.drawer
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {

      }, 500)
    })
  },
  methods: {
    greetingFinished () {
      this.pageLoaded = true
      this.$router.replace({
        name: 'Index'
      })
    }
  }
}
</script>
