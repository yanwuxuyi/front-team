<template>
	<view class="wrap">
		<view class="comment">
			<view class="top">
				<view class="left">
					<view class="heart-photo"><image :src="comment.url" mode=""></image></view>
					<view class="user-info">
						<view class="name">{{ comment.name }}</view>
						<view class="date">06-25 13:58</view>
					</view>
				</view>
				<view class="right" :class="{ highlight: comment.isLike }">
					{{ comment.likeNum }}
					<u-icon v-if="!comment.isLike" name="thumb-up" class="like" color="#9a9a9a" :size="30" @click="getLike"></u-icon>
					<u-icon v-if="comment.isLike" name="thumb-up-fill" class="like" :size="30" @click="getLike"></u-icon>
				</view>
			</view>
			<view class="content" >{{ comment.contentText }}</view>
		</view>
		<view class="all-reply">
			<view class="all-reply-top">全部回复（{{ comment.allReply }}）</view>
			<view class="item" v-for="(item, index) in commentList" :key="index">
				<view class="comment">
					<view class="top">
						<view class="left">
							<view class="heart-photo"><image :src="item.url" mode=""></image></view>
							<view class="user-info">
								<view class="name">{{ item.name }}</view>
								<view class="date">{{ item.date }}</view>
							</view>
						</view>
						<view class="right"  :class="{ highlight: item.isLike }">
							<view class="num">{{ item.likeNum }}</view>
							<u-icon v-if="!item.isLike" name="thumb-up" class="like" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
							<u-icon v-if="item.isLike" name="thumb-up-fill" class="like" :size="30" @click="getLike(index)"></u-icon>
						</view>
					</view>
					<view class="reply" v-if="item.reply">
						<view class="username">{{ item.reply.name }}</view>
						<view class="text">{{ item.reply.contentStr }}</view>
					</view>
					<view class="content" @click="handleDoubleClick(item)">{{ item.contentText }}</view>
				</view>
				
				<view v-if="showInputBox" class="input-box">
				            <textarea v-model="replyContent" placeholder="请输入回复内容"></textarea>
				            <button @tap="submitReply()">提交</button>
				            <button @tap="cancelReply">取消</button>
	</view></view></view></view>
</template>

<script>

