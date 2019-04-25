<template>
  <div class="rqq_tabbars_container">
    <tabbar>
      <tabbar-item v-for="(tab, index) in tabbars" :key="tab.name" :selected="(defaultSelectedIndex === index)" @on-item-click="tabbarClick">
        <svg slot="icon">
          <use :xlink:href="'#' + tab.name"></use>
        </svg>
        <svg slot="icon-active" class="active">
          <use :xlink:href="'#' + tab.name"></use>
        </svg>
        <span slot="label" v-text="tab.text"></span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<style scoped lang="less">
 .rqq_tabbars_container {
   width: 100%;
   height: 100%;
 }
 svg {
   width: 27px;
   height: 27px;
   fill: #c8c8c8;
 }
  svg.active {
    fill: @tabbar-text-active-color;
  }
</style>
<script>
  import { Tabbar, TabbarItem } from 'vux'
  export default {
    name: 'RqqTabbars',
    data () {
      return {
        tabbars: this.$store.state.tabbars,
        defaultSelectedIndex: 1
      }
    },
    computed: {
      theme () {
        return this.$store.state.theme
      }
    },
    methods: {
      tabbarClick (e) {
        this.$router.replace({
          name: this.tabbars[Number(e)].pathName
        })
      },
      findItemByPathName (name) {
        let outIndex = -1
        let i = 0
        let tabbars = this.tabbars
        for (i; i < tabbars.length; i++) {
          if (name === tabbars[i].pathName) {
            outIndex = i
            i = tabbars.length
          }
        }
        return outIndex
      }
    },
    created () {
      if (this.$route.name === 'Home') {
        this.$router.replace({
          name: this.tabbars[this.defaultSelectedIndex].pathName
        })
      }
    },
    mounted () {
      this.defaultSelectedIndex = this.findItemByPathName(this.$route.name)
    },
    watch: {
      '$route' (val) {
        this.defaultSelectedIndex = this.findItemByPathName(this.$route.name)
      }
    },
    components: {
      Tabbar,
      TabbarItem
    }
  }
</script>
