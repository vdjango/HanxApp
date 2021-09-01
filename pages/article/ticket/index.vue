<template>
	<view style="margin-bottom: 100upx !important;">
		<u-top-tips ref="uTips"></u-top-tips>
		<u-card v-if="ticketResults.name" :border="false" :foot-border-top="false" :head-border-bottom="false" :show-head="false" :border-radius="36"
		:foot-style="{padding: '0 15px 15px 0'}" :margin="0">
			<view class="xxu-card  u-relative u-padding-35" slot="body">
				
				<view class="u-body-item u-flex u-margin-top-20">
					<view class="u-body-item-title u-line-2 u-text-left u-font-xl u-flex-nowrap" style="color: #FFF; font-weight: bold;">{{ticketResults.name}}</view>
				</view>
				
				<view class="u-body-item u-flex u-row-center ">
					<view class="u-body-item-title u-line-2 u-font-19 u-skeleton-rect" style="color: #ff5252;">¥ {{ticketResults.money/100}}元</view>
				</view>

				<view class="u-body-item u-flex u-margin-top-36" slot="foot">
					<u-icon name="clock" class="u-skeleton-circle" style="color: #FFF; font-weight: bold;"></u-icon>
					<view class="u-body-item-title u-line-2 u-font-lg u-margin-left-20 u-margin-right-20 u-skeleton-rect" style="color: #FFF;">
					截止 {{datetime(ticketResults.date)}}
					</view>
				</view>
			</view>
		</u-card>

		<u-cell-group title="活动信息">
			<u-cell-item :absolute="false" :arrow="false" hover-class="none">
					<view slot="title">
						<view class="u-body-item u-flex">
							<u-icon name="tags" class="u-skeleton-circle"></u-icon>
							<view class="u-body-item-title u-line-2 u-font-lg u-margin-left-20 u-margin-right-20 u-skeleton-rect" >{{contextResults.name}}</view>
						</view>
						<view v-for="(item,index) in contextResults.amap" :key="index" class="u-body-item u-flex">
							<u-icon name="map" class="u-skeleton-circle"></u-icon>
							<view class="u-body-item-title u-line-2 u-font-lg u-margin-left-20 u-margin-right-20 u-skeleton-rect">
								{{item.cityname}}{{item.adname}}{{item.address}}{{item.name}}
							</view>
						</view>
						<view class="u-body-item u-flex">
							<u-icon name="clock" class="u-skeleton-circle"></u-icon>
							<view class="u-body-item-title u-line-2 u-font-lg u-margin-left-20 u-margin-right-20 u-skeleton-rect">
							{{contextResults.start_date}}~{{contextResults.end_date}}
							</view>
						</view>
					</view>
			</u-cell-item>
			<!-- <u-cell-item icon="coupon-fill" :title="contextResults.name"></u-cell-item> -->
			<!-- <u-cell-item icon="coupon-fill" :title="contextResults.start_date + '～' + contextResults.end_date"></u-cell-item> -->
		</u-cell-group>
		
		<u-cell-group title="票种">
			<u-cell-item v-if="ticketResults.id" required :index="0" @click="clickCellItem" :arrow="false">
				<view class="u-relative" slot="title">
					<view class="u-body-item u-flex">
						<view class="u-body-item-title u-line-2 u-font-lg u-margin-left-20 u-margin-right-20 u-skeleton-rect">{{ticketResults.name}}</view>
					</view>
				</view>
				<view slot="right-icon">
					<u-number-box v-model="ticketResults.number"></u-number-box>
				</view>
			</u-cell-item>
			<u-cell-item v-else required icon="coupon-fill" title="选择" @click="clickCellItem" :index="0"></u-cell-item>
		
			
		</u-cell-group>
		
		<u-cell-group title="用户">
			<u-cell-item v-if="userTicket.userid" required icon="account-fill" :title="userTicket.full_name" @click="clickCellItem" :index="1"></u-cell-item>
			<u-cell-item v-else required icon="account-fill" title="选择" @click="clickCellItem" :index="1"></u-cell-item>
		</u-cell-group>
		
		<x-tabber  name="购票" :skeleton="false" @enroll="sendForm"></x-tabber>
		<u-modal v-model="out_trade_no.show" @confirm="WPay" @cancel="cancel" show-cancel-button :content="out_trade_no.content" :title="out_trade_no.title" :confirm-text="out_trade_no.confirm_text">
		</u-modal>
	</view>
</template>

