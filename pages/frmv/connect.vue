<template>
	<view class="container">
		<h1>关于我们</h1>
		<p>
			本新生报到系统致力于为重大师生提供便捷的新生注册报到服务，
			功能全面，使用友好，未来还会根据具体实际添加更多功能。
		</p>
		<p>
					我们不断追求卓越，致力于提供最优质的用户体验和最高效的服务。
					我们的系统采用最新的技术和安全标准，确保用户数据的安全和隐私。
				</p>
		<h2>团队成员</h2>
		<ul>
			<li>徐媛媛，许熠，王旭博，王伟俨，胡力，陈家欢</li>
		</ul>
		<h2>联系方式</h2>
		<p>邮箱：2433113422@qq.com</p>
		<p>欢迎反馈使用问题！</p>
		<h2>代码开源</h2>
		<p>前端：<a href="https://github.com/yanwuxuyi/front-team" target="_blank">https://github.com/yanwuxuyi/front-team</a></p>
		<p>后端：<a href="https://github.com/qingfengduzui/--backend" target="_blank">https://github.com/qingfengduzui/--backend</a></p>
		<h2>评分 : {{this.value}}</h2>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ip:"192.168.50.101",
				value:0,
			};
		},
		onLoad() {
			let url = `http://${this.ip}:8090/auth/getAverageScore`;
			
			uni.request({  
				url: url,  
				method: 'GET',  
				success: (res) => {  
					console.log(res);
					this.value=res.data.result;
					console.log(this.value);
				},  
				fail: (err) => {  
				}  
			});
		},
		methods: {}
	}
</script>

<style scoped>
	.container {
		padding: 20px;
		background-color: #f9f9f9;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		max-width: 600px;
		margin: 0 auto;
	}

	h1 {
		font-size: 24px;
		margin-bottom: 16px;
		color: #333;
	}

	h2 {
		font-size: 20px;
		margin-top: 24px;
		margin-bottom: 8px;
		color: #555;
		border-bottom: 2px solid #ddd;
		padding-bottom: 4px;
	}

	p {
		font-size: 16px;
		margin-bottom: 16px;
		color: #666;
		line-height: 1.6;
	}

	ul {
		list-style-type: disc;
		padding-left: 20px;
	}

	li {
		font-size: 16px;
		margin-bottom: 4px;
		color: #666;
	}

	a {
		color: #3498db;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
