<template>
	<view>
		<u-grid :col="3" >
			<u-grid-item v-for="index in 18" :key="index" >
				<view class="image-item" @tap="selectheadpic(index)">
					<view class="image-content">
						<image style="width: 120px; height: 150px;
	background-color: #eeeeee;" mode="aspectFill" :src="'/static/images/headpic/'+index+'.PNG'" @error="imageError"></image>
					</view>
				</view>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mode: 'round',
				user:{
					headPicture:'',
					phone:''
				}

			}
		},
		methods: {
			selectheadpic(index) {
				const value5 = uni.getStorageSync('user')
				console.log('点击后获取到了user信息为：',value5)
				console.log('选择的是第',index,'张图片')
				value5.headPicture=index
				this.user.headPicture=index
				uni.setStorageSync('user',value5)
				uni.request({
					url: 'http://192.168.1.163:8083/chooseHeadPicture',
					data: this.user,
					method: "POST"
				});
				
				uni.navigateBack()
			}
		},
		onLoad() {
			const value4=uni.getStorageSync('user');
			console.log('获取到了user信息为：',value4)
			this.user.phone=value4.phone;
		}
	}
</script>

<style scoped lang="scss">
	
</style>