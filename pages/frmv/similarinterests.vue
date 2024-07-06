<template>
    <view>
        <view >
            <button type="warn" @click="chooseImg" >选择图片</button>
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

            }
        },
        methods: {
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