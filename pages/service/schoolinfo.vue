<template>
	<view>
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="0" @change="change"></u-tabs>
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
					name: '校训'
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


