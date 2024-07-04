<template>
	<div>
	<html>
		
		<body>
			
					<div class="chat-container">
					   <div class="chat-window">
					     <div class="messages" v-for="(msg, index) in historyTextList" :key="index">
							  <!-- 用户消息部分 -->
					       <div v-if="msg.role === 'user'" class="message user">
					      <span>{{ msg.content }}</span> 
					         <img src="../../static/icon/user-avatar.png" alt="User Avatar" class="avatar user-avatar">
							
					       </div>
							<!-- 助手消息部分 -->
					       <div v-if="msg.role === 'assistant'" class="message assistant">
					         <img src="../../static/icon/assistant-avatar.png" alt="Assistant Avatar" class="avatar assistant-avatar">
					         <span>{{ msg.content }}</span>
					       </div>
					     </div>
					   </div>
						<!-- 用户输入新消息的区域 -->
					   <div class="input-area">
							<div class="input-wrapper">
							<!-- 在输入框的最左边插入的图片 --> 
							<div class="left-icon"></div>
							<!-- 输入框 -->
					     <input v-model="TEXT" class="input" placeholder="请输入你的问题..." />
						
						  
						  </div>
					     <button @click="sendToSpark" class="send-button">发送</button>
					   </div>
					 </div>
		</body>
	</html>
	</div>
</template>



<script>
  import * as base64 from "base-64";
  import CryptoJS from '../../static/crypto-js/crypto-js.js';
  import parser from '../../static/fast-xml-parser/src/parser';
  import * as utf8 from "utf8";
  import URL from 'url';

  export default {
     data() {
        return {
          TEXT: '',
          httpUrl: "https://spark-api.xf-yun.com/v3.5/chat",
          modelDomain: 'generalv3.5',
          APPID: '8b3366b0',
          APISecret: 'NjI1ZWQ1ZGFkMWNlMDY5OGYwOThjNGJk',
          APIKey: 'd2af4d921d6b7199655230ea1d83562f',
          sparkResult: '',
          historyTextList: [],
          tempRes: ''
        }
      },
    methods: {
      async sendToSpark() {
        let myUrl = await this.getWebSocketUrl();
        this.tempRes = "";
        let realThis = this;
        this.socketTask = uni.connectSocket({
          url: myUrl,
          method: 'GET',
          success: res => {
            realThis.wsLiveFlag = true;
          }
        });
        realThis.socketTask.onError((res) => {
          console.log("连接发生错误，请检查appid是否填写", res);
        });
        realThis.socketTask.onOpen((res) => {
          this.historyTextList.push({
            "role": "user",
            "content": this.TEXT
          });
          let params = {
            "header": {
              "app_id": this.APPID,
              "uid": "aef9f963-7"
            },
            "parameter": {
              "chat": {
                "domain": this.modelDomain,
                "temperature": 0.5,
                "max_tokens": 1024
              }
            },
            "payload": {
              "message": {
                "text": this.historyTextList
              }
            }
          };
          realThis.socketTask.send({
            data: JSON.stringify(params),
            success() {
              console.log('第一帧发送成功');
			  realThis.TEXT = '';  // 这里清空输入框的内容
            }
          });
        });
        realThis.socketTask.onMessage((res) => {
          let obj = JSON.parse(res.data);
          let dataArray = obj.payload.choices.text;
          for (let i = 0; i < dataArray.length; i++) {
            realThis.sparkResult = realThis.sparkResult + dataArray[i].content;
            realThis.tempRes = realThis.tempRes + dataArray[i].content;
          }
          let temp = JSON.parse(res.data);
          if (temp.header.code !== 0) {
            realThis.socketTask.close({
              success(res) {
                realThis.wsLiveFlag = false;
              },
              fail(err) {
                console.log('关闭失败', err);
              }
            });
          }
          if (temp.header.code === 0) {
            if (res.data && temp.header.status === 2) {
              this.historyTextList.push({
                "role": "assistant",
                "content": this.tempRes
              });
              setTimeout(() => {
                realThis.socketTask.close({
                  success(res) {
                    console.log('关闭成功', res);
                  }
                });
              }, 1000);
            }
          }
        });
      },
      getWebSocketUrl() {
        var httpUrlHost = (this.httpUrl).substring(8, 28);
        var httpUrlPath = (this.httpUrl).substring(28);
        switch (httpUrlPath) {
          case "/v1.1/chat":
            this.modelDomain = "general";
            break;
          case "/v2.1/chat":
            this.modelDomain = "generalv2";
            break;
          case "/v3.1/chat":
            this.modelDomain = "generalv3";
            break;
          case "/v3.5/chat":
            this.modelDomain = "generalv3.5";
            break;
        }
        return new Promise((resolve) => {
          var url = "wss://" + httpUrlHost + httpUrlPath;
          var host = "spark-api.xf-yun.com";
          var apiKeyName = "api_key";
          var date = new Date().toGMTString();
          var algorithm = "hmac-sha256";
          var headers = "host date request-line";
          var signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${httpUrlPath} HTTP/1.1`;
          var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, this.APISecret);
          var signature = CryptoJS.enc.Base64.stringify(signatureSha);
          var authorizationOrigin =
            `${apiKeyName}="${this.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
          var authorization = base64.encode(authorizationOrigin);
          url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;
          resolve(url);
        });
      }
    }
  }
