<template>
    <view>
        <view >
            <button type="warn" @click="expand" >选择图片</button>
        </view>
	<view v-for="(res, index) in currentList" class="my-component">
		<text>{{res}}</text>
	</view>
        <gmy-img-cropper
            ref="gmyImgCropper"
            quality="0.5"
            cropperType="free"
            fileType="jpg"
            imgSrc=""
            @getImg="getImg"
        ></gmy-img-cropper>
    </view>
</template>

<script>
    import gmyImgCropper from '@/components/gmy-img-cropper/gmy-img-cropper.vue'
    export default {
        components:{
            gmyImgCropper
        },
        data() {
            return {
				currentList:[1,2,3,4,5,6,7,1,1,1,1,1,1,1,1,1,1,,1,1,1,1,1,1,1,11,1,1,111,1,1,1,1,1,11,1,111,1,1,1,1,1],
				acceptList:[8,9,10],
				viewportHeight:0,
				threshold: 10,  
				itemheigh:1,
            }
        },
		onReady() {
			this.viewportHeight = uni.getSystemInfoSync().windowHeight; // 获取视图窗口高度
			// 使用uni.createSelectorQuery()创建一个选择器查询对象
			const query = uni.createSelectorQuery().in(this); // 注意：这里的.in(this)可能不是必需的，取决于你的查询范围  
						  
			// 选择页面上class为my-component的元素，并获取其边界信息  
			query.select('.my-component').boundingClientRect(rect => {  
			  // rect是一个对象，包含了所选元素的尺寸信息，如width、height、top、right、bottom、left等  
			  this.itemheigh=rect.height;
			  console.log('组件的高度为：', rect.height);  
			}).exec(); // 执行查询  
		},
		    onPageScroll(e) {  
		      const scrollTop = e.scrollTop; // 滚动条距离顶部的距离  
			  const allHeight =this.currentList.length;
			  //console.log(scrollTop);
		      // 计算是否已经滚动到第8条数据的位置  
		      // 注意：这里假设页面没有其他内容影响滚动条位置，且所有数据高度一致  
		      if (allHeight*this.itemheigh -scrollTop - this.viewportHeight < this.threshold*this.itemheigh) {  
				this.expand(),
		        console.log("1");
		      }  
		    },  
        methods: {
			expand()
			{
				let currentList=this.currentList;
				let acceptList=this.acceptList;
				this.currentList=[...currentList, ...acceptList];
			},
            chooseImg:function(){
                // 调用实例的chooseImg方法，拉起图片选择界面，待图片选择完毕后直接进入图片截取界面
                this.$refs.gmyImgCropper.chooseImage();
            },

            // 点击完成时，返回截取图片的临时路径
            getImg:function(e){
                console.log("父页面拿到了图片",e);
                this.imgCropperShow = false;
            },
        }
    }
</script>

<style lang="scss">
</style>