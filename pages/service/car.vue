<template>
	<view>
	<view>
	  <u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
	</view>
  <view class="container">

    <view class="form-title">车辆出入申请表</view>
    <form @submit.prevent="submitForm">
      <view class="form-group">
        <label for="name">姓名</label>
        <textarea id="name" v-model="form.name" required class="small-textarea"></textarea>
      </view>
      <view class="form-group">
        <label for="studentid">学号</label>
        <textarea id="studentid" v-model="form.studentid" required class="small-textarea"></textarea>
      </view>
<!-- 	  <view class="form-group">
	    <label for="major">学院</label>
	    <textarea id="major" v-model="form.major" required class="small-textarea"></textarea>
	  </view> -->
	  <view class="form-group">
	          <label for="major">学院</label>
	          <picker mode="selector" :range="majorOptions" @change="handlemajorChange" class="picker">
	            <view class="picker-inner">
	              {{ form.major ? form.major : '请选择学院...' }}
	            </view>
	          </picker>
	        </view>
			
     <view class="form-group">
       <label for="license">车牌号</label>
       <textarea id="license" v-model="form.license" required class="small-textarea"></textarea>
     </view>
<!-- 	 <view class="form-group">
	   <label for="time">来校时间</label>
	   <textarea id="time" v-model="form.time" required class="small-textarea"></textarea>
	 </view> -->
	 <u-form-item label="来校时间" label-width="150rpx"  prop='time' >
	 			<view>
	 					<u-calendar v-model="showbirthday" :mode="mode" @change="getbirthday"></u-calendar>
	 					<u-input v-model="form.time" @click="showbirthday = true"/>
	 			</view>
	 			</u-form-item> -->
      <view class="form-group">
        <label for="reason">申请事由</label>
        <textarea id="reason" v-model="form.reason" required class="large-textarea"></textarea>
      </view>
      <view class="form-group">
        <button type="submit" @click="submitForm">提交申请</button>
      </view>
	  </form>
</view></view>
</template>

<script>
export default {
  data() {
    return {
		current: 0,
		list: [
		  { name: '车辆进入申请', index: 0 },
		  { name: '历史申请', index: 1 }
		],
		majorOptions:['计算机学院', '大数据与软件工程学院', '微电子与通信学院', '电气学院','机械工程及自动化学院'],
		showbirthday: false,
      form: {
		major:'',
        name: '',
        studentid: '',
		license:'',
        reason: '',
		time:''
//currentTime:''
      }
    };
  },
  onShow() {
	  //this.gettime();

  },
	  
  methods: {
 change(index) {
      console.log(index);
      this.current = index; // 更新当前选中的标签索引
      switch (index) {
        case 0:
          uni.navigateTo({
            url: '/pages/service/car'
          });
          break;
        case 1:
          uni.navigateTo({
            url: '/pages/service/historycar'
          });
          break;
        default:
          break;
      }
    },
	  getbirthday(e) {
	  	this.form.time = e.result;
	  },
	  gettime() {
	        this.currentTime = new Date().toLocaleString();
	      },
		  handlemajorChange(event) {
		  		  this.form.major = this.majorOptions[event.detail.value];
		  },
    submitForm() {
		this.gettime();
      uni.request({
        url: 'http://192.168.50.101:8090/auth/vehicleAccess',
        data: this.form,
        method: "POST",
        success: (res) => {
			console.log(res);
		console.log(this.form);
          console.log(res);
          if (res.statusCode === 200) {
            console.log("申请已提交！");
            this.$u.toast('已提交申请！')
			uni.switchTab({
			                      url: '/pages/service/servicemain',
			                      success: function (res) {
			                       //console.log("跳转成功");
			                      },
			                      fail: function (err) {
			                        //console.error("跳转失败", err);
			                      }
			                    });//登录成功返回 我的个人信息页面 
          } else {
            console.error("提交失败", res);
            this.$u.toast("提交失败，请重试！");
          }
        },
        fail: (err) => {
          console.error('Request failed', err);
          this.$u.toast("网络错误，请稍后重试！");
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

.small-textarea {
  height: 40px;
}

.large-textarea {
  height: 100px;
}

.form-group button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.form-group button:hover {
  background-color: #0056b3;
}

.picker {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
}

.picker-inner {
  height: 40px;
  line-height: 40px;
  color: #555;
}
</style>
