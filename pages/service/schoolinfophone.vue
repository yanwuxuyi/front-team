<template>
	<view>
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="2" @change="change"></u-tabs>
		</view>
		<view>
			<u-image width="100%" height="1100rpx" src="/static/service/schoolinfophone.png"></u-image>
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
						name: '各部门电话'
					}
				],
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
</style>