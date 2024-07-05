<template>
	<view>
		<view  class="musk" v-if="submitting" >
			<view class="holecontainer">
				<view class="wrongcircle" >
					<u-icon class="icon" name="chrome-circle-fill" size="162" color="black"></u-icon>
				</view>
				<text class="wrongnormal">正在上传</text>
			</view>
		</view>
		<view class="mask2" >
			<image  class="backpic"src="https://img.tukuppt.com/ad_preview/00/14/60/5e5735629c863.jpg!/fw/980"></image>
				<view class="textin">
				    <view class="image-container">  
							<image class="paper-image" :src="inputstylist[ind].src" mode="aspectFill"></image>  
							<view class="transparent-input-container">  
								<textarea  @input="handleInput"  :value="moto"   v-model="moto"  auto-height="true" :class="inputstylist[ind].styinput" placeholder="在此输入..."></textarea>
							</view>  
				    </view>  
					<view class="word-count">
						<text :class="{ 'exceed-limit': this.moto.length >= 80 }">{{ this.moto.length }}/80</text>  
					</view>  
					<view class="uploadbut" @click="upLoadeMoto()">提交</view>  
		
					<view class="imagecontainer">
						<u-divider  borderColor="#e6cf7c" bg-color="rgba(255, 255, 255, 0.0" class="divd"
						half-width=350 color="#009900" font-size="34">一些推荐</u-divider>
						<view class="image-row" v-for="(image, index) in inputstylist" :key="index" v-if="index % 2 === 0">
						  <image class="image-item" :src="image.src" mode="aspectFit" @click="clicktye(index)"></image>  
						  <image class="image-item" :src="inputstylist[index + 1].src"  @click="clicktye(index+1)" mode="aspectFit" v-if="index + 1 < inputstylist.length"></image>  
						</view>  
					</view>
		
				</view>
		</view>
	</view>
	
</template>

<script>
	export default {
			data() {
				return {
					likes:111,
					loaded:false,
					user:{
						
					},
					submitting:false,
					  //账户编码
					id:0,
					//账号和签名
					moto:"命运的馈赠早已在暗中标好价码",
					account:"948682907",
					

					//修改签名
					nochangemoto:true,
					//样式
					ind:5,
					inputstylist:[
						{
							src:"../../static/icon/sun.png",
							styinput:"transparent-input0",
						},
						{
							src:"https://ts1.cn.mm.bing.net/th/id/R-C.682738bba2a524b49a72bb356ec05545?rik=bIgZvdWcCHbfcw&riu=http%3a%2f%2fpic.616pic.com%2fphotoone%2f00%2f01%2f15%2f618cec6662f573232.jpg!%2ffw%2f1120&ehk=SMaI6BPBPi4tUwZpu%2fX1Ed8X%2biF121aV4LWJ4nh2eWc%3d&risl=&pid=ImgRaw&r=0",
							styinput:"transparent-input1",
						},
						{
							src:"https://bpic.588ku.com/back_pic/06/04/04/7360e3bfe034eb1.jpg",
							styinput:"transparent-input2",
						},
						{
							src:"data:image/jpeg;base64,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",
							styinput:"transparent-input3",
						},
						{
							src:"../../static/images/motopic4.jpg",
							styinput:"transparent-input4",
						},
						{
							src:"https://img.51miz.com/Element/00/58/82/16/9006806c_E588216_6e974d99.jpg",
							styinput:"transparent-input5",
						},
					],
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
	
				}
			},
			methods: {
				clicktye(index)
				{
					this.ind=index;
				},
				handleInput(e) {  
				  // 监听输入事件，但注意：这里直接修改e.detail.value可能不会生效  
				  // 因为v-model已经绑定了inputValue，并且uni-app的textarea组件可能会处理这个值  
				  // 但我们可以在这里检查长度，并给出提示  
				  if (this.moto.length > 80) {  
					// 如果需要，可以在这里截断输入值  
					// 但由于v-model的双向绑定，用户可能会再次修改，所以更好的做法是给出提示  
					// this.inputValue = this.inputValue.slice(0, 80); // 截断字符串  \
					this.moto = this.moto.slice(0, 120);
					uni.showToast({  
					  title: '输入内容已超出限制（80字）',  
					  icon: 'none'  
					});  
					
				  }  
				  // 注意：实际上，由于v-model的绑定，你通常不需要在这里修改inputValue  
				  // 除非你想要在用户输入时就立即截断超出长度的部分  
				},  
				upLoadeMoto()
				{
					this.submitting=true;
					let userId=this.id;
					if(this.moto)
					{
						let url = `http://192.168.50.101:8090/auth/upqqsign?id=${userId}&qqsign=${this.moto}`;  
						uni.request({  
							url: url,  
							method: 'GET',  
							success: (res) => {  
								console.log(res);
								if (res.statusCode === 200) {  
									console.log('uploadoto:',userId);
									this.submitting=false;
									uni.navigateTo({
									  url: '/pages/forum/me'
									});
								} else {  
									this.submitting=false;
									console.log('上传失败',userId)
								}  
							},  
							fail: (err) => {  
								this.submitting=false;
								console.log('网络失败：moto',userId) 
								
							}  
						});  
					}
				
				},
	},
}
</script>

