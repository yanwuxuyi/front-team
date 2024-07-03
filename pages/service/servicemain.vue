<template>
	<view>
	<view class="service-center">
		<!-- 服务列表，每行四个 -->
		<view class="service-list">
			<view class="service-header">
				<text>公共服务</text>
			</view>
			<view class="service-row">
				<a href="http://lib.cqu.edu.cn/index" class="service-linkitem">
					<view class="service-icon-container">
						<image class="service-icon" src="/static/service/library.png" mode="aspectFit"></image>
						<text class="service-name">借图书</text>
					</view>
				</a>
				<!-- 类似地添加其他三个图标和功能 -->
				<navigator url="/pages/index/test2" class="service-item">
					<view class="service-icon-container">
						<image class="service-icon" src="/static/service/Q&A.png" mode="aspectFit"></image>
						<text class="service-name">答疑处</text>
					</view>
				</navigator>
				<navigator url="/pages/service/teachplan" class="service-item">
					<view class="service-icon-container">
						<image class="service-icon" src="/static/service/teachplan.png" mode="aspectFit"></image>
						<text class="service-name">查方案</text>
					</view>
				</navigator>
			</view>
			<!-- 第二行 -->
			<view class="service-header">
				<text>学校信息</text>
			</view>
			<view class="service-row">
				<navigator url="/pages/service/schoolbus" class="service-item">
					<view class="service-icon-container">
						<image class="service-icon" src="/static/service/schoolbus.png" mode="aspectFit"></image>
						<text class="service-name">查校车</text>
					</view>
				</navigator>
				<!-- 类似地添加其他三个图标和功能 -->
				<navigator url="/pages/service/schoolinfo" class="service-item">
					<view class="service-icon-container">
						<image class="service-icon" src="/static/service/schoolinfo.png" mode="aspectFit"></image>
						<text class="service-name">看学校</text>
					</view>
				</navigator>
				<navigator url="/pages/service/map" class="service-item">
					<view class="service-icon-container">
						<image class="service-icon" src="/static/service/map.png" mode="aspectFit"></image>
						<text class="service-name">搜地图</text>
					</view>
				</navigator>
			</view>
			<!-- 第三行 -->
			<view class="service-header">
				<text>找朋友</text>
			</view>
			<view class="service-row">
				<navigator url="/pages/service/samehometown" class="service-item">
					<view class="service-icon-container">
						<image class="service-icon" src="/static/service/samehometown.png" mode="aspectFit"></image>
						<text class="service-name">找老乡</text>
					</view>
				</navigator>
				<!-- 类似地添加其他三个图标和功能 -->
				<navigator url="/pages/service/similarinterests" class="service-item">
					<view class="service-icon-container">
						<image class="service-icon" src="/static/service/similarinterests.png" mode="aspectFit"></image>
						<text class="service-name">找同好</text>
					</view>
				</navigator>
				<navigator url="/pages/service/dormmate" class="service-item">
					<view class="service-icon-container">
						<image class="service-icon" src="/static/service/dormmate.png" mode="aspectFit"></image>
						<text class="service-name">找舍友</text>
					</view>
				</navigator>
			</view>
		</view>
	</view>

	</view>
</template>

<script>
	export default {
		// 数据和方法保持不变  
	}
</script>

<style scoped>
	.service-center {
		display: flex;
		align-items: center;
		/* 垂直居中（如果只有一个行项目时有效） */
		flex-direction: column;
		/* 如果需要垂直堆叠多个服务列表（例如，分页时）*/
		height: 100vh;
		/* 假设你想让服务列表占据整个视口高度 */
		padding: 10px;
		/* 可选，根据需要调整 */
	}

	.service-header text {
		font-size: 18px;
		/* 示例字体大小 */
		font-weight: bold;
		/* 可选，加粗标题 */
	}

	.service-header {
		width: 100%;
		/* 确保标题占据整行 */
		text-align: center;
		/* 可选，根据设计需求调整 */
		margin-bottom: 10px;
		/* 与下面的功能模块保持一定的间距 */
	}

	.search-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.search-input {
		flex: 1;
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.search-btn {
		padding: 8px 15px;
		background-color: #007aff;
		color: #fff;
		border: none;
		border-radius: 5px;
	}

	.service-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		/* 根据需要调整间距 */
		justify-content: center;
		/* 在主轴上居中（水平方向） */
		max-width: 100%;
		/* 确保不会超出容器宽度 */
		margin: 0 auto;
		/* 可选，用于在水平方向上进一步居中（如果.service-center没有足够的高度）*/
	}

	.service-row {
		display: flex;
		margin-bottom: 10px;
		/* 模块之间的间距 */
	}

	.service-item {
		flex: 1 0 calc(25% - 10px);
		/* flex-grow, flex-shrink, flex-basis; 这里flex-basis是计算后的宽度，减去间距 */
		background-color: #f0f0f0;
		border-radius: 8px;
		margin: 5px;
		/* 模块之间的间距 */
		text-align: center;
		padding: 20px;
		box-sizing: border-box;
		/* 包括padding和border在内计算元素的总宽度和高度 */
	}

	.service-linkitem {
		flex: 1 0 calc(25% - 10px);
		/* flex-grow, flex-shrink, flex-basis; 这里flex-basis是计算后的宽度，减去间距 */
		background-color: #f0f0f0;
		border-radius: 8px;
		margin: 5px;
		/* 模块之间的间距 */
		text-align: center;
		padding: 20px;
		box-sizing: border-box;
		/* 包括padding和border在内计算元素的总宽度和高度 */
		text-decoration: none;
		/* 移除下划线 */
		color: inherit;
		/* 继承父元素的颜色，或者设置为具体的颜色 */
		display: block;
		/* 使整个区域可点击 */
	}


	.service-icon-container {
		display: flex;
		flex-direction: column;
		/* 垂直堆叠图标和文字 */
		align-items: center;
		/* 图标和文字居中显示 */
	}

	.service-icon {
		width: 35px;
		/* 图标宽度 */
		height: 35px;
		/* 图标高度 */
	}

	.service-name {
		font-size: 14px;
		color: #333;
		/* 文本颜色 */
	}

	/* 其他样式保持不变 */
</style>