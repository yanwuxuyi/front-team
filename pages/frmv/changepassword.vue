<template>
	<view class="wrap">
		<u-form :model="user" ref="uForm">
			<u-form-item label-width="140" label-position="left" label="旧密码" prop="inputoldpassword">
				<u-input :password-icon="true" :border="border" type="password" v-model="user.inputoldpassword"
					placeholder="请输入旧密码"></u-input>
			</u-form-item>
			<u-form-item label-width="140" label-position="left" label="新密码" prop="newpassword">
				<u-input :password-icon="true" :border="border" type="password" v-model="user.newpassword"
					placeholder="请输入新密码"></u-input>
			</u-form-item>
			<u-form-item label-width="140" label-position="left" label="确认新密码" prop="rnewpassword">
				<u-input :password-icon="true" :border="border" type="password" v-model="user.rnewpassword"
					placeholder="再输一次新密码"></u-input>
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
				user: {"nickname":"",
				"Phone":"",
				"oldPhone":"",
				"password":""}
			}
		},
		onLoad() {
			    const value = uni.getStorageSync('user')
				console.log('修改密码时查询的user值：',value)
				this.user.nickname=value.nickname
				this.user.phone=value.phone
				this.user.oldPhone=value.phone
				this.user.oldpassword=value.password
				},
		methods: {
			submit() {
				this.user.password=this.user.newpassword
				if (this.user.newpassword != this.user.rnewpassword) {
					this.$u.toast("两次输入密码不同")
					return
				}
				if (this.user.inputoldpassword != this.user.oldpassword) {
					this.$u.toast("旧密码错误")
					return
				}
				uni.request({
					url: 'http://192.168.1.163:8083/change',
					data: this.user,
					method: "POST",
					success: (res) => { //返回的结果（Result）对象 {"code":200,"reslut":...} 在res.data中
						if (res.data.status) { //成功修改 
						/*******更新存储的user信息*/
							const value = uni.getStorageSync('user')
							value.password=this.user.newpassword
							uni.setStorageSync('user',value)
						/*******/
							////1.https://uniapp.dcloud.net.cn/api/router.html#event-channel 
							try {
								//见：https://uniapp.dcloud.net.cn/api/storage/storage.html#setstoragesync
								let count = 2; // 倒计时的初始值

								// 定义一个函数用于更新倒计时的显示
								function updateCountdown() {
									if (count > 0) {
										uni.showToast({
											title: `${count} 秒后跳转`,
											icon: 'none',
											position: 'top',
											duration: 1000
										});
										count--;
										setTimeout(updateCountdown, 1000); // 每秒更新一次倒计时显示
									} else {
										uni.navigateBack(); // 跳转回上一页面
									}
								}

								// 在修改成功后调用这个函数开始倒计时
								updateCountdown();

							} catch (e) {
								uni.showToast({
									title: "出现错误:" + e.message,
									icon: "error",
									duration: 1000
								})
							}
						} else {
							this.$u.toast('更改失败') //提示框
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