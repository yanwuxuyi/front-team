

<template>
  <view >	  
  
		<view class="content">
			<u-sticky  class="sticky-header">
				<view class="comment1">
					<view class="left1">
						<u-avatar  :src="imgDataUrl" shape="circle" size=100>
						</u-avatar>
					</view>
					<view class="right1" @click="uploadImage">
						<button >提交</button>
					</view>
				</view>
			</u-sticky>
		</view>
		<view style="padding: 20px;">
			<button  @click="chooseImg"> 
				选择本地
			</button>
		</view>



	  <u-grid :col="3">
	    <u-grid-item v-for="index in 18" :key="index">
	  	<view class="image-item" @tap="selectheadpic('/static/images/headpic/'+index+'.PNG')">
	  	  <view class="image-content">
	  		<image style="width: 120px; height: 150px; background-color: #eeeeee;" mode="aspectFill" :src="'/static/images/headpic/'+index+'.PNG'" @error="imageError" ></image>
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
				// 储存最后裁剪的数据 base64
				imgDataUrl: "",
				studentId:"20240002",
				
				mode: 'round',
				action: '',
				filesArr: [], 

			}
		},
	
		methods: {

			     chooseImg() {
			          const that = this;
			          uni.navigateTo({
			            url: "../../uni_modules/buuug7-img-cropper/pages/cropper",
						
			            events: {
			              imgCropped(event) {
			                // 监听裁剪完成
			                // 返回的 event 中包含了已经裁剪好图片的base64编码字符串
			                console.log(event,'11');
			                that.imgDataUrl = event.data;
			                // upload
			              },
			            },
			          });
			        },
		    // 上传图片  
		    uploadImage() {  
				let that=this;
		      const uploadUrl = 'http://192.168.50.101:8090/auth/uploadImage'; 
		      console.log(this.imgDataUrl);
			  uni.uploadFile({  
		        url: uploadUrl, 
		        filePath: this.imgDataUrl,  
		        name: 'image', 
		        formData: {  
		          'user': 'test' ,// 其他需要传递的参数  
				  'studentId':this.studentId,
		        },  
		        success: (uploadRes) => {  
		          
		          console.log('uploadImage success:', uploadRes.data); 
				   const value5 = uni.getStorageSync('user');
				   value5.fileData=that.imgDataUrl;
				   uni.setStorageSync('user',value5);
		          
				    uni.request({
				    	url:'http://192.168.50.101:8090/chat/uploadWithNull'
				    })
					uni.switchTab({
				    	url: '/pages/frmv/myinfo'
				    })
		        },  
		        fail: (err) => {  
		          console.error('uploadImage fail:', err);  
		          // 上传失败的处理  
		        }  
		      });  
		    }  ,
					
			selectheadpic(filepath) {
				//console.log('选择的是第',index,'张图片');
				this.imgDataUrl=filepath;
				console.log(filepath);

			}
		},
		onLoad() {
			const value4=uni.getStorageSync('user');
			console.log('获取到了user信息为：',value4);
			this.studentId=value4.studentId;
			this.imgDataUrl=value4.fileData;
			//console.log('头像信息为：',this.imgDataUrl);
		}
	}
</script>

<style scoped lang="scss">
	.sticky-header {  
	  //Color:#3c9cff;
	  position: fixed;  
	  top: 0;  
	  left: 0;  
	  right: 0;  
	  z-index: 10; /* 确保吸顶区域位于其他内容之上 */  
	  background-color: #a0cfff; /* 非透明背景色 */  
	  display: flex;  
	  align-items: center;  
	  justify-content: space-between;  
	  padding: 40rpx;  
	  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 可选，添加阴影效果 */  
	}
	.content{
		 padding: 50px;  
	}
	.comment1 {
		display: flex;
		padding: 10rpx;
		.left1 {
			//width: 64rpx;
			left: 10;
		}
		.right1 {
			flex: 1;
			padding-left: 400rpx;
			font-size: 20rpx;
		}
	}

</style>