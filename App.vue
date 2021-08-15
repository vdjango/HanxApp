<script>
	import store from '@/store/index.js' 
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			uni.getStorage({
				key: 'user',
			    success: function (res) {
			        console.log('getStorage', res)
					if (res.data.userid) {
						store.commit('login', {
							token: res.data.token,
							userid: res.data.userid,
							openid: res.data.openid,
								
							login: res.data.login,
							avatarUrl: res.data.avatarUrl,
							city: res.data.city,
							country: res.data.country,
							gender: res.data.gender,
							language: res.data.language,
							nickName: res.data.nickName,
							province: res.data.province
						})
					}
			    }
			})
			
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// ...mapMutations(['login', 'logout']),
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	
	/*每个页面公共css */
	@font-face {
		font-family: Helvetica;
		font-weight: normal;
		font-style: normal;
		src: url('./static/PingFang_SC_Semibold.ttf') format('PingFang SC Semibold'),url('./static/Helvetlca.ttf') format('Helvetica-Condensed-Black-Se');
	}
	
	page {
		width: 750upx;
		height: fit-content;
		font-family: Helvetica,"Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		background: #f9f9f9;
	}
	.xuni-swiper {
		height: auto !important;
		// height: 87vh !important;
		.uni-swiper-wrapper { 
			overflow: unset !important;
			uni-swiper-item {
				overflow: unset !important;
			}
		}
	}
	
</style>
