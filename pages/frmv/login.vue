<template>
	<view>
		<image style="width: 430px; height: 350px; background-color: #eeeeee;" :src="picsrc">
        <u-form :model="user"   ref="uForm"  > 
			<u-form-item   left-icon="account" label-width="120" label="学号" prop="studentId">
				<u-input  placeholder="请输入学号" v-model="user.studentId" type="text"></u-input>
			</u-form-item> 
			<u-form-item   left-icon="lock" label-width="120"  label="密码" prop="password">
				<u-input :password-icon="true"   type="password" v-model="user.password" placeholder="请输入密码"></u-input>
			</u-form-item>
		</u-form> 
		<u-button @click="submit" shape="circle">提交</u-button>
		<u-button @click="goRegiter" shape="circle">注册</u-button>
		<view :class="{'forgot-password': true, 'clicked': isClicked}" @click="forgotPassword">忘记密码</view></view>
</template>

<script>
	export default {
		data() {
			return {
				isClicked:false,
				picsrc:'../../static/images/cqulogo.png',
				user: {
					'studentId': '',
					'password': '' 
				},
				rules: {
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
				}]
				}
			}
		},	
		onReady() {
		            this.$refs.uForm.setRules(this.rules);
		        },
				methods: {
							forgotPassword(){
								uni.navigateTo({
										url: '/pages/frmv/forgotPassword'
									  });
							},
							submit(){				 
								uni.request({
								    url: 'http://192.168.50.101:8090/auth/login',  
								    data: this.user,
									method:"POST",
								    success: (res) => {//返回的结果（Result）对象 {"code":200,"reslut":...} 在res.data中
									console.log(res);
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
.forgot-password {
  margin: 10px 0;
  width: 100%;
  color: #007bff;
  text-align: left;
  cursor: pointer;
}

.forgot-password:hover {
  text-decoration: underline;
}

.clicked {
  color: blue;
  text-decoration: underline;
}
.test2 {
	background-image: url('https://i.postimg.cc/h4rNfC2m/QQ-20230708115228.png');
}
</style>