<template>
	<view>
		{{program}}
	</view>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      program: null
    };
  },
  onLoad() {
    // 获取学生ID
    const value = uni.getStorageSync('user');
    const studentId = value.studentId;

    // 根据学生ID请求后端数据
    uni.request({
      url: 'http://192.168.50.101:8090/count/countRegisterStudent', 
      method: 'GET',
      data: {
      },
      success: (res) => {
        if (res.data.status === true) {
          // 解析后端返回的数据
          console.log('结果:', res.data.result);
		  this.program=res.data.result;
        } else {
          console.error('请求失败:', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
      complete: () => {
        this.loading = false; // 请求完成，隐藏加载提示
      }
    });
  }
};
</script>

<style>
.page {
  padding: 20rpx; /* 页面边距，适配不同设备 */
}

.loading {
  margin-top: 20rpx;
  text-align: center;
}

.section {
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10rpx;
  text-decoration: underline;
}

.info-item {
  display: flex;
  margin-bottom: 10rpx;
}

.label {
  font-weight: bold;
}

.value {
  margin-left: 25rpx;
  margin-right: 15rpx;
}
</style>
', 
      method: 'GET',
      data: {
      },
      success: (res) => {
        if (res.data.status === true) {
          // 解析后端返回的数据
          this.program = JSON.parse(res.data.result);
          console.log('培养方案数据:', this.program);
        } else {
          console.error('请求失败:', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
      complete: () => {
        this.loading = false; // 请求完成，隐藏加载提示
      }
    });
  }
};
</script>

<style>
.page {
  padding: 20rpx; /* 页面边距，适配不同设备 */
}

.loading {
  margin-top: 20rpx;
  text-align: center;
}

.section {
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10rpx;
  text-decoration: underline;
}

.info-item {
  display: flex;
  margin-bottom: 10rpx;
}

.label {
  font-weight: bold;
}

.value {
  margin-left: 25rpx;
  margin-right: 15rpx;
}
</style>
