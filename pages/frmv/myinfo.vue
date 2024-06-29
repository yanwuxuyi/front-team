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
			  <view class="background" style="background-image: linear-gradient(45deg, rgb(118, 187, 187), rgb(156, 198, 130));"></view>
			</view>
			<view class="user-card">
			  <view class="card">
			    <view class="top">
			      <view class="userImage">
					  <u-avatar v-if="gender==='男'" :src="'/static/images/headpic/'+picid+'.PNG'" size="140" showSex="true"  sexIcon="man" mode="circle" sexBgColor="#71d5a1" @click="goSelectheadpic()"></u-avatar>
					  <u-avatar v-else :src="'/static/images/headpic/'+picid+'.PNG'" size="140" showSex="true"  sexIcon="woman" mode="circle" sexBgColor="#fab6b6" @click="goSelectheadpic()"></u-avatar>
			      </view>
			    </view>
			    <view class="bottom">
			      <view class="left">
			        <view class="user-text">{{yonghu.nickname}}</view>
			        <view class="user-phone">点赞数：{{yonghu.likes}}</view>
			      </view>
			    </view>
			  </view>
			</view>
			<view class="list-card">
			  <view class="card">
			    <view class="item item-bottom-solid">
			      <view class="left flex-center">
			        <u-icon class="icon" name="setting"></u-icon>
			      </view>
			      <view class="center" >
			        <text>修改账号信息</text>
			      </view>
			      <view class="right flex-center">
			        <u-icon class="icon" name="arrow-right" @click="editit()"></u-icon>
			      </view>
			    </view>
			  </view>
			  <view class="card">
			    <view class="item item-bottom-solid">
			      <view class="left flex-center">
			        <u-icon class="icon" name="account"></u-icon>
			      </view>
			      <view class="center">
			        <text>查看个人信息</text>
			      </view>
			      <view class="right flex-center">
			        <u-icon class="icon" name="arrow-right" @click="goCollect()"></u-icon>
			      </view>
			    </view>
			  </view>
			  <view class="card">
			    <view class="item">
			      <view class="left flex-center">
			        <u-icon class="icon" name="gift"></u-icon>
			      </view>
			      <view class="center">
			        <text>收获一份校园介绍</text>
			      </view>
			      <view class="right flex-center">
			        <u-icon class="icon" name="arrow-right" @click="goXiumi()"></u-icon>
			      </view>
			    </view>
			  </view>
			  <view class="card">
			    <view class="item item-bottom-solid">
			      <view class="left flex-center">
			        <u-icon class="icon" name="star"></u-icon>
			      </view>
			      <view class="center" >
			        <text>点评一下</text>
			      </view>
			      <view class="right flex-center">
					<u-icon class="icon" name="arrow-right" @click="showModal()"></u-icon>
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
			  <view class="background" style="background-image: linear-gradient(45deg, rgb(118, 187, 187), rgb(156, 198, 130));"></view>
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
				//初始
				logined: false,
				picid: 0,
				yonghu: {
					nickname: "游客"
				} ,
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
					'background-image': 'linear-gradient(45deg, rgb(118, 187, 187), rgb(156, 198, 130))'
				},
				isBack: false,
				search: false,
				custom: true,
				isFixed: true,
				keyword: '',
				// #ifdef MP
				slotRight: false,
				// #endif
				// #ifndef MP
				slotRight: true,
				// #endif
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
			}
		},
		onShow() {
			const value = uni.getStorageSync('user');
			uni.request({
			    url: 'http://192.168.1.163:8083/queryStudent',  
			    data: {phone:"13800000452"},
				method:"POST",
			    success: (res) => {//返回的结果（Result）对象 {"code":200,"reslut":...} 在res.data中
			       if(res.data.status){	
							this.gender=res.data.result.gender;
				   }
			    },
			});
			try { //见  https://uniapp.dcloud.net.cn/api/storage/storage.html#getstoragesync
				const value = uni.getStorageSync('user');
				this.picid=value.headPicture;
				console.log("个人信息页面获取到user的值为：", value)
				console.log("picid值为：",this.picid)
				if (value) {
					//if (!this.logined)
					//从未登录变为登录
					this.yonghu = value
					
					this.logined = true
				} else {
					console.log("未登录成功，yonghu置空")
					this.yonghu = {}
					this.logined = false
				}
			} catch (e) {
				// error
			}
		},
		methods: {
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
					url: '/pages/frmv/webView?url=' + 'https://v.xiumi.us/stage/v5/6q26F/465620607'
				})
			},
			goCollect() {
				const value = uni.getStorageSync('user');
				uni.request({
				    url: 'http://192.168.1.163:8083/queryStudent',  
				    data: this.value,
					method:"POST",
				    success: (res) => {//返回的结果（Result）对象 {"code":200,"reslut":...} 在res.data中
				       if(res.data.status){	
							if(res.data.result.gender=="男"){
								this.gender="man";
							}
							else {
								this.gender="woman";
							}
					   }
				    },
				});
				if (uni.getStorageSync('collected')) {
					uni.navigateTo({
						url: '../frmv/collect'
					})
				}
				else {
					this.showToast()
				}
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
	    background-color: #5199ff;
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
	          padding-left: 400rpx;
	          height: 50%;
	          width: 100%;
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