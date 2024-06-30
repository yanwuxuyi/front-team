<template>
	<view class="wrap">
		<u-form :model="model" ref="uForm">
			<u-form-item label-width="140" label-position="left" label="名字" prop="name">
				<u-input :border="border" placeholder="请输入名字" v-model="model.name" type="text"></u-input>
			</u-form-item>
			<u-form-item label-width="140" label-position="left" label="电话" prop="phone">
				<u-input :border="border" placeholder="请输入电话" v-model="model.phone" type="text"></u-input>
			</u-form-item>
			<u-form-item label-width="140" label-position="left" label="学号" prop="studentId">
				<u-input :password-icon="true" :border="border" type="studentId" v-model="model.studentId"
					placeholder="请输入学号"></u-input>
			</u-form-item>
			<u-form-item label-width="140" label-position="left" label="密码" prop="password">
			<u-input :password-icon="true" :border="border" type="password" v-model="model.password" placeholder="请输入密码"></u-input>
           </u-form-item>
			<u-form-item label-width="140" label-position="left" label="确认密码" prop="rpassword">
				<u-input :password-icon="true" :border="border" type="password" v-model="model.rpassword"
					placeholder="再输一次密码"></u-input>
			</u-form-item>
			<view class="form-container">
			    <u-form-item class="left-aligned" label-width="140" label-position="left" label="验证码" prop="verficationcode">
			      <u-input :password-icon="true" :border="border" type="verficationcode" v-model="model.verficationcode"
			        placeholder="请输入验证码"></u-input>
			    </u-form-item>
			    <view class="wrap1">
			      <u-toast ref="uToast"></u-toast>
			      <u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
			      @change="codeChange"></u-verification-code>
			      <u-button @tap="getCode">{{tips}}</u-button>
			    </view>
			  </view>
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				tips: '',
				// refCode: null,
				seconds: 100,
				border: true,
				model: {
					name:"",
					phone:"",
					studentId:"",
					password:"",
					verficationcode:""
				},
				rules: {
				        name: [
				          { required: true, message: '请输入名字', trigger: 'blur' }
				        ],
				        phone: [
				          { required: true, message: '请输入电话', trigger: 'blur' },
				          { pattern: /^1[3-9]\d{9}$/, message: '电话号码格式不正确', trigger: 'blur' }
				        ],
				        studentId: [
				          { required: true, message: '请输入学号', trigger: 'blur' }
				        ],
				        password: [
				        {
				                required: true,
				                message: '请输入密码',
				                trigger: ['change','blur'],
				        },
				        {
				                // 正则不能含有两边的引号
				                pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/, // 修改后的正则表达式  
				                message: '需同时含有字母和数字，长度在6-12之间',
				                trigger: ['change','blur'],
				        }
				                            ],
				        rpassword: [
				          { required: true, message: '请再次输入密码', trigger: 'blur' },
				          { validator: (rule, value, callback) => {
				              if (value !== this.model.password) {
				                callback(new Error('两次输入密码不一致'));
				              } else {
				                callback();
				              }
				            }, trigger: 'blur'
				          }
				        ],
				        verficationcode: [
				          { required: true, message: '请输入验证码', trigger: 'blur' }
				        ]
				      }
			}
		},
		
		onReady() {
		            this.$refs.uForm.setRules(this.rules);
		        },
		methods: {
			codeChange(text) {
							this.tips = text;
						},
						getCode() {
							if(this.$refs.uCode.canGetCode) {
								// 模拟向后端请求验证码
								uni.showLoading({
									title: '正在获取验证码'
								})
								uni.request({
									url: 'http://192.168.50.101:8090/auth/sendVerfication',
									data: {
									    name: this.model.name,
									    phone: this.model.phone,
									    studentId: this.model.studentId
									  },
									method: "POST",
									success: (res) => {
										console.log(res);
										if (res.statusCode == 200) {
											try{
												console.log("验证码获取成功");
												setTimeout(() => {
													uni.hideLoading();
													// 这里此提示会被this.start()方法中的提示覆盖
													this.$u.toast('验证码已发送');
													// 通知验证码组件内部开始倒计时
													this.$refs.uCode.start();
												}, 2000);
											}catch (e) {
								uni.showToast({
									title: "出现错误:" + e.message,
									icon: "error",
									duration: 1000
								})
							}
										}else {
												this.$u.toast('验证码发送失败') //提示框
											}
									}
								})
								
							} else {
								this.$u.toast('倒计时结束后再发送');
							}
						},
						end() {
							this.$u.toast('倒计时结束');
						},
						start() {
							this.$u.toast('倒计时开始');
						
					},
			submit() {
				if (this.model.password != this.model.rpassword) {
					this.$u.toast("两次输入密码不同")
					return
				}
				uni.request({
					url: 'http://192.168.50.101:8090/auth/register',
					data: this.model,
					method: "POST",
					success: (res) => { //返回的结果（Result）对象 {"code":200,"reslut":...} 在res.data中
						console.log(res);
						if (res.data.status) { //成功登录 
							////1.https://uniapp.dcloud.net.cn/api/router.html#event-channel 
							try {
								//见：https://uniapp.dcloud.net.cn/api/storage/storage.html#setstoragesync
								let count = 2; // 倒计时的初始值

								// 定义一个函数用于更新倒计时的显示
								function updateCountdown() {
									if (count > 0) {
										uni.showToast({
											title: `${count} 秒后跳转回登录页面`,
											icon: 'none',
											position: 'top',
											duration: 1000
										});
										count--;
										setTimeout(updateCountdown, 1000); // 每秒更新一次倒计时显示
									} else {
										uni.navigateTo({
											url:"/pages/frmv/login"
										}) // 跳转回登录页面
									}
								}

								// 在注册成功后调用这个函数开始倒计时
								updateCountdown();

							} catch (e) {
								uni.showToast({
									title: "出现错误:" + e.message,
									icon: "error",
									duration: 1000
								})
							}
						} else {
							this.$u.toast('注册失败，请更换用户名尝试') //提示框
						}
					}
				});
			}
		}
	}
</script>

<style>
.form-container {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.left-aligned {
  text-align: left;
}

.wrap1 {
  margin-left: 20px; /* 根据需要调整间距 */
}
.wrap {
        padding: 30rpx;
    }
</style>