# cc-nineMenuBtn


#### 使用方法 
```使用方法
	

<view class="upView" style="background-color: aliceblue;">

<!--使用方法: click:事件 myFlag:标识  myText:文字 imgSrc:图片地址 size:图片尺寸 -->
<cc-nineMenuBtn @click="menuClick(0)" myFlag="12" myText='功能1'
				imgSrc='../../static/jsl_zhpj.png'></cc-nineMenuBtn>
			
</view>
		


```

#### HTML代码实现部分
```html
<template>
	<view class="content">


		<view class="headLine"> 八宫格 </view>

		<view class="upView" style="background-color: aliceblue;">

			<!--使用方法: click:事件 myFlag:标识  myText:文字 imgSrc:图片地址 size:图片尺寸 -->

			<cc-nineMenuBtn @click="menuClick(0)" myFlag="12" myText='功能1'
				imgSrc='../../static/jsl_zhpj.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn @click="menuClick(1)" myText='功能2' imgSrc='../../static/jsl_jsl.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn @click="menuClick(2)" myText='功能3' imgSrc='../../static/jsl_zjl.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn myText='功能4' imgSrc='../../static/jsl_xxl.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn myText='功能5' imgSrc='../../static/jsl_wl.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn myText='功能6' imgSrc='../../static/jsl_nll.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn myText='功能7' imgSrc='../../static/jsl_cxjq.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn myFlag="2" myText='功能8' imgSrc='../../static/jsl_jcxx.png'></cc-nineMenuBtn>

		</view>


		<view class="headLine"> 九宫格 </view>

		<!-- 九宫格菜单功能区 -->
		<view class="upView" style="background-color: antiquewhite;">

			<cc-nineMenuBtn class="nineV" myText='菜单1' imgSrc='../../static/jsl_zhpj.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" myText='菜单2' imgSrc='../../static/jsl_jsl.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" myText='菜单13' imgSrc='../../static/jsl_zjl.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" myText='菜单14' imgSrc='../../static/jsl_xxl.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" myText='菜单15' imgSrc='../../static/jsl_wl.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" myText='菜单16' imgSrc='../../static/jsl_nll.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" myText='菜单17' imgSrc='../../static/jsl_cxjq.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" myFlag="2" myText='菜单18' imgSrc='../../static/jsl_jcxx.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" myFlag="2" myText='菜单18' imgSrc='../../static/jsl_jcxx.png'></cc-nineMenuBtn>


		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				title: 'Hello'
			}
		},

		methods: {

			menuClick(menuName) {

				console.log("点击菜单 = " + menuName)
				uni.showModal({
					title: '温馨提示',
					content: '点击菜单名称 = ' + menuName
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;

	}

	.upView {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-left: 12px;
		width: calc(100vw - 24px);
		margin-top: 10px;
		padding: 4px 0px;
		background-color: white;

	}

	.headLine {

		height: 30px;
		line-height: 30px;
		margin: 10px 15px;
		font-size: 20px;
	}

	.nineV {

		width: calc((100vw - 24px)/3);
	}
</style>



```
