<template>
	<view>
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		
		<view v-if="current==1" class="container">
			<!-- 校训部分 -->
			<view class="section">
				<text class="title">校训</text>
				<image class="image" src="/static/service/xiaoxun.jpg" mode="aspectFit"></image>
				<text class="content">耐劳苦、尚俭朴、勤学业、爱国家</text>
			</view>
		
			<!-- 校风部分 -->
			<view class="section">
				<text class="title">校风</text>
				<image class="image" src="/static/service/xiaofeng.png" mode="aspectFit"></image>
				<text class="content">团结、勤奋、求实、创新</text>
			</view>
		
			<!-- 学风部分 -->
			<view class="section">
				<text class="title">学风</text>
				<image class="image" src="/static/service/xuefeng.jpg" mode="aspectFit"></image>
				<text class="content">求知、求精、求实、求新</text>
			</view>
		</view>
		<view v-if="current==2">
			<u-image width="100%" height="1100rpx" src="/static/service/schoolinfophone.png"></u-image>
		</view>
		<view v-if="current==0">
		
			<view>
				<u-image width="100%" height="500rpx" src="/static/service/schoolinfo.jpg"></u-image>
			</view>
			<view class="container">
				<!-- 校训部分 -->
				<view class="section">
					<text class="title">重大概况</text>
				</view>
				<view class="text-container">
					<text
						class="content">重庆大学是中央直管、教育部直属的全国重点大学。学校创办于1929年，提出建设“完备弘深之大学”的愿景，到20世纪40年代发展成为文理工商法医各学科齐全的综合性大学。</text>
				</view>
			</view>
			<view class="container">
				<view class="section">
					<text class="title">人才培养</text>
				</view>
				<view class="section">
					<view class="text-container">
						<text class="left-text">
							重庆大学已获批学位授权自主审核高校，有一级学科博士学位授权点37个、博士专业学位授权点9个，硕士学位授权点48个，专业学位授权点27个；博士生年招生规模达1150余人。
						</text>
					</view>
					<image class="right-image" src="/static/service/rencai.jpg"></image>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '学校简介'
				}, {
					name: '校训校风学风'
				},
				{
					name:'各部门电话'
				}],
				current: 1
			};
		},
		onLoad() {},
		methods: {
			change(index) {
				console.log(index);
				this.current = index; // 更新当前选中的标签索引
				switch (index) {
					case 0:
						// 跳转校训
						break;
					case 1:
						// 跳转
						break;
					case 2:
							// 跳转
							break;
					default:
						// 默认操作
						break;
				}

			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
	}
	
	.section {
		margin-bottom: 20px;
		width: 90%;
		/* 控制每一部分的宽度 */
		text-align: center;
	}
	
	.title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
	}
	
	.image {
		width: 100%;
		/* 图片宽度自适应 */
		height: 200px;
		/* 图片高度固定，根据需求调整 */
		margin-bottom: 10px;
	}
	
	.content {
		font-size: 16px;
		line-height: 1.5;
	}
</style>


