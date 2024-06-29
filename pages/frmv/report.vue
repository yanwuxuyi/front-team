<template>
	<view >
		<view>
			<u-navbar title-color="#fff" back-icon-color="#ffffff"
				:is-fixed="isFixed" :is-back="isBack" 
				:background="background" 
				:back-text-style="{color: '#fff'}" :title="title1" 
				:back-icon-name="backIconName" :back-text="backText"
				:border-bottom="false" @click="back()">
			</u-navbar>
		</view>
		<view >
			<u-image  width="100%" height="1100rpx" src="../../static/images/报道须知1.png"></u-image>
		</view>
		<view >
			<u-image  width="100%" height="1100rpx" src="../../static/images/报道须知2.png"></u-image>
		</view>
		<view >
			<u-image  width="100%" height="1100rpx" src="../../static/images/报道须知3.png"></u-image>
		</view>
		<view >
			<u-image  width="100%" height="1100rpx" src="../../static/images/报道须知4.png"></u-image>
		</view>
		<view >
			<u-image  width="100%" height="1100rpx" src="../../static/images/报道须知5.png"></u-image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 顶部导航栏
				title1: '报道须知',
				backText: '首页',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				useSlot: false,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(118, 187, 187), rgb(156, 198, 130))'
				},
				isBack: true,
				search: false,
				custom: true,
				isFixed: true,
				keyword: '',
				// #ifdef MP
				slotRight: false,
				// #endif
				// #ifndef MP
				slotRight: true,
			}
		},
		methods: {
			back() {
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.photo {
		display: flex;
	}
</style>