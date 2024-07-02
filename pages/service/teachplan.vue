<template>
	<view>
		<image style="width: 430px; height: 350px; background-color: #eeeeee;" :src="picsrc">
        <view class="teachplan-header">
        	<text>培养方案查询入口</text>
        </view>
		<u-form :model="user"   ref="uForm"  > 
			<u-form-item   left-icon="account" label-width="120" label="学号" prop="studentId">
				<u-input  placeholder="请输入学号" v-model="user.studentId" type="text"></u-input>
			</u-form-item> 
		</u-form> 
		<u-button @click="submit" shape="circle">提交</u-button>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				isClicked:false,
				picsrc:'../../static/images/cqulogo.png',
				user: {
					'studentId': '',
				},
				rules: {
				studentId: [
				  { required: true, message: '请输入学号', trigger: 'blur' }
				]
				}
			}
		},	
		onReady() {
		            this.$refs.uForm.setRules(this.rules);
		        },
				methods: {
							submit(){				 
								uni.request({
								    url: 'http://192.168.50.101:8090/major/getCourseByName',  
								    data: this.user,
									method:"GET",
								    success: (res) => {//返回的结果（Result）对象 {"code":200,"reslut":...} 在res.data中
									console.log(res);
								       if(res.data.status){//成功查询
										    try {
										    	uni.setStorageSync('user', res.data.result); //将用户对象本地存储 
												uni.navigateBack() //登录成功返回 我的个人信息页面  
												console.log('登录成功，状态码为：',res.data.code)
												console.log('登录成功，储存的user值为：',res.data.result)
										    } catch (e) {
										    	this.$u.toast('身份信息格式异常') 
										    } 							
									   }else{
										   this.$u.toast('登录失败，用户名密码错误')  //提示框
									   }
								    }
								}); 				 
							}
						}
	}
</script>

<style>
.u-demo-area{
	cursor: pointer;
}

.teachplan-header text {
	font-size: 18px;
	/* 示例字体大小 */
	font-weight: bold;
	/* 可选，加粗标题 */
}

.teachplan-header {
	width: 100%;
	/* 确保标题占据整行 */
	text-align: center;
	/* 可选，根据设计需求调整 */
	margin-bottom: 10px;
	/* 与下面的功能模块保持一定的间距 */
}

.clicked {
  color: blue;
  text-decoration: underline;
}
</style>