<template>
	<view class="ticket u-skeleton">
		
		<view v-if="loading">
			<u-card v-for="index in [1, 2, 3, 4]" :key="'index'+index"
			:head-border-bottom="false" :show-head="false" class="">
				<view class="" slot="body">
					<view class="u-skeleton-fillet u-body-item u-relative u-col-between u-p-t-0">
						<view class="u-skeleton-rect u-body-item-title u-line-2 u-font-30 ticket-name">??????????</view>
						<view class="u-skeleton-rect u-body-item-title u-line-2 u-font-13 u-row-left u-text-right ticket-number">剩余 ?? 张</view>
					</view>
					<view class="u-skeleton-fillet u-body-item u-flex u-row-between u-p-b-0 u-padding-35 color-type-success">
						<view class="u-skeleton-rect u-body-item-title u-line-2 u-font-40 ticket-money">¥ ???</view>
					</view>
				</view>
				<view class="u-skeleton-rect" slot="foot">
					<u-icon name="clock" size="34" color="" label="报名此票种需要主办方审核"></u-icon>
				</view>
			</u-card>
		</view>
		
		<view v-else>
			<u-card v-for="(item, index) in contextResults.results" :key="index"
			:head-border-bottom="false" 
			:show-head="false" 
			:class="{'ticket-election': election === index}"
			@click="ticketElection(index, item)">
			election: {{election}} = {{index}}
				<view class="" slot="body">
					<view class="u-body-item u-relative u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2 u-font-30 ticket-name">{{item.name}}</view>
						<view class="u-body-item-title u-line-2 u-font-13 u-row-left u-text-right ticket-number">剩余 {{item.num}} 张</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0 u-padding-35 color-type-success">
						<view class="u-body-item-title u-line-2 u-font-40 ticket-money">¥ {{ money_tole(item.money) }}</view>
					</view>
				</view>
				<view v-if="election === index" fclass="u-flex" slot="foot">
					<u-icon name="clock" size="34" color="#19be6b" label-color="#19be6b" label="已选择当前票种,请选择数量"></u-icon>
					<u-number-box 
						v-if="election === index"
						v-model="specSelected.number"
						:min="1" :max="item.num"
						:input-width="60"
						class="u-row-right flex-number-box">
					</u-number-box>
				</view>
			</u-card>
		</view>
		
		<u-modal v-model="pay_" @confirm="WPay" :title="pay_title" :confirm-text="pay_confirm_text" ref="uModal" :show-cancel-button="pay_cancel">
			<view class="slot-content">
				<rich-text :nodes="pay_context"></rich-text>
			</view>
		</u-modal>
		
		<u-modal v-model="pay_success" @confirm="pay_confirm" content="已成功购票，后续请留意主页票务选项（后期增加）" title="成功" confirm-text="完成">
		</u-modal>
		
		<u-modal v-model="userInfoText.loading" @confirm="confirmUserInfo" :async-close="true" ref="uModalUserInfo">
			<view class="slot-content">
				<u-form :model="userInfoText" ref="uForm">
						<u-form-item label="姓名" prop="full_name">
							<u-input v-model="userInfoText.full_name" />
						</u-form-item>
						<u-form-item label="身份证号" prop="certificates_no">
							<u-input v-model="userInfoText.certificates_no" placeholder="请确保身份证号正确" />
						</u-form-item>
						<u-form-item label="手机号" prop="mobile">
							<u-input v-model="userInfoText.mobile" placeholder="请确保手机号正确" />
						</u-form-item>
					</u-form>
			</view>
		</u-modal>
		
		<x-tabber v-if="user.openid" name="下单" :skeleton="loading" @enroll="confirm"></x-tabber>
		<x-tabber v-else name="请先登陆" :skeleton="loading" @enroll="getUserInfo"></x-tabber>

		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		
	</view>
</template>

