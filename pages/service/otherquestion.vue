<template>
	<view>
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<view class="reminder">如有仍有问题无法解决，可在线咨询管理人员</view>
		<view class="container">
			<scroll-view scroll-y class="chat-container" refresher-enabled>
				<view v-for="(message, index) in messages" :key="index" class="message-item">
					<view class="avatar" :class="message.status === 'teacher' ? 'teacher-avatar' : 'student-avatar'">
						<image :src="message.status === 'teacher' ? teacherAvatar : studentAvatar"  class="avatar-img"/>
					</view>
					<view class="message-bubble"
						:class="message.status === 'teacher' ? 'teacher-bubble' : 'student-bubble'">
						<text v-if="message.status === 'teacher'">{{ message.answer}}</text>
						<text v-else>{{ message.question}}</text>
					</view>
				</view>
			</scroll-view>

			<view class="input-container">
				<input class="input-message" type="text" placeholder="输入消息..." v-model="inputMessage" />
				<button class="send-button" @click="sendMessage">发送</button>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '常见问题解答'
					}, {
						name: 'AI问答'
					},
					{
						name: '其他问题'
					}
				],
				current: 2,
				messages: [],
				inputMessage: '',
				studentAvatar: '/static/images/student.png',
				teacherAvatar: '/static/images/teacher.png'
			}
		},
		methods: {
			change(index) {
				console.log(index);
				this.current = index; // 更新当前选中的标签索引
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '/pages/service/commonquestions'
						});
						break;
					case 1:
						uni.navigateTo({
							url: '/pages/index/test2'
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
			},
			sendMessage() {
				const studentId = uni.getStorageSync('user').studentId;

				const newMessage = {
					content: this.inputMessage,
					status: 'student', // or 'teacher' based on who sends the message
				};
				// this.messages.push(newMessage);

				// Clear input field after sending
				this.inputMessage = '';

				uni.request({
				  url: 'http://192.168.50.101:8090/auth/sendQuestion',
				  method: 'GET',
				  data: {
				    studentid: studentId,
				    question: newMessage.content
				  },
				  success: (res) => {
				    console.log('Question sent successfully:', res);
					this.fetchMessages();
				  },
				  fail: (err) => {
				    console.error('Failed to send question:', err);
				  }
				});
				
			},
			fetchMessages() {
				const studentId = uni.getStorageSync('user').studentId;

				uni.request({
				  url: 'http://192.168.50.101:8090/auth/getqa',
				  method: 'GET',
				  data: {
				    studentid: studentId
				  },
				  success: (res) => {
				    this.messages = res.data; // Assuming messages are returned as an array
				  console.info("历史消息记录：",res.data);
				  },
				  fail: (err) => {
				    console.error('Failed to fetch messages:', err);
				  }
				});

				// Mock data for demonstration:
				// this.messages = [{
				// 		content: 'Hello!',
				// 		type: 'teacher'
				// 	},
				// 	{
				// 		content: 'Hi there!',
				// 		type: 'student'
				// 	},
				// 	{
				// 		content: 'How can I help you today?',
				// 		type: 'teacher'
				// 	}
				// ];
			}
		},
		mounted() {
			// Fetch initial set of messages when component is mounted
			this.fetchMessages();
		}

	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 86vh;
		background-color: #f2f2f2;
		padding: 10px;
	}

	.reminder {
		background-color: #f2f2f2;
		padding: 10px;
		text-align: center;
	}

	.chat-container {
		flex: 1;
		margin-top: 10px;
		margin-bottom: 10px;
		overflow-y: scroll;
	}

	.message-item {
		display: flex;
		align-items: flex-end;
		margin-bottom: 15px;
	}

	.message-bubble {
		padding: 10px;
		border-radius: 10px;
		max-width: 70%;
	}

	.student-bubble {
		align-self: flex-end;
		background-color: #3498db;
		color: #ffffff;
	}

	.teacher-bubble {
		align-self: flex-start;
		background-color: #FFFFFF;
		color: #000000;
	}

	.avatar {
		width: 40px;
		height: 40px;
		margin: 0 5px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.avatar-img {
		max-width: 100%;
		max-height: 100%;
		border-radius: 50%;
	}

	.student-avatar {
		align-self: flex-end;
	}

	.teacher-avatar {
		align-self: flex-start;
	}

	.input-container {
		display: flex;
		align-items: center;
		padding: 10px;
		background-color: #f2f2f2;
		margin-top: 10px;
	}

	.input-message {
		flex: 1;
		padding: 10px;
		margin-right: 10px;
		border-radius: 20px;
		border: 1px solid #3498db;
		outline: none;
	}

	.send-button {
		padding: 10px 20px;
		border-radius: 20px;
		background-color: #3498db;
		color: #FFFFFF;
		border: none;
		outline: none;
		cursor: pointer;
	}
</style>