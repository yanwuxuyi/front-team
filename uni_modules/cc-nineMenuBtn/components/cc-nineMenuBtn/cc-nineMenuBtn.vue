<template>
	<view class="CCBImgText" @click="btnClick(myText)">
		<image class="userIcon" :style="{width:size +'rpx', height:size + 'rpx'}" :src="imgSrc"></image>
		
		<view  v-if="(myFlag > 0)" class="numflag" :style="{marginLeft:(size/2 + 12) +'rpx'}">{{myFlag}}</view>
		
		<view  class="userName" :style="{marginTop:offsetY+'rpx' ,fontSize:font + 'rpx'}">{{myText}}</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			
			// 图片
			imgSrc: {
				type: String,
				default: ""
			},
			// 文字
			myText: {
				type: String,
				default: ""
			},
			// 文字字体大小
			font: {
				type: [Number, String],
				default: 24
			},
			// 菜单右上角
			myFlag: {
				type: [Number, String],
				default: 0
			},
			// 图片尺寸
			size: {
				type: [Number, String],
				default: 64
			},
			// 文字Y轴偏移
			offsetY: {
				type: [Number, String],
				default: 12
			},
			

		},
		data() {
			return {

			};
		},
		methods:{
			
			btnClick(name){
				// 传值菜单名称
				this.$emit('click', name)
				
			}
		}
	}
</script>

<style>
	page{
		font-family: PingFangSC-Regular, PingFang SC;
	}
	.CCBImgText{
		display: flex;
		flex-direction: column;
		width: calc((100vw - 24px)/4);
		text-align: center;
	}
	.userName {
	
		width: auto;
		height: 28px;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #4F4F53;
		line-height: 18px;
		
		justify-content: center;
		align-self: center;
	}

	.userIcon {
		justify-content: center;
		align-self: center;
		width: auto;
		height: 28px;
		margin-top: 10px;
	}
	
	.numflag{
		position: absolute;
		width: 16px;
		height: 16px;
		line-height: 16px;
		background-color: #ff4500;
		border-radius: 9px;
		text-align: center;
		
		color: white;
		font-size: 10px;
		margin-top: 0px;
		
		justify-content: center;
		align-self: center;
	}
</style>