export default {
	data() {
		return {
			temp: [],
			replyContent:'',
			showInputBox: false,
			commentList: [],
			comment: '',
			uid:0
		};
	},
	onLoad() {
		this.webSocketTask = uni.connectSocket({
			url: "ws://192.168.50.101:8090/ws/3",
			header: {
			    'content-type': 'application/json'
			},
			success(res) {
				console.log('成功', res);
				
			},
		})
		const eventChannel = this.getOpenerEventChannel();
		eventChannel.on('acceptCommentData', (data) => {
			console.log(data.data);
		    this.comment = data.data;
		});
		console.log(this.comment);
		this.getReply();
	},
	onShow() {
	  uni.onSocketMessage(function (res) {
	    console.log('收到服务器内容：' + res.data);
	    this.getReply();
	  }.bind(this)); // 使用 bind 绑定 this 上下文
	},
	methods: {
		//双击回复
		handleDoubleClick(item) {
			//console.log("我点击了");
			console.log(item);
			this.temp = item;
			this.showInputBox = true;

		},
		//取消评论
		cancelReply() {
		    this.showInputBox = false;
			this.replyContent = '';
		},
		//回复评论
		submitReply() {
			console.log(this.temp);
			uni.request({
			    url: `http://192.168.50.101:8090/chat/sendcommentall?comment=${this.replyContent}&rcid=${this.temp.cid}&rid=${this.temp.rid}&uid=${this.temp.uid}&favor=0`,
				method:"POST",
			    success: (res) => {
			        console.log(res);
			        
			            // 成功后的处理逻辑
						//console.log(this.replyContent.trim());
						if (this.replyContent.trim()) {
							console.log(this.replyContent.trim());
							this.showInputBox = false;
							console.log(this.showInputBox);
							//this.currentComment.allReply++;
							this.getReply();
							this.$forceUpdate();  // 强制更新视图
						    this.currentComment.replyList.push({
						        name: '我',  // 这里可以换成实际的用户名
						        contentStr: this.replyContent
						    });
							this.replyContent = '';
							console.log(this.replyContent);
			
						} else {
						    uni.showToast({
						        title: '回复内容不能为空',
						        icon: 'none'
						    });
						}
			        
			    },
			    fail: (err) => {
			        console.log(err);
			    }
			});
		},
		// 点赞
		getLike(index) {
			if (index === 0 || index > 0) {
				this.commentList[index].isLike = !this.commentList[index].isLike;
				console.log(this.commentList);
				const value14 = uni.getStorageSync('user');
				console.log(value14.id);
				uni.request({
					url:"http://192.168.50.101:8090/chat/commentfavor",
					data:{
						ifFavor:this.commentList[index].isLike,
						uid:this.commentList[index].uid,
						cid:this.commentList[index].cid,
						id: value14.id
					},
					method:'POST',
					success: (res) => {
					    console.log(res);
					    if (res.statusCode === 200) {
					        // 成功后的处理逻辑
							
					    }
					},
					fail: (err) => {
					    console.log(err);
					}
				})
				if (this.commentList[index].isLike == true) {
					this.commentList[index].likeNum++;
				} else {
					this.commentList[index].likeNum--;
				}
			} else {
				if (this.comment.isLike == true) {
					this.comment.isLike = !this.comment.isLike;
					this.comment.likeNum--;
				} else {
					this.comment.isLike = !this.comment.isLike;
					this.comment.likeNum++;
				}
			}
		},

		// 回复列表
		getReply() {
			
			//const storedCommentList = uni.getStorageSync('commentList');
			this.uid = this.comment.id;
			
			// console.log(storedCommentList);
			// this.comment = {
			// 	id: storedCommentList[0].id,
			// 	name: storedCommentList[0].name,
			// 	date: storedCommentList[0].date,
			// 	contentText: storedCommentList[0].contentText,
			// 	url: storedCommentList[0].url,
			// 	allReply: storedCommentList[0].allReply,
			// 	likeNum: storedCommentList[0].likeNum,
			// 	isLikes: storedCommentList[0].isLike
			// };
			//console.log(this.comment);
			console.log("uid  "+this.uid);
			uni.request({
				url:`http://192.168.50.101:8090/chat/gettextmessage?uid=${this.uid}`,  
				success: (res) => {
				console.log("你好");
				console.log(res);
				if(res.statusCode == 200){
				const data = res.data;
				console.log(data);
				this.commentList = data.map(item => ({
					rcid: item.rcid,
					uid: item.uid,
					rid: item.rid,
					cid: item.cid,
					name: item.nickname,
					date: item.createTime,
					contentText: item.comment,
					url: item.fileData,
					likeNum: item.favor || 0,
					isLike: false,
					reply:  []
				}));
				const value12 = uni.getStorageSync('user');
				// console.log(value12.id);
				// console.log(this.uid);
				uni.request({
					url:"http://192.168.50.101:8090/chat/getcommentfavor",
					data:{
						id: value12.id,
						uid: this.uid
					},
					method:'POST',
					success: (res) => {
						console.log(res);
						if(res.statusCode == 200){
							//console.log("获取点赞后的输出："+this.commentList);
							this.commentList.forEach(comment => {
								res.data.forEach(temp => {
									if(comment.cid == temp.cid){
										comment.isLike = true;
									}
								})
							});
						//console.log("这里1");
						this.commentList.forEach(item =>{
							if(item.rcid != -1) {
								//console.log("这里23");
								this.commentList.forEach(commenttemp =>{
									// console.log("这里4");
									// console.log(commenttemp.cid);
									// console.log(item.rcid);
									if(commenttemp.cid == item.rcid) {
										// console.log("这里2");
										// console.log(commenttemp.rid);
										item.reply = {
											name: commenttemp.name,
											contentStr: commenttemp.contentText
										};
										// console.log(item.reply);
										// console.log(item);
										// 找到评论的索引
										//const indexToRemove = this.commentList.findIndex(ctemp => ctemp.cid === commenttemp.cid);
										//console.log("要删除的索引"+indexToRemove);
										//this.commentList.splice(indexToRemove, 1);

									}
									
								})
						
								
							}
							else{
								item.reply = null;
							}
							//console.log(item.reply);
						}
						);
							
						}
					}
					})

					
					
					
				 }
				 else{
				this.$u.toast('帖子信息获取失败')  //提示框
				 }
				 }
				 
			})
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #f2f2f2;
}
.comment {
	padding: 30rpx;
	font-size: 32rpx;
	background-color: #ffffff;
	.top {
		display: flex;
		justify-content: space-between;
	}
	.left {
		display: flex;
		.heart-photo {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}
		.user-info {
			margin-left: 10rpx;
			.name {
				color: #5677fc;
				font-size: 28rpx;
				margin-bottom: 4rpx;
			}
			.date {
				font-size: 20rpx;
				color: $u-light-color;
			}
		}
	}
	.right {
		display: flex;
		font-size: 20rpx;
		align-items: center;
		color: #9a9a9a;
		.like {
			margin-left: 6rpx;
		}
		.num{
			font-size: 26rpx;
			color: #9a9a9a;
		}
	}
	.highlight {
		color: #5677fc;
		.num{
			color: #5677fc;
		}
	}
}
.input-box {
    position: fixed;
    bottom: 50rpx;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 20rpx;
    box-shadow: 0 -2rpx 5rpx rgba(0, 0, 0, 0.1);
    textarea {
        width: 100%;
        height: 200rpx;
        padding: 10rpx;
        border: 1rpx solid #ccc;
        border-radius: 8rpx;
        margin-bottom: 20rpx;
    }
    button {
        width: 100%;
        padding: 15rpx;
        background-color: #5677fc;
        color: #fff;
        border: none;
        border-radius: 8rpx;
        text-align: center;
        margin-bottom: 10rpx;
    }
}
.all-reply {
	margin-top: 10rpx;
	padding-top: 20rpx;
	background-color: #ffffff;
	.all-reply-top {
		margin-left: 20rpx;
		padding-left: 20rpx;
		border-left: solid 4rpx #5677fc;
		font-size: 30rpx;
		font-weight: bold;
	}
	.item {
		border-bottom: solid 2rpx $u-border-color;
	}
	.reply {
		padding: 20rpx;
		background-color: rgb(242, 242, 242);
		border-radius: 12rpx;
		margin: 10rpx 0;
		.username {
			font-size: 24rpx;
			color: #7a7a7a;
		}
	}
}
</style>
