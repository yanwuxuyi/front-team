<template>
	<view class="u-wrap">
		<view>
			<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="isFixed" :is-back="isBack"
				:background="background" :back-text-style="{color: '#fff'}" :title="title1"
				:back-icon-name="backIconName" :back-text="backText">
				<view class="slot-wrap">
					<view class="map-wrap" v-if="custom">
						<u-icon name="map" color="#ffffff" size="24"></u-icon>
						<text class="map-wrap-text">重庆大学虎溪校区</text>
					</view>
				</view>
				<view class="right-slot">
					<text class="weather-text">{{currentWeather}}</text>
					<image :src="weatherIcon" class="weather-icon" @click="showWeather"></image>
				</view>
			</u-navbar>
		</view>
		<view>
			<u-swiper :height="300" :list="slideshowlist" :effect3d="true" :interval="4000"></u-swiper>
		</view>
		<view 滚动通知 class="center">
			<u-toast :type="type" ref="uToast"></u-toast>
			<u-notice-bar :autoplay="true" :playState="play" :speed="160" :mode="horizontal" :type="warning"
				:list="this.infoList" :moreIcon="false" :volumeIcon="true" :duration="2000" :isCircular="true">
			</u-notice-bar>
		</view>
		<view 倒计时 class="center" style="background-color: #dbffe7;">
			<text>\n距离报道截止还有：</text>
			<u-count-down :timestamp="timeStamp" :separator="separator" :showDays="false"
				:separator-color="separatorColor" :fontSize="30" :color="color" bg-color="rgb(250, 250, 250)"
				@end="end">
			</u-count-down>
			<text>\n已经报道</text>
			<u-count-to :autoplay="true" :startVal="0" :endVal="endVal" :duration="10000" :bold="true"
				style="fontSize:110% ; color: lightgreen;"></u-count-to>
			<text>人\n\n</text>
		</view>
		<view>
			<uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
				<uni-popup-share title="小功能"></uni-popup-share>
			</uni-popup>
		</view>
		<view>
			<u-row :justify="justify" @click="rowClick">
				<u-col :span="span" :offset="offset" stop>
					<u-card style="background-color: #65d1ff;" class="style1" @click="goInform()" :title="titley"
						:thumb="thumby" :padding="paddingy" :border="bordery" :head-border-bottom="hbby"
						:foot-border-top="fbty">
						<view class="" slot="body">
							<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
								<view class="u-body-item-title u-line-2">
									请认真查看报道须知
								</view>
							</view>
						</view>
					</u-card>
				</u-col>
				<u-col :span="span" :offset="offset" @click="click" stop>
					<u-card style="background-color: #c4ff97;" class="style1" @click="goFlow()" :title="titlez"
						:thumb="thumbz" :padding="paddingz" :border="borderz" :head-border-bottom="hbbz"
						:foot-border-top="fbtz">
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
					<u-card style="background-color: #ffd249;" class="style1" @click="goCollect()" :title="titlex"
						:thumb="thumbx" :padding="paddingx" :border="borderx" :head-border-bottom="hbbx"
						:foot-border-top="fbtx">
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
					<u-card style="background-color: #ffc69c;" class="style1" @click="goReport()" :title="titlev"
						:thumb="thumbv" :padding="paddingz" :border="borderz" :head-border-bottom="hbbz"
						:foot-border-top="fbtz">
						<view class="" slot="body">
							<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
								<view class="u-body-item-title u-line-2">
									请跟随引导完成注册流程
								</view>
							</view>
						</view>
					</u-card>
				</u-col>
			</u-row>
		</view>
		<view @click="goAnotherPage" class="floating-icon">
			<u-icon name="chat" size="40" color="#c7ddff"></u-icon>
		</view>
		<view class="step-container">
			<view v-for="(step, index) in steps" :key="index" class="step-item"
				:class="{'active': index === currentStep - 1, 'completed': index < currentStep-1}">
				<text>{{ step.label }}</text>
				<view v-if="index === currentStep-1" class="step-dot active"></view>
				<view v-else class="step-dot"></view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				steps: [{
						label: '学院报道'
					},
					{
						label: '住宿办理'
					},
					{
						label: '财务办理'
					},
					{
						label: '档案管理'
					},
					{
						label: '医院体检'
					}
				],
				currentStep: 0, // 初始步骤  
				studentId: '',
				currentWeather: '',
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
					'background-image': 'linear-gradient(45deg, rgb(44, 168, 187), rgb(166, 197, 198))'
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
				infoList: ['test'],
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
						image: '/static/images/slideshowpic/Aquyidalou.png',
						title: 'A区一大楼'
					},
					{
						image: '/static/images/slideshowpic/tushuguan.png',
						title: '图书馆'
					},
					{
						image: '/static/images/slideshowpic/xinxilou.png',
						title: '信息大楼'
					},
					{
						image: '/static/images/slideshowpic/zhujiaoxuelou.png',
						title: '主教学楼'
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
				titlev: '报道流程',
				thumbv: '../../static/images/reportlogo.png',
				paddingx: 20,
				borderx: false,
				hbbx: false,
				fbtx: false
			}
		},
		computed: {
			weatherIcon() {
				console.log('选择：' + this.currentWeather);
				switch (this.currentWeather) {
					case '晴':
						return '../../static/icon/sun.png';
					case '大雨':
						return '../../static/icon/bigrain.png';
					case '大暴雨':
						return '../../static/icon/bigrain.png';
					case '雷阵雨':
						return '../../static/icon/rerain.png';
					case '中雨':
						return '../../static/icon/rain.png';
					case '小雨':
						return '../../static/icon/rain.png';
					case '多云':
						return '../../static/icon/cloud.png';
					default:
						return '../../static/icon/cloud.png';
				}
			},
		},
		onShow() {
			this.initStatus();
			this.fetchNotice();
			console.info('当前通知如下', this.infoList)
		},
		onLoad() {
			uni.request({
				url: 'http://192.168.50.101:8090/count/countRegisterStudent',
				success: (res) => {
					console.log(res);
					if (res.statusCode = 200) {
						this.endVal = res.data.result.count;
					}
				}
			})
			// uni.request({
			// 	url: 'http://192.168.1.163:8083/countNumber',
			// 	success: (res) => { //返回的结果（Result）对象 {"code":200,"reslut":...} 在res.data中
			// 			this.endVal=res.data
			// 	}
			// });
			// uni.navigateTo({
			// 	url: '/pages/frmv/webView?url=' + 'https://v.xiumi.us/stage/v5/6q26F/465620607'
			// })

			// uni.navigateTo({
			// 	url: '/pages/frmv/webrouterspecial?url=' + encodeURIComponent('https://v.xiumi.us/stage/v5/6q26F/465620607')
			// })
			uni.request({
				url: 'http://192.168.50.101:8090/utils/weather',
				success: (res) => {
					console.log(res);
					if (res.statusCode = 200) {
						this.currentWeather = res.data.showapi_res_body.hourList[0].weather;
						console.log(this.currentWeather);
					}
				}
			})
			this.calculateTime();
		},
		methods: {
			fetchNotice() {
				uni.request({
					url: 'http://192.168.50.101:8090/web/hannouncement', // 替换为您的后端接口URL  
					success: (res) => {
						if (res.data) {
							// 假设后端返回的数据结构中有data字段包含通知列表  
							this.infoList = [res.data.result];

						} else {
							uni.showToast({
								title: '获取通知失败',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '网络请求失败',
							icon: 'none'
						});
					}
				});
			},
			initStatus() {
				const value = uni.getStorageSync('user');
				if (value && value.studentId) {
					this.studentId = value.studentId;
					// 假设 getRegisterStatus 是一个异步函数，这里用 setTimeout 模拟异步调用  
					setTimeout(() => {
						// 假设 getRegisterStatus 返回当前步骤索引（0-4）  
						const registerStatus = this.getRegisterStatus(this.studentId) - 1; // 你需要实现这个函数  
						this.currentStep = registerStatus;
					}, 10);
				}
			},
			getRegisterStatus(studentId) {
				uni.request({
					url: 'http://192.168.50.101:8090/personalRegister/getRegisterStatus',
					method: 'GET',
					data: {
						studentid: this.studentId
					},
					success: (res) => {
						if (res.data.status === true) {
							// 解析后端返回的数据
							this.currentStep = JSON.parse(res.data.result);
							console.log('目前状态数据:', this.currentStep);
						} else {
							console.error('请求失败:', res);
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '获取当前报道注册状态失败',
							icon: 'none'
						})
					}
				});
				return res.data.result;
			},
			showWeather() {
				uni.navigateTo({
					url: '../index/weather' // 替换为你实际的页面路径
				});
			},
			goAnotherPage() {
				uni.navigateTo({
					url: '../index/test2' // 替换为你实际的页面路径
				});
			},
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
				} else {
					this.showToast()
				}
			},
			goReport() {
				const value = uni.getStorageSync('user')
				if (value) {
					uni.navigateTo({
						url: '../frmv/stepOfReport'
					})
				} else {
					this.showToast()
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
	.step-container {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 20px;
	}

	.step-item {
		text-align: center;
		position: relative;
		flex: 1;
	}

	.step-item text {
		color: #999;
	}

	.step-item.active text,
	.step-item.completed text {
		color: #333;
		font-weight: bold;
	}

	.step-dot {
		height: 20px;
		width: 20px;
		border-radius: 50%;
		background-color: #ccc;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -25px;
	}

	.step-dot.active {
		background-color: #409EFF;
	}

	.step-item.completed .step-dot {
		background-color: #2ECC71;
	}

	.floating-icon {
		position: fixed;
		bottom: 80px;
		right: 10px;
		width: 50px;
		height: 50px;
		background-color: #007aff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
		z-index: 1000;
		cursor: pointer;
	}

	.center {
		justify-content: center;
		text-align: center;
	}

	.style1 {
		width: 100%;
	}

	.text {
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

	.weather-icon {
		width: 30px;
		height: 30px;
		cursor: pointer;
	}

	.map-wrap {
		display: flex;
		align-items: center;
		padding: 4px 6px;
		background-color: rgba(240, 240, 240, 0.35);
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

	.weather-text {
		margin-right: 6px;
		/* 控制文本和图标之间的间距 */
		color: #ffffff;
		/* 设置文本颜色 */
	}

	.right-slot {
		display: flex;
		align-items: center;
		margin-right: 10px;
		/* 添加右边距，控制图标位置 */
	}
</style>