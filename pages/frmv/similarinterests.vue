<template>
	<view>
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
				// 顶部导航栏
				title1: '找同好',
				backText: '首页',
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
					phone:''
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
			this.user.phone=value7.phone;
			console.log('查到了user为：',value7.phone)
			uni.request({
				url:'http://192.168.1.163:8083/querySimilarInterest',
				data:this.user,
				method:'POST',
				success:(result)=> {
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
</style>