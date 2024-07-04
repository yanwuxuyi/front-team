<template>  
  <view class="container">  
    <scroll-view class="scroll-container" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">  
      <view class="content">  
        <!-- 其他内容 -->  
      </view>  
      <image  
        class="avatar"  
        :style="{ transform: `translateY(${avatarPosition}px)` }"  
        src="your-avatar-url.jpg"  
        @touchstart.stop.prevent  
        @touchmove.stop.prevent  
      ></image>  
    </scroll-view>  
  </view>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      startY: 0, // 触摸开始时的Y坐标  
      touchMoveY: 0, // 触摸移动时的Y坐标  
      avatarPosition: 500, // 头像的初始位置（假设屏幕高度足够大）  
      isDragging: false, // 是否正在拖动  
    };  
  },  
  methods: {  
    handleTouchStart(e) {  
      this.startY = e.touches[0].clientY;  
      this.isDragging = true;  
    },  
    handleTouchMove(e) {  
      if (!this.isDragging) return;  
      this.touchMoveY = e.touches[0].clientY - this.startY;  
      // 限制拖动范围，这里只向上拖动  
      if (this.avatarPosition + this.touchMoveY >= 0) {  
        this.avatarPosition += this.touchMoveY;  
      }  
    },  
    handleTouchEnd() {  
      this.isDragging = false;  
      // 如果需要，可以在这里添加逻辑将头像“吸附”到顶部或某个位置  
    },  
  },  
};  
</script>  
  
<style scoped>  
.container {  
  height: 100%;  
  overflow: hidden; /* 防止外部滚动 */  
}  
  
.scroll-container {  
  height: 100%;  
  overflow-y: auto; /* 允许垂直滚动 */  
  position: relative;  
}  
  
.avatar {  
  position: absolute;  
  bottom: 0; /* 初始位置在最下方 */  
  width: 100px; /* 假设头像宽度 */  
  height: 100px; /* 假设头像高度 */  
  transition: transform 0.3s ease; /* 平滑过渡效果 */  
}  
  
/* 其他样式 */  
</style>