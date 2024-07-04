<template>
	<view>
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<view class="section">
			<text class="content">你可以点击常见问题以获取答案，也可以点击“AI问答”页面向AI询问。获取更多帮助请访问“其他问题”页面，向我们提问！</text>
		</view>
		<view class="container">
			<view class="card" v-for="(section, sectionIndex) in sections" :key="sectionIndex">
				<view class="card-header">{{ section.title }}</view>
				<view class="card-body">
					<view class="question" v-for="(question, questionIndex) in section.questions"
						:key="`${sectionIndex}-${questionIndex}`" @click="showAnswer(sectionIndex, questionIndex)">
						{{ question.name }}
					</view>
				</view>
			</view>
			<!-- 浮窗显示解答 -->
			<view class="answer-modal" v-if="showModal">
				<view class="modal-content">
					<view class="name">{{ currentQuestion.name }}</view>
					<view class="answer">{{ currentQuestion.answer }}</view>
					<view class="modal-footer">
						<button class="close-btn" @click="closeModal">关闭</button>
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
				sections: [{
						title: '迎新部分',
						questions: [{
								name: '寝室床位',
								answer: '床位分配可以和舍友商量自行决定，确定后填写宿管阿姨发的在线表格即可。桌子上放着的是军训需要用到的被单和床单，在军训的时候需要使用，但是以后可以更换自己的被子和床单。'
							},
							{
								name: '食堂介绍',
								answer: '学校有多个食堂，提供多种美食...'
							},
							{
								name: '电话卡问题',
								answer: '学校会与运营商合作提供电话卡...'
							}
						]
					},
					{
						title: '军训',
						questions: [{
								name: '物资准备',
								answer: '请准备防晒霜、水杯等...'
							},
							{
								name: '如何表现',
								answer: '积极参与，听从指挥...'
							}
						]
					},
					{
						title: '学习',
						questions: [{
								name: '教材购买',
								answer: '可通过学校书店或网上购买...'
							},
							{
								name: '分级考试',
								answer: '考试内容将覆盖基础知识点...'
							},
							{
								name: '抢课指南',
								answer: '具体抢课时间将在教务处公布...'
							},
							{
								name: '绩点计算方法',
								answer: '绩点计算依据课程成绩...'
							}
						]
					}
				],
				showModal: false,
				currentQuestionIndex: null, // 用于记录当前点击的问题索引  
				currentSectionIndex: null, // 用于记录当前点击问题所在的节索引
				modalBottom: '0',
				list: [{
						name: 'AI问答'
					}, {
						name: '常见问题解答'
					},
					{
						name: '其他问题'
					}
				],
				current: 1
			}
		},
		methods: {
			showAnswer(sectionIndex, questionIndex) {
				this.currentSectionIndex = sectionIndex; // 可选，用于其他逻辑  
				this.currentQuestionIndex = questionIndex;
				this.showModal = true;

				// 可以通过索引获取当前问题的详细信息  
				this.currentQuestion = this.sections[sectionIndex].questions[questionIndex];
			},
			closeModal() {
				this.showModal = false;
				// 可选：重置当前问题索引  
				this.currentQuestionIndex = null;
			},
			change(index) {
				console.log(index);
				this.current = index; // 更新当前选中的标签索引
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '/pages/index/test2'
						});
						break;
					case 1:
						uni.navigateTo({
							url: '/pages/service/commonquestions'
						});
						break;
					case 2:
						// 跳转
						uni.navigateTo({
							url: '/pages/service/otherquestion'
						});
						break;
					default:
						// 默认操作
						break;
				}
			}
		}
	}
</script>

<style>
	
	.section {
		margin: 20px;
		width: 90%;
		/* 控制每一部分的宽度 */
		text-align: justify;
	}
	
	
	.content {
		font-size: 16px;
		line-height: 1.5;
		margin-top: 20px;
	}
	.container {
		padding: 20px;
	}

	.card {
		margin-bottom: 20px;
		border: 1px solid #ccc;
		border-radius: 5px;
		overflow: hidden;
	}

	.card-header {
		background-color: #f0f0f0;
		padding: 10px;
		font-weight: bold;
	}

	.card-body {
		padding: 10px;
	}

	.question {
		font-size: 16px;
		/* 增大字体大小 */
		color: #333;
		/* 深灰色字体，与白色背景形成对比 */
		line-height: 1.5;	
		/* 行高，使阅读更舒适 */
	}

	.name {
		font-size: 20px;
		/* 增大字体大小 */
		color: #333;
		/* 深灰色字体，与白色背景形成对比 */
		line-height: 1.5;
		text-align: center;
		margin-bottom: 20rpx;
		/* 行高，使阅读更舒适 */
	}
	
	.answer {
		font-size: 18px;
		/* 增大字体大小 */
		color: #333;
		/* 深灰色字体，与白色背景形成对比 */
		line-height: 1.5;
		text-align: justify;
		/* 行高，使阅读更舒适 */
	}

	.answer-modal {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #f0f0f0;
		/* 调整为浅灰色背景 */
		padding: 10px;
		box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);
		/* 添加底部阴影 */
		z-index: 1000;
		/* 确保浮窗在最上层 */
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		/* 半透明遮罩层 */
		z-index: 999;
		/* 遮罩层在内容之下 */
	}

	.modal-content {
		background-color: #ffffff;
		/* 白色背景，与浅灰色形成对比 */
		border-radius: 8px;
		/* 添加圆角 */
		padding: 20px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
		/* 添加阴影增强立体感 */
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		/* 关闭按钮靠右 */
		padding-top: 10px;
		/* 按钮与文字之间的距离 */
	}

	.close-btn {
		padding: 8px 16px;
		/* 调整按钮大小 */
		font-size: 14px;
		/* 字体大小适中 */
		border: none;
		background-color: #e91e63;
		/* 鲜艳的红色背景 */
		color: white;
		/* 白色字体 */
		border-radius: 4px;
		/* 圆角 */
		cursor: pointer;
		/* 鼠标悬停时显示手指形状 */
	}

	.close-btn:hover {
		background-color: #d81b60;
		/* 鼠标悬停时颜色稍深 */
	}
</style>