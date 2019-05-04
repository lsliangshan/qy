<template>
  <x-header :left-options="leftOptions">
    <div class="header_left"
         slot="overwrite-left"
         @click="openDrawer">
      <!-- <x-icon type="navicon"
              size="35"
              style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon> -->
      <svg>
        <use xlink:href="#navicon"></use>
      </svg>
    </div>
  </x-header>
</template>

<style lang="less" scoped>
.header_left {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
svg {
  width: 20px;
  height: 20px;
  fill: #c8c8c8;
}
svg.active {
  fill: @tabbar-text-active-color;
}
</style>
<script>
import { XHeader } from 'vux'
import * as types from '../../store/mutation-types'
export default {
  name: 'Headers',
  components: {
    XHeader
  },
  props: {
    showBack: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      leftOptions: {
        showBack: this.showBack
      }
    }
  },
  computed: {
    store () {
      return this.$store
    }
  },
  methods: {
    openDrawer (e) {
      // e.preventDefault()
      console.log('........')
      this.store.commit(types.OPEN_DRAWER_MODAL)
    }
  }
}
</script>
