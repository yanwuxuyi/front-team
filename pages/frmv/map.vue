<template>
	<view>
		<view>
			<u-navbar title-color="#fff" back-icon-color="#ffffff"
				:is-fixed="isFixed" :is-back="isBack" 
				:background="background" 
				:back-text-style="{color: '#fff'}" :title="title1" 
				:back-icon-name="backIconName" :back-text="backText"
				:border-bottom="false" @click="goIndex()">
			</u-navbar>
		</view>
		<u-card :title="title">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<baidu-map  :center="{lng: 106.30524279492876, lat: 29.60053256314422}" :zoom="17" style="width: 430px; height: 350px;">
					  </baidu-map>
					<!-- <div id="map_container"  style="width: 430px; height: 350px;"></div> -->
				</view>
			</view>
		</u-card>
		<view class="headLine"> 目的地导航 </view>
		<view class="upView" style="background-image: linear-gradient(45deg, rgb(44, 168, 187), rgb(166, 197, 198));">
		
			<cc-nineMenuBtn class="nineV" @click="yishitang()" myText='一食堂' imgSrc='../../static/images/mappic/shitang1.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" @click="ershitang()" myText='二食堂' imgSrc='../../static/images/mappic/shitang2.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" @click="sanshitang()" myText='三食堂' imgSrc='../../static/images/mappic/shitang3.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" @click="beimeng()" myText='北门' imgSrc='../../static/images/mappic/door1.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" @click="xiyimeng()" myText='西一门' imgSrc='../../static/images/mappic/door2.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" @click="xiermeng()" myText='西二门' imgSrc='../../static/images/mappic/door3.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" @click="kuaididian()" myText='快递点' imgSrc='../../static/images/mappic/kuaidi.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" @click="yijiao()" myText='一教' imgSrc='../../static/images/mappic/building1.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" @click="yishiyan()" myText='一实验楼' imgSrc='../../static/images/mappic/building2.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" @click="zonghelou()" myText='综合楼' imgSrc='../../static/images/mappic/building3.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" @click="yishulou()" myText='艺术楼' imgSrc='../../static/images/mappic/building4.png'></cc-nineMenuBtn>
			<cc-nineMenuBtn class="nineV" @click="tushuguan()" myText='图书馆' imgSrc='../../static/images/mappic/tushuguan.png'></cc-nineMenuBtn>
		</view>
		
	</view>
	
</template>

