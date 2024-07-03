<template>
	<view>
		<u-tabs :list="list" :is-scroll="false" :current="2" @change="change"></u-tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
									name: '帖子'
								}, {
									name: '热点'
								}, {
									name: '我的',
									count: 5
								}],
								current: 0
			}
		},
		methods: {
			change(index) {
			      this.current = index;  // 更新当前选中的标签索引
			      switch(index) {
			        case 0:
			          // 跳转到首页
					uni.switchTab({
                      url: '/pages/forum/index',
                      success: function (res) {
                       //console.log("跳转成功");
                      },
                      fail: function (err) {
                        //console.error("跳转失败", err);
                      }
                    });
			          break;
			        case 1:
			          // 跳转到论坛
			          uni.navigateTo({
			            url: '/pages/forum/forum'
			          });
			          break;
			        case 2:
			          // 跳转到关于页面
			          uni.navigateTo({
			            url: '/pages/forum/me'
			          });
			          break;
			        default:
			          // 默认操作
			          break;
			      }
			    
			  },
		}
	}
</script>

<style>

</style>
