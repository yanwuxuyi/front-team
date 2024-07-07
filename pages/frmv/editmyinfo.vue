<template>
	<view>
		<view>
			<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="isFixed" :is-back="isBack"
				:background="background" :back-text-style="{color: '#fff'}" :title="title1"
				:back-icon-name="backIconName" :back-text="backText" :border-bottom="false" @click="goIndex()()">
			</u-navbar>
		</view>


		<view class="">
			<u-form :model="form" ref="uForm">

				<u-form-item label="昵称" label-width="160rpx" prop="nickName" left-icon="account">
					<u-input v-model="form.nickName" type="text" />
				</u-form-item>
				<u-form-item label="电话" label-width="160rpx" prop="phone" left-icon="phone">
					<u-input v-model="form.phone" type="text" />
				</u-form-item>
				<u-form-item label="性别" label-width="160rpx" prop='gender' left-icon="tags">
					<u-input v-model="form.gender" type="select" border: true @click="show=true" />
					<u-action-sheet :list="actionSheetList" v-model="show"
						@click="actionSheetCallback"></u-action-sheet>
				</u-form-item>
				<!-- -----------------修改地区 -->
<!-- 				<u-form-item label="所在地区" prop='region' label-width="160rpx">
					<u-input v-model="this.region" type="select" border: true @click="showregion=true" />
					<u-select v-model="showregion" mode="mutil-column-auto" :list="regionlist" @confirm="confirmregion"
						@click="regionback"></u-select>
				</u-form-item> -->
				<u-form-item :label-position="labelPosition" label="所在地区" prop="region" label-width="160rpx" left-icon="map">
					<u-input :border="border" type="select" :select-open="pickerShow" v-model="this.region"
						placeholder="请选择地区" @click="pickerShow = true"></u-input>
				</u-form-item>


				<u-form-item label="宿舍" label-width="160rpx" prop="dormitory" left-icon="grid">
					<u-input v-model="form.dormitory" type="text" />
				</u-form-item>
				<u-form-item label="邮箱" label-width="160rpx" prop="email" left-icon="email">
					<u-input v-model="form.email" type="text" />
				</u-form-item>


				<u-form-item label="学院专业" label-width="160rpx" prop='education' left-icon="file-text">
					<u-input v-model="this.showedu" type="select" border: true @click="showcollegemajor=true" />
					<u-select v-model="showcollegemajor" mode="mutil-column-auto" :list="collegemajorlist"
						@confirm="confirmcollegemajor" @click="collegemajorback"></u-select>
				</u-form-item>
				<u-form-item label="政治面貌" label-width="160rpx" prop='political' left-icon="list">
					<u-input v-model="form.political" type="select" border: true @click="showpolitical=true" />
					<u-select v-model="showpolitical" mode="single-column" :list="politicallist" @confirm="confirmpolitical"
						@click="politicalback"></u-select>
				</u-form-item>
				

				
				<u-form-item label="兴趣" label-width="160rpx" prop='interests' left-icon="heart">
					<u-input v-model="form.interests" type="select" border: true @click="showinterests=true" />
					<u-select v-model="showinterests" mode="single-column" :list="interestslist" @confirm="confirminterests"
						@click="interestsback"></u-select>
				</u-form-item>
