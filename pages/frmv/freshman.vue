<template>
	<view>
		<view>
			<u-navbar title-color="#fff" back-icon-color="#ffffff"
				:is-fixed="isFixed" :is-back="isBack" 
				:background="background" 
				:back-text-style="{color: '#fff'}" :title="title1" 
				:back-icon-name="backIconName" :back-text="backText"
				:border-bottom="false" @click="goIndex()()">
			</u-navbar>
		</view>
	<view class="u-card-wrap">
		<u-card @click="click" @head-click="headClick" :title="title" :sub-title="subTitle" :thumb="thumb" :padding="padding" :border="border">
			<view class="" slot="body"> 
				<view class="u-body-item u-flex u-bottom-line u-row-between u-p-b-0">
					<a href="https://mp.weixin.qq.com/s/qD8g6-D7Rv8xgxF1iCk3vQ" target="_blank">
						<view class="u-body-item-title u-line-2">
							新生报到重要事项
						</view>
					</a>
					<image src="../../static/images/freshman1.png" ></image>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<a target="_blank" href="https://mp.weixin.qq.com/s?__biz=MzI5NzA1NTU0NA==&mid=2649761510&idx=1&sn=bc6f04a8926db2c52d17ecd627c39f36&chksm=f4be62b1c3c9eba71a2e6ef2ab81e11b1773400c6500149af164a81635cc8a70ab18c9ee0dae&mpshare=1&scene=23&srcid=0901im3xDPvO0hkUGhQbs7s6&sharer_sharetime=1630555110768&sharer_shareid=afddb2a189ad1c69af7761445de86f46#rd">
						<view class="u-body-item-title u-line-2">
							开学反诈第一课
						</view>
					</a>
					<image src="../../static/images/freshman2.jpg" ></image>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<a target="_blank" href="https://mp.weixin.qq.com/s?__biz=MzI5NzA1NTU0NA==&mid=2649761510&idx=1&sn=bc6f04a8926db2c52d17ecd627c39f36&chksm=f4be62b1c3c9eba71a2e6ef2ab81e11b1773400c6500149af164a81635cc8a70ab18c9ee0dae&mpshare=1&scene=23&srcid=0901im3xDPvO0hkUGhQbs7s6&sharer_sharetime=1630555110768&sharer_shareid=afddb2a189ad1c69af7761445de86f46#rd">
						<view class="u-body-item-title u-line-2">
							大学四年怎么过？
						</view>
					</a>
					<image src="../../static/images/freshman3.png" ></image>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<a target="_blank" href="https://mp.weixin.qq.com/s?__biz=MzA5MTU2MTcwNw==&mid=2653075216&idx=1&sn=272ae1254af40f10dfa9c9e603c24f32&chksm=8bac9c94bcdb15827906a1517ad0c489c8cbad5db968411cc09078a21364853bca588a7ef849&mpshare=1&scene=23&srcid=0709cHvvIIuMlq4Sy79csnPF&sharer_sharetime=1688870160150&sharer_shareid=5306b883ad10f322e13ece419cc5f3f5#rd">
						<view class="u-body-item-title u-line-2">
							新生选课大礼包
						</view>
					</a>
					<image src="../../static/images/freshman4.jpg" ></image>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<a target="_blank" href="https://mp.weixin.qq.com/s?__biz=MzA5MTU2MTcwNw==&mid=2653077806&idx=1&sn=03cf12b2232424d33ce3a505a257404a&chksm=8baceaaabcdb63bc3fe33135ce2f30c139f9bb3d6d94f7b9b7940e7ac614daa30204df7b6942&mpshare=1&scene=23&srcid=0709FxFwdZDcjmFYzHG5qLzp&sharer_sharetime=1688870044301&sharer_shareid=5306b883ad10f322e13ece419cc5f3f5#rd">
						<view class="u-body-item-title u-line-2">
							舌尖上的虎溪食堂
						</view>
					</a>
					<image src="../../static/images/freshman5.png" ></image>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<a target="_blank" href="https://mp.weixin.qq.com/s?__biz=MzA5MTU2MTcwNw==&mid=2653083340&idx=1&sn=ba6278a80481ff0e218d1cc939b36f94&chksm=8bacfd48bcdb745e63682dadf52a0668a34c726f2afcc2073ba3793d451d490252574114f1d7&mpshare=1&scene=23&srcid=0709qSefhHWHIxhceHHFAIPl&sharer_sharetime=1688870083028&sharer_shareid=5306b883ad10f322e13ece419cc5f3f5#rd">
						<view class="u-body-item-title u-line-2">
							虎溪校园的体育设施
						</view>
					</a>
					<image src="../../static/images/freshman6.jpg" ></image>
				</view>
			</view>
		</u-card>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '新生入学指南',
				subTitle: '2023-09-01',
				thumb: '',
				padding: 50,
				bottomSlot: false,
				border: false,
				//
				// 顶部导航栏
				title1: '入学指南',
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
			goIndex() {
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	a:link {
		color: black;
		text-decoration: none;
	}
	a:visited {
		color: black;
		text-decoration: none;
	}
	
	page {
		background-image: linear-gradient(90deg, rgb(118, 187, 187), rgb(156, 198, 130));
	}
	
	.u-card-wrap {
		padding: 1px;
	}
	
	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 0rpx;
	}
		
	.u-body-item image {
		width: 200rpx;
		flex: 0 0 180rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 150rpx;
	}
</style>
