<template>
	<view >	
		<view v-if="this.user.id" class="containerhole">
			<view v-if="this.loaded==true" class="containerhole">
				<!-- 背景图片 点击可更换-->
				<image class="backpic" :src="backpic" mode="aspectFill" >
					
				</image>
				<!-- 可滑动蒙版-->
					<view class="musk">
						<!-- 头像和昵称-->	
						<view class="content">
							<view class="head">
								<view class='leftheadpic'>
									<u-avatar class="avatar" :src="pic" shape="circle" size=160></u-avatar>
								</view>
								<view class="right">
									<text class="virtulname">{{this.name}}</text>
									<view class="baseinfor">
										<view class="baseitem1">{{this.user.gender}}</view>
										<view class="baseitem2">{{this.user.province}}</view>
									</view>
								</view>
								<!-- 点赞和svg五角星背景-->
								<view class="likes">
									<view class="like-container">
										<svg class="star" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20432"><path d="M541.1 102.4L662 347.3l270.2 39.3c26.7 3.9 37.3 36.6 18 55.4L754.7 632.5l46.2 269.1c4.6 26.5-23.3 46.8-47.1 34.3L512 808.8l-241.7 127c-23.8 12.5-51.7-7.7-47.1-34.3l46.2-269.1L73.8 442c-19.3-18.8-8.6-51.6 18-55.4L362 347.3l120.8-244.8c12-24.2 46.4-24.2 58.3-0.1z" fill="#FFD400" p-id="20433"></path></svg>
										<u-icon class="like-icon" :name="likeicon" size="40" color='#07197f'></u-icon>
										<text class="liketext"> {{this.likes}}</text>
									</view>
								</view>
							</view>
							<!-- 白色蒙版，包含看可上传图片，账号与签名-->
							<view class="whileback">
								<view class="another-image-container" @click="chooseImg">
									<image class="another-image" :src="showpic"></image>  
								</view>
								
								
								<u-divider  borderColor="#55cee6" bg-color="#7736fa" 
								half-width=150 color="#009900" font-size="26"></u-divider>
								
								<view class="textitem">
									<u-icon name="account" size="40" color="#000000"></u-icon>
									<text class="moto">{{this.account}}</text>
								</view>
								
								<view class="textitem">
									<u-icon name="bookmark" size="40" color="#000000"></u-icon>
									<text class="moto">{{this.moto}}</text>
								</view>
								
								<view class="textitem">
									<u-icon name="moments" size="40" color="#000000"></u-icon>
									<text class="moto">发帖数量：{{this.topiccounts}}</text>
								</view>
								
								<view class="textitem">
									<u-icon name="chat-fill" size="40" color="#000000"></u-icon>
									<text class="moto">评论数量：{{this.commentcounts}}</text>
								</view>
								
								<view class="textitem"  @click="updatamypage()" >
									<u-icon class="rotate-icon" name="plus" size="40" color="#000000" :style="{ transform: `rotate(${rotateDegree}deg)` }" ></u-icon>
									<text class="moto">自定义个人名片</text>
								</view>
								<view class="textitem" @click="chooseImg1" :style="{ transform: `translateX(${x}rpx)` }" >
									<u-icon name="photo-fill" size="40" color="#000000"></u-icon>
									<text class="moto">修改主页背景</text>
								</view>
								<view class="textitem"  @click="updatamoto(id)" :style="{ transform: `translateX(${x}rpx)` }"  >
									<u-icon name="edit-pen" size="40" color="#000000"></u-icon>
									<text class="moto">修改个性签名</text>
								</view>
								<view class="textitem" @click="chooseImg" :style="{ transform: `translateX(${x}rpx)` }" >
									<u-icon name="integral-fill" size="40" color="#000000"></u-icon>
									<text class="moto">修改精选图片</text>
								</view>
							</view>
						</view>
						
					</view>
				
				<!-- 裁剪图片插件-->
				<gmy-img-cropper
				    class="cropper1"
					ref="gmyImgCropper"
					quality="0.5"
					cropperType="ratio"
					:ratio="4 / 3"
					fileType="png"
					imgSrc=""
					@getImg="getImg"
				></gmy-img-cropper>
				<!-- 裁剪图片插件1-->
				<gmy-img-cropper
				    class="cropper1"
					ref="gmyImgCropper1"
					quality="0.5"
					cropperType="ratio"
					:ratio="aspectRatio"
					fileType="png"
					imgSrc=""
					@getImg="getImg1"
				></gmy-img-cropper>
			</view>
			<view v-else>
				<view class="holecontainer">
						<u-loading mode="circle" color="#df1215" size="80"></u-loading>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="holecontainer">
				<view class="wrongcircle">
					<u-icon class="wrongicon" name="close-circle" size="162" color="#ff9c4a"></u-icon>
				</view>
				<text class="wrongnormal">请先登录</text>
				
			</view>
				
		</view>
	</view>
