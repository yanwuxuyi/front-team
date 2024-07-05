
<template>
	<view>
		<u-tabs :list="list" :is-scroll="false" :current="0" @change="change"></u-tabs>
	
	<u-navbar title-color="#fff" back-icon-color="#ffffff" 
	:backgroundColor="'#ff0000'"
	:back-text-style="{color: '#fff'}">
	</u-navbar>
	
	
	
		<view v-if="account">
			<view v-if="this.loaded==false">
				<view class="holecontainer">
						<u-loading mode="circle" color="#df1215" size="80"></u-loading>
				</view>
			</view>
			<view v-else>
			    <view class="comment" v-for="(res, index) in commentList" :key="res.id">
			        <view class="left"><u-avatar :src="pic[res.pid]" shape="circle" size=80></u-avatar></view>
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
			                <view class="all-reply" @tap="toAllReply(res)" v-if="res.replyList != undefined&&res.allReply!=0">
			                    共{{ res.allReply }}条回复
			                    <u-icon class="more" name="arrow-right" :size="26"></u-icon>
			                </view>
			            </view>
			            <view class="bottom">
			                {{ res.date }}
			                <view class="reply" @tap="showReplyInput(res)">回复</view>
			            </view>
			        </view></view>
					<view v-if="showInputBox" class="input-box">
					            <textarea v-model="replyContent" placeholder="请输入回复内容"></textarea>
					            <button @tap="submitReply(res)">提交</button>
					            <button @tap="cancelReply">取消</button>
					        </view>
			    
				<view v-if="showInputBox2" class="input-box">
					            <textarea v-model="replyContent2" placeholder="请输入发帖内容"></textarea>
					            <button @tap="submitReply2(res)">提交</button>
					            <button @tap="cancelReply">取消</button>
					        
				</view>
				    
				<view v-if="showInputBox3" @click="addforum" class="floating-icon">
					<u-icon name="plus" size="40" color="#c7ddff"></u-icon>
				</view>
			
			</view>
		</view>
		<view v-else>
			<view class="holecontainer">
				<view class="wrongcircle">
					<u-icon name="close-circle" size="162" color="#ff9c4a"></u-icon>
				</view>
				<text class="wrongnormal">请先登录</text>
				
			</view>
				
		</view>
	</view>
</template>


