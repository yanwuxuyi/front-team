<template>
	<view>
		<image style="width: 430px; height: 350px; background-color: #eeeeee;" :src="picsrc">
        <u-form :model="user"   ref="uForm"  > 
			<u-form-item   left-icon="account" label-width="120" label="电话" prop="phone">
				<u-input  placeholder="请输入电话" v-model="user.phone" type="text"></u-input>
			</u-form-item> 
			<u-form-item   left-icon="lock" label-width="120"  label="密码" prop="password">
				<u-input :password-icon="true"   type="password" v-model="user.password" placeholder="请输入密码"></u-input>
			</u-form-item>
		</u-form> 
		<u-button @click="submit" shape="circle">提交</u-button>
		<u-button @click="goRegiter" shape="circle">注册</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				picsrc:'../../static/images/cqulogo.png',
				user: {
					'phone': '',
					'password': '' 
				} 
			}
		},	
				methods: {
							submit(){				 
								uni.request({
								    url: 'http://192.168.1.163:8083/login',  
								    data: this.user,
									method:"POST",
								    success: (res) => {//返回的结果（Result）对象 {"code":200,"reslut":...} 在res.data中
								       if(res.data.status){//成功登录
										    try {
												//见：https://uniapp.dcloud.net.cn/api/storage/storage.html#setstoragesync
										    	uni.setStorageSync('user', res.data.result); //将用户对象本地存储 以便后续身份识别 权限验证等
												uni.navigateBack() //登录成功返回 我的个人信息页面  
												console.log('登录成功，储存的user值为：',res.data.result)
										    } catch (e) {
										    	this.$u.toast('身份信息格式异常') 
										    } 							
									   }else{
										   this.$u.toast('登录失败，用户名密码错误')  //提示框
									   }
								    }
								}); 				 
							},
							
							
							goRegiter(){
											uni.navigateTo({
												url:"/pages/frmv/register"
											})
							 }
						}
	}
</script>

<style>
.u-demo-area{
	cursor: pointer;
}

.test2 {
	background-image: url('https://i.postimg.cc/h4rNfC2m/QQ-20230708115228.png');
}
</style>