<script>
	import * as echarts from 'echarts';
	import 'echarts/extension/bmap/bmap';
	export default {
		data() {
			return {
				// 顶部导航栏
				title1: '校园地图',
				backText: '首页',
				backIconName: 'nav-back',
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
				
				title: '校园地图：'
			}

		},
		mounted() {
					//this.drawEcharts();
		    },
		methods: {
// 			    drawEcharts () {
// 			       var chartDom = document.getElementById('map_container');
// 			            if (!chartDom) {
// 			              console.error("DOM 元素未找到");
// 			              return;
// 			            }
// 			            var myChart = echarts.init(chartDom);
// 				  var option;
// 				  console.error("正在渲染");
// 				  myChart.setOption(
// 				              (option = {
// 				                bmap: {
// 				                  center: [106.30,29.59],
// 				                  zoom: 17,
// 				                  roam: true,
// 								  mapStyle: {
// 								                    styleJson: [
// 								                      {
// 								                        featureType: 'water',
// 								                        elementType: 'all',
// 								                        stylers: {
// 								                          color: '#d1d1d1'
// 								                        }
// 								                      },
// 								                      {
// 								                        featureType: 'land',
// 								                        elementType: 'all',
// 								                        stylers: {
// 								                          color: '#f3f3f3'
// 								                        }
// 								                      },
// 								                      {
// 								                        featureType: 'railway',
// 								                        elementType: 'all',
// 								                        stylers: {
// 								                          visibility: 'off'
// 								                        }
// 								                      },
// 								                      {
// 								                        featureType: 'highway',
// 								                        elementType: 'all',
// 								                        stylers: {
// 								                          color: '#fdfdfd'
// 								                        }
// 								                      },
// 								                      {
// 								                        featureType: 'highway',
// 								                        elementType: 'labels',
// 								                        stylers: {
// 								                          visibility: 'off'
// 								                        }
// 								                      },
// 								                      {
// 								                        featureType: 'arterial',
// 								                        elementType: 'geometry',
// 								                        stylers: {
// 								                          color: '#fefefe'
// 								                        }
// 								                      },
// 								                      {
// 								                        featureType: 'arterial',
// 								                        elementType: 'geometry.fill',
// 								                        stylers: {
// 								                          color: '#fefefe'
// 								                        }
// 								                      },
// 								                      {
// 								                        featureType: 'poi',
// 								                        elementType: 'all',
// 								                        stylers: {
// 								                          visibility: 'off'
// 								                        }
// 								                      },
// 								                      {
// 								                        featureType: 'green',
// 								                        elementType: 'all',
// 								                        stylers: {
// 								                          visibility: 'off'
// 								                        }
// 								                      },
// 								                      {
// 								                        featureType: 'subway',
// 								                        elementType: 'all',
// 								                        stylers: {
// 								                          visibility: 'off'
// 								                        }
// 								                      },
// 								                      {
// 								                        featureType: 'manmade',
// 								                        elementType: 'all',
// 								                        stylers: {
// 								                          color: '#d1d1d1'
// 								                        }
// 								                      },
// 								                      {
// 								                        featureType: 'local',
// 								                        elementType: 'all',
// 								                        stylers: {
// 								                          color: '#d1d1d1'
// 								                        }
// 								                      },
// 								                      {
// 								                        featureType: 'arterial',
// 								                        elementType: 'labels',
// 								                        stylers: {
// 								                          visibility: 'off'
// 								                        }
// 								                      },
// 								                      {
// 								                        featureType: 'boundary',
// 								                        elementType: 'all',
// 								                        stylers: {
// 								                          color: '#fefefe'
// 								                        }
// 								                      },
// 								                      {
// 								                        featureType: 'building',
// 								                        elementType: 'all',
// 								                        stylers: {
// 								                          color: '#d1d1d1'
// 								                        }
// 								                      },
// 								                      {
// 								                        featureType: 'label',
// 								                        elementType: 'labels.text.fill',
// 								                        stylers: {
// 								                          color: '#999999'
// 								                        }
// 								                      }
// 								                    ]
// 								                  }

// 				                }
// 				              })
// 				          );
// 						    if (option && typeof option === 'object') {
// 						          myChart.setOption(option);
// 						        }
						  
// 						    window.addEventListener('resize', myChart.resize);
// },

				  
			goIndex() {
				console.log("fuck");
				uni.navigateTo({
					url: "pages/index/index"
				});
			},
			
			//一食堂
			yishitang() {
				console.log("cli");
				uni.navigateTo({
					url: '/pages/frmv/webView?url=' + encodeURIComponent('https://map.baidu.com/search/%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E4%B8%80%E9%A3%9F%E5%A0%82/@11852657.635,3427022.73,19z?querytype=s&da_src=shareurl&wd=%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E4%B8%80%E9%A3%9F%E5%A0%82&c=132&src=0&pn=0&sug=0&l=13&b=(11832479,3426259;11878559,3449651)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2')
				})
			},
			//二食堂
			ershitang() {
				uni.navigateTo({
					url: '/pages/frmv/webView?url=' + encodeURIComponent('https://map.baidu.com/search/%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E4%BA%8C%E9%A3%9F%E5%A0%82/@11838556.5061678,3430330.6550000007,13.63z?querytype=s&da_src=shareurl&wd=%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E4%BA%8C%E9%A3%9F%E5%A0%82&c=132&src=0&pn=0&sug=0&l=19&b=(11852297.635,3426839.98;11853017.635,3427205.48)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2')
				})
			},
			//三食堂
			sanshitang() {
				uni.navigateTo({
					url: '/pages/frmv/webView?url=' + encodeURIComponent('https://map.baidu.com/search/%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E4%B8%89%E9%A3%9F%E5%A0%82/@11839514.669341827,3428595.4850000003,13.67z?querytype=s&da_src=shareurl&wd=%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E4%B8%89%E9%A3%9F%E5%A0%82&c=132&src=0&pn=0&sug=0&l=13&b=(11823671.053106574,3422774.220147393;11853441.959229024,3437887.0898526083)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2')
				})
			},
			//北门
			beimeng() {
				uni.navigateTo({
					url: '/pages/frmv/webView?url=' + encodeURIComponent('https://map.baidu.com/search/%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E5%8C%97%E9%97%A8/@11839237.69015873,3429715.2449999996,13.63z?querytype=s&da_src=shareurl&wd=%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E5%8C%97%E9%97%A8&c=132&src=0&pn=0&sug=0&l=13&b=(11825022.3152017,3421238.6024469216;11854007.023481954,3435952.367553079)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2')
				})
			},
			//西一门
			xiyimeng() {
				uni.navigateTo({
					url: '/pages/frmv/webView?url=' + encodeURIComponent('https://map.baidu.com/search/%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E8%A5%BF%E4%B8%80%E9%97%A8/@11833092.014194395,3430946.04,18.41z?querytype=s&da_src=shareurl&wd=%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E8%A5%BF%E4%B8%80%E9%97%A8&c=132&src=0&pn=0&sug=0&l=13&b=(11824339.461587302,3422152.324801587;11854135.918730158,3437278.1651984123)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2')
				})
			},
			//西二门
			xiermeng() {
				uni.navigateTo({
					url: '/pages/frmv/webView?url=' + encodeURIComponent('https://map.baidu.com/search/%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E8%A5%BF%E4%BA%8C%E9%97%A8/@11833170.145,3430731.01,19z?querytype=s&da_src=shareurl&wd=%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E8%A5%BF%E4%BA%8C%E9%97%A8&c=132&src=0&pn=0&sug=0&l=18&b=(11832549.731882662,3430670.756409807;11833634.29650613,3431221.323590193)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2')
				})
			},
			//快递点
			kuaididian() {
				uni.navigateTo({
					url: '/pages/frmv/webView?url=' + 'https://www.amap.com/place/B0FFJN8V9P'
				})
			},
			//一教
			yijiao() {
				uni.navigateTo({
					url: '/pages/frmv/webView?url=' + encodeURIComponent('https://map.baidu.com/search/%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6-%E7%AC%AC%E4%B8%80%E6%95%99%E5%AD%A6%E6%A5%BC(%E8%99%8E%E6%BA%AA%E6%A0%A1%E5%8C%BA)/@11834248.062769579,3431118.9925501496,19z?querytype=s&da_src=shareurl&wd=%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6-%E7%AC%AC%E4%B8%80%E6%95%99%E5%AD%A6%E6%A5%BC(%E8%99%8E%E6%BA%AA%E6%A0%A1%E5%8C%BA)&c=132&src=0&wd2=%E9%87%8D%E5%BA%86%E5%B8%82%E6%B2%99%E5%9D%AA%E5%9D%9D%E5%8C%BA&pn=0&sug=1&l=13&b=(11832479,3426259;11878559,3449651)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&sug_forward=f250f19a48b7682479b55cbf&device_ratio=2')
				})
			},
			//一实验
			yishiyan() {
				uni.navigateTo({
					url: '/pages/frmv/webView?url=' + encodeURIComponent('https://map.baidu.com/search/%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E7%AC%AC%E4%B8%80%E5%AE%9E%E9%AA%8C%E6%A5%BC/@11834577.855,3431098.69,19z?querytype=s&da_src=shareurl&wd=%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E7%AC%AC%E4%B8%80%E5%AE%9E%E9%AA%8C%E6%A5%BC&c=132&src=0&pn=0&sug=0&l=13&b=(11821333.31,3418176.87;11867413.31,3441568.87)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2')
				})
			},
			//综合楼
			zonghelou() {
				uni.navigateTo({
					url: '/pages/frmv/webView?url=' + encodeURIComponent('https://map.baidu.com/search/%E7%BB%BC%E5%90%88%E6%A5%BC/@11834577.855,3431098.69,19z?querytype=s&da_src=shareurl&wd=%E7%BB%BC%E5%90%88%E6%A5%BC&c=132&src=0&pn=0&sug=0&l=19&b=(11834217.855,3430915.94;11834937.855,3431281.44)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2')
				})
			},
			//艺术楼
			yishulou() {
				uni.navigateTo({
					url: '/pages/frmv/webView?url=' + encodeURIComponent('https://map.baidu.com/search/%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E8%99%8E%E6%BA%AA%E6%A0%A1%E5%8C%BA%E8%89%BA%E6%9C%AF%E6%A5%BC/@11834546.915,3430896.66,19z?querytype=s&da_src=shareurl&wd=%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E8%99%8E%E6%BA%AA%E6%A0%A1%E5%8C%BA%E8%89%BA%E6%9C%AF%E6%A5%BC&c=132&src=0&pn=0&sug=0&l=12&b=(11811050.040354507,3420919.870130854;11858104.377283903,3444806.4814470955)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2')
				})
			},
			//图书馆
			tushuguan() {
				uni.navigateTo({
					url: '/pages/frmv/webView?url=' + encodeURIComponent('https://map.baidu.com/search/%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E8%99%8E%E6%BA%AA%E6%A0%A1%E5%8C%BA%E5%9B%BE%E4%B9%A6%E9%A6%86/@11834273.500789175,3430687.774278373,19z?querytype=s&da_src=shareurl&wd=%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E8%99%8E%E6%BA%AA%E6%A0%A1%E5%8C%BA%E5%9B%BE%E4%B9%A6%E9%A6%86&c=132&src=0&pn=0&sug=0&l=19&b=(11834186.915,3430713.91;11834906.915,3431079.41)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2')
				})
			},

		}
	}
</script>

<style scoped lang="scss">
	page {
		background-image: linear-gradient(45deg, rgb(44, 168, 187), rgb(166, 197, 198));
	}
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 20px;
	}

	.u-body-item {
		font-size: 30rpx;
		color: #221233;
		padding: 0rpx 0rpx;
	}

	.u-body-item image {
		height: 821rpx;
		width: 474rpx;
		margin-left: 12rpx;
	}

	.grid-text {
		font-size: 10rpx;
		margin-top: 10rpx;
		margin-left: 5rpx;
		margin-right: 5rpx;
		color: $u-type-info;
	}
	/* .u-grid-item{
		padding: 50rpx 50rpx;
	} */
	.u-grid-item-box{
		padding: 50rpx 50rpx;
	}
	.content {
		display: flex;
		flex-direction: column;
	
	}
	
	.upView {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-left: 12px;
		width: calc(100vw - 24px);
		margin-top: 10px;
		padding: 4px 0px;
		background-color: white;
	
	}
	
	.headLine {
		text-align: center;
		height: 30px;
		line-height: 30px;
		margin: 10px 15px;
		font-size: 20px;
	}
	
	.nineV {
	
		width: calc((100vw - 24px)/3);
	}
</style>