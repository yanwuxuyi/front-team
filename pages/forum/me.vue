<template>
	<view>
		<u-tabs :list="list" :is-scroll="false" :current="2" @change="change"></u-tabs>
		<view v-if="account">
			这里写登录后我的界面，其他地方是未登录状态下的界面,这里我随便写了个居中
		</view>
		<view v-else>
			<view class="holecontainer">
				<view class="wrongcircle">
					<u-icon name="close-circle" size="162" color="#ff9c4a"></u-icon>
				</view>
				<text class="wrongnormal">请先登录</text>
				
			</view>
				
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account:'',
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
		onShow()
		{
			this.account='';
			const value10 = uni.getStorageSync('user');
			if(value10.id)
			{
				console.log('当前用户',value10.id);
				this.account=value10.id;
				
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
	.holecontainer {
		flex-direction: column;
	  display: flex;  
	  justify-content: center; /* 水平居中 */  
	  align-items: center; /* 垂直居中 */  
	  height: 20vh; /* 占据整个视窗的高度 */  
	  padding: 80px 100px 0;
	}  
	.wrongcircle {
		background-color: #ff3437;
		border-radius: 100px;
		width: 80px;
		height: 80px;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
	}
	
	.wrongnormal {
		color: #fc1433;
		font-size: 20px;
		margin-top: 10px;
	}
</style>
