<template>
	<view>
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="1" @change="change"></u-tabs>
		</view>
		<view>
			<u-image width="100%" height="1100rpx" src="/static/service/schoolbus/schoolbus2.jpg"></u-image>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '去老校区'
				}, {
					name: '去新校区'
				}],
				current: 0
			};
		},
		onLoad() {},
		methods: {
			change(index) {
				console.log(index);
				this.current = index; // 更新当前选中的标签索引
				switch (index) {
					case 0:
						// 跳转到去老校区
						uni.navigateTo({
							url: '/pages/service/schoolbus'
						});
						break;
					case 1:
						// 跳转到去新校区
						uni.navigateTo({
							url: '/pages/service/schoolbus2'
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