<script>
export default {
	data() {
		return {
			//加载完成
			loaded:false,
			//本地登录信息
			account:'',
			showInputBox:false,
			showInputBox2:false,
			showInputBox3:true,
			replyContent2:'',
		
			currentComment:[],
			commentList: [],
			pic:[],
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
		this.getComment();
	},
	mounted(){

	},
	onUnload(){
				uni.closeSocket({
					success:() => {
						console.info("退出成功")
					},
				})
			},
			
onShow() {
	this.account='';
	const value11 = uni.getStorageSync('user');
	if(value11.id)
	{
		this.account=value11.id;
	}
	this.getComment();
	uni.onSocketMessage(function (res) {
    console.log('收到服务器内容：' + res.data);
    //this.getComment();
  }.bind(this)); // 使用 bind 绑定 this 上下文
},


	methods: {	
		addforum() {
			this.showInputBox2 = true;
			this.showInputBox3 = false;
		},
		
		
		//根据所有当前评论者获取头像
		getallpic()
		{ 	
			let vm=this;
			vm.loaded=false;
			//console.log(vm.commentList);
			console.log(vm.commentList.length,'头像');
			 //    vm.commentList.forEach(comment => {  
				// 		vm.getpic(comment.pid);
				// })
				let promises = vm.commentList.map(comment => {  
				  return vm.getpic(comment.pid);  
				});  
				Promise.all(promises).then(() => {  
				  console.log("所有图片都已加载完成");
				  vm.loaded=true;
				}).catch(error => {  
				  console.error('加载图片时发生错误:', error);  
				  
				});
		},
		//根据id获得头像
/* 		getpic(userId)
		{
			let vm=this;
			let url = `http://192.168.50.101:8090/auth/getImageById?id=${userId}`;
			uni.request({  
				url: url,  
				method: 'GET',  
				responseType: 'arraybuffer',  
				success: (res) => {  
					// 注意：uni.request的success回调中的res是一个包含data、statusCode等属性的对象  
					if (res.statusCode === 200) {  
						const base64 = uni.arrayBufferToBase64(res.data);  
						// 创建一个数据URL  
						vm.pic[userId] = `data:image/png;base64,${base64}`; 
						console.log('get:',userId);
					} else {  
						console.log(res);
						uni.showToast({ title: '服务器返回错误状态码', icon: 'none' });  
					}  
				},  
				fail: (err) => {  
					console.error("请求失败:", err);  
					uni.showToast({ title: '网络错误或服务器未响应', icon: 'none' });  
				}  
			});
		}, */
		getpic(userId) {  
			console.log(userId);
		    return new Promise((resolve, reject) => {  
				let vm=this;
		        let url = `http://192.168.50.101:8090/auth/getImageById?id=${userId}`;  
		        uni.request({  
		            url: url,  
		            method: 'GET',  
		            responseType: 'arraybuffer', 
		            success: (res) => {  
		                if (res.statusCode === 200) {  
		                    const base64 = uni.arrayBufferToBase64(res.data);  
		                    const imageUrl = `data:image/png;base64,${base64}`; 
							vm.pic[userId] = imageUrl; 
							console.log('get:',userId);
		                    // 假设你有一个地方来存储这些图片URL，这里我们直接解析Promise  
		                    // 但在实际应用中，你可能想将其存储在Vue的data属性或其他地方  
		                    resolve(imageUrl); // 解析Promise，传递图片URL  
		                } else {  
		                    console.log('获取失败',userId)
							//resolve(imageUrl); // 解析Promise，传递图片URL  
							//reject(new Error(`Server returned status code ${res.statusCode}`)); // 拒绝Promise，传递错误信息  
		                }  
		            },  
		            fail: (err) => {  
		                reject(err); // 网络错误或请求失败时拒绝Promise  
		            }  
		        });  
		    });  
		},
		
		
		showToast() {
			this.$refs.uToast.show({
				title: this.title,
				position: this.position,
				type: 'error',
				icon: this.icon,
				url: this.url,
				duration: this.duration,
			});
		},
		
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
			console.log(comment);
			const value10 = uni.getStorageSync('user');
			console.log(value10.id);
			console.log("id号"+this.currentComment.id);
			console.log(this.replyContent);
			
							
			uni.request({
			    url: `http://192.168.50.101:8090/chat/sendcommentall?comment=${this.replyContent}&rcid=-1&rid=${value10.id}&uid=${this.currentComment.id}&favor=0`,
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
							this.getComment();
							this.$forceUpdate();  // 强制更新视图
						    this.currentComment.replyList.push({
						        name: '我',  // 这里可以换成实际的用户名
						        contentStr: this.replyContent
						    });
							

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
		//发新的帖子
		submitReply2(comment) {
			const value11 = uni.getStorageSync('user');
			console.log(value11.id);
			console.log(this.replyContent2);
			
							
			uni.request({
			    url: `http://192.168.50.101:8090/chat/sendtextall?message=${this.replyContent2}&id=${String(value11.id)}`,
				method:"POST",
			    success: (res) => {
			        console.log(res);
			        
			            // 成功后的处理逻辑
						//console.log(this.replyContent.trim());
						if (this.replyContent2.trim()) {
							this.showInputBox2 = false;
							console.log(this.showInputBox2);
							this.showInputBox3 = true;
							this.$forceUpdate();  // 强制更新视图
							this.getComment();
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
        // 取消回复
        cancelReply() {
            this.showInputBox = false;
			this.showInputBox2 = false;
			this.showInputBox3 = true;
        },
		change(index) {
			 console.log(index);
		      this.current = index;  // 更新当前选中的标签索引
		      switch(index) {
		        case 0:
		          // 跳转到首页
		          uni.switchTab({
                      url: '/pages/forun/index',
                      success: function (res) {
                       //console.log("跳转成功");
                      },
                      fail: function (err) {
                        //console.error("跳转失败", err);
                      }
                    });
		          uni.switchTab({
                      url: '/pages/forun/index',
                      success: function (res) {
                       //console.log("跳转成功");
                      },
                      fail: function (err) {
                        //console.error("跳转失败", err);
                      }
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
			const value13 = uni.getStorageSync('user');
			console.log(this.commentList[index].id);
			this.commentList[index].isLike = !this.commentList[index].isLike;
			console.log(this.commentList[index].isLike);

			uni.request({
				url:"http://192.168.50.101:8090/chat/textfavor",
				data:{
					ifFavor:this.commentList[index].isLike,
					uid:this.commentList[index].id,
					id: value13.id
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
			// console.log(this.commentList[index].isLike);
			// console.log(this.commentList[index].likeNum);
			if (this.commentList[index].isLike == true) {
				this.commentList[index].likeNum++;
				//console.log(this.commentList[index].likeNum);
			} else {
				this.commentList[index].likeNum--;
				//console.log(this.commentList[index].likeNum);
			}
		},
		// 评论列表
		getComment() {
			uni.request({
				url:'http://192.168.50.101:8090/chat/getmessage',  
				 success: (res) => {
//					console.log(res);
				if(res.statusCode == 200){
				const data = res.data;
				this.commentList = data.map(item => ({
					id: item.uid,
					pid:item.id,
					name: item.nickname,
					date: item.createTime,
					contentText: item.message,
					url: item.fileData,
					allReply: item.countcomment || 0,
					likeNum: item.favor || 0,
					isLike: false,
					replyList:[]
				}));
				this.getallpic();
				 try {
					  uni.setStorageSync('commentList', this.commentList);
//					  console.log(this.commentList);
				    //localStorage.setItem('commentList', JSON.stringify(this.commentList));
				    } catch (e) {
				        console.error('本地存储失败', e);
						}
				             //this.commentList = commentList;
					const value12 = uni.getStorageSync('user');
//					console.log(value12.id);
					uni.request({
						url:"http://192.168.50.101:8090/chat/gettextfavor",
						data:{
							id: value12.id
						},
						method:'POST',
						success: (res) => {
//							console.log(res);
							if(res.statusCode == 200){
//								console.log(this.commentList);
								this.commentList.forEach(comment => {
									res.data.forEach(temp => {
										if(comment.id == temp.uid){
											comment.isLike = true;
										}
									})
								});
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
.floating-icon {
			position: fixed;
			bottom: 80px;
			right: 10px;
			width: 50px;
			height: 50px;
			background-color: #007aff;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
			z-index: 1000;
			cursor: pointer;
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

	.holecontainer {  
		flex-direction: column;
	  display: flex;  
	  justify-content: center; /* 水平居中 */  
	  align-items: center; /* 垂直居中 */  
	  height: 20vh; /* 占据整个视窗的高度 */  
	  padding: 80px 100px 0;
	}  
	.wrongcircle {
		background-color: #ff3437;
		border-radius: 100px;
		width: 80px;
		height: 80px;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
	}
	
	.wrongnormal {
		color: #fc1433;
		font-size: 20px;
		margin-top: 10px;
	}
// .navbar {
//     background: linear-gradient(45deg, rgb(44, 168, 187), rgb(140, 197, 198)); /* 红色到蓝色的渐变 */
//     /* 可根据需要调整渐变方向和颜色 */
	
// }


</style>