<style>
	.uploadbut
	{
  position: absolute; /* 使用绝对定位将按钮放置在右上角 */  
  top: 2%; /* 距离顶部多少距离，根据需要调整 */  
  right: 3%; /* 距离右侧多少距离，根据需要调整 */  
  padding: 5px 10px; /* 按钮内边距，根据需要调整 */  
  border-radius: 5px; /* 圆角大小，根据需要调整 */  
  background-color: #55cee6; /* 天蓝色填充 */  
  color: #fff; /* 文字颜色，这里设置为白色以便在天蓝色背景上清晰可见 */  
  font-size: 16px; /* 文字大小，这里使用16px作为示例 */  
  text-align: center; /* 文字居中显示，对于按钮来说是默认的，但明确写出来可以增加可读性 */
	}
	
	.backpic{
		position: fixed;
		width: 100%;  
		height: 100%;
		z-index: -1;  
	}
	.mask2 {
	  position: absolute;  
	  width: 100%;
	  height: 100%;
	  opacity: 0.5; /* 假设我们想要一个半透明的蒙版 */  
	  z-index: 1; /* 确保蒙版位于输入框和按钮下方 */  
	}  
	.textin{
		  display: flex;  
		  flex-direction: column;  
		  height: 100vh; /* 使得容器高度充满整个视口 */  
		  justify-content: space-between; /* 实际上这里用不到，但为了说明flex布局 */  
	}
	.pace{

	}
	.image-container {  
	  z-index: 2;
	  position: relative; 
	  top: 8%;
	  //padding-top: 20%;
	  height: 20vh; /* 页面从上到下1/3的高度 */  
	  left: 5%;
	  right: 5%;
	  width: 90%;  
/* 	  //background-color:  rgba(28, 207, 216, 0.1);; */
	  overflow: hidden; /* 防止图片溢出 */  
	}  
	  
	.paper-image {  
	  width: 100%;  
	  height: 100%;  
	  object-fit: cover; /* 保持图片4/3的比例同时填满容器 */  
	}  
	  
	.transparent-input-container {  
	  position: absolute;  
	  top: 50%; 
	  left: 50%;  
	  width: 90%; /* 输入框宽度 */  
	  height: 40px; /* 输入框高度，根据需要调整 */  
	  display: flex;   
	  transform: translate(-50%, -50%); /* 居中输入框 */  
	  align-items: center; /* 垂直居中 */  
	  justify-content: center; /* 水平居中（如果输入框内容需要） */  
	}  
	  
	.transparent-input0 {  
	  background-color: rgba(255, 255, 255, 0.1); /* 半透明背景 */  
	  border: none; /* 去除默认边框 */  
	  color: black; /* 字体颜色 */  
	  font-weight: bold;
	  width: 100%; /* 填满父容器 */  
	  height: 100%; /* 填满父容器 */  
	  padding: 10px; /* 文本内边距 */  
	  box-sizing: border-box; /* 包括内边距和边框在内的总宽度和总高度 */  
	}  
	
	.word-count {  
	  position: absolute;  
	  top: 5%; /* 根据需要调整 */  
	  left: 3%; /* 根据需要调整 */  
	  font-size: 14px; /* 根据需要调整 */  
	  color: #666; /* 默认颜色 */  
	}  
	.exceed-limit {  
	  color: red; /* 超出限制时的颜色 */  
	}  
	
	.transparent-input1 {
	  background-color: rgba(0, 0, 0, 0.1); /* 半透明背景 */  
	  border: none; /* 去除默认边框 */  
	  color: whitesmoke; /* 字体颜色 */  
	  font-weight: bold;
	  width: 100%; /* 填满父容器 */  
	  height: 100%; /* 填满父容器 */  
	  padding: 10px; /* 文本内边距 */  
	  box-sizing: border-box; /* 包括内边距和边框在内的总宽度和总高度 */  
	}  
	
	.transparent-input2 {
	  background-color: rgba(255, 255, 255, 0); /* 半透明背景 */  
	  border: none; /* 去除默认边框 */  
	  color: green; /* 字体颜色 */  
	  font-weight: bold;
	  width: 100%; /* 填满父容器 */  
	  height: 100%; /* 填满父容器 */  
	  padding: 10px; /* 文本内边距 */  
	  box-sizing: border-box; /* 包括内边距和边框在内的总宽度和总高度 */  
	}  
	
	
	.transparent-input3 {
	  background-color: rgba(249, 105, 237, 0.1); /* 半透明背景 */  
	  border: none; /* 去除默认边框 */  
	  color: hotpink; /* 字体颜色 */  
	  font-weight: bold;
	  width: 100%; /* 填满父容器 */  
	  height: 100%; /* 填满父容器 */  
	  padding: 10px; /* 文本内边距 */  
	  box-sizing: border-box; /* 包括内边距和边框在内的总宽度和总高度 */  
	}  
	
	.transparent-input4 {
	  background-color: rgba(255, 255, 255, 0.1); /* 半透明背景 */  
	  border: none; /* 去除默认边框 */  
	  color: skyblue; /* 字体颜色 */  
	  font-weight: bold;
	  width: 100%; /* 填满父容器 */  
	  height: 100%; /* 填满父容器 */  
	  padding: 10px; /* 文本内边距 */  
	  box-sizing: border-box; /* 包括内边距和边框在内的总宽度和总高度 */  
	}  
	.transparent-input5 {
	  border: none; /* 去除默认边框 */  
	  color: gold; /* 字体颜色 */  
	  font-weight: bold;
	  width: 100%; /* 填满父容器 */  
	  height: 100%; /* 填满父容器 */  
	  padding: 10px; /* 文本内边距 */  
	  box-sizing: border-box; /* 包括内边距和边框在内的总宽度和总高度 */  
	}  
	
	
	.imagecontainer {  
	  display: flex;  
	  flex-direction: column;  
	  position: absolute;
	  left: 0;
	  width: 100%;
	  top: 35%;
	}  
	  
	.image-row {  
	  display: flex;  
	  justify-content: space-between; /* 或者使用flex-start, center, space-around等根据需求 */  
	  align-items: center; /* 如果需要的话，对齐方式可以根据实际情况调整 */  
	  margin-bottom: 10px; /* 每一行之间的间距 */  
	}  
	  
	.image-item {  
	  flex: 1; /* 让图片等宽分布 */
	  left: 2%;
	  height: 15vh;
	  width: 48%; /* 假设你想要每张图片占满其容器的一半减去一些间隔（这里没有写间隔） */  
	  margin-right: 4%; /* 右边距，最后一列不需要，可以通过条件渲染避免 */  
	  box-sizing: border-box; /* 包括内边距和边框在内的总宽度 */  
	}  
	
	.divd{
		bottom: 30rpx;
	}
	.musk {
	  position: absolute;  
	  width: 100%;
	  height: 235%;
	  background-color: rgba(0, 0, 0, 0.8); /* 黑色半透明背景 */  
	  opacity: 0.5; /* 假设我们想要一个半透明的蒙版 */  
	  z-index: 4; /* 确保蒙版位于输入框和按钮下方 */ 
	   width: 100%; /* 确保横向覆盖整个屏幕 */
	}  
	.holecontainer{
		flex-direction: column;
		 display: flex;  
		 justify-content: center; /* 水平居中 */  
		 align-items: center; /* 垂直居中 */  
		 //height: 20vh; /* 占据整个视窗的高度 */  
		 padding-top: 50%;
		 z-index: 5;
	}
	.wrongcircle {
		background-color: rgba(75, 255, 195, 0.8);
		border-radius: 200rpx;
		width: 160rpx;
		height: 160rpx;
		align-items: center;
		justify-content: center;
		//margin-top: 20rpx;
		/* 应用动画 */
		position: relative; /* 设置为相对定位，以便子元素可以使用绝对定位 */
	}
	
	.wrongnormal {
		color: rgba(75, 255, 195, 0.8);
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