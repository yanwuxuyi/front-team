<template>
	<view >	
		<view v-if="this.user.id" class="containerhole">
			
			<view v-if="this.loaded==true" class="containerhole">
				<!-- 背景图片 点击可更换-->
				<image class="backpic" :src="backpic" mode="aspectFill">
					
				</image>
				<!-- 可滑动蒙版-->
				<view class="musk">
					<!-- 头像和昵称-->
					<view class="content">
						<view class="head">
							<view class='leftheadpic'>
								<u-avatar class="avatar" :src="pic" shape="circle" size=170></u-avatar>
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
									<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20432" width="40" height="40"><path d="M541.1 102.4L662 347.3l270.2 39.3c26.7 3.9 37.3 36.6 18 55.4L754.7 632.5l46.2 269.1c4.6 26.5-23.3 46.8-47.1 34.3L512 808.8l-241.7 127c-23.8 12.5-51.7-7.7-47.1-34.3l46.2-269.1L73.8 442c-19.3-18.8-8.6-51.6 18-55.4L362 347.3l120.8-244.8c12-24.2 46.4-24.2 58.3-0.1z" fill="#FFD400" p-id="20433"></path></svg>
									<u-icon class="like-icon" :name="likeicon" size="40" color='#07197f'></u-icon>
									<text class="liketext"> {{this.likes}}</text>
								</view>
							</view>
						</view>
						<!-- 白色蒙版，包含看可上传图片，账号与签名-->
						<view class="whileback">
							<view class="another-image-container">
								<image class="another-image" :src="showpic" @click="changeshowImg()"></image>  
							</view>
							
							
							<u-divider  borderColor="#55cee6" bg-color="#7736fa" 
							half-width=150 color="#009900" font-size="26"></u-divider>
							
							<view class="textitem">
								<u-icon name="account" size="40" color="#000000"></u-icon>
								<text class="moto">{{this.account}}</text>
							</view>
							
							<view class="textitem">
								<u-icon name="edit-pen" size="40" color="#000000"></u-icon>
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
							
							<view class="textitem" @click="updatemypage()">
								<u-icon name="plus" size="40" color="#000000"></u-icon>
								<text class="moto">修改个人主页</text>
							</view>
							
						</view>
					</view>
					
				</view>
				
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
					<u-icon name="close-circle" size="162" color="#ff9c4a"></u-icon>
				</view>
				<text class="wrongnormal">请先登录</text>
				
			</view>
				
		</view>
	</view>
</template>

