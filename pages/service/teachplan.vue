<template>
  <view class="page">
    <view v-if="loading" class="loading">加载中...</view>
    <view v-else>
      <view class="section">
        <text class="section-title">基本信息</text>
        <view class="info-item">
          <text class="label">培养方案名称：</text>
          <text class="value">{{ program.programBaseInfo.programName }}</text>
        </view>
        <view class="info-item">
          <text class="label">培养方案代码：</text>
          <text class="value">{{ program.programBaseInfo.programId }}</text>
        </view>
        <view class="info-item">
          <text class="label">年级：</text>
          <text class="value">{{ program.programBaseInfo.grade }}</text>
        </view>
        <view class="info-item">
          <text class="label">专业名称：</text>
          <text class="value">{{ program.programBaseInfo.majorName }}</text>
        </view>
        <view class="info-item">
          <text class="label">培养方案类别：</text>
          <text class="value">{{ program.programBaseInfo.programType }}</text>
        </view>
        <view class="info-item">
          <text class="label">大类概述</text>
          <text class="value">{{ program.programBaseInfo.mainCategoryOverView }}</text>
        </view>
       <view class="info-item">
          <text class="label">专业概述:</text>
          <text class="value">{{program.programBaseInfo.majorOverview }}</text>
        </view>
      </view>
      
      <view class="section">
        <text class="section-title">专业培养目标及毕业要求</text>
        <view class="info-item">
          <text class="label">培养目标</text>
          <text class="value">{{program.programBaseInfo.trainObjectives}}</text>
        </view>
        <view class="info-item">
          <text class="label">毕业要求</text>
          <text class="value">{{program.programBaseInfo.graduationRequireReachExtent}}</text>
        </view>
      </view>
    </view>
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
      url: 'http://192.168.50.101:8090/major/getCourseByName', 
      method: 'GET',
      data: {
        studentid: studentId
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