<!-- 			<u-form-item label="兴趣" label-width="160rpx" left-icon="heart">
				<u-checkbox-group class="checkbox" @change="checkboxGroupChange">
					<u-checkbox class="checkbox" @change="checkboxChange" v-for="(item, index) in interestslist" 
					:key="index" :name="item.name"  v-model="item.checked">{{item.name}}</u-checkbox>
				</u-checkbox-group>
			</u-form-item>	 -->	


			</u-form>

			<u-button @click="submit">提交</u-button>
			<u-button @click="cancel">取消</u-button>
			<u-button @click="goChangepassword()" class="changepwd-btn">修改密码</u-button>
			<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				showedu: '',
				region: '',
				// 顶部导航栏
				title1: '信息采集',
				backText: '首页',
				backIconName: 'nav-back',
				pickerShow: false,
				right: false,
				showAction: false,
				rightSlot: false,
				useSlot: false,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(44, 168, 187), rgb(166, 197, 198))'
				},
				isBack: true,
				search: false,
				custom: true,
				isFixed: true,
				keyword: '',
				form: {
					email: '',
					academy: '',
					city: '',
					dormitory: '',
					education: '',
					gender: '',
					interests: '',
					name: '',
					nickName: '',
					phone: '',
					political: '',
					province: '',
					studentID: '',
				},
				collegemajor: "",
				collected: false,
				nowtimer: "",
				
				////////////////表单验证规则
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur']
					}],
					idNumber: [{
						required: true,
						len: 18,
						message: '身份证位数不是18位',
						trigger: ['change', 'blur']
					}],
					gender: [{
						required: true,
						message: '请选择性别',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur']
					}],
					birthday: [{
						required: true,
						message: '请选择出生日期',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur']
					}],
					// 修改地区
					region: [{
						required: true,
						message: '请选择地区',
						trigger: ['change','blur'],
					}],
					// region: [{
					// 	required: true,
					// 	message: '请选择所在地',
					// 	// 可以单个或者同时写两个触发验证方式 
					// 	trigger: ['change', 'blur']
					// }],
					collegemajor: [{
						required: true,
						message: '请选择学院专业',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur']
					}],
					traffic: [{
						required: true,
						message: '请选择交通方式',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur']
					}],
					college: [{
						required: true,
						trigger: ['change', 'blur']
					}],
					major: [{
						required: true,
						trigger: ['change', 'blur']
					}],
					degree: [{
						required: true,
						message: '请选择学位',
						trigger: ['change', 'blur']
					}],
					political: [{
						required: true,
						message: '请选择政治面貌',
						trigger: ['change', 'blur']
					}]
				},
				//////////表单变量
				form: {
					city: '',
					//region: '',
					academy: '',
					dormitory: '',
					education: '',
					gender: '',
					interests: [],
					name: '',
					nickName: '',
					phone: '',
					political: '',
					province: '',
					email: '',
					studentID: '',
				},
				account: {
					phone: '',
					password: ''
				},
				/////////////显示变量接表单模块
				showpolitical: false,
				showinterests: false,
				showbirthday: false,
				mode: 'date',
				birthday: '',
				show: false, /////性别
				showregion: false, /////城市
				showcollegemajor: false, /////专业
				showtraffic: false, /////交通方式
				collegemajorlist: [{
						value: 1,
						label: '计算机学院',
						children: [{
								value: 2,
								label: '计算机科学与技术',
							},
							{
								value: 3,
								label: '物联网',
							},
							{
								value: 4,
								label: '信息安全',
							},
						]
					},
					{
						value: 5,
						label: '大数据与软件工程学院',
						children: [{
								value: 6,
								label: '软件工程',
							},
							{
								value: 7,
								label: '数据科学与大数据技术',
							},
							{
								value: 8,
								label: '人工智能',
							},
						]
					},
					{
						value: 9,
						label: '微电子与通信学院',
						children: [{
								value: 10,
								label: '光电信息科学与工程',
							},
							{
								value: 11,
								label: '电子科学与技术',
							},
							{
								value: 12,
								label: '电子信息工程',
							},
							{
								value: 13,
								label: '集成电路设计与集成系统',
							},
							{
								value: 14,
								label: '通信工程',
							}
						]
					},
					{
						value: 15,
						label: '电气学院',
						children: [{
							value: 16,
							label: '电气工程及其自动化',
						}, ]
					},
					{
						value: 17,
						label: '机械工程及自动化学院',
						children: [{
								value: 18,
								label: '机械设计制造及其自动化',
							},
							{
								value: 19,
								label: '机械电子工程',
							},
							{
								value: 20,
								label: '车辆工程',
							},
							{
								value: 21,
								label: '智能制造工程',
							},
						]
					},
					{
						value: 22,
						label: '光电工程学院',
						children: [{
								value: 23,
								label: '',
							},
							{
								value: 24,
								label: '光电信息科学与工程',
							},
							{
								value: 25,
								label: '电子科学与技术',
							},
							{
								value: 26,
								label: '智能感知工程',
							},
						]
					}
				],
				politicallist: [{
						value: '1',
						label: '群众'
					},
					{
						value: '2',
						label: '共青团员'
					},
					{
						value: '3',
						label: '中共预备党员'
					},
					{
						value: '4',
						label: '中共党员'
					}
				],
				actionSheetList: [{
						text: '男'
					},
					{
						text: '女'
					}
				],
				interestslist: [{
						value: '1',
						label: '阅读'
					},
					{
						value: '2',
						label: '运动'
					},
					{
						value: '3',
						label:'音乐',
					},
					{
						value: '4',
						label: '舞蹈',

					},
					{
						value: '5',
						label: '艺术'
					},
					{
						value: '6',
						label: '游戏'
					},
					{
						value: '7',
						label: '旅游'
					
					},
					{
						value: '8',
						label: '学习'
					},
					{
						value: '9',
						label: '追剧'
					},
					{
						value: '10',
						label:'原神'
					}
				],
				// interestslist: [{
				// 		name: '阅读',
				// 		checked: false,
				// 		disabled: false
				// 	},
				// 	{
				// 		name: '运动',
				// 		checked: false,
				// 		disabled: false
				// 	},
				// 	{
				// 		name: '音乐',
				// 		checked: false,
				// 		disabled: false
				// 	},
				// 	{
				// 		name: '舞蹈',
				// 		checked: false,
				// 		disabled: false
				// 	},
				// 	{
				// 		name: '艺术',
				// 		checked: false,
				// 		disabled: false
				// 	},
				// 	{
				// 		name: '游戏',
				// 		checked: false,
				// 		disabled: false
				// 	},
				// 	{
				// 		name: '旅游',
				// 		checked: false,
				// 		disabled: false
				// 	},
				// 	{
				// 		name: '学习',
				// 		checked: false,
				// 		disabled: false
				// 	},
				// 	{
				// 		name: '追剧',
				// 		checked: false,
				// 		disabled: false
				// 	},
				// 	{
				// 		name: '原神',
				// 		checked: false,
				// 		disabled: false
				// 	}
				// ],

			}
		},


		methods: {
					

			actionSheetCallback(index) {
				this.form.gender = this.actionSheetList[index].text;
			},


			//////////////表单验证是否正确
			submit() {
				const Value = uni.getStorageSync('user');
				this.form.studentID = Value.studentId;
				uni.request({
					url: 'http://192.168.50.101:8090/auth/update',
					data: this.form,
					method: "POST",
					success: (res) => { //返回的结果（Result）对象 {"code":200,"reslut":...} 在res.data中

						console.log(res.data)
						console.log(this.form)
						if (res.data.status) { //成功 
							/********更新存储的form信息*/
							const value = uni.getStorageSync('user')
							value.nickName = this.form.nickName
							value.phone = this.form.phone
							value.gender = this.form.gender
							value.city = this.form.city
							value.province = this.form.province
							value.dormitory = this.form.dormitory
							value.email = this.form.email
							value.academy = this.form.academy
							value.interests = this.form.interests
							value.political = this.form.political
							value.interests = this.form.interests
							uni.setStorageSync('user', value)
							/*******/
							////1.https://uniapp.dcloud.net.cn/api/router.html#event-channel 
							uni.navigateBack() //返回                            
						} else {
							this.$u.toast('修改失败') //提示框
						}
					}
				});
			},
			cancel() {
				this.form = {
					...this.originalform
				}
			},
			goChangepassword() {
				uni.navigateTo({
					url: '/pages/frmv/changepassword'
				})
			},

			//////////////政治面貌显示
			confirmpolitical(political) {
				this.form.political = political[0].label;
			},
			//////////////兴趣爱好
			confirminterests(interests) {
				this.form.interests = interests[0].label;
			},
			

			///////////////专业显示
			confirmcollegemajor(collegemajor) {
				this.form.education = collegemajor[1].label;
				this.form.academy = collegemajor[0].label;
				this.showedu = collegemajor[0].label + '-' + collegemajor[1].label;
			},
			///////////////城市显示
			// confirmregion(region) {
			// 	this.form.province = region[0].label;
			// 	this.form.city = region[2].label;
			// 	this.region = region[0].label + '-' + region[1].label + '-' + region[2].label;
			// },
			// 修改地区
			// 选择地区回调
			regionConfirm(e) {
				this.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
				this.form.province=e.province.label;
				this.form.city = e.city.label;
			},
			///////////////兴趣模块..............
			// 选中任一checkbox时，由checkbox-group触发
			checkboxChange(e) {
				this.interests[e.name] = e.value;
			},
			checkboxGroupChange(e) {
				this.interests[e.name] = e.value;

			},


		},
		///////////////////////////////////////////////////////表单验证规则函数
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onLoad() {
			try {
				const value1 = uni.getStorageSync('user');
				uni.request({
					url: `http://192.168.50.101:8090/auth/getAllById?id=${value1.id}`,
					success: (res) => {
						console.log(res);
						if (res.data.status) {
							try {
								uni.setStorageSync('student', res.data.result);
							} catch (e) {
								this.$u.toast('身份信息格式异常');
							}
						} else {
							this.$u.toast('修改信息失败');
						}
						this.showform = uni.getStorageSync('student');
						console.log('查到了学生数据为：', this.showform);
						if (this.showform) {

							this.form.nickName = this.showform.nickName;
							this.form.gender = this.showform.gender;
							this.region = this.showform.province + '-' + this.showform.city;
							this.showedu = this.showform.academy + '-' + this.showform.education;
							this.form.dormitory = this.showform.dormitory;
							this.form.name = this.showform.name;
							this.form.education = this.showform.education;
							this.form.academy = this.showform.academy;
							this.form.email = this.showform.email;
							this.form.political = this.showform.political;
							this.form.phone = this.showform.phone;
							// this.interestslist.forEach(interest => {
							// 	if (interest.name == this.showform.interests) {
							// 		interest.checked = true;
							// 	} else {
							// 		interest.checked = false; // 确保其他兴趣的选中状态正确设置
							// 	}
							// });
							this.form.interests=this.showform.interests;
						}
					}
				});
			} catch (e) {
				console.error("An error occurred while accessing storage:", e);
			}
			this.$refs.uForm.setRules(this.rules);
		},
		created() {
			this.nowtimer = setInterval(this.gettime, 1000);
		}
	};
</script>
<style lang="scss">
	.checkbox {
		icon-size: 100rpx;
	}

	.summit {
		background-color: #007bff;
		color: #fff;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		font-size: 16px;
	}

	.popup-button:hover {
		background-color: #0056b3;
	}

	.form-icon {
		margin-left: 10px;
		vertical-align: middle;
	}

	.wrap {
		padding: 10rpx 50rpx;
		width: 100%;
		height: 100%;
	}
</style>