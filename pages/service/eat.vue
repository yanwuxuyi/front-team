<template>
    <view>
        <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="描述您的口味..." />
            <button @click="performSearch">🔍</button>
        </div>
        <p class="description" v-if="before">您可以向我们描述您的口味，我们将为您推荐食堂您可能喜欢的美食！</p>
        
        <div class="canteen" v-if="sweet">
            <h3>一食堂：</h3>
            <ul>
                <li>
                    <img src="/static/service/milktea.png" alt="珍珠奶茶" />
                    珍珠奶茶
                </li>
                <li>
                    <img src="/static/service/shengdai.png" alt="圣代" />
                    圣代
                </li>
                <li>
                    <img src="/static/service/fr.png" alt="水果捞" />
                    水果捞
                </li>
                <li>
                    <img src="/static/service/cao.png" alt="枣糕" />
                    枣糕
                </li>
            </ul>
        </div>
		
        
        <div class="canteen" v-if="sweet">
            <h3>二食堂：</h3>
            <ul>
                <li>
                    <img src="/static/service/icecream.png" alt="冰淇淋" />
                    冰淇淋
                </li>
                <li>
                    <img src="/static/service/pao.png" alt="泡芙" />
                    泡芙
                </li>
                <li>
                    <img src="/static/service/ice_powder.png" alt="冰粉" />
                    冰粉
                </li>
                <li>
                    <img src="/static/service/cupcake.png" alt="小蛋糕" />
                    小蛋糕
                </li>
            </ul>
        </div>
		
		<div class="canteen" v-if="acid">
		    <h3>一食堂：</h3>
		    <ul>
		        <li>
		            <img src="/static/service/suan1.png" alt="酸汤米线" />
		            酸汤米线
		        </li>
		        <li>
		            <img src="/static/service/suan2.png" alt="柠檬水" />
		            柠檬水
		        </li>
		        <li>
		            <img src="/static/service/suan3.png" alt="酸汤小火锅" />
		            酸汤小火锅
		        </li>
		        <li>
		            <img src="/static/service/suan4.png" alt="酸奶" />
		            酸奶
		        </li>
		    </ul>
		</div>
		
		
		
		<div class="canteen" v-if="acid">
		    <h3>二食堂：</h3>
		    <ul>
		        <li>
		            <img src="/static/service/suan5.png" alt="葡萄柚" />
		            葡萄柚
		        </li>
		        <li>
		            <img src="/static/service/suan6.png" alt="泡菜" />
		            泡菜
		        </li>
		        <li>
		            <img src="/static/service/suan3.png" alt="杨梅" />
		            杨梅
		        </li>
		        <li>
		            <img src="/static/service/suan8.png" alt="溜溜梅" />
		            溜溜梅
		        </li>
		    </ul>
		</div>
		
		<div class="canteen" v-if="hot">
		    <h3>一食堂：</h3>
		    <ul>
		        <li>
		            <img src="/static/service/la1.png" alt="辣子鸡" />
		            辣子鸡
		        </li>
		        <li>
		            <img src="/static/service/la2.png" alt="辣味火锅" />
		            辣味火锅
		        </li>
		        <li>
		            <img src="/static/service/la3.png" alt="辣味炸鸡" />
		            辣味炸鸡
		        </li>
		        <li>
		            <img src="/static/service/la4.png" alt="麻婆豆腐" />
		            麻婆豆腐
		        </li>
		    </ul>
		</div>
		
		<div class="canteen" v-if="hot">
		    <h3>二食堂：</h3>
		    <ul>
		        <li>
		            <img src="/static/service/la5.png" alt="酸辣粉" />
		            酸辣粉
		        </li>
		        <li>
		            <img src="/static/service/la6.png" alt="冬阴功汤" />
		            冬阴功汤
		        </li>
		        <li>
		            <img src="/static/service/la7.png" alt="宫保鸡丁" />
		            宫保鸡丁
		        </li>
		        <li>
		            <img src="/static/service/la8.png" alt="泰式辣炒海鲜" />
		            泰式辣炒海鲜
		        </li>
		    </ul>
		</div>
		
		<div class="canteen" v-if="fresh">
		    <h3>一食堂：</h3>
		    <ul>
		        <li>
		            <img src="/static/service/xi1.png" alt="蟹黄豆腐" />
		            蟹黄豆腐
		        </li>
		        <li>
		            <img src="/static/service/xi2.png" alt="上汤娃娃菜" />
		            上汤娃娃菜
		        </li>
		        <li>
		            <img src="/static/service/xi3.png" alt="鱼香茄子" />
		            鱼香茄子
		        </li>
		        <li>
		            <img src="/static/service/xi4.png" alt="蒸鱼" />
		            蒸鱼
		        </li>
		    </ul>
		</div>
		
		<div class="canteen" v-if="fresh">
		    <h3>二食堂：</h3>
		    <ul>
		        <li>
		            <img src="/static/service/xi5.png" alt="羊肉汤" />
		            羊肉汤
		        </li>
		        <li>
		            <img src="/static/service/xi6.png" alt="粉丝扇贝" />
		            粉丝扇贝
		        </li>
		        <li>
		            <img src="/static/service/xi7.png" alt="味噌汤" />
		            味噌汤
		        </li>
		        <li>
		            <img src="/static/service/xi8.png" alt="大闸蟹" />
		            大闸蟹
		        </li>
		    </ul>
		</div>
		
		<div class="canteen" v-if="salty">
		    <h3>一食堂：</h3>
		    <ul>
		        <li>
		            <img src="/static/service/xia1.png" alt="咸鸭蛋" />
		            咸鸭蛋
		        </li>
		        <li>
		            <img src="/static/service/xia2.png" alt="酱牛肉" />
		            酱牛肉
		        </li>
		        <li>
		            <img src="/static/service/xia3.png" alt="酱油拉面" />
		            酱油拉面
		        </li>
		        <li>
		            <img src="/static/service/xia4.png" alt="红烧肉" />
		            红烧肉
		        </li>
		    </ul>
		</div>
		
		<div class="canteen" v-if="salty">
		    <h3>二食堂：</h3>
		    <ul>
		        <li>
		            <img src="/static/service/xia5.png" alt="盐焗鸡" />
		            盐焗鸡
		        </li>
		        <li>
		            <img src="/static/service/xia6.png" alt="辣白菜炒饭" />
		            辣白菜炒饭
		        </li>
		        <li>
		            <img src="/static/service/xia7.png" alt="咸味薯片" />
		            咸味薯片
		        </li>
		        <li>
		            <img src="/static/service/xia8.png" alt="盐烤牛排" />
		            盐烤牛排
		        </li>
		    </ul>
		</div>
		
		<div class="canteen" v-if="bitter">
		    <h3>一食堂：</h3>
		    <ul>
		        <li>
		            <img src="/static/service/ku1.png" alt="苦瓜" />
		            苦瓜
		        </li>
		        <li>
		            <img src="/static/service/ku2.png" alt="咖啡" />
		            咖啡
		        </li>
		        <li>
		            <img src="/static/service/ku3.png" alt="荞麦茶" />
		            荞麦茶
		        </li>
		    </ul>
		</div>
		
		<div class="canteen" v-if="bitter">
		    <h3>二食堂：</h3>
		    <ul>
		        <li>
		            <img src="/static/service/ku4.png" alt="羽衣甘蓝" />
		            羽衣甘蓝
		        </li>
		        <li>
		            <img src="/static/service/ku5.png" alt="茶" />
		            茶
		        </li>
		        <li>
		            <img src="/static/service/ku6.png" alt="黑麦面包" />
		            黑麦面包
		        </li>
		    </ul>
		</div>
		
    </view>