<script>
	import store from '@/store/index.js' 
	import axios from '@/axios/index.js'
	import pageRouter from '@/router/index.js'
	import xtabber from '@/components/tabber/index.vue'
	
	export default {
		data() {
			return {
				articleContext: {},
				contextResults: {
					results: []
				},
				election: 0,
				loading: true, // 是否显示骨架屏组件
				specSelected: {
					number: 1,
					data: {
						id: null,
						money: 0
					}
				},
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
				},
				userInfoText: {
					loading: false,
					full_name: null,
					certificates_no: null,
					mobile: null
				},
				rules: {
					full_name: [
						{ 
							required: true, 
							message: '请输入姓名', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					],
					certificates_no: [
						{ 
							required: true, 
							message: '请输入身份证号', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					],
					mobile: [
						{ 
							required: true, 
							message: '请输入手机号', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					],

				},
				pay_: false,
				pay_cancel: true,
				pay_title: '支付',
				pay_confirm_text: '付款',
				pay_context: '已成功购票，后续请留意主页票务选项（后期增加）',
				pay_success: false
			}
		},
		onLoad(options) {
			const activityId = options.id
			const activityName = options.title
			this.articleContext.id = activityId
			this.articleContext.title = activityName
			uni.setNavigationBarTitle({
			    title: "票种"
			});
			
			axios.activityTicket('GET', {activity_key: activityId}, null).then((response)=>{ 
				this.contextResults = response
				console.log('response', response)
				if (this.contextResults.results) {
					this.specSelected.data = this.contextResults.results[0]
				}
				setTimeout(()=> {
					this.loading = false
				}, 300)
			})
			
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
			
			axios.userInfo('GET', {
				user: this.user.userid
			}).then((response) => {
				console.log('验证通过', response)
				if(response.results.length < 1){
					uni.showToast({
						title: '请添加用户信息'
					})
					setTimeout(() => {
						this.userInfoText.loading = true
					}, 100)
				} else {
					uni.showToast({
						title: '获取用户信息成功'
					})
				}
				
			}).catch(()=>{
				uni.showToast({
					title: '获取用户信息失败。'
				});
			}).finally(()=>{
			})
			
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		components: {
			"x-tabber": xtabber
		},
		computed: {
			
		},
		methods:{
			ticketElection(index, item){
				/**
				 * 选择的票种
				 */
				this.election = index
				this.specSelected.data = item
				console.log(index, item)
			},
			numberChange(data){
				this.specSelected.number = data.number;
			},
			confirm(){
				this.pay_ = true
				this.pay_context = '票种：' + this.specSelected.data.name + '<br> 数量：' + this.specSelected.number + '张<br> 价格：' + this.money_tole(this.specSelected.data.money) * this.specSelected.number + '元'
			},
			confirmUserInfo(){
				/**
				 * 提交用户资料
				 */
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uni.showLoading({
						    title: '加载中'
						})
						axios.userInfo('POST', {
							user: this.user.userid,
							full_name: this.userInfoText.full_name,
							certificates_no: this.userInfoText.certificates_no,
							mobile: this.userInfoText.mobile
						}).then((response) => {
							console.log('验证通过')
							uni.showToast({
								title: '用户信息添加成功'
							})
						}).catch(()=>{
							uni.showToast({
								title: '用户信息添加失败，请不要购票。'
							});
						}).finally(()=>{
							setTimeout(() => {
								this.userInfoText.loading = false
								this.$refs.uModalUserInfo.clearLoading();
								uni.hideLoading();
							}, 100)
						})
					} else {
						console.log('验证失败');
						this.$refs.uModalUserInfo.clearLoading();
					}
				});
							
				
			},
			pay_confirm(){
				uni.navigateBack({
				    delta: 1,
				    animationType: 'pop-out',
				    animationDuration: 200
				});
			},
			WPay(){
				// 支付
				console.log('支付')
				if (this.user.openid) {
					axios.paymentPay('POST', {
						userid: this.user.userid, 
						openid: this.user.openid, 
						trade_no: this.specSelected.data.id,
						activity_id: this.articleContext.id,
						money: this.specSelected.data.money,
						name: this.specSelected.data.name,
						number: this.specSelected.number
					}).then((response) => {
						console.log(response)
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: response.timeStamp,
							nonceStr: response.nonceStr,
							package: response.package,
							signType: response.signType,
							paySign: response.paySign,
							success: (res) => {
								this.pay_success = true
								console.log('支付成功：', res)
								uni.showToast({
								    title: '支付成功'
								});
							},
							fail: function(res) {
								console.log('支付失败：', res)
							},
							// complete
							
							// setTimeout(() => {
							// 	this.pay_ = false;
							// }, 100)
						})
					})
				} else {
					console.log('未登录')
				}
				
			},
			
			getUserInfo(e) { 
				uni.getUserProfile({
					lang: 'zh_CN',
					desc: '需要登陆哦',
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
						    title: '登陆中'
						});
						
						this.UserInfo.avatarUrl = res.userInfo.avatarUrl
						this.UserInfo.city = res.userInfo.city
						this.UserInfo.country = res.userInfo.country 
						this.UserInfo.gender = res.userInfo.gender
						this.UserInfo.language = res.userInfo.language 
						this.UserInfo.nickName = res.userInfo.nickName
						this.UserInfo.province = res.userInfo.province
						this.getOpenId(this.UserInfo)
					},
					fail: function(res) {
						console.log('getUserInfo.fail');
						console.log(res);
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
							console.log('wechatAuthCode2', res)
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
							})
						}).catch(()=>{
							uni.showToast({
								title: '接口错误.request'
							});
						}).finally(()=>{
							setTimeout(function () {
								uni.hideLoading();
							}, 100);
						})
					}
				});
					
			},
			money_tole(money){
				/**
				 * 价格 分转元
				 */
				return parseInt(money)/10
			}
		}
	}
</script>

<style lang="scss">
	.u-card-wrap { 
		background-color: u-bg-color;
		padding: 1px;
	}
	
	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}
		
	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
	
	.ticket-money {
		color: $u-type-error;
	}
	.ticket-name {
		float: left;
		color: $u-main-color;
	}
	.ticket-number {
		color: $u-tips-color;
	}
	.ticket-election {
		margin: 30upx !important;
		background: content-box;
		border: 2px solid #19BE6B;
	}
	.flex-number-box {
		margin-left: auto;
	}
	
	
	.slot-content {
			font-size: 28rpx;
			color: $u-content-color;
			padding-left: 30rpx;
		}
</style>
