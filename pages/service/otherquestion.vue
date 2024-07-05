<template>
	<view>
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<view class="container">
			<view class="chat-history">
				<view v-for="(message, index) in messages" :key="index" class="message-bubble"
					:class="{ 'mine': message.mine }">
					{{ message.text }}
				</view>
			</view>
			<view class="input-area">
				<input type="text" v-model="newMessage" placeholder="输入你的问题" />
				<button @click="sendMessage">发送</button>
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
				newMessage: '',
				messages: [],
				userId: '123456' // 假设的用户ID  
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
							url: '/pages/index/text2'
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
			async sendMessage() {
				if (!this.newMessage.trim()) return;

				const messageId = Date.now(); // 生成消息ID  
				const newMessageObj = {
					text: this.newMessage,
					userId: this.userId,
					messageId
				};
				// 假设sendMessageToServer是发送消息到服务器的函数  
				await this.sendMessageToServer(newMessageObj);

				// 假设接收服务器回复的消息会调用addMessage  
				this.addMessage({
					...newMessageObj,
					mine: true
				});

				this.newMessage = ''; // 清空输入框  
			},
			addMessage(message) {
				this.messages.push(message);
			},
			async sendMessageToServer(message) {
				// 这里使用fetch API发送消息到服务器  
				try {
					await fetch('https://yourserver.com/api/messages', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(message)
					});
				} catch (error) {
					console.error('Error sending message:', error);
				}
			}
		}

	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.chat-history {
		flex: 1;
		overflow-y: auto;
		padding: 10px;
	}

	.message-bubble {
		padding: 10px;
		margin: 5px 0;
		border-radius: 10px;
		max-width: 80%;
	}

	.mine {
		align-self: flex-end;
		background-color: #007aff;
		color: white;
	}

	.input-area {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		background-color: #f5f5f5;
	}

	input {
		flex: 1;
		padding: 10px;
		margin-right: 10px;
	}

	button {
		padding: 10px 20px;
	}
</style>