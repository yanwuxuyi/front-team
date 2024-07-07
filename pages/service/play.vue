<template>
	<view>
		<div class="search-bar">
			<input type="text" v-model="searchQuery" placeholder="描述您的旅游偏好..." />
			<button @click="performSearch">🔍</button>
		</div>
		<p class="description" v-if="before">您可以向我们描述您的游玩偏好，我们将为您推荐您可能感兴趣的重庆旅游景点！</p>
		
		<div v-if="city" class="recommendations">
			<div class="place">
				<h3>解放碑</h3>
				<img src="/static/service/city1.jpg" alt="解放碑" />
			</div>
			<div class="place">
				<h3>磁器口</h3>
				<img src="/static/service/city3.jpg" alt="磁器口" />
			</div>
			<div class="place">
				<h3>洪崖洞</h3>
				<img src="/static/service/city2.jpg" alt="洪崖洞" />
			</div>
		</div>
		
		<div v-if="mountain" class="recommendations">
			<div class="place">
				<h3>仙女山</h3>
				<img src="/static/service/mountain1.jpg" alt="仙女山" />
			</div>
			<div class="place">
				<h3>缙云山</h3>
				<img src="/static/service/mountain2.jpg" alt="缙云山" />
			</div>
			<div class="place">
				<h3>金佛山</h3>
				<img src="/static/service/mountain.jpg" alt="金佛山" />
			</div>
		</div>
		
		<div v-if="water" class="recommendations">
			<div class="place">
				<h3>巴国天潭瀑布</h3>
				<img src="/static/service/water1.jpg" alt="巴国天潭瀑布" />
			</div>
			<div class="place">
				<h3>长寿湖</h3>
				<img src="/static/service/water2.jpg" alt="长寿湖" />
			</div>
			<div class="place">
				<h3>大磨滩瀑布</h3>
				<img src="/static/service/water3.jpg" alt="大磨滩瀑布" />
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				before: true,
				city:false,
				mountain:false,
				water:false,
				searchQuery: ''
			}
		},
		methods: {
			performSearch() {
				uni.request({
					url: `http://192.168.50.101:8090/utils/predictPlay?text=${this.searchQuery}`,
					success: (res) => {
						this.before = false;
						this.city = false;
						this.mountain = false;
						this.water = false;
						let data = res.data;
						if (data.includes('城市')) {
							this.city = true;
						}else if(data.includes('山')){
							this.mountain = true;
						}else if(data.includes('水')){
							this.water = true;
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
    background-color: #ddf5ff;
    padding: 10px;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search-bar input {
	width: 250px;
	padding: 10px 15px;
	border: 2px solid #3498db;
	border-radius: 20px;
	font-size: 18px;
	outline: none;
	transition: box-shadow 0.3s;
}

.search-bar input:focus {
	box-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
}

.search-bar button {
	margin-left: 10px;
	width: 50px;
	height: 50px;
	border: none;
	border-radius: 50%;
	background-color: #3498db;
	color: white;
	font-size: 20px;
	cursor: pointer;
	transition: background-color 0.3s, transform 0.3s;
	display: flex;
	justify-content: center;
	align-items: center;
}

.search-bar button:hover {
	background-color: #2980b9;
	transform: scale(1.1);
}

.description {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    color: #fff;
    background-color: #55b3f1;
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
    color: #2980b9;
}

.place img {
    width: 300px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
}
</style>