</template>

<script>
import { use } from 'echarts';
import gmyImgCropper from '@/components/gmy-img-cropper/gmy-img-cropper.vue'
import gmyImgCropper1 from '@/components/gmy-img-cropper/gmy-img-cropper.vue'
    export default {
        components:{
			gmyImgCropper1,
            gmyImgCropper
        },
		data() {
			return {
				likes:111,
				loaded:false,
				user:{
					
				},
				ip:"192.168.50.101",
				  screenWidth: 0, // 屏幕宽度  
				  screenHeight: 0, // 屏幕高度  
				  aspectRatio: 0, // 宽高比  
				  //账户编码
				  id:0,
				//账号和签名
				moto:"命运的馈赠早已在暗中标好价码",
				account:"948682907",
				//头像姓名
				pic:"",
				name:"愿闻其详",
				//点赞图标
				likeicon:"thumb-up",
				//默认背景图片和精选图片
				backpic:"../../static/images/图片3.png",
				showpic:"../../static/images/图片4.png",
				//帖子和评论数量
				topiccounts:0,
				commentcounts:0,
				
				//url:"static/images/freshman4.jpg",
/* 				list: [{
									name: '帖子'
								}, {
									name: '热点'
								}, {
									name: '我的',
									count: 5
								}], */
				//打开功能菜单和功能列表
					show:false,
					list: [{
							text: '修改签名',
						}, {
							text: '好友设置',
							disabled: true,
							subText: '敬请期待'
						}, {
							text: '更新背景图片',
						}, {
							text: '修改精选图片'
					}],
					tips: {
						text: ''
					},
				//
				current: 0,
				//修改按钮
				rotateDegree: 0, // 初始旋转度数  
				
				changemy:false,
				//移动动画
				x:-300,
				//修改签名
				nochangemoto:true,
			}
		},
		onLoad(){
			if(this.aspectRatio==0)
			{
					this.getDeviceInfo();  
			}

		},
		onShow()
		{
			this.loaded=false;
			this.user.id='';
			const value10 = uni.getStorageSync('user');
			console.log(value10.id);
			if(value10.id)
			{
				//获取id
				this.id=value10.id;
				this.user=value10;
				console.log('当前用户',value10);
				this.user.id=value10.id;
				
				if(value10.nickName)
				{
					this.account=value10.studentId;
					this.name=value10.nickName;
				}

				//加载头像
				this.getinfos(this.user.id).then(() => {  
				  console.log("所有图片都已加载完成");
				  this.loaded=true;
				}).catch(error => {  
				  console.error('加载图片时发生错误:', error);  
				});
			}
		},
		methods: {
			updatamypage()
			{
				this.rotateDegree = (this.rotateDegree + 45) % 360; // 可以通过取模实现循环旋转  
				
				this.changemy=!this.changemy;
				this.x=(this.x==0)?-300:0;
			},
			//获取宽高比
			getDeviceInfo() {  
			      uni.getSystemInfo({  
			        success: (res) => {  
			          this.screenWidth = res.windowWidth; // 窗口宽度，单位px  
			          this.screenHeight = res.windowHeight; // 窗口高度，单位px  
			          // 注意：这里使用windowWidth和windowHeight获取的是可视区域的宽高  
			          // 如果需要整个屏幕的宽高，可以使用screenWidth和screenHeight，但可能需要根据实际情况调整  
			            
			          // 计算宽高比  
			          this.aspectRatio = this.screenWidth / this.screenHeight;  
			          console.log(`屏幕宽高比: ${this.aspectRatio.toFixed(2)}`);  
			        },  
			        fail: (err) => {  
			          console.error('获取设备信息失败：', err);  
			        }  
			      });  
			},
			//选择图片并修改图片
			chooseImg:function(){
			            // 调用实例的chooseImg方法，拉起图片选择界面，待图片选择完毕后直接进入图片截取界面
			            this.$refs.gmyImgCropper.chooseImage();
			        },
			chooseImg1:function(){
			            // 调用实例的chooseImg方法，拉起图片选择界面，待图片选择完毕后直接进入图片截取界面
			            this.$refs.gmyImgCropper1.chooseImage();
			        },
			// 点击完成时，返回截取图片的临时路径
			getImg:function(e){
				console.log("父页面拿到了精选图片",e);
				this.showpic=e;
				if(this.showpic)
				{
					let that=this;
					const uploadUrl = 'http://'+this.ip+':8090/auth/uploadjingxuanpic'; // 替换为你的上传接口  
					console.log(this.showpic);
					uni.uploadFile({  
					  url: uploadUrl, // 仅为示例，非真实的接口地址  
					  filePath: this.showpic,  
					  name: 'image', // 根据你的后端接口要求修改  
					  formData: {  
					    'user': 'test' ,// 其他需要传递的参数  
						'studentId':this.account,
					  },  
					  success: (uploadRes) => {  
					    // 返回值 res 为服务器返回的数据  
					    console.log('uploadImage success:', uploadRes.data); 
					    // 这里可以根据返回的数据进行后续处理，如提示用户上传成功等 
					  },  
					  fail: (err) => {  
					    console.error('uploadImage fail:', err);  
					    // 上传失败的处理  
					  }  
					});  
				}
				this.imgCropperShow = false;
				
			},
			getImg1:function(e){
				console.log("父页面拿到了背景图片",e);
				this.backpic=e;
				if(this.backpic)
				{
					let that=this;
					const uploadUrl = 'http://'+this.ip+':8090/auth/uploadbackground'; // 替换为你的上传接口  
					console.log('背景');
					uni.uploadFile({  
					  url: uploadUrl, // 仅为示例，非真实的接口地址  
					  filePath: that.backpic,  
					  name: 'image', // 根据你的后端接口要求修改  
					  formData: {  
					    'user': 'test' ,// 其他需要传递的参数  
						'studentId':that.account,
					  },  
					  success: (uploadRes) => {  
					    // 返回值 res 为服务器返回的数据  
					    console.log('uploadImage success:', uploadRes.data); 
					    // 这里可以根据返回的数据进行后续处理，如提示用户上传成功等 
					  },  
					  fail: (err) => {  
					    console.error('uploadImage fail:', err);  
					    // 上传失败的处理  
					  }  
					});  
				}
				this.imgCropperShow = false;
			},
			//
			change(index) {
			      this.current = index;  // 更新当前选中的标签索引
			      switch(index) {
			        case 0:
			          // 跳转到首页
					uni.switchTab({
                      url: '/pages/forum/index',
                      success: function (res) {
                       //console.log("跳转成功");
                      },
                      fail: function (err) {
                        //console.error("跳转失败", err);
                      }
                    });
			          break;
			        case 1:
			          // 跳转到论坛
			          uni.navigateTo({
			            url: '/pages/forum/forum'
			          });
			          break;
			        case 2:
			          // 跳转到关于页面
			          uni.navigateTo({
			            url: '/pages/forum/me'
			          });
			          break;
			        default:
			          // 默认操作
			          break;
			      }
			    
			  },
			  
			updatamoto()
			{
				uni.navigateTo({
					url:"/pages/forum/changemoto"
				})
			},
			getinfos(userId) {  
				console.log(userId);
				return new Promise((resolve, reject) => {  
					let vm=this;
					//请求点赞数
					uni.request({
						url:`http://${this.ip}:8090/auth/getUserFavor?id=${userId}`,
						method:"GET",
						success: (res) => {  
							console.log("likes",res);
							vm.likes=res.data.result;
						},  
						fail: (err) => {  
							console.log('网络失败:点赞数',userId)
							//resolve(imageUrl);
							reject(err); // 网络错误或请求失败时拒绝Promise  
							
						}  
					})
					//请求精选图片
					uni.request({
						url:`http://${this.ip}:8090/auth/getjingxuanpic?id=${userId}`,
						method:"GET",
						responseType: 'arraybuffer',
						success: (res) => {  
							console.log(res);
							if (res.statusCode === 200) {  
								const base64 = uni.arrayBufferToBase64(res.data);  
								const imageUrl2 = `data:image/png;base64,${base64}`; 
								if(imageUrl2)
								{
									vm.showpic = imageUrl2; 	
								}
								console.log('get_backpic:',userId);
								// 假设你有一个地方来存储这些图片URL，这里我们直接解析Promise  
								// 但在实际应用中，你可能想将其存储在Vue的data属性或其他地方  
								//resolve(imageUrl); // 解析Promise，传递图片URL  
							} else {  
								console.log('获取失败',userId)
							}  
						},  
						fail: (err) => {  
							console.log('网络失败:背景图片',userId)
							//reject(err); // 网络错误或请求失败时拒绝Promise  
						}  
					})
					//请求背景图片
					uni.request({
						url:`http://${this.ip}:8090/auth/getbackground?id=${userId}`,
						method:"GET",
						responseType: 'arraybuffer',
						success: (res) => {  
							console.log(res);
							if (res.statusCode === 200) {  
								const base64 = uni.arrayBufferToBase64(res.data);  
								const imageUrl3 = `data:image/png;base64,${base64}`; 
								if(imageUrl3)
								{
									vm.backpic = imageUrl3; 	
								}
								console.log('get_backpic:',userId);
								// 假设你有一个地方来存储这些图片URL，这里我们直接解析Promise  
								// 但在实际应用中，你可能想将其存储在Vue的data属性或其他地方  
								//resolve(imageUrl); // 解析Promise，传递图片URL  
							} else {  
								console.log('获取失败',userId)
								
							}  
						},  
						fail: (err) => {  
							console.log('网络失败:背景图片',userId)
							reject(err); // 网络错误或请求失败时拒绝Promise  
							
						}  
					});
					//获取qq签名
					uni.request({
						url:`http://${this.ip}:8090/auth/getqqsign?id=${userId}`,
						method:"GET",

						success: (res) => {  
							console.log(res);
							if (res.statusCode === 200) {  
								if(res.data.result)
								{
									vm.moto = res.data.result; 	
								}
								console.log('get_moto:',userId);
							} else {  
								console.log('获取失败',userId)
								
							}  
						},  
						fail: (err) => {  
							console.log('网络失败:moto',userId)
							reject(err); // 网络错误或请求失败时拒绝Promise  
							
						}  
					});
					//获取发帖信息
					uni.request({
						url:`http://${this.ip}:8090/chat/getText?id=${userId}`,
						method:"GET",
						success(res) {
							console.log("发帖信息",res);
							if(res.statusCode==200)
							{
								vm.topiccounts=res.data.result;
							}
						}
					});
					
					//获取回复信息
					uni.request({
						url:`http://${this.ip}:8090/chat/getComment?id=${userId}`,
						method:'GET',
						success(res) {
							console.log("回复信息",res);
							if(res.statusCode==200)
							{
								vm.commentcounts=res.data.result;
							}
						}
					});
					//获取头像
					let url = `http://${this.ip}:8090/auth/getImageById?id=${userId}`;  
					uni.request({  
						url: url,  
						method: 'GET',  
						responseType: 'arraybuffer', 
						success: (res) => {  
							console.log(res);
							if (res.statusCode === 200) {  
								const base64 = uni.arrayBufferToBase64(res.data);  
								const imageUrl = `data:image/png;base64,${base64}`; 
								vm.pic = imageUrl; 
								console.log('get:',userId);
							} else {  
								console.log('获取失败',userId);
								vm.loaded=true;
								//resolve(imageUrl); // 解析Promise，传递图片URL  
								//reject(new Error(`Server returned status code ${res.statusCode}`)); // 拒绝Promise，传递错误信息  
							}  
						},  
						fail: (err) => {  
							console.log('网络失败：头像',userId);
							//resolve(imageUrl);
							//reject(err); // 网络错误或请求失败时拒绝Promise  
							
						}  
					});  
				});  
			},
			next()
			{
				
			}
		}
	}
