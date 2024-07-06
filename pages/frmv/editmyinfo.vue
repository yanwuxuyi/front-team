<template>
	<view class="wrap">
		<u-form :model="user" ref="uForm">
			<u-input v-show="false"  v-model="user.id" type="text"></u-input>
			<u-form-item label-width="140" label-position="left" label="昵称" prop="nickname">
				<u-input :border="border" placeholder="请输入昵称" v-model="user.nickName" type="text"></u-input>
			</u-form-item>
			<u-form-item label-width="140" label-position="left" label="电话" prop="phone">
				<u-input :password-icon="true" :border="border" type="text" v-model="user.phone"
					placeholder="请输入电话"></u-input>
			</u-form-item>
			<u-form-item label-width="140" label-position="left" label="专业" prop="education">
				<u-input :border="border" type="select" :select-open="eduactionSheetShow" v-model="education" placeholder="请选择作业" @click="eduactionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="性别" prop="sex">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="sex" placeholder="请选择性别" @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="地区" prop="region" label-width="150">
				<u-input :border="border" type="select" :select-open="pickerShow" v-model="region" placeholder="请选择地区" @click="pickerShow = true"></u-input>
			</u-form-item>
			<u-form-item label-width="140" label-position="left" label="专业" prop="education">
				<u-input :border="border" placeholder="请输入专业" v-model="user.education" type="text"></u-input>
			</u-form-item>
			<u-form-item label-width="140" label-position="left" label="专业" prop="education">
				<u-input :border="border" placeholder="请输入专业" v-model="user.education" type="text"></u-input>
			</u-form-item>
		</u-form>
				<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
				<u-action-sheet :list="eduactionSheetList" v-model="eduactionSheetShow" @click="eduactionSheetCallback"></u-action-sheet>
			<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		<u-button @click="goChangepassword()">修改密码</u-button>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				region: '',
				border: true,
				user: { 
				  "name": "",
				  "studentID": ""	,
				  
				  "city": "",
				  "country": "",
				  
				  "dormitory": "",
				  "education": "",
				  
				  "gender": "",
				  "interests": "",
				  "political": "",		
				  "province": "",	
										  
				  "nickName": "",
				  "phone": "",
				  



				},
				pickerShow: false,
				selectShow: false,
			}
		},
		
		onLoad() { 
			    const value = uni.getStorageSync('user')
				this.user.nickname=value.nickname
				console.log('查到储存的user值为：',value)
				this.user.phone=value.phone;
				this.user.oldPhone=value.phone;
				this.user.password=value.password;
				this.user.nickName=value.nickName;
				this.user.interests=value.interests;
				this.user.education=value.education;
				},
		rules:{
			region: [
				{
					required: true,
					message: '请选择地区',
					trigger: 'change',
				}
			],
		},
		actionSheetList: [
			{
				text: '男'
			},
			{
				text: '女'
			},
			{
				text: '保密'
			}
		],
		methods: {
			submit() {
								uni.request({
								    url: 'http://192.168.50.101:8090/auth/update',  
								    data: this.user,
									method:"POST",
								    success: (res) => {//返回的结果（Result）对象 {"code":200,"reslut":...} 在res.data中
									console.log(res.data)
								       if(res.data.status){//成功 
									   /********更新存储的user信息*/
									   	const value = uni.getStorageSync('user')
									   	value.nickname=this.user.nickname
										value.phone=this.user.phone
									   	uni.setStorageSync('user',value)
									   /*******/
									   ////1.https://uniapp.dcloud.net.cn/api/router.html#event-channel 
									     uni.navigateBack() //返回  						  
									   }else{
										   this.$u.toast('修改失败，请更换用户名尝试')  //提示框
									   }
								    }
								}); 
			},
			radioChange(e) {
				//console.log(e.detail)
			   this.user.leibie = e.detail.value
			},
			goChangepassword(){
				uni.navigateTo({
					url:'/pages/frmv/changepassword'
				})
			},
			regionConfirm(e) {
				this.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
		}
	}
</script>

<style>
	.wrap{
		padding: 10rpx 50rpx;
		width: 100%;
		height: 100%;
	}
</style>