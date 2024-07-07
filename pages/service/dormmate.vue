<template>
	<view>
		<view>
			<u-navbar title-color="#fff" back-icon-color="#ffffff"
				:is-fixed="isFixed" :is-back="isBack" 
				:background="background" 
				:back-text-style="{color: '#fff'}" :title="title1" 
				:back-icon-name="backIconName" :back-text="backText"
				:border-bottom="false" @click="goIndex()">
			</u-navbar>
		</view>
		<u-popup v-model="show" mode="center" class="popup-container">
			  <view class="popup-content">
				未完善个人资料！<br>
				请先完善个人资料！
			  </view>
			  <view class="popup-button-container">
				<u-button @click="navigateToProfile" class="popup-button">完善资料</u-button>
			  </view>
			</u-popup>
		<view v-if="loaded==true">
			<view class="">
					<u-swipe-action :show="false" :index="index" v-for="(item, index) in list" :key="item.id" @click="click"
						:options="options" :disabled="disabled">
						<view class="item u-border-bottom">
							<view class="left"><u-avatar :src="pic[item.id]" shape="circle" size=90></u-avatar></view>
							<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
							<view class="title-wrap">
								<text class="title u-line-2" style="font-size: large;">{{ item.name }}</text>
								<text class="title u-line-2">{{ item.dormitory}}</text>
							</view>
						</view>
					</u-swipe-action>	
			</view>
		</view>
		<view v-else class="holecontainer">
				<u-loading mode="circle" color="#df1215" size="80"></u-loading>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				pic:[],
				loaded:false,
				// 顶部导航栏
				title1: '找室友',
				backText: '',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				useSlot: false,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(118, 187, 187), rgb(156, 198, 130))'
				},
				isBack: true,
				search: false,
				custom: true,
				isFixed: true,
				keyword: '',
				list: [{
					
				}],
				user: {
					studentid:''
				},
				liked: [{
					
				}],
				pic:[],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [{
					text: '点赞',
					style: {
						backgroundColor: '#007aff'
					}
				}]
			};
		},
		methods: {
			 navigateToProfile() {
			        // 跳转到完善个人资料页面
			        uni.navigateTo({
			          url: '/pages/frmv/collect'
			        });
			      },
			click(index) {
				this.list[index].show = false;
				this.liked=this.list[index];
				uni.request({
					url:'http://192.168.1.163:8083/changeLikes',
					data:this.liked,
					method:'POST'
				})
				this.$u.toast(`点赞成功`);
			},
			getpic(userId) {
				    return new Promise((resolve, reject) => {  
						let vm=this;
				        let url = `http://192.168.50.101:8090/auth/getImageById?id=${userId}`;  
				        uni.request({  
				            url: url,  
				            method: 'GET',  
				            responseType: 'arraybuffer',  
				            success: (res) => {  
				                if (res.statusCode === 200) {  
				                    const base64 = uni.arrayBufferToBase64(res.data);  
				                    const imageUrl = `data:image/png;base64,${base64}`; 
									vm.pic[userId] = imageUrl; 
									console.log('get:',userId);
				                    // 假设你有一个地方来存储这些图片URL，这里我们直接解析Promise  
				                    // 但在实际应用中，你可能想将其存储在Vue的data属性或其他地方  
				                    resolve(imageUrl); // 解析Promise，传递图片URL  
				                } else {  
				                    console.log('获取失败');
									resolve(vm.pic[userId]); // 解析Promise，传递图片URL  
									//reject(new Error(`Server returned status code ${res.statusCode}`)); // 拒绝Promise，传递错误信息  
				                }  
				            },  
				            fail: (err) => {  
								console.log('连接错误');
				                reject(err); // 网络错误或请求失败时拒绝Promise  
				            }  
				        });  
				    });  
				},
				getallpic()
				{ 	
					let vm=this;
					vm.loaded=false;
					//console.log(vm.commentList);
					console.log(vm.list.length,'头像');
						let promises = vm.list.map(comment => {  
						  return vm.getpic(comment.id);  
						});  
						Promise.all(promises).then(() => {  
						  console.log("所有图片都已加载完成");
						  	vm.loaded=true;
						}).catch(error => {  
						  console.error('加载图片时发生错误:', error);  
						});
				},
			
		},

		onShow() {
			const value7=uni.getStorageSync('user');
			console.log(value7);
			console.log(value7.dormitory);
			if (value7.dormitory  === '') {
			        this.show = true;
			        console.log('dormitory 为空，不继续执行');
			        return;
			      }
			this.user.studentid=value7.studentId;
			console.log('查到了user为：',value7.studentId)
			uni.request({
				url:'http://192.168.50.101:8090/auth/selectdormitory',
				data:this.user,
				method:'POST',
				success:(result)=> {
					console.log(result);
					const person_list = result.data.result;
					console.log('查到了person_list为：',person_list)
					this.list = person_list;
					this.getallpic();
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	.holecontainer {
		flex-direction: column;
	  display: flex;  
	  justify-content: center; /* 水平居中 */  
	  align-items: center; /* 垂直居中 */  
	  height: 20vh; /* 占据整个视窗的高度 */  
	  padding: 80px 100px 0;
	  //position: relative; /* 设置为相对定位，以便子元素可以使用绝对定位 */
	}  
	.item {
		display: flex;
		padding: 20rpx;
	}

	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}

	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
	.popup-container {
	  background-color: #fff;
	  padding: 20px;
	  border-radius: 10px;
	  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
	
	.popup-content {
	  text-align: center;
	  font-size: 18px;
	  color: #333;
	  margin-bottom: 20px;
	  line-height: 1.5;
	}
	
	.popup-button-container {
	  text-align: center;
	}
	
	.popup-button {
	  background-color: #a6d1ff;
	  color: #fff;
	  border: none;
	  padding: 10px 20px;
	  border-radius: 5px;
	  font-size: 16px;
	}
	
	.popup-button:hover {
	  background-color: #6786b3;
	}
</style>