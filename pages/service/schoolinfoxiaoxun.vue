<template>  
  <view class="container">  
    <!-- 背景图片 -->  
    <image class="background-image" src="../../static/images/报道须知2.png" mode="aspectFill"></image>  
    <!-- 滚动蒙版容器 -->  
		<scroll-view class="scroll-mask" scroll-y="true">  
		  <!-- 蒙版 -->  
		  <view class="text-mask">  
			<!-- 文字内容 -->  
			<text class="text-content">这里是需要滚动的文字内容...</text>  
			<!-- 可以继续添加更多内容 -->  
		  </view>
		</scroll-view>  
  </view>  
</template>  
  
<style lang="scss" scoped>  
.container {  
  position: relative;  
  width: 100%;  
  height: 100%; /* 或者指定一个具体的高度 */  
  overflow: hidden; /* 防止滚动穿透 */  
}  
  
.background-image {  
  position: absolute;  
  top: 0;  
  left: 0;  
  width: 100%;  
  height: 100%;  
  z-index: 0; /* 确保背景在蒙版之下 */  
}  
  
.scroll-mask {  
  position: absolute;  
  top: 0;  
  left: 0;  
  width: 100%;  
  height: 100%; /* 或者根据需要调整 */  
  overflow-y: auto; /* 允许垂直滚动 */  
  z-index: 1; /* 确保蒙版在背景之上 */  
  padding: 20px; /* 为蒙版内容提供内边距 */  
  box-sizing: border-box; /* 确保内边距不会增加容器的总宽度和高度 */  
}  
  
.text-mask {  
  background-color: rgba(255, 255, 255, 0.5); /* 白色半透明背景 */  
  border-radius: 10px; /* 可选，为蒙版添加圆角 */  
  padding: 10px; /* 蒙版内部的内边距 */  
}  
  
.text-content {  
  color: #333; /* 文字颜色 */  
  font-size: 16px; /* 文字大小 */  
  /* 其他文字样式 */
}  
</style>