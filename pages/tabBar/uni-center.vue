<template>
	<view class="center">
		<view class="logo" @click="getUserInfo" v-if="!UserInfo.login">
			<view :hover-class="!UserInfo.login ? 'logo-hover' : ''" >
				<image class="logo-img" :src="UserInfo.avatarUrl"></image>
				<view class="logo-title">
					<text class="uer-name">您未登录</text>
				</view>
			</view>
		</view>
		<view class="logo" v-else>
			<view :hover-class="!UserInfo.login ? 'logo-hover' : ''" >
				<image class="logo-img" :src="UserInfo.avatarUrl"></image>
				<view class="logo-title">
					<text class="uer-name">{{UserInfo.nickName}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe60f;</text>
				<text class="list-text">帐号管理</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon">&#xe639;</text>
				<text class="list-text">新消息通知</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view> -->
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe60b;</text>
				<text class="list-text">帮助与反馈</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon">&#xe65f;</text>
				<text class="list-text">服务条款及隐私</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item">
				<text class="list-icon">&#xe614;</text>
				<text class="list-text">关于应用</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js' 
	import axios from '@/axios/index.js'
	

	export default {
		data() {
			return {
				UserInfo: {
					login: false,
					avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIVUHJYDoYklJFAIIdmiaQIrfXhSHXUzW9n6Ll06brS7m0xU9FYc8A9ibbCickaicics5mUHvAAWib9iabibQ/132",
					city: "门头沟",
					country: "中国",
					gender: 1,
					language: "zh_CN",
					nickName: "君思",
					province: "北京"
				},
				user: {
					token: null,
					userid: null,
					openid: null
				}
			}
		},
		onLoad() {
			const user = store.getters['getUser']
			
			if (user.userid) {
				this.user.token = user.token
				this.user.userid = user.userid
				this.user.openid = user.openid
					
				this.UserInfo.login = user.login
				this.UserInfo.avatarUrl = user.avatarUrl
				this.UserInfo.city = user.city
				this.UserInfo.country = user.country
				this.UserInfo.gender = user.gender
				this.UserInfo.language = user.language
				this.UserInfo.nickName = user.nickName
				this.UserInfo.province = user.province
			}
		},
		methods: {
			setData:function(obj){
			    let that = this;  
			    let keys = [];  
			    let val,data;  
			    Object.keys(obj).forEach(function(key){  
			         keys = key.split('.');  
			         val = obj[key];  
			         data = that.$data;  
			         keys.forEach(function(key2,index){  
			             if(index+1 == keys.length){  
			                 that.$set(data,key2,val);  
			             }else{  
			                 if(!data[key2]){  
			                    that.$set(data,key2,{});  
			                 }  
			             }  
			             data = data[key2];  
			         })  
			    });  
			},
			getUserInfo(e) {
				let thx = this
				uni.getUserProfile({
					lang: 'zh_CN',
					desc: '测试授权',
					withCredentials: true,
					success:(res) => {
						/**
						 * avatarUrl: "https://thirdwx.qlogo.cn/mmop..."
						 * city: "门头沟"
						 * country: "中国"
						 * gender: 1
						 * language: "zh_CN"
						 * login: true
						 * nickName: "君思"
						 * province: "北京"
						 */
						uni.showLoading({
						    title: '加载中'
						});
						
						this.UserInfo.avatarUrl = res.userInfo.avatarUrl
						this.UserInfo.city = res.userInfo.city
						this.UserInfo.country = res.userInfo.country 
						this.UserInfo.gender = res.userInfo.gender
						this.UserInfo.language = res.userInfo.language 
						this.UserInfo.nickName = res.userInfo.nickName
						this.UserInfo.province = res.userInfo.province
						// console.log('this.UserInfo',  this.UserInfo)
						thx.getOpenId(thx.UserInfo)
					},
					fail: function(res) {
						console.log('getUserInfo.fail', res)
					}
				})
			},
			getOpenId(resdata) {
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						/**
						 * code: "051vOrFa1lp2AB016wFa1ntfHf2vOrF6"
						 */
						axios.wechatAuthCode2('POST', {code: loginRes.code, res: resdata}).then((res) => {
							/**
							 * openid: "ovil75JE6yfeDfp6fqYa8rt67fQ4"
							 * userid: 2
							 */
							console.log('wechatAuthCode2', res, loginRes)
							this.user.code = loginRes.code
							this.user.userid = res.userid
							this.user.openid = res.openid
							this.UserInfo.login = true
								
							store.commit('login', {
								token: null,
								userid: this.user.userid,
								openid: this.user.openid,
									
								login: this.UserInfo.login,
								avatarUrl: this.UserInfo.avatarUrl,
								city: this.UserInfo.city,
								country: this.UserInfo.country,
								gender: this.UserInfo.gender,
								language: this.UserInfo.language,
								nickName: this.UserInfo.nickName,
								province: this.UserInfo.province
							})

							uni.showToast({
							    title: '登陆成功'
							});
								
					    }).catch((res)=>{
							uni.showToast({
							    title: '接口错误.request: ' + res
							});
						}).finally(()=>{
							setTimeout(function () {
								uni.hideLoading();
							}, 100);
						})
					}
				})
			},
		},
		computed: {
			getLogin() {
				/**
				 * 更新登陆状态
				 */
				return store.getters['getLogin']
			}
		},
		watch: {
			getLogin(auth, ) {
				/**
				 * 更新登陆状态
				 */
				const user = store.getters['getUser']
				
				this.user.token = user.token
				this.user.userid = user.userid
				this.user.openid = user.openid
							
				this.UserInfo.login = user.login
				this.UserInfo.avatarUrl = user.avatarUrl
				this.UserInfo.city = user.city
				this.UserInfo.country = user.country
				this.UserInfo.gender = user.gender
				this.UserInfo.language = user.language
				this.UserInfo.nickName = user.nickName
				this.UserInfo.province = user.province
			}
		}
	
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}

	page,
	view {
		display: flex;
	}

	page {
		background-color: #f8f8f8;
	}
	
	uni-button {
		display: inherit !important;
		margin-left: unset !important;
		background-color: unset !important;
	}
	uni-button:after {
		border: unset !important;
	}

	.center {
		flex-direction: column;
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 50upx;
		box-sizing: border-box;
		background-color: rgb(61, 126, 255);
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 120upx;
		height: 120upx;
		border-radius: 150upx;
	}

	.logo-title {
		/* height: 150upx; */
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
	}

	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
	}

	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
	}

	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		/* border-bottom-style: solid; */
	}

	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: rgb(61, 126, 255);
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
</style>