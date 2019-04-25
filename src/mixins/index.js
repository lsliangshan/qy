export default {
  methods: {
    calcToRealPx (px, isVertical) {
      const BODY_WIDTH = document.documentElement.clientWidth
      const BODY_HEIGHT = document.documentElement.clientHeight
      // 将750设计图上的尺寸 转变为 真实尺寸
      if (!isVertical) {
        return parseFloat(px * BODY_WIDTH / 750)
      } else {
        return parseFloat(px * BODY_HEIGHT / 1334)
      }
    }
  }
}
