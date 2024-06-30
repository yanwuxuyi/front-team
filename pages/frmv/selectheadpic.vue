<template>
  <view>
	  <view class="text-tip" :action="action" style="text-align: left; margin: 10px 0;">
	    请选择自己的头像:
	  </view>
    	<u-upload ref="uUpload"  :auto-upload="true" max-count="1" ></u-upload>
    	<u-button @click="submit">提交</u-button>
    <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" />

    <view class="text-tip" style="text-align: left; margin-bottom: 20px;">
      推荐的头像在下面的列表中:
    </view>
    <u-grid :col="3">
      <u-grid-item v-for="index in 18" :key="index">
        <view class="image-item" @tap="selectheadpic(index)">
          <view class="image-content">
            <image style="width: 120px; height: 150px; background-color: #eeeeee;" mode="aspectFill" :src="'/static/images/headpic/'+index+'.PNG'" @error="imageError"></image>
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
				action: '',
				action1: 'http://192.168.50.101:8090/auth/updateheadpicture',
				filesArr: [], 
				user:{
					headPicture:'',
					phone:''
				}

			}
		},
		methods: {
				async submit() {
				// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
				let files = this.$refs.uUpload.lists.filter(val => val.progress == 100);
				this.headPicture = files
				const value5 = uni.getStorageSync('user')
				this.user.phone = value5.phone
				try {
				          const response = await fetch(this.action1, {
				            method: 'POST',
				            data: this.user
				          });
				          
				          const result = await response.json();
				console.log(result);
				console.log(files)
			}catch (error) {
          console.error('Error:', error);
        }},
					
			selectheadpic(index) {
				const value5 = uni.getStorageSync('user')
				console.log('点击后获取到了user信息为：',value5)
				console.log('选择的是第',index,'张图片')
				value5.headPicture=index
				this.user.headPicture=index
				uni.setStorageSync('user',value5)
				uni.request({
					url: 'http://192.168.50.101:8090/auth/updateheadpicture',
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