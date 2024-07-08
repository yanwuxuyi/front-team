<template>
	<view class="container">
		<!-- 进度条 -->
		<view class="progress-bar">
			<view class="progress" :style="{ width: progressWidth }"></view>
		</view>
		<view class="step-info">
			<text v-if="currentStep === totalSteps" class="content">祝贺你完成了报道，欢迎入学！</text>
			<text v-else>第{{ currentStep }}步</text>
		</view>
		<!-- 步骤内容 -->
		<view class="step-content">
			<view v-if="currentStep === 1" class="step1">
				<view class="center-section">
					<text class="title">学院报道</text>
					<image class="image" src="/static/images/reportmap.png" mode="aspectFit"></image>
				</view>
				<view class="left-section">
					<text class="content">1.凭录取通知书、身份证核实身份。
						2.提交一寸、二寸照片若干张。
						3.领取校园—卡通。
						4.领取入学报到指引单。</text>
				</view>
			</view>
			<view v-if="currentStep === 2" class="step2">
				<view class="center-section">
					<text class="title">住宿办理</text>
					<image class="image" src="/static/images/reportmap.png" mode="aspectFit"></image>
				</view>
				<view class="left-section">
					<text class="content">1.新生凭身份证和录取通知书或校园卡到入住楼栋办理入住手续。
						2.需要让宿管阿姨在入学报到指引单上签字。</text>
				</view>
			</view>
			<view v-if="currentStep === 3" class="step3">
				<view class="center-section">
					<text class="title">财务办理</text>
					<image class="image" src="/static/images/reportmap.png" mode="aspectFit"></image>
				</view>
				<view class="left-section">
					<text class="content">1.已在重庆大学网上缴费平台完成学杂费缴纳的新生，报到流程单“财务”一栏由学院迎新点工作人员代签。
						2.未完成网上缴费的新生须到财务迎新现场办理手续。</text>
				</view>
			</view>
			<view v-if="currentStep === 4" class="step3">
				<view class="center-section">
					<text class="title">档案管理</text>
					<image class="image" src="/static/images/reportmap.png" mode="aspectFit"></image>
				</view>
				<view class="left-section">
					<text class="content">1.自带档案的新生到迎新“档案办理点”交档案并登记。
						2.其余的新生在学校迎新系统上进行自助办理手续。</text>
				</view>
			</view>
			<view v-if="currentStep === 5" class="step3">
				<view class="center-section">
					<text class="title">医院体检</text>
					<image class="image" src="/static/images/reportmap.png" mode="aspectFit"></image>
				</view>
				<view class="left-section">
					<text class="content">网上完成缴费,凭新生校园一卡通自行到A/ B/虎溪校区校医院通过读卡器识别、打印体检表，参加体检。</text>
				</view>
			</view>
			<!-- 可根据具体步骤数目添加更多内容 -->
		</view>
		<view class="nav-buttons">
			<button class="navigation-button" @click="navigateToMap" size="mini">
				<u-icon name="map" color="#ffffff" size="28"></u-icon>
				导航前往</button>
		</view>
		<!-- 上下步导航按钮 -->
		<view class="nav-buttons" v-if="currentStep < 5">
			<button @click="nextStep" :disabled="currentStep === totalSteps" size="mini">下一步</button>
		</view>
		<view class="nav-buttons" v-if="currentStep === 5">
			<button @click="complete" size="mini">完成</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
				currentStep: 1,
				totalSteps: 5, // 总步骤数，根据实际情况调整
				studentId: ''
			};
		},
		computed: {
			progressWidth() {
				return `${((this.currentStep) / (this.totalSteps)) * 100}%`;
			},
		},
		methods: {
			navigateToMap() {
				// 使用uniapp的导航功能跳转到指定页面
				uni.navigateTo({
					url: '/pages/service/map',
				});
			},
			async fetchStudentInfo() {
				// 从本地存储获取学生信息  
				const value = uni.getStorageSync('user');
				if (value && value.studentId) {
					this.studentId = value.studentId;
				} else {
					// 处理未找到学号的情况  
					uni.showToast({
						title: '未找到学号信息,请先登录！',
						icon: 'none'
					});
					// 可能需要重定向到登录或学号输入页面  
				}

				// 获取当前注册状态（可选，根据需求决定是否每次加载都调用）  
				await this.fetchCurrentStep();
			},
			async fetchCurrentStep() {
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
							title: '获取当前注册状态失败',
							icon: 'none'
						})
					}
				});
			},
			async RegisterStatus() {
				uni.request({
					url: 'http://192.168.50.101:8090/personalRegister/registerStatus',
					method: 'GET',
					data: {
						studentid: this.studentId,
						registertatus: this.currentStep
					},
					success: (res) => {
						if (res.data.status === true) {
							// 解析后端返回的数据
							this.currentStep = JSON.parse(res.data.result);
							console.log('更新后的状态数据:', this.currentStep);
						} else {
							console.error('请求失败:', res);
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '更新注册状态失败',
							icon: 'none'
						})
					}
				});
			},
			async nextStep() {
				if (this.currentStep < this.totalSteps) {
					await this.RegisterStatus();
				}
			},
			async complete() {
				uni.request({
					url: 'http://192.168.50.101:8090/personalRegister/endEmail',
					method: 'GET',
					data: {
						studentid: this.studentId
					},
					success: (res) => {
						if (res.data.status === true) {
							uni.showToast({
								title: '邮件发送成功',
								icon: 'success'
							});
						} else {
							uni.showToast({
								title: '邮件发送失败',
								icon: 'none'
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: '请求失败',
							icon: 'none'
						});
					}
				});
			},
			onLoad() {

			},
			onShow() {
				this.fetchStudentInfo(); // 页面加载时获取学生信息和当前注册状态
				console.info("当前学生学号",this.studentId)
			}
		},
	};
</script>

<style lang="scss">
	/* 样式可以根据实际需求进行调整 */
	.loading {
		margin-top: 20rpx;
		text-align: center;
	}

	.container {
		padding: 20px;
	}

	.step-info {
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		margin-bottom: 20px;
	}

	.center-section {
		padding: 20px;
		text-align: center;
	}

	.left-section {
		padding: 20px;
		text-align: left;
	}

	.title {
		font-size: 25px;
		font-weight: bold;
		margin-bottom: 25px;
		text-align: center;
	}

	.image {
		width: 100%;
		/* 图片宽度自适应 */
		height: 200px;
		/* 图片高度固定，根据需求调整 */
		margin-top: 10px;
	}

	.content {
		font-size: 16px;
		line-height: 1.5;
	}

	.progress-bar {
		background-color: #f0f0f0;
		height: 10px;
		margin-bottom: 20px;
	}

	.progress {
		height: 100%;
		background-color: #007bff;
		/* 进度条颜色 */
	}

	.step-content {
		margin-bottom: 20px;
	}

	.nav-buttons {
		display: flex;
		justify-content: space-between;
		margin-top: 10rpx;
		margin-bottom: 50rpx;
	}

	button {
		padding: 10px 20px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	button.navigation-button {
		margin-top: 10px;
	}

	button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
</style>