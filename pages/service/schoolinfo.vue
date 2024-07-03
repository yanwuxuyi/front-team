<template>
	<view>
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>

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
						name: '各部门电话'
					}
				],
				current: 0
			};
		},
		onLoad() {},
		methods: {
			change(index) {
				console.log(index);
				this.current = index; // 更新当前选中的标签索引
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '/pages/service/schoolinfo'
						});
						break;
					case 1:
						uni.navigateTo({
							url: '/pages/service/schoolinfoxiaoxun'
						});
						break;
					case 2:
						// 跳转
						uni.navigateTo({
							url: '/pages/service/schoolinfophone'
						});
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
	.right-image {
		width: 40%;
		margin-left: 5%;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
	}

	.text-container {
		flex: 1;
	}

	.left-image {
		width: 40%;
		margin-right: 5%;
	}

	.paragraph-text {
		text-indent: 2em;
		/* 首行缩进两格 */
		text-align: justify;
		/* 文本两端对齐 */
	}

	.section {
		margin-bottom: 20px;
		width: 90%;
		text-align: center;
		display: flex;
		/* 控制每一部分的宽度 */
	}

	.title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
		text-align: center;
	}

	.image {
		width: 100%;
		/* 图片宽度自适应 */
		height: 200px;
		/* 图片高度固定，根据需求调整 */
		margin-bottom: 10px;
	}

	.left-text {
		text-align: left;
		font-size: 16px;
		line-height: 1.5;
		text-indent: 2em;
	}

	.content {
		font-size: 16px;
		line-height: 1.5;
		text-indent: 2em;
		/* 首行缩进两格 */
		text-align: justify;
		/* 文本两端对齐 */
	}
</style>