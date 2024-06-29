<template>
	<view class="wrap">
		<u-form :model="user" ref="uForm">
			<u-form-item label-width="140" label-position="left" label="昵称" prop="nickname">
				<u-input :border="border" placeholder="请输入昵称" v-model="user.nickname" type="text"></u-input>
			</u-form-item>
			<u-form-item label-width="140" label-position="left" label="电话" prop="nickname">
				<u-input :border="border" placeholder="请输入电话" v-model="user.phone" type="text"></u-input>
			</u-form-item>
			<u-form-item label-width="140" label-position="left" label="密码" prop="password">
				<u-input :password-icon="true" :border="border" type="password" v-model="user.password"
					placeholder="请输入密码"></u-input>
			</u-form-item>
			<u-form-item label-width="140" label-position="left" label="确认密码" prop="rpassword">
				<u-input :password-icon="true" :border="border" type="password" v-model="user.rpassword"
					placeholder="再输一次密码"></u-input>
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				border: true,
				user: {}
			}
		},
		methods: {
			submit() {
				if (this.user.password != this.user.rpassword) {
					this.$u.toast("两次输入密码不同")
					return
				}
				uni.request({
					url: 'http://192.168.1.163:8083/signup',
					data: this.user,
					method: "POST",
					success: (res) => { //返回的结果（Result）对象 {"code":200,"reslut":...} 在res.data中
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
										uni.navigateBack(); // 跳转回登录页面
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
			},
			radioChange(e) {
				//console.log(e.detail)
				this.user.leibie = e.detail.value
			}
		}
	}
</script>

<style>

</style>