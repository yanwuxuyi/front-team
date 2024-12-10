<template>
	<view>
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
			<view v-if="current">
				<u-image width="100%" height="1100rpx" src="/static/service/schoolbus/schoolbus2.jpg"></u-image>
			</view>
			<view v-else>
				<u-image width="100%" height="1100rpx" src="/static/service/schoolbus/schoolbus1.jpg"></u-image>
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
						index = 1;
					case 1:
						index = 0;
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