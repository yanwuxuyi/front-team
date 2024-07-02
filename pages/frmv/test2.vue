<template>
  <div class="chat-container">
    <div class="chat-window">
      <div class="messages" v-for="(msg, index) in historyTextList" :key="index">
        <div v-if="msg.role === 'user'" class="message user">
          <span>{{ msg.content }}</span>
          <img src="../../static/icon/user-avatar.png" alt="User Avatar" class="avatar user-avatar">
        </div>
        <div v-if="msg.role === 'assistant'" class="message assistant">
          <img src="../../static/icon/assistant-avatar.png" alt="Assistant Avatar" class="avatar assistant-avatar">
          <span>{{ msg.content }}</span>
        </div>
      </div>
    </div>
    <div class="input-area">
      <input v-model="TEXT" class="input" placeholder="请输入消息..." />
      <button @click="sendToSpark" class="send-button">发送</button>
    </div>
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
        APPID: 'a765f476',
        APISecret: 'OTFkNTExNTFiYTIxM2E1Zjk4YWM5ZmU3',
        APIKey: '458947a944ca96e4c8f340585b3aafd7',
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
  height: 100vh;
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
  align-items: center;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-avatar {
  margin-left: 10px; /* 用户头像居右，内容在左 */
}

.assistant-avatar {
  margin-right: 10px; /* 助手头像居左，内容在右 */
}

.input-area {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #fff;
}

.input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.send-button {
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
