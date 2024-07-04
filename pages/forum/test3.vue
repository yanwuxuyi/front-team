<template>
	<view>
		<button @click="onSearch">test</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			onSearch() {
				
				uni.request({
					url: `http://192.168.50.101:8090/utils/analyze?urlString=http://192.168.50.143:8080/#/`,
					success: (res) => {
						
					}
					
				})
			}
		}
	}
</script>

<style>

</style>
