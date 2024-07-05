<template>
	<view>
		<view  class="musk" v-if="submiting">
			<view class="holecontainer">
				<view class="wrongcircle"  :style="{ backgroundColor: `hsl(${hue}, 100%, 50%)` }">
					<u-icon class="icon" name="chrome-circle-fill" size="162" color="black"></u-icon>
					
				</view>
				<text class="wrongnormal" :style="{ color: `hsl(${hue}, 100%, 50%)` }">正在登录</text>
			</view>
		</view>
		<view class="container">
		
			<view class="containerimg">
				<image class="schoolicon" style="background-color: #eeeeee;" :src="picsrc">
					
				</image>
			</view>
			<u-form :model="user"   ref="uForm"  > 
				<u-form-item   left-icon="account" label-width="120" label="学号" prop="studentId">
					<u-input  placeholder="请输入学号" v-model="user.studentId" type="text">
						
					</u-input>
				</u-form-item> 
				<u-form-item   left-icon="lock" label-width="120"  label="密码" prop="password">
					<u-input :password-icon="true"   type="password" v-model="user.password" placeholder="请输入密码">
						
					</u-input>
				</u-form-item>
			</u-form> 
			<u-button @click="submit" shape="circle">提交</u-button>
			<u-button @click="goRegiter" shape="circle">注册</u-button>
			<view :class="{'forgot-password': true, 'clicked': isClicked}" @click="forgotPassword">忘记密码</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentColor:"`hsl(${hue}, 100%, 50%)`",
				hue:0,
				
				intervalId:1,
				
				submiting:false,
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
		  mounted() {  
		  },  
		  beforeDestroy() {  

		  },   
		onReady() {
		            this.$refs.uForm.setRules(this.rules);
		        },
				methods: {
					// 更新颜色的方法  
					    startColorCycle() {  
							this.hue=0;
					      this.intervalId = setInterval(() => {  
					        this.updateHue();  
					      }, 100); // 注意：这里使用了箭头函数，但通常建议将函数单独定义  
					    },  
					    stopColorCycle() {  
					      if (this.intervalId) {  
					        clearInterval(this.intervalId);  
					        this.intervalId = null;  
					      }  
					    }, 
					// 更新色相值的方法  
					updateHue() {  
					  // 让色相值在0到360之间循环变化  
					  this.hue = (this.hue + 1) % 360;  
					  console.log("hue",this.hue);
					},  
							forgotPassword(){
								uni.navigateTo({
										url: '/pages/frmv/forgotPassword'
									  });
							},
							submit(){	
								let vm=this;
								this.startColorCycle();  
								vm.submiting=true;
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
												uni.switchTab({
												                      url: '/pages/frmv/myinfo',
												                      success: function (res) {
												                       //console.log("跳转成功");
												                      },
												                      fail: function (err) {
												                        //console.error("跳转失败", err);
												                      }
												                    });//登录成功返回 我的个人信息页面  
												console.log('登录成功，储存的user值为：',res.data.result)
										    } catch (e) {
										    	vm.$u.toast('身份信息格式异常') 
										    } 							
									   }else{
										   vm.$u.toast('登录失败，用户名密码错误')  //提示框
									   }
									   	vm.submiting=false;
								    },
									fail(err) {
										vm.submiting=false;
										vm.stopColorCycle();  
										vm.$u.toast('登录失败，网络错误')  //提示框
									}
								}); 				 
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
							
							
							goRegiter(){
											uni.navigateTo({
												url:"/pages/frmv/register"
											})
							 }
						}
	}
</script>

<style>
	.musk {
	  position: absolute;  
	  width: 100%;
	  height: 235%;
	  background-color: rgba(0, 0, 0, 0.8); /* 黑色半透明背景 */  
	  opacity: 0.5; /* 假设我们想要一个半透明的蒙版 */  
	  z-index: 4; /* 确保蒙版位于输入框和按钮下方 */ 
	   width: 100%; /* 确保横向覆盖整个屏幕 */
	}  
	.holecontainer{
		flex-direction: column;
		 display: flex;  
		 justify-content: center; /* 水平居中 */  
		 align-items: center; /* 垂直居中 */  
		 //height: 20vh; /* 占据整个视窗的高度 */  
		 padding-top: 50%;
		 z-index: 5;
	}
	.container{
		padding: 20rpx 50rpx;
			width: 100%;
			height: 100%;
			align-items: center;
			justify-content: center;
	}
	.containerimg{
			padding: 10rpx 10rpx;
			align-items: center;
			justify-content: center;
			display: flex;
			position: relative; /* 设置为相对定位，以便子元素可以使用绝对定位 */
	}
	.schoolicon{

 		width:  600rpx; 
		height: 450rpx;
	}
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
	.wrongcircle {
		background-color: currentColor;
		border-radius: 200rpx;
		width: 160rpx;
		height: 160rpx;
		align-items: center;
		justify-content: center;
		//margin-top: 20rpx;
		/* 应用动画 */
		position: relative; /* 设置为相对定位，以便子元素可以使用绝对定位 */
	}
	
	.wrongnormal {
		color: currentColor;
		font-size: 20px;
		margin-top: 10px;
	}
	/*非常好代码,使我旋转*/
		@keyframes rotate {
		  from {  
		    transform: rotate(0deg);  
		  }  
		  to {  
		    transform: rotate(360deg);  
		  }  
		}  
		  
		.icon {  
		  /* 应用动画 */  
		  animation: rotate 2s linear infinite;  
		}
</style>