<template>
	<view class="wrap">
		<u-form :model="user" ref="uForm">
			<u-input v-show="false"  v-model="user.id" type="text"></u-input>
			<u-form-item label-width="140" label-position="left" label="昵称" prop="nickname">
				<u-input :border="border" placeholder="请输入昵称" v-model="user.nickname" type="text"></u-input>
			</u-form-item>
			<u-form-item label-width="140" label-position="left" label="电话" prop="phone">
				<u-input :password-icon="true" :border="border" type="text" v-model="user.phone"
					placeholder="请输入电话"></u-input>
			</u-form-item>
		</u-form>
		<u-button @click="goChangepassword()">修改密码</u-button>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				border: true,
				user: { "nickname":"",
				"Phone":"",
				"oldPhone":"",
				"password":""} 
			}
		},
		
		onLoad() { 
			    const value = uni.getStorageSync('user')
				this.user.nickname=value.nickname
				console.log('查到储存的user值为：',value)
				this.user.phone=value.phone
				this.user.oldPhone=value.phone
				this.user.password=value.password
				},
		
		methods: {
			submit() {
								uni.request({
								    url: 'http://192.168.1.163:8083/change',  
								    data: this.user,
									method:"POST",
								    success: (res) => {//返回的结果（Result）对象 {"code":200,"reslut":...} 在res.data中
									console.log(res.data)
								       if(res.data.status){//成功 
									   /********更新存储的user信息*/
									   	const value = uni.getStorageSync('user')
									   	value.nickname=this.user.nickname
										value.phone=this.user.phone
									   	uni.setStorageSync('user',value)
									   /*******/
									   ////1.https://uniapp.dcloud.net.cn/api/router.html#event-channel 
									     uni.navigateBack() //返回  						  
									   }else{
										   this.$u.toast('修改失败，请更换用户名尝试')  //提示框
									   }
								    }
								}); 
			},
			radioChange(e) {
				//console.log(e.detail)
			   this.user.leibie = e.detail.value
			},
			goChangepassword(){
				uni.navigateTo({
					url:'/pages/frmv/changepassword'
				})
			}
		}
	}
</script>

<style>

</style>