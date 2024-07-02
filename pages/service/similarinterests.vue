<template>
	<view>
<u-popup v-model="show" mode="center" class="popup-container">
      <view class="popup-content">
        未完善个人资料！<br>
        请先完善个人资料！
      </view>
      <view class="popup-button-container">
        <u-button @click="navigateToProfile" class="popup-button">完善资料</u-button>
      </view>
    </u-popup>
		<view>
			<u-navbar title-color="#fff" back-icon-color="#ffffff"
				:is-fixed="isFixed" :is-back="isBack" 
				:background="background" 
				:back-text-style="{color: '#fff'}" :title="title1" 
				:back-icon-name="backIconName" :back-text="backText"
				:border-bottom="false" @click="goIndex()()">
			</u-navbar>
		</view>
		<view class="">
				<u-swipe-action :show="false" :index="index" v-for="(item, index) in list" :key="item.id" @click="click"
					:options="options" :disabled="disabled">
					<view class="item u-border-bottom">
						<image mode="aspectFill" :src="'../../static/images/headpic/'+item.headPicture+'.PNG'" />
						<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
						<view class="title-wrap">
							<text class="title u-line-2" style="font-size: large;">{{ item.name }}</text>
							<text class="title u-line-2">{{ item.interests }}</text>
						</view>
					</view>
				</u-swipe-action>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				// 顶部导航栏
				title1: '找同好',
				backText: '服务中心',
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
				// #ifdef MP
				slotRight: false,
				// #endif
				// #ifndef MP
				slotRight: true,
				list: [{
					
				}],
				user: {
					studentid:''
				},
				liked: [{
					
				}],
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
			}

		},
		onShow() {
			const value7=uni.getStorageSync('user');
			console.log(value7);
			console.log(value7.interests);
			if (value7.interests  === '') {
			        this.show = true;
			        console.log('interest 为空，不继续执行');
			        return;
			      }
			this.user.studentid=value7.studentId;
			console.log('查到了user为：',value7.studentId)
			uni.request({
				url:'http://192.168.50.101:8090/auth/selectinterests',
				data:this.user,
				method:'POST',
				success:(result)=> {
					console.log(result);
					const person_list = result.data.result;
					console.log('查到了person_list为：',person_list)
					this.list = person_list;
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
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