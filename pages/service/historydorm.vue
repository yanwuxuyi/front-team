<template>
  <view>
    <view>
      <u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
    </view>
    <view class="container">
      <view class="header">
        <text class="title">历史申请记录</text>
      </view>
      <scroll-view scroll-y class="content">
        <view v-for="(item, index) in historyList" :key="index" class="history-item">
          <view class="item-header">
            <text class="item-title">申请换到{{ item.newdormitory }}寝室</text>
            <text class="item-date">{{ item.currentTime }}</text>
          </view>
          <text class="item-status" :class="{'approved': item.status === 'approved', 'pending': item.status === 'pending', 'rejected': item.status === 'rejected'}">{{ getStatusText(item.status) }}</text>
          <view class="item-body">
            <text class="item-description">申请理由：{{ item.reason }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        studentid: '',
        current: 1,
        list: [
          { name: '更换宿舍申请', index: 0 },
          { name: '历史申请', index: 1 }
        ],
        historyList: [
          {
            newdormitory: '申请更换到301宿舍',
            currentTime: '2024-06-15',
            status: 'approved',
            reason: '宿舍漏水，申请更换到301宿舍。'
          },
          {
            newdormitory: '申请更换到102宿舍',
            currentTime: '2024-06-10',
            status: 'rejected',
            reason: '希望与朋友一起住，申请更换到102宿舍，但当前无空床位。'
          }
          // 其他申请记录
        ]
      }
    },
    onLoad() {
      this.getdata();
    },
    methods: {
      getdata() {
        const Value = uni.getStorageSync('user');
        this.studentid = Value.studentId;
        console.log(Value);
        uni.request({
          url: `http://192.168.50.101:8090/auth/getHistoryExchangeDormitory?studentid=${this.studentid}`,
          success: (res) => {
            console.log(res);
            this.historyList = res.data;
          },
          fail: (err) => {
            console.error('Request failed', err);
            this.$u.toast("网络错误，请稍后重试！");
          }
        });
      },
      getStatusText(status) {
        switch (status) {
          case 'approved':
            return '已批准';
          case 'pending':
            return '待审核';
          case 'rejected':
            return '已拒绝';
          default:
            return '未知状态';
        }
      },
      change(index) {
        console.log(index);
        this.current = index; // 更新当前选中的标签索引
        switch (index) {
          case 0:
            uni.navigateTo({
              url: '/pages/service/dorm'
            });
            break;
          case 1:
            uni.navigateTo({
              url: '/pages/service/historydorm'
            });
            break;
          default:
            break;
        }
      }
    }
  }
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;
}

.header {
  background-color: #ffffff;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
}

.content {
  flex: 1;
  padding: 16px;
}

.history-item {
  background-color: #ffffff;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.item-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.item-title {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}

.item-date {
  font-size: 14px;
  color: #999999;
}

.item-status {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.approved {
  color: #4caf50;
}

.rejected {
  color: #f44336;
}

.pending {
  color: #ff9800;
}

.item-body {
  font-size: 14px;
  color: #666666;
}
</style>