</script>

<style>
	.holecontainer {
		width: 100%; /* 确保横向覆盖整个屏幕 */  
		flex-direction: column;
	  display: flex;  
	  justify-content: center; /* 水平居中 */  
	  align-items: center; /* 垂直居中 */  
	  height: 20vh; /* 占据整个视窗的高度 */  
	  padding: 20% 20% 0;
	}  
	.containerhole{
		width: 100%; /* 确保横向覆盖整个屏幕 */
		height: 120%;
	}
	.content{
		  top: 50rpx;
		  position: relative;  
		  width: 100%; /* 确保横向覆盖整个屏幕 */  
		  height: 100%;
/* 		  min-height: 150%;
		  max-height: 150%; */
		  overflow: hidden;  
	}
	.musk{
		  width: 100%; /* 确保横向覆盖整个屏幕 */
		  height: 150%;
		  //max-height: 200%;
		  position: absolute;
		  top: 80%; /* 初始位置在最下方 */  
		  transition: transform 0.3s ease; /* 平滑过渡效果 */  
	}
	.backpic
	{
		  position: fixed; 
		  width: 100%;  
		  height: 100%;
		  z-index: -1;  
	}
	.head{
		
		  top: 10rpx;
		  padding-bottom: 10rpx;
		  padding-top: 10rpx;
		  width: 100%;
		  display: flex;  
		  align-items: center;  
		  background-color: rgba(255, 255, 255, 0.4); /* 白色半透明背景 */  
		  border-radius: 5px; /* 可选，圆角边框 */  
	}
	.leftheadpic
	{
		  z-index: 1;
		  width: 180rpx;  
		  height:180rpx; 
		  padding-top: 10rpx;
		  //padding-left: 10rpx;
		  border-radius: 50%;  
		  margin-left: 10px;  
		  background-color: aliceblue;
	}
	.avatar{
		z-index: 2;
	}
	.virtulname{
	  font-size: 30px;
	  padding-left: 30rpx;
	  font-weight: bold;  
	  color: #fc1433;
	}
	.baseinfor{
		  display: flex;  
		  margin-top: 10px;  
		  
	}
	.likes{
		right: 5%;
		position: absolute;
	}
	.like-container {  
	    position: relative; /* 设置为相对定位，以便子元素可以使用绝对定位 */  
	    width: 60rpx; /* 根据需要调整大小 */  
	    height: 60rpx; /* 根据需要调整大小 */  
	    display: flex;  
	    justify-content: center;  
	    align-items: center;  
	  }  
	  .star{
		  width: 200%;
		  height: 200%;
	  }
	.like-icon {  
	  position: absolute; /* 绝对定位使点赞图标可以相对于其父元素定位 */  

	  width: 80%; /* 使点赞图标覆盖整个五角星区域（如果需要的话） */  
	  height: 80%; /* 同上 */  
	  display: flex;  
	  justify-content: center; /* 水平居中 */  
	  align-items: center; /* 垂直居中 */  
	}  
	.liketext{
	  position: absolute; /* 绝对定位使点赞图标可以相对于其父元素定位 */  
	  margin-top: -50%;
	  display: flex;  
	  justify-content: center; /* 水平居中 */  
	  top: 80rpx;
	}
	.baseitem2{
		  /* 蒙版样式 */  
		  left: 30rpx;
		  margin-right: 30rpx;
		  right: 20rpx;
		  //padding-left: 20rpx;
		  position: relative; /* 设置为相对定位，以便子元素（如绝对定位的元素）可以相对于它定位 */  
		  display: inline-block; /* 根据需要，可以是inline-block或block等 */  
		  padding: 5px 10px; /* 根据需要调整内边距 */  
		  background-color: rgba(255, 255, 255, 0.5); /* 白色半透明背景 */  
		  border-radius: 5px; /* 可选，圆角边框 */  
		  /*避免换行*/
		    max-width: 150rpx;
		    overflow: hidden;  
		    white-space: nowrap;  
		    text-overflow: ellipsis;  
	}
	.baseitem1{
		/* 蒙版样式 */
		left: 30rpx;
		margin-right: 30rpx;
		right: 20rpx;
		//padding-left: 20rpx;
		position: relative; /* 设置为相对定位，以便子元素（如绝对定位的元素）可以相对于它定位 */  
		display: inline-block; /* 根据需要，可以是inline-block或block等 */  
		padding: 5px 10px; /* 根据需要调整内边距 */  
		background-color: rgba(255, 255, 255, 0.5); /* 白色半透明背景 */  
		border-radius: 5px; /* 可选，圆角边框 */  
		/*避免换行*/
		  width: 75rpx;
		  overflow: hidden;  
		  white-space: nowrap;  
		  text-overflow: ellipsis;  
	}

	  
	.whileback{
		z-index: 1;
		padding-top: 23rpx;
		position: relative; /* 设置为相对定位，以便子元素（如绝对定位的元素）可以相对于它定位 */
		display: inline-block; /* 根据需要，可以是inline-block或block等 */  
		width: 100%;
		height: 100%;
/* 		min-height: 200%;
		max-height: 300%; */
		background-color: rgba(255, 255, 255, 0.7); /* 白色半透明背景 */  
		border-radius: 5px; /* 可选，圆角边框 */  
	}
	.another-image-container{
		  display: flex;  
		  justify-content: center; /* 水平居中 */  
		  align-items: center; /* 垂直居中 */  
	}
	.another-image{
		padding-bottom: 12rpx;
	}
	.textitem{
		padding-top: 20rpx;
		padding-left: 30rpx;
		font-size: 30rpx;
		transition: transform 0.3s ease; /* 平滑过渡效果 */  
	} 
	.moto{
		padding-left: 20rpx;
		font-size: 30rpx;
	}
	
	.cropper1{
		z-index: 4;
	}
	.wrongcircle {
		background-color: #ff3437;
		border-radius: 200rpx;
		width: 160rpx;
		height: 160rpx;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
		/* 应用动画 */
		animation: rotate 2s linear infinite;  
		position: relative; /* 设置为相对定位，以便子元素可以使用绝对定位 */
	}
	
	.wrongnormal {
		color: #fc1433;
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
	
	/*修改图标*/
	.rotate-icon {    
	  transition: transform 0.3s ease; /* 平滑过渡效果 */  
	}  
</style>
