<template>
	<view>
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<view v-if="current">
			校训
			<image src="https://www.cqu.edu.cn/images/d-arrow-next1.png"></image>
			<image src="https://www.cqu.edu.cn/images/d-bg2.jpg"></image>
		</view>
		<view v-else>
			学校简介
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
						index=1;
						break;
					case 1:
						index=0;
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