<script>
	import store from '@/store/index.js'
	import axios from '@/axios/index.js'
	import pageRouter from '@/router/index.js'
	import {DateMat} from '@/utils/date.js'
	import xtabber from '@/components/tabber/index.vue'
	export default {
		data(){
			return {
				form: {},
				user: {
					token: null,
					openid: null,
					userid: null
				},
				userTicket:{
					// 用户信息
					userid: null,
					full_name: null
				},
				ticketResults: {
					// 购票信息
					id: null,
					name: null,
					money: null,
					number: 1,
					rwm_image: null,
					date: "2021-08-28T00:00:00+08:00",
					num: null,
					create_date: "2021-08-25T22:20:09.049429+08:00",
					change_date: "2021-08-25T22:20:09.049443+08:00",
					activity_key: null
				},
				contextResults: {
					id: null,
					name: null,
					context: null,
					money: null,
					images: null,
					user_name: null,
					dateday: null,
					browse: null,
					user_attend_num: null,
					start_date: '00/00/00 00:00',
					end_date: '00/00/00 00:00',
					amap: [
						 {
						    lnglat: {
						        lng: 116.3190890000,
						        lat: 39.9423490000
						    },
						    name: null,
						    address: null,
						    adname: null,
						    cityname: null
						}
					]
				},
				out_trade_no: { // 已经下单的订单信息
					pay: false,  // 支付状态
					show: false,
					title: '成功',
					content: '已成功购票，后续请留意主页票务选项（后期增加）',
					confirm_text: '完成',
					count: 1,
					next: null,
					previous: null,
					results: [
						{
							"out_trade_no": "416f733ec23ea68c7ba635dd77fe20",
							"status": 1,
							"trade_no": 2,
							"openid": "ovil75JE6yfeDfp6fqYa8rt67fQ4",
							"prepay_id": "wx2522254915595197f40391dbd0ffe80000",
							"name": "测试1",
							"number": 1,
							"money": 1,
							"userid": 2
						}
					]
				},
			}
		},
		onLoad(options) {
			store.commit('ticketUserId', null)
			store.commit('ticketUserFullName', null)
			store.commit('ticketListId', null)
			store.commit('ticketListName', null)
			
			uni.setNavigationBarTitle({
			    title: '票种信息'
			});
			uni.showLoading({
			    title: '加载中',
				mask: true
			});
			this.contextResults.id = options.id
			this.contextResults.name = options.title
			console.log(options)
			
			const user = store.getters['getUser']
			
			this.user.token = user.token
			this.user.userid = user.userid
			this.user.openid = user.openid
			
			axios.activity('GET', {}, this.contextResults.id).then((res)=>{
				this.contextResults = res
				this.contextResults.start_date = DateMat(this.contextResults.start_date).format("yy/MM/dd hh:mm")
				this.contextResults.end_date = DateMat(this.contextResults.end_date).format("yy/MM/dd hh:mm")
			}).catch((e)=>{
				this.$refs.uTips.show({
					title: '接口错误:' + e.msg,
					type: 'error',
					duration: '10000'
				})
			}).finally(()=>{
				setTimeout(function () {
					uni.hideLoading();
				}, 100);
			})
		},
		components: {
			"x-tabber": xtabber
		},
		methods: {
			clickCellItem(index){
				console.log(index)
				this.ticketResults.number = 1
				if (index === 0){
					/**
					 * 清空数据
					 */
					store.commit('ticketListId', null)
					store.commit('ticketListName', null)
					uni.navigateTo({
					    url: pageRouter.article_ticket_list({
							'id': this.contextResults.id,
							'title': this.contextResults.name
						})
					});
				} else if (index === 1){
					store.commit('ticketUserId', null)
					store.commit('ticketUserFullName', null)
					uni.navigateTo({
					    url: pageRouter.article_ticket_user_list({
							'id': this.contextResults.id,
							'title': this.contextResults.name
						})
					});
				}
			},
			datetime(date){
				return DateMat(date).format("yyyy/MM/dd hh:mm")
			},
			cancel(){
				this.out_trade_no.show = false
			},
			sendForm(){
				/**
				 * 下单时 查询订单信息 获取用户订单信息
				 */
				
				if (this.userTicket.userid && this.ticketResults.id){
					axios.payInfo('GET', {
						openid: this.user.openid,
						userid: this.user.userid,
						trade_no__activity_key: this.contextResults.id,
						// trade_no: this.ticketResults.id,
						status: 0
					}).then((response)=>{
						console.log('response', response.results.length)
						if (this.out_trade_no.results.length > 0) {
							this.out_trade_no.title = '已有成功购票记录'
							this.out_trade_no.content = '您已成功购票，购买了 ' + response.results.length + ' 张门票'
							this.out_trade_no.confirm_text = '继续'
						} else if (this.out_trade_no.results.length < 1){
							this.WPay()
						}
						this.out_trade_no.show = true
					})
				} else {
					console.log('err')
					this.$refs.uTips.show({
						title: '请选择票种或用户信息',
						type: 'warning',
						duration: '2300'
					})
				}
			},
			WPay(){
				// 支付
				console.log('支付')
				if (this.out_trade_no.pay){
					this.out_trade_no.pay = false
					uni.navigateBack({
					    delta: 1,
					    animationType: 'pop-out',
					    animationDuration: 200
					});
				}else if (this.user.openid) {
					axios.paymentPay('POST', {
						userid: this.user.userid, 
						openid: this.user.openid, 
						trade_no: this.ticketResults.id,
						activity_id: this.contextResults.id,
						money: this.ticketResults.money,
						name: this.ticketResults.name,
						number: this.ticketResults.number,
						user_ful: this.userTicket.userid
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
								console.log('支付成功：', res)
								this.out_trade_no.title = '成功'
								this.out_trade_no.content = '已成功购票，后续请留意主页票务选项（后期增加）'
								this.out_trade_no.confirm_text = '完成'
								this.out_trade_no.show = true
								this.out_trade_no.pay = true
								uni.showToast({
								    title: '支付成功'
								});
								// uni.navigateBack({
								//     delta: 1,
								//     animationType: 'pop-out',
								//     animationDuration: 200
								// });
							},
							fail: (res) => {
								console.log('支付失败：', res)
								this.$refs.uTips.show({
									title: '支付失败',
									type: 'error',
									duration: '30000'
								})
							}
						})
					})
				} else {
					console.log('未登录')
					this.$refs.uTips.show({
						title: '请登录',
						type: 'warning',
						duration: '2300'
					})
				}
				
			},
			
		},
		computed: {
			ticketUser(){
				/**
				 * 获取活动购票选择的用户信息
				 */
				return store.getters['getTicketUserID']
			},
			ticketList(){
				/**
				 * 获取活动购票选择的用户信息
				 */
				return store.getters['getTicketListID']
			}
		},
		watch: {
			ticketUser(vale, ){
				/**
				 * 获取活动购票选择的用户信息
				 */
				console.log('获取活动购票选择的用户信息', vale, fullName)
				const fullName = store.getters['getTicketUserFullName']
				this.userTicket.userid = vale
				this.userTicket.full_name = fullName
				console.log('获取活动购票选择的用户信息', this.userTicket, vale, fullName)

			},
			ticketList(vale, ){
				/**
				 * 获取活动购票选择的票种信息
				 */
				const name = store.getters['getTicketListName']
				console.log('获取活动购票选择的用户信息', name)
				this.ticketResults.id = vale
				this.ticketResults.name = name
				uni.showLoading({
				    title: '加载中',
					mask: true
				});
				axios.activityTicket('GET', {}, this.ticketResults.id).then((response)=>{
					
					this.ticketResults.id = response.id
					this.ticketResults.name = response.name
					this.ticketResults.money = response.money
					this.ticketResults.rwm_image = response.rwm_image
					this.ticketResults.date = response.date
					this.ticketResults.num = response.num
					this.ticketResults.create_date = response.create_date
					this.ticketResults.change_date = response.change_date
					this.ticketResults.activity_key = response.activity_key
					console.log('ticketResults', response)
				}).catch((e)=>{
					this.$refs.uTips.show({
						title: '接口错误:' + e.msg,
						type: 'error',
						duration: '10000'
					})
				}).finally(()=>{
					setTimeout(function () {
						uni.hideLoading();
					}, 100);
				})
				console.log('获取活动购票选择的用户信息', this.userTicket, vale, name)
			}
		}
	}
</script>

<style lang="scss">
	.details-image {
		width: 100%;
		height: 402upx;
		border-radius: 15upx;
	}
	.xxu-card{
		border-radius: 7px;
		background: -webkit-linear-gradient(135deg, #FFD3A5 10%, #FD6585 100%); /* Safari 5.1 - 6.0 */
	    background: -o-linear-gradient(135deg, #FFD3A5 10%, #FD6585 100%); /* Opera 11.1 - 12.0 */
	    background: -moz-linear-gradient(135deg, #FFD3A5 10%, #FD6585 100%); /* Firefox 3.6 - 15 */ 
		background: linear-gradient(135deg, #FFD3A5 10%, #FD6585 100%);
		background-image: linear-gradient(135deg, #FFD3A5 10%, #FD6585 100%);
	}

</style>
