<template>
	<view>
		<view>
			<u-navbar title-color="#fff" back-icon-color="#ffffff"
				:is-fixed="isFixed" :is-back="isBack" 
				:background="background" 
				:back-text-style="{color: '#fff'}" :title="title1" 
				:back-icon-name="backIconName" :back-text="backText"
				:border-bottom="false">
				<view class="slot-wrap">
				<view class="map-wrap" v-if="custom">
					<u-icon name="map" color="#ffffff" size="24"></u-icon>
					<text class="map-wrap-text">重庆大学虎溪校区</text>
				</view>
				</view>
			</u-navbar>
		</view>
		<view v-if="logined">
			<view class="top">
			  <view class="background" style="background-image: linear-gradient(45deg, rgb(44, 168, 187), rgb(166, 197, 198));"></view>
			</view>
			<view class="user-card">
			  <view class="card">
			    <view class="top">
			      <view class="userImage">
					  <u-avatar v-if="gender==='男'" :src="'/static/images/headpic/'+picid+'.PNG'" size="140" :showSex="true"  sexIcon="man" mode="circle" sexBgColor="#71d5a1" @click="goSelectheadpic()"></u-avatar>
					  <u-avatar v-else :src="pic" size="140" :showSex="true"  sexIcon="woman" mode="circle" sexBgColor="#fab6b6" @click="goSelectheadpic()"></u-avatar>
			      </view>
			    </view>
			    <view class="bottom">
			      <view class="left">
					<view class="user-text">{{yonghu.name}}</view>  
			        <view class="user-phone">学号：{{yonghu.studentId}}</view>
			      </view>
			    </view>
			  </view>
			</view>
			<view class="list-card">
			  <view class="card"@click="editit()">
			    <view class="item item-bottom-solid">
			      <view class="left flex-center">
			        <u-icon class="icon" name="setting"></u-icon>
			      </view>
			      <view class="center" >
			        <text>我的个人信息</text>
			      </view>
			      <view class="right flex-center">
			        <u-icon class="icon" name="arrow-right"></u-icon>
			      </view>
			    </view>
			  </view>
			  <view class="card" >
			    <view class="item" @click="goXiumi()">
			      <view class="left flex-center">
			        <u-icon class="icon" name="gift"></u-icon>
			      </view>
			      <view class="center">
			        <text>收获一份校园介绍</text>
			      </view>
			      <view class="right flex-center">
			        <u-icon class="icon" name="arrow-right" ></u-icon>
			      </view>
			    </view>
				<view class="item" @click="connect()" >
				  <view class="left flex-center">
				    <u-icon class="icon" name="chat"></u-icon>
				  </view>
				  <view class="center">
				    <text>联系我们</text>
				  </view>
				  <view class="right flex-center">
				    <u-icon class="icon" name="arrow-right" ></u-icon>
				  </view>
				</view>
			  </view>
			  <view class="card" @click="showModal()">
			    <view class="item item-bottom-solid">
			      <view class="left flex-center">
			        <u-icon class="icon" name="star"></u-icon>
			      </view>
			      <view class="center" >
			        <text>点评一下</text>
			      </view>
			      <view class="right flex-center">
					<u-icon class="icon" name="arrow-right" ></u-icon>
			      </view>
			    </view>
			  </view>
			</view>
			 <view class="quit flex-center">
			    <view class="btn flex-center" @click="quit()">
			      退出登录
			    </view>
			 </view>
		</view>
		<view v-else>
			<view class="top">
			  <view class="background" style="background-image: linear-gradient (45deg, rgb(44, 168, 187), rgb(166, 197, 198));"></view>
			  
			   
			</view>
			<view class="user-card">
			  <view class="card">
			    <view class="top">
			      <view class="userImage">
			        <u-avatar src="../../static/images/personal.png" size="140"></u-avatar>
			      </view>
			    </view>
			    <view class="bottom">
			      <view class="left">
			        <view class="user-text">匿名用户</view>
			        <view class="user-phone" >请登录</view>
			      </view>
			    </view>
			  </view>
			</view>
			<view class="list-card">
			  <view class="card">
			    <view class="item item-bottom-solid">
			      <view class="left flex-center">
			        <u-icon class="icon" name="plus"></u-icon>
			      </view>
			      <view class="center" >
			        <text>登录</text>
			      </view>
			      <view class="right flex-center">
			        <u-icon class="icon" name="arrow-right" @click="goLogin()"></u-icon>
			      </view>
			    </view>
			  </view>
			</view>
		</view>
			<view>
				<u-modal ref="uModal" v-model="show" :show-cancel-button="true" 
					:show-title="showTitle" :async-close="asyncClose"
					@confirm="confirm" :content="content"
				>
					<view style="margin: 60rpx; display: flex; justify-content: center;">
						<u-rate v-model="value" :count="5" :active-color="activeColor" :inaction-color="inactiveColor" :colors="colors" :icons="icons" :size="60"></u-rate>
					</view>
				</u-modal>
				</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				//访问的ip
				ip:"192.168.50.101",
								
				//初始
				logined: false,
				
				pic:'',
				yonghu: {
					name:"游客",
					nickname: "游客",
					likes:0,
					studentId:"",
				} ,
				usre:{},
				gender: 'man',
				//
				show: false,
				zoom: false,
				contentSlot: false,
				showTitle: false,
				asyncClose: false,
				// 顶部导航栏
				title1: '个人主页',
				backText: '返回',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				useSlot: false,
				background: {
                     'background-image': 'linear-gradient(45deg, rgb(44, 168, 187), rgb(166, 197, 198))'
				},
				isBack: false,
				search: false,
				custom: true,
				isFixed: true,
				keyword: '',
				// 评分
				activeColor: '#ffc800',
				inactiveColor: '#b2b2b2',
				value: 0,
				colors: ['#ffc454', '#ffb409', '#ff9500'],
				icons: ['trash-fill', 'thumb-down-fill', 'thumb-up-fill', 'thumb-up-fill'],
				// 消息提示
				type: 'error',
				title: '请先',
				icon: true,
				position: 'center',
				url: '',
				duration: 2000,
				false:false,
				true:true,
			}
		},
		onShow() {
			this.loading=true;
			let vm=this;
			const value5 = uni.getStorageSync('user');
			console.log(value5);
			this.gender = value5.gender;
			if(value5.nickName)
			{
				this.yonghu.nickname=value5.nickName;
			}
			if(value5.studentId)
			{
				this.yonghu.studentId=value5.studentId;
			}
			if(value5.studentId)
			{
				this.yonghu.name=value5.name;
			}
			if(value5.id)
			{
				this.getlikes(value5.id);
				this.logined=true;
				this.user=value5;
				let userId = value5.studentId; // 确保this.studentId已被定义  
						if (!value5.fileData) {  
							// 处理userId未定义的情况  
							//uni.showToast({ title: '学生ID未定义', icon: 'none' });  
							return;  
						}  
				  
						let url = `http://${this.ip}:8090/auth/getImage?studentId=${userId}`;  

						uni.request({  
							url: url,  
							method: 'GET',  
							responseType: 'arraybuffer',  
							success: (res) => {  
								// 注意：uni.request的success回调中的res是一个包含data、statusCode等属性的对象  
								if (res.statusCode === 200) {  
									const base64 = uni.arrayBufferToBase64(res.data);  
									// 创建一个数据URL  
									this.pic = `data:image/png;base64,${base64}`; // 注意：这里假设图片是PNG格式，根据实际情况可能需要调整  
									value5.fileData=this.pic;
									uni.setStorageSync('user',value5);
									
									// 现在你可以在模板中使用this.imageUrl来显示图片了  
								} else {  
									uni.showToast({ title: '服务器返回错误状态码', icon: 'none' });  
								}  
								vm.loading=false;
							},  
							fail: (err) => {  
								// 处理请求失败的情况 
								 vm.loading=false;
								console.error("请求失败:", err);  
								uni.showToast({ title: '网络错误或服务器未响应', icon: 'none' });  
							}  
						});
			}
			
		},
		methods: {
			connect() {
				uni.navigateTo({
					url: '/pages/frmv/connect'
				})
			},
			getlikes(userId)
			{
				console.log(userId);
				let vm=this;
				let url = `http://${this.ip}:8090/auth/getUserFavor?id=${userId}`;  
				uni.request({
					url: url,  
					method: 'GET',  
					success: (res) => {
						console.log(res);
						vm.yonghu.likes=res.data.result;
						
					}
					  
				});
			},
			goLogin() {
				console.log('转入了登陆页面')
				uni.navigateTo({
					url: '/pages/frmv/login'
				})
			},
			goSelectheadpic() {
				uni.navigateTo({
					url: '/pages/frmv/selectheadpic'
				})
			},
			quit() { //增加
				uni.setStorageSync("user", "");
				uni.setStorageSync('form', ""); //清空 存储
				uni.setStorageSync('student',"");
				console.log('退出')
				this.logined = false //登陆状态
			},
			editit() {
				console.log('从主页转入了设置')
				uni.navigateTo({
					url: '/pages/frmv/editmyinfo'
				})
			},
			goXiumi() {
				uni.navigateTo({
					url: '/pages/frmv/webView?url=' + 'https://v.xiumi.us/stage/v5/72a10/550089537'
				})
			},
			goCollect() {

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
			showModal() {
				this.show = true;
			}
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}
	
	.top {
	  height: 250rpx;
	  position: relative;
	  .background {
	    background-color:  'linear-gradient(45deg, rgb(44, 168, 187), rgb(166, 197, 198))';
	    border-bottom-left-radius: 22px;
	    border-bottom-right-radius: 22px;
	    position: absolute;
	    height: 200rpx;
	    width: 100%;
	  }
	}
	.icon {
	  color: #96a1ae;
	  font-size: 40rpx;
	}
	.user-card {
	  height: 150rpx;
	  padding: 0 15px;
	  .card {
	    position: relative;
	    bottom: 50px;
	    height: 200rpx;
	    background-color: white;
	    border-radius: 5px;
	    .top {
	      height: 45%;
	      position: relative;
	      .userImage {
	        position: absolute;
	        bottom: 20%;
	        left: 7%;
	        width: 145rpx;
	        height: 145rpx;
	        border-radius: 50%;
	        border: 2px solid white;
	      }
	    }
	    .bottom {
	      display: flex;
	      height: 70%;
	      .left {
	        width: 80%;
	        height: 100%;
			top: -40%;
	        position: relative;
	        .user-text {
	          width: 100%;
	          font-size: 1.6em;
	          padding-left: 220rpx;
	          height: 80%;
			  bottom: 100rpx;
	        }
	        .user-phone {
	          color: #96a1ae;
	          padding-left: 80%;
			  margin-top: -20rpx;
	          height: 50%;
	          width: 120%;
	          font-size: 1em;
	        }
	      }
	      .right {
	        width: 20%;
	        height: 50%;
	      }
	    }
	  }
	}
	.list-card {
	  padding: 0 15px;
	  .card {
	    border-radius: 5px;
	    position: relative;
	    background-color: white;
	    border-radius: 5px;
	    padding: 5px 30px;
	    .item {
	      display: flex;
	      height: 120rpx;
	      .left {
	        width: 15%;
	        image {
	          width: 70rpx;
	          height: 70rpx;
	        }
	      }
	      .center {
	        width: 65%;
	        display: flex;
	        justify-content: start;
	        align-items: center;
	        font-size: 1.1em;
	      }
	      .right {
	        width: 20%;
	        justify-content: flex-end;
	      }
	    }
	  }
	}
	.item-bottom-solid {
	  border-bottom: 1px solid #d4d6da;
	}
	.quit{
	  height: 100rpx;
	  margin-top: 50px;
	  .btn{
	    background-color: #4f99ff;
	    border-radius: 30px;
	    width: 80%;
	    color: white;
	    font-size: 1.2em;
	    height: 100%;
	  }
	}
	.flex-center{
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
	}
	
	.map-wrap {
		display: flex;
		align-items: center;
		padding: 4px 6px;
		background-color: rgba(240,240, 240, 0.35);
		color: #fff;
		font-size: 22rpx;
		border-radius: 100rpx;
		margin-left: 30rpx;
	}
</style>