</template>

<script>
export default {
    data() {
        return {
			bitter:false,
			salty:false,
			fresh:false,
			hot:false,
			sweet:false,
			acid:false,
			before:true,
            searchQuery: ''
        };
    },
    methods: {
        performSearch() {
            uni.request({
                url: `http://192.168.50.101:8090/utils/predict?text=${this.searchQuery}`,
                success: (res) => {
					this.before = false;
					this.sweet = false;
					 this.acid = false;
					 this.bitter = false;
					 this.hot = false;
					 this.salty = false;
					 this.fresh = false;
                    let data = res.data;
                    console.log(data);
                    if (data.includes('甜')) {
						this.sweet = true;
                    } else if(data.includes('酸')){
                        this.acid = true;
                    } else if(data.includes('苦')){
						this.bitter = true;
					} else if(data.includes('辣')){
						this.hot = true;
					} else if(data.includes('咸')){
						this.salty = true;
					} else if(data.includes('鲜')){
						this.fresh = true;
					} else {
						this.salty = true;
					}
                },
                fail: (err) => {
                    console.log(err);
                }
            });
        }
    }
};
</script>

<style>
.search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    background-color: #fff3e0;
    padding: 10px;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search-bar input {
    width: 250px;
    padding: 10px 15px;
    border: 2px solid #f39c12;
    border-radius: 20px;
    font-size: 18px;
    outline: none;
    transition: box-shadow 0.3s;
}

.search-bar input:focus {
    box-shadow: 0 0 10px rgba(243, 156, 18, 0.5);
}

.search-bar button {
    margin-left: 10px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background-color: #f39c12;
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-bar button:hover {
    background-color: #e67e22;
    transform: scale(1.1);
}

.description {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    color: #555;
    background-color: #fff8e1;
    padding: 10px 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    line-height: 1.5;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.canteen {
    margin: 20px auto;
    padding: 10px;
    background-color: #fff3e0;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
}

.canteen h3 {
    text-align: center;
    font-size: 18px;
    color: #e67e22;
}

.canteen ul {
    list-style-type: none;
    padding: 0;
}

.canteen li {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.canteen li img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.canteen li span {
    font-size: 16px;
    color: #555;
}
</style>
