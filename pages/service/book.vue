<template>
	<view>
		<div class="search-bar">
			<input type="text" v-model="searchQuery" placeholder="描述您的阅读偏好..." />
			<button @click="performSearch">🔍</button>
		</div>
		<p class="description" v-if="before">您可以向我们描述您的阅读偏好，我们将为您推荐您可能感兴趣的书籍！</p>
		
		<div v-if="kehuan" class="recommendations">
			<div class="place">
				<h3>《三体》</h3>
				<img src="/static/service/book1.jpg" alt="三体" />
			</div>
			<div class="place">
				<h3>《银河帝国》</h3>
				<img src="/static/service/book2.jpg" alt="银河帝国" />
			</div>
			<div class="place">
				<h3>《时间机器》</h3>
				<img src="/static/service/book3.jpg" alt="时间机器" />
			</div>
		</div>
		
		<div v-if="qinggan" class="recommendations">
			<div class="place">
				<h3>《傲慢与偏见》</h3>
				<img src="/static/service/book4.jpg" alt="傲慢与偏见" />
			</div>
			<div class="place">
				<h3>《情感与理智》</h3>
				<img src="/static/service/book5.jpg" alt="情感与理智" />
			</div>
			<div class="place">
				<h3>《简爱》</h3>
				<img src="/static/service/book6.jpg" alt="简爱" />
			</div>
		</div>
		
		<div v-if="zhexue" class="recommendations">
			<div class="place">
				<h3>《第一哲学沉思集》</h3>
				<img src="/static/service/book7.jpg" alt="第一哲学沉思集" />
			</div>
			<div class="place">
				<h3>《社会契约论》</h3>
				<img src="/static/service/book8.png" alt="社会契约论" />
			</div>
			<div class="place">
				<h3>《悲剧的诞生》</h3>
				<img src="/static/service/book9.jpg" alt="悲剧的诞生" />
			</div>
		</div>
		<div v-if="jishu" class="recommendations">
			<div class="place">
				<h3>《计算机组成与原理》</h3>
				<img src="/static/service/book10.jpg" alt="计算机组成与原理" />
			</div>
			<div class="place">
				<h3>《机器学习》</h3>
				<img src="/static/service/book11.jpg" alt="机器学习" />
			</div>
			<div class="place">
				<h3>《人工智能技术》</h3>
				<img src="/static/service/book12.jpg" alt="人工智能技术" />
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				before: true,
				kehuan:false,
				qinggan:false,
				zhexue:false,
				jishu:false,
				searchQuery: ''
			}
		},
		methods: {
			performSearch() {
				uni.request({
					url: `http://192.168.50.101:8090/utils/predictRead?text=${this.searchQuery}`,
					success: (res) => {
						//this.kehuan = true;
						console.log(res.data);
						this.before = false;
						this.qinggan = false;
						this.zhexue = false;
						this.jishu = false;
						this.kehuan = false;
						let data = res.data;
						if (data.includes('科幻')) {
							this.kehuan = true;
						}else if(data.includes('感情')){
							this.qinggan = true;
						}else if(data.includes('哲学')){
							this.zhexue = true;
						}else if(data.includes('技术')){
							this.jishu = true;
						}else{
							this.qinggan = true;
						}
						
					},
					fail: (err) => {
						console.log(err);
					}
				});
			}
		}
	}
</script>

<style>
.search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    background-color: #ffe4e1;
    padding: 10px;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search-bar input {
	width: 250px;
	padding: 10px 15px;
	border: 2px solid #e91e63;
	border-radius: 20px;
	font-size: 18px;
	outline: none;
	transition: box-shadow 0.3s;
}

.search-bar input:focus {
	box-shadow: 0 0 10px rgba(233, 30, 99, 0.5);
}

.search-bar button {
	margin-left: 10px;
	width: 50px;
	height: 50px;
	border: none;
	border-radius: 50%;
	background-color: #e91e63;
	color: white;
	font-size: 20px;
	cursor: pointer;
	transition: background-color 0.3s, transform 0.3s;
	display: flex;
	justify-content: center;
	align-items: center;
}

.search-bar button:hover {
	background-color: #d81b60;
	transform: scale(1.1);
}

.description {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    color: #fff;
    background-color: #f06292;
    padding: 10px 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    line-height: 1.5;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.recommendations {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.place {
    text-align: center;
    margin: 20px 0;
}

.place h3 {
    font-size: 20px;
    color: #d81b60;
}

.place img {
    width: 300px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
}
</style>