</script>


















<style>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 93vh;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
}

.chat-window {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #f9f9f9;
}

.messages {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px; 
}

.message {
  display: flex;
  align-items:  center ;
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  word-wrap: break-word;
}

.user {
  align-self: flex-end;
  background-color: #dcf8c6;
  justify-content: flex-end; /* 将用户消息内容和头像居右对齐 */
}

.assistant {
  align-self: flex-start;
  background-color: #fff;
  border: 1px solid #ccc;
  justify-content: flex-start; /* 将助手消息内容和头像居左对齐 */
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right:8px;
}

.user-avatar {
  margin-left: 10px; /* 用户头像居右，内容在左 */
  border-radius:50%;
}

.assistant-avatar {
  margin-right: 10px; /* 助手头像居左，内容在右 */
  border-radius:50%;
}

 .input-area {
   display: flex;
   padding: 10px;
   border-top: 1px solid #ccc;
   background-color: #fff;
 }

  .send-button {
    padding: 10px 20px;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    height:40px;
    width:80px;
    font-size:14px;
      line-height: 20px; /* 设置行高等于按钮的高度 */
      margin-left:auto;
      position:absolute;
      top:50%;
      right:5%/* 5% */;
      transform:translateY(840%);
  }
  
  .input-wrapper{
      position: relative;
      display:inline-block ;
      /* align-items:center; */
      width:100%;
      max-width:600px;
      overflow:hidden;
  }
  
  .left-icon{
      position:absolute;
      
      /* 调整图标与左边框的距离 */
      left:10px;
      /* 调整卡通图片与顶部的距离，可以根据需要调整百分比值 */
      top:50%;
      transform:translateY(-50%);
      /* 根据需要调整图标宽度 */
      width:30px;
      /* 根据需要调整图标高度*/
      height:30px;
      background-image:url('../../static/icon/shurukuang.png');
      background-size: cover;
      
  }
  .input{
      /* 图标宽度＋左边距离 */
      padding-left: 42px;
      /* 根据需要调整输入框宽度300px */
      width:500c%;
      /* 根据需要调整输入框高度 */
      height:40px;
      /* 根据需要调整字体大小 */
      font-size:16px;
      /* 输入框边框样式 */
      border:1px solid #ccc;
      /* 输入框圆角 */
      border-radius:4px;
      /* 计算元素的总宽度和高度时包括边框和内边距 */
      box-sizing:border-box;
      position:relative;
      top:0;
      right:0;
  }
  
  @media screen and (max-width:600px){
      .send-button{
          position:static;
          top:auto;
          bottom:10px;
          left:50%;
          transform:translateX(-50%);
      }
      
  }
  
  </style>