<template>
	<view>
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="1" @change="change"></u-tabs>
		</view>
		<view class="container">
			<!-- 校训部分 -->
			<view class="section">
				<text class="title">校训</text>
				<image class="image" src="/static/service/xiaoxun.jpg" mode="aspectFit"></image>
				<text class="content">耐劳苦、尚俭朴、勤学业、爱国家</text>
			</view>
		
			<!-- 校风部分 -->
			<view class="section">
				<text class="title">校风</text>
				<image class="image" src="/static/service/xiaofeng.png" mode="aspectFit"></image>
				<text class="content">团结、勤奋、求实、创新</text>
			</view>
		
			<!-- 学风部分 -->
			<view class="section">
				<text class="title">学风</text>
				<image class="image" src="/static/service/xuefeng.jpg" mode="aspectFit"></image>
				<text class="content">求知、求精、求实、求新</text>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '学校简介'
				}, {
					name: '校训校风学风'
				},
				{
					name:'各部门电话'
				}],
				current: 1
			};
		},
		onLoad() {},
		methods: {
			change(index) {
				console.log(index);
				this.current = index; // 更新当前选中的标签索引
				switch (index) {
					case 0:
						// 跳转校训
						uni.navigateTo({
							url: '/pages/service/schoolinfo'
						});
						break;
					case 1:
						// 跳转
						uni.navigateTo({
							url: '/pages/service/schoolinfoxiaoxun'
						});
						break;
					case 2:
							// 跳转
							uni.navigateTo({
								url: '/pages/service/schoolinfophone'
							});
							break;
					default:
						// 默认操作
						break;
				}

			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
	}
	
	.section {
		margin-bottom: 20px;
		width: 90%;
		/* 控制每一部分的宽度 */
		text-align: center;
	}
	
	.title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
	}
	
	.image {
		width: 100%;
		/* 图片宽度自适应 */
		height: 200px;
		/* 图片高度固定，根据需求调整 */
		margin-bottom: 10px;
	}
	
	.content {
		font-size: 16px;
		line-height: 1.5;
	}
</style>


