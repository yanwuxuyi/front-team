<template>
    <view>
        <u-tabs :list="list" :is-scroll="false" :current="0" @change="change"></u-tabs>
        <view class="comment" v-for="(res, index) in commentList" :key="res.id">
            <view class="left"><image :src="res.url" mode="aspectFill"></image></view>
            <view class="right">
                <view class="top">
                    <view class="name">{{ res.name }}</view>
                    <view class="like" :class="{ highlight: res.isLike }">
                        <view class="num">{{ res.likeNum }}</view>
                        <u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
                        <u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
                    </view>
                </view>
                <view class="content">{{ res.contentText }}</view>
                <view class="reply-box">
                    <view class="item" v-for="(item, replyIndex) in res.replyList" :key="replyIndex">
                        <view class="username">{{ item.name }}</view>
                        <view class="text">{{ item.contentStr }}</view>
                    </view>
                    <view class="all-reply" @tap="toAllReply(res)" v-if="res.replyList != undefined">
                        共{{ res.allReply }}条回复
                        <u-icon class="more" name="arrow-right" :size="26"></u-icon>
                    </view>
                </view>
                <view class="bottom">
                    {{ res.date }}
                    <view class="reply" @tap="showReplyInput()">回复</view>
                </view>
            </view>
			<view v-if="showInputBox" class="input-box">
			            <textarea v-model="replyContent" placeholder="请输入回复内容"></textarea>
			            <button @tap="submitReply(res)">提交</button>
			            <button @tap="cancelReply">取消</button>
			        </view>
        </view>
		
    </view>
</template>


<script>
export default {
	data() {
		return {
			showInputBox:false,
			commentList: [],
			list: [{
								name: '帖子'
							}, {
								name: '热点'
							}, {
								name: '我的',
								count: 5
							}],
							current: 0
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
		
		let vm=this;
		this.getComment();
	},
	onUnload(){
				uni.closeSocket({
					success:() => {
						console.info("退出成功")
					},
				})
			},

	onShow(){
			uni.onSocketMessage(function (res) {
			  console.log('收到服务器内容：' + res.data);
			});
			},

	methods: {
		// 显示回复输入框
        // 显示回复输入框
        showReplyInput(comment) {
			console.log("dianji");
            this.currentComment = comment;
            this.replyContent = '';
            this.showInputBox = true;
        },
        // 提交回复
        submitReply(comment) {
			const value10 = uni.getStorageSync('user');
			console.log(value10.id);
			console.log(comment.id);
			console.log(this.replyContent);
			// 假设userId是123，服务器运行在localhost的8080端口
							// 创建webSocket
							
							
			uni.request({
			    url: `http://192.168.50.101:8090/chat/sendcommentall?comment=${this.replyContent}&rcid=1&rid=${value10.id}&uid=${comment.id}&favor=0`,
				method:"POST",
			    success: (res) => {
			        console.log(res);
			        if (res.statusCode === 200) {
			            // 成功后的处理逻辑
						//console.log(this.replyContent.trim());
						if (this.replyContent.trim()) {
						    this.currentComment.replyList.push({
						        name: '我',  // 这里可以换成实际的用户名
						        contentStr: this.replyContent
						    });
						
						    this.showInputBox = false;
						    this.$forceUpdate();  // 强制更新视图
						} else {
						    uni.showToast({
						        title: '回复内容不能为空',
						        icon: 'none'
						    });
						}
			        }
			    },
			    fail: (err) => {
			        console.log(err);
			    }
			});
        },
        // 取消回复
        cancelReply() {
            this.showInputBox = false;
        },
		change(index) {
			 console.log(index);
		      this.current = index;  // 更新当前选中的标签索引
		      switch(index) {
		        case 0:
		          // 跳转到首页
		          uni.navigateTo({
		            url: '/pages/forum/index'
		          });
		          break;
		        case 1:
		          // 跳转到论坛
		          uni.navigateTo({
		            url: '/pages/forum/forum'
		          });
		          break;
		        case 2:
		          // 跳转到关于页面
		          uni.navigateTo({
		            url: '/pages/forum/me'
		          });
		          break;
		        default:
		          // 默认操作
		          break;
		      }
		    
		  },
		// 跳转到全部回复
		toAllReply(comment) {
            console.log(comment);
            uni.navigateTo({
                url: '/pages/forum/reply',
                success: (res) => {
                    // 通过eventChannel向新页面传递数据
                    res.eventChannel.emit('acceptCommentData', { data: comment });
                }
            });
        },
		// 点赞
		getLike(index) {
			console.log(this.commentList[index].id);
			this.commentList[index].isLike = !this.commentList[index].isLike;
			console.log(this.commentList[index].isLike);
			uni.request({
				url:"http://192.168.50.101:8090/chat/textfavor",
				data:{
					ifFavor:this.commentList[index].isLike,
					uid:this.commentList[index].id
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
		},
		// 评论列表
		getComment() {
			uni.request({
				url:'http://192.168.50.101:8090/chat/getmessage',  
				 success: (res) => {
					console.log(res);
				if(res.statusCode == 200){
				const data = res.data;
				this.commentList = data.map(item => ({
					id: item.uid,
					name: item.nickname,
					date: item.createTime,
					contentText: item.message,
					url: item.fileData,
					allReply: item.countcomment || 0,
					likeNum: item.favor || 0,
					isLike: false,
					replyList:[]
				}));

				 try {
					  uni.setStorageSync('commentList', this.commentList);
					  console.log(this.commentList);
				    //localStorage.setItem('commentList', JSON.stringify(this.commentList));
				    } catch (e) {
				        console.error('本地存储失败', e);
						}
				             //this.commentList = commentList;
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
.comment {
    display: flex;
    padding: 30rpx;
    .left {
        image {
            width: 64rpx;
            height: 64rpx;
            border-radius: 50%;
            background-color: #f2f2f2;
        }
    }
    .right {
        flex: 1;
        padding-left: 20rpx;
        font-size: 30rpx;
        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10rpx;
            .name {
                color: #5677fc;
            }
            .like {
                display: flex;
                align-items: center;
                color: #9a9a9a;
                font-size: 26rpx;
                .num {
                    margin-right: 4rpx;
                    color: #9a9a9a;
                }
            }
            .highlight {
                color: #5677fc;
                .num {
                    color: #5677fc;
                }
            }
        }
        .content {
            margin-bottom: 10rpx;
        }
        .reply-box {
            background-color: rgb(242, 242, 242);
            border-radius: 12rpx;
            .item {
                padding: 20rpx;
                border-bottom: solid 2rpx $u-border-color;
                .username {
                    font-size: 24rpx;
                    color: #999999;
                }
            }
            .all-reply {
                padding: 20rpx;
                display: flex;
                color: #5677fc;
                align-items: center;
                .more {
                    margin-left: 6rpx;
                }
            }
        }
        .bottom {
            margin-top: 20rpx;
            display: flex;
            font-size: 24rpx;
            color: #9a9a9a;
            .reply {
                color: #5677fc;
                margin-left: 10rpx;
            }
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
</style>