<script>
import { use } from 'echarts';
	export default {
		data() {
			return {
				likes:111,
				loaded:false,
				user:{
					
				},
				//账号和签名
				moto:"命运的馈赠早已在暗中标好价码",
				account:"948682907",
				//头像姓名
				pic:"",
				name:"愿闻其详",
				//点赞图标
				likeicon:"thumb-up",
				//默认背景图片和精选图片
				backpic:"../../static/images/victin.jpeg",
				showpic:"../../static/service/xiaoxun.jpg",
				//帖子和评论数量
				topiccounts:0,
				commentcounts:0,
				
				//url:"static/images/freshman4.jpg",
				list: [{
									name: '帖子'
								}, {
									name: '热点'
								}, {
									name: '我的',
									count: 5
								}],
								current: 0
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
			//修改图片
			changeshowImg()
			{
			},
			updatmypage()
			{
				
			},
			//拖动
			handleTouchStart(e) {  
			  this.startY = e.touches[0].clientY;  
			  this.isDragging = true;  
			},  
			handleTouchMove(e) {  
			  if (!this.isDragging) return;  
			  this.touchMoveY = e.touches[0].clientY - this.startY;  
			  // 限制拖动范围，这里只向上拖动  
			  if (this.avatarPosition + this.touchMoveY >= 0) {  
				this.avatarPosition += this.touchMoveY;  
			  }  
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
			getinfos(userId) {  
				console.log(userId);
				return new Promise((resolve, reject) => {  
					let vm=this;
					//获取头像
					let url = `http://192.168.50.101:8090/auth/getImageById?id=${userId}`;  
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
								// 假设你有一个地方来存储这些图片URL，这里我们直接解析Promise  
								// 但在实际应用中，你可能想将其存储在Vue的data属性或其他地方  
								resolve(imageUrl); // 解析Promise，传递图片URL  
							} else {  
								console.log('获取失败',userId)
								//resolve(imageUrl); // 解析Promise，传递图片URL  
								//reject(new Error(`Server returned status code ${res.statusCode}`)); // 拒绝Promise，传递错误信息  
							}  
						},  
						fail: (err) => {  
							console.log('网络失败：头像',userId)
							//resolve(imageUrl);
							reject(err); // 网络错误或请求失败时拒绝Promise  
							
						}  
					});  
					//请求点赞数
					uni.request({
						url:`http://192.168.50.101:8090/auth/getUserFavor?id=${userId}`,
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
						url:`http://192.168.50.101:8090/auth/getjingxuanpic?id=${userId}`,
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
								resolve(imageUrl); // 解析Promise，传递图片URL  
							} else {  
								console.log('获取失败',userId)
							}  
						},  
						fail: (err) => {  
							console.log('网络失败:背景图片',userId)
							reject(err); // 网络错误或请求失败时拒绝Promise  
						}  
					})
					//请求背景图片
					uni.request({
						url:`http://192.168.50.101:8090/auth/getbackground?id=${userId}`,
						method:"GET",
						responseType: 'arraybuffer',
						success: (res) => {  
							console.log(res);
							if (res.statusCode === 200) {  
								const base64 = uni.arrayBufferToBase64(res.data);  
								const imageUrl3 = `data:image/png;base64,${base64}`; 
								if(imageUrl3)
								{
									vm.backpic = imageUrl2; 	
								}
								console.log('get_backpic:',userId);
								// 假设你有一个地方来存储这些图片URL，这里我们直接解析Promise  
								// 但在实际应用中，你可能想将其存储在Vue的data属性或其他地方  
								resolve(imageUrl); // 解析Promise，传递图片URL  
							} else {  
								console.log('获取失败',userId)
								
							}  
						},  
						fail: (err) => {  
							console.log('网络失败:背景图片',userId)
							reject(err); // 网络错误或请求失败时拒绝Promise  
							
						}  
					})
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
	  padding: 80px 100px 0;
	}  
	.containerhole{
		width: 100%; /* 确保横向覆盖整个屏幕 */
		height: 100%;
	}
	.content{
		  top: 50rpx;
		  position: relative;  
		  width: 100%; /* 确保横向覆盖整个屏幕 */  
		  height: 100%;
		  overflow: hidden;  
	}
	.musk{
			width: 100%; /* 确保横向覆盖整个屏幕 */
			height: 100%;
		  position: absolute;
		  top: 780rpx; /* 初始位置在最下方 */  
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
		  width: 100px;  
		  height:100px; 
		  z-index: 1;
		  padding-top: 10rpx;
		  padding-left: 10rpx;
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
		padding-left: 150rpx;
 position: relative;
	}
	.like-container {  
	    position: relative; /* 设置为相对定位，以便子元素可以使用绝对定位 */  
	    width: 50px; /* 根据需要调整大小 */  
	    height: 50px; /* 根据需要调整大小 */  
	    display: flex;  
	    justify-content: center;  
	    align-items: center;  
	  }  
	.like-icon {  
	  position: absolute; /* 绝对定位使点赞图标可以相对于其父元素定位 */  
	  top: 0; /* 顶部对齐 */  
	  left: 0; /* 左侧对齐 */  
	  width: 100%; /* 使点赞图标覆盖整个五角星区域（如果需要的话） */  
	  height: 100%; /* 同上 */  
	  display: flex;  
	  justify-content: center; /* 水平居中 */  
	  align-items: center; /* 垂直居中 */  
	}  
	.liketext{
	  position: absolute; /* 绝对定位使点赞图标可以相对于其父元素定位 */  
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
		  width: 70rpx;
		  overflow: hidden;  
		  white-space: nowrap;  
		  text-overflow: ellipsis;  
	}

	  
	.whileback{
		padding-top: 23rpx;
		position: relative; /* 设置为相对定位，以便子元素（如绝对定位的元素）可以相对于它定位 */
		display: inline-block; /* 根据需要，可以是inline-block或block等 */  
		width: 100%;
		height: 1500rpx;
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
	}

	.moto{
		padding-left: 20rpx;
		font-size: 30rpx;
	}
	
	
	.wrongcircle {
		background-color: #ff3437;
		border-radius: 100px;
		width: 80px;
		height: 80px;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
		/* 应用动画 */
		animation: rotate 2s linear infinite;  
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
</style>
