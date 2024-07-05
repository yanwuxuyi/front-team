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
					<a href="https://mp.weixin.qq.com/s/Cxy-fLEHFil0vn2cjJDsnQ" target="_blank">
						<view class="u-body-item-title u-line-2">
						萌新指南 | 虎溪校区本科新生报道攻略请查收！
						</view>
					</a>
					<image src="../../static/images/Aquzhengdamen.jpg" ></image>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<a target="_blank" href="https://mp.weixin.qq.com/s/6REoGvM4viPteMh7BNezww">
						<view class="u-body-item-title u-line-2">
							虎溪校区失物招领联系方式
						</view>
					</a>
					<image src="../../static/images/Aqudiwujiaoxuelou.jpg" ></image>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<a target="_blank" href="https://mp.weixin.qq.com/s/vUTP_mo4PcSym9RknyLTjw">
						<view class="u-body-item-title u-line-2">
							你今天要吃什么？答案全在这里！
		
						</view>
					</a>
					<image src="../../static/images/shitang.jpg" ></image>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<a target="_blank" href="https://mp.weixin.qq.com/s/jVXZ9xWN_CAH6jAATS0N9A">
						<view class="u-body-item-title u-line-2">
							热辣滚烫 | 快来体验虎溪校区体育中心！
						</view>
					</a>
					<image src="../../static/images/tiyuzhongxin.jpg" ></image>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<a target="_blank" href="https://mp.weixin.qq.com/s/5DACN6FtbPVCbSJB_0_aRw">
						<view class="u-body-item-title u-line-2">
							一起来看！他们丰富多彩的社会实践
						</view>
					</a>
					<image src="../../static/images/shehuishijian.jpg" ></image>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<a target="_blank" href="https://mp.weixin.qq.com/s/8-J6Yg8QiHTB4K34iRHgnA">
						<view class="u-body-item-title u-line-2">
							虎溪用“新”盼你回“家”啦！
						</view>
					</a>
					<image src="../../static/images/yinxing.jpg" ></image>
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
				subTitle: '2024-09-01',
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
					'background-image': 'linear-gradient(45deg, rgb(44, 168, 187), rgb(166, 197, 198))'
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
				// #endif
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
		background-image: linear-gradient(45deg, rgb(44, 168, 187), rgb(166, 197, 198));
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
