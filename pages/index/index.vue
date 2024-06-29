<template>
	<view class="u-wrap">
		<view>
			<u-navbar title-color="#fff" back-icon-color="#ffffff"
				:is-fixed="isFixed" :is-back="isBack" 
				:background="background" 
				:back-text-style="{color: '#fff'}" :title="title1" 
				:back-icon-name="backIconName" :back-text="backText">
				<view class="slot-wrap">
				<view class="map-wrap" v-if="custom">
					<u-icon name="map" color="#ffffff" size="24"></u-icon>
					<text class="map-wrap-text">重庆大学虎溪校区</text>
				</view>
				</view>
			</u-navbar>
		</view>
		<view>
			<u-swiper :height="300" :list="slideshowlist" :effect3d="true" :interval="4000"></u-swiper>
		</view>
		<view 滚动通知 class="center">
			<u-toast :type="type" ref="uToast"></u-toast>
			<u-notice-bar 
			:autoplay="true" 
			:playState="play" 
			:speed="160"
			:mode="horizontal" 
			:type="warning" 
			:list="infoList"
			:moreIcon="false" 
			:volumeIcon="true" 
			:duration="2000" 
			:isCircular="true">
			</u-notice-bar>
		</view>
		<view 倒计时 class="center" style="background-color: #fcffd3;">
			<text>\n距离报道截止还有：</text>
			<u-count-down 
			:timestamp="timeStamp" 
			:separator="separator" 
			:showDays="false"
			:separator-color="separatorColor" 
			:fontSize="30" 
			:color="color"  
			bg-color="rgb(250, 250, 250)"
			@end ="end">
			</u-count-down>
			<text>\n已经报道</text>
			<u-count-to
				:autoplay="true"
				:startVal="0"
				:endVal="endVal"
				:duration="10000"
				:bold="true"
				style="fontSize:130%"
			></u-count-to> 
			<text>人\n\n</text>
		</view>
		<view>
			<uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
				<uni-popup-share title="小功能"></uni-popup-share>
			</uni-popup>
		</view>
		<view >
			<u-row :justify="justify" @click="rowClick">
				<u-col :span="span" :offset="offset" stop>
					<u-card style="background-color: #65d1ff;" class="style1" @click="goInform()" :title="titley" :thumb="thumby" :padding="paddingy" :border="bordery"
						:head-border-bottom="hbby" :foot-border-top="fbty">
						<view  class="" slot="body">
							<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
								<view class="u-body-item-title u-line-2">
									请认真查看报道须知
								</view>
							</view>
						</view>
					</u-card>
				</u-col>
				<u-col :span="span" :offset="offset" @click="click" stop>
					<u-card style="background-color: #c4ff97;" class="style1" @click="goFlow()" :title="titlez" :thumb="thumbz" :padding="paddingz" :border="borderz"
						:head-border-bottom="hbbz" :foot-border-top="fbtz">
						<view class="" slot="body">
							<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
								<view class="u-body-item-title u-line-2">
									请查收你的入学指南
								</view>
							</view>
						</view>
					</u-card>
				</u-col>
				<u-col :span="span" :offset="offset" @click="click" stop>
					<u-card style="background-color: #ffd249;" class="style1" @click="goCollect()" :title="titlex" :thumb="thumbx" :padding="paddingx" :border="borderx"
						:head-border-bottom="hbbx" :foot-border-top="fbtx">
						<view class="" slot="body">
							<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
								<view class="u-body-item-title u-line-2">
									请认真核对并填写个人信息
								</view>
							</view>
						</view>
					</u-card>
				</u-col>
				<u-col :span="span" :offset="offset" @click="click" stop>
					<u-card style="background-color: #ffc69c;" class="style1" @click="goService()" :title="titlev" :thumb="thumbv" :padding="paddingz" :border="borderz"
						:head-border-bottom="hbbz" :foot-border-top="fbtz">
						<view class="" slot="body">
							<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
								<view class="u-body-item-title u-line-2">
									内含多个功能帮助新生适应新环境
								</view>
							</view>
						</view>
					</u-card>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 倒计时
				timeStamp: '86400',
				// 滚动数字
				endVal: '0',
				// 顶部导航栏
				title1: '首页',
				backText: '返回',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				useSlot: false,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(118, 187, 187), rgb(156, 198, 130))'
				},
				isBack: false,
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
				// 布局
				span: 5.5,
				offset: 0,
				justify: 'start',
				// 消息提示
				type: 'error',
				title: '请先登录',
				icon: true,
				position: 'center',
				url: '',
				duration: 2000,
				// 倒计时
				separator: 'zh',
				color: '#00aa7f',  
				separatorColor: '#02140b',
				// 滚动通知
				warning: 'warning',
				play: 'play',
				horizontal: 'horizontal',
				infoList: ['欢迎广大新同学加入重庆大学的大家庭！请各位新同学注意报道截止时间，尽快完成报道，并在小程序中完成信息收集。'],
				// 弹窗
				popup: false,
				mode: 'bottom',
				mask: true, // 是否显示遮罩
				closeable: true,
				closeIconPos: 'top-right',
				// 底部导航栏
				bgColor: '#ffd8f6',
				tabbarList: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						customIcon: false,
					},
					{
						iconPath: "grid",
						selectedIconPath: "grid-fill",
						customIcon: false,
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						customIcon: false,
					},
					],
					inactiveColor: '#bababa',
					activeColor: '#fff2d7',
					// 模块列表
				slideshowlist: [{
						image: '/static/images/slideshowpic/1.jpg',
						title: '迎新大会'
					},
					{
						image: '/static/images/slideshowpic/2.PNG',
						title: '图书馆指南'
					},
					{
						image: '/static/images/slideshowpic/3.PNG',
						title: '校园萌宠'
					}
				],
				titley: '报道须知',
				thumby: '../../static/images/inform.png',
				paddingy: 20,
				bordery: false,
				hbby: false,
				fbty: false,
				titlez: '入学指南',
				thumbz: '../../static/images/flow.png',
				paddingz: 20,
				borderz: false,
				hbbz: false,
				fbtz: false,
				titlex: '信息采集',
				thumbx: '../../static/images/collect.png',
				paddingx: 20,
				borderx: false,
				hbbx: false,
				fbtx: false,
				titlev: '服务中心',
				thumbv: '../../static/images/grid.png',
				paddingx: 20,
				borderx: false,
				hbbx: false,
				fbtx: false
			}
		},
		onLoad() {
			uni.request({
				url: 'http://192.168.1.163:8083/countNumber',
				success: (res) => { //返回的结果（Result）对象 {"code":200,"reslut":...} 在res.data中
						this.endVal=res.data
				}
			});
			this.calculateTime();
		},
		
		methods: {
		
			imageError() {

			},
			thumbChange(index) {
				this.thumb = index == 0 ? 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg' : '';
			},
			paddingChange(index) {
				this.padding = [20, 30, 40][index];
			},
			bottomChange(index) {
				this.bottomSlot = !index;
			},
			borderChange(index) {
				this.border = !index;
			},
			click(index) {
				console.log(index);
			},
			goInform() {
				uni.navigateTo({
					url: '../frmv/report'
				})
			},
			goFlow() {
				uni.navigateTo({
					url: '../frmv/freshman'
				})
			},
			goCollect() {
				const value = uni.getStorageSync('user')
				if (value) {
					uni.navigateTo({
						url: '../frmv/collect'
					})
				}
				else {
					this.showToast()
				}
			},
			goService() {
				const value = uni.getStorageSync('user')
				if (value) {
					this.$refs.share.open()
				}
				else {
					this.showToast()
					this.$refs.share.open()
				}
			},
			showToast() {
				this.$refs.uToast.show({
					title: this.title,
					position: this.position,
					type: 'error',
					icon: this.icon,
					url: this.url,
					duration: this.duration,
				});
			},
			calculateTime() {
            var targetTimestamp = 1689070000000;
            var currentDate = new Date(); // 获取当前日期
			var currentTimestamp = currentDate.getTime()
            var timeDiff = targetTimestamp - currentTimestamp; // 计算目标日期和当前日期的时间差（毫秒）
			this.timeStamp = Math.floor(timeDiff / 1000); // 将时间差转换为秒数
			}
		}
	}
</script>

<style scoped lang="scss">
	.center {
		justify-content: center;
		text-align: center;
	}
	.style1{
		width: 100%;
	}
	.text{
		font-size: 40rpx;
	}
	.wrap {
			padding: 40rpx;
		}
	.u-demo {
		padding-top: 0;
	}

	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
		display: flex;
		justify-content: flex-start;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
	
	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
	}
	
	.map-wrap {
		display: flex;
		align-items: center;
		padding: 4px 6px;
		background-color: rgba(240,240, 240, 0.35);
		color: #fff;
		font-size: 22rpx;
		border-radius: 100rpx;
		margin-left: 30rpx;
	}
	
	.buttonStyle {
		width: 130rpx;
		height: 130rpx;
		top: 70rpx;
		
	}
	
	.popupStyle {
		color-scheme: #352f7f;
		border-color: #352f7f;
		color: #352f7f;
	}
</style>