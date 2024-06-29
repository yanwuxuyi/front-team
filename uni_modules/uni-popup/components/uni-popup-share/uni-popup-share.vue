<template>
	<view class="uni-popup-share">
		<view class="uni-share-title"><text class="uni-share-title-text">{{shareTitleText}}</text></view>
		<view class="uni-share-content">
			<view class="uni-share-content-box">
				<view class="uni-share-content-item" v-for="(item,index) in bottomData" @click='click(index)':key="index">
					<image class="uni-share-image" :src="item.icon" mode="aspectFill"></image>
					<text class="uni-share-text">{{item.text}}</text>
				</view>

			</view>
		</view>
		<view class="uni-share-button-box" >
			<button class="uni-share-button" v-show="false" @click="close">{{cancelText}}</button>
		</view>
	</view>
</template>

<script>
	import popup from '../uni-popup/popup.js'
	import {
	initVueI18n
	} from '@dcloudio/uni-i18n'
	import messages from '../uni-popup/i18n/index.js'
	const {	t	} = initVueI18n(messages)
	export default {
		name: 'UniPopupShare',
		mixins:[popup],
		emits:['select'],
		props: {
			title: {
				type: String,
				default: ''
			},
			beforeClose: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				bottomData: [{
						text: '找老乡',
						icon: 'https://i.postimg.cc/QNPHCF3L/image.png',
						name: 'wx'
					},
					{
						text: '找同好',
						icon: 'https://i.postimg.cc/BnjpDL8x/image.png',
						name: 'interests'
					},
					{
						text: '校园地图',
						icon: 'https://i.postimg.cc/bJPNknvr/image.png',
						name: 'qq'
					},
					// {
					// 	text: '新浪',
					// 	icon: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/0dacdbe0-50bf-11eb-8ff1-d5dcf8779628.png',
					// 	name: 'sina'
					// },
					// {
					// 	text: '百度',
					// 	icon: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/1ec6e920-50bf-11eb-8a36-ebb87efcf8c0.png',
					// 	name: 'copy'
					// },
					// {
					// 	text: '其他',
					// 	icon: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/2e0fdfe0-50bf-11eb-b997-9918a5dda011.png',
					// 	name: 'more'
					// }
				]
			}
		},
		created() {},
		computed: {
			cancelText() {
				return "返回"
			},
		shareTitleText() {
				return this.title || t("uni-popup.shareTitle")
			}
		},
		methods: {
			/**
			 * 选择内容
			 */
			select(item, index) {
				this.$emit('select', {
					item,
					index
				})
				this.close()

			},
			click(index){
				if(index==0){
					uni.navigateTo({
						url:'../../../../../pages/frmv/natives'
					})
				}
				else if(index==1){
					uni.navigateTo({
						url:'../../../../../pages/frmv/similarinterests'
					})
				}
				else{
					uni.navigateTo({
						url:'../../../../../pages/frmv/map'
					})
				}
				},
			/**
			 * 关闭窗口
			 */
			close() {
				if(this.beforeClose) return
				this.popup.close()
			}
		}
	}
</script>
<style lang="scss" >
	.uni-popup-share {
		background-color: #68a0ba;
	}
	.uni-share-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 70px;
	}
	.uni-share-title-text {
		font-size: 18px;
		color: #ffff7f;
	}
	.uni-share-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 10px;
	}

	.uni-share-content-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		width: 360px;
	}

	.uni-share-content-item {
		width: 120px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		padding: 10px 0;
		align-items: center;
	}

	.uni-share-content-item:active {
		background-color: #f5f5f5;
	}

	.uni-share-image {
		width: 95rpx;
		height: 95rpx;
	}

	.uni-share-text {
		margin-top: 10px;
		font-size: 16px;
		color: #ffff7f;
	}

	.uni-share-button-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 10px 15px;
	}

	.uni-share-button {
		flex: 1;
		border-radius: 50px;
		color: #ffff7f;
		background-color: #3d307f;
		font-size: 16px;
	}

	.uni-share-button::after {
		border-radius: 50px;
	}
</style>
