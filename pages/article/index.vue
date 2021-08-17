<template>
	<view class="u-skeleton">
		<x-status :backdrop="false" styles="rgba(255,255,255,0)"></x-status>
		
		<u-card title="title" :full="true" :show-head="false" margin="0">
			<view class="u-text-left u-relative" slot="body">
				<!--首图-->
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0 u-margin-4">
					<image class="details-image u-skeleton-fillet" :src="contextResults.images" mode="aspectFill"></image>
				</view>
				<!--首图-->
				
				<!--标题-->
				<view class="u-body-item u-flex u-row-between u-margin-top-26 u-text-left">
					<view class="u-body-item-title u-line-2 u-font-18 u-main-color u-skeleton-rect">{{contextResults.name}}</view>
				</view>
				<!--标题-->
				
				<!--活动信息-->
				<view class="u-body-item u-flex u-row-between u-margin-top-10">
					<view class="u-body-item-title u-line-2 u-font-xs u-tips-color u-skeleton-rect">{{contextResults.browse}} 浏览</view>
					<view class="u-body-item-title u-line-2 u-font-xs u-tips-color u-skeleton-rect">{{contextResults.user_attend_num}} 报名</view>
				</view>
				<!--活动信息-->
				
				<!--活动金额-->
				<view class="u-body-item u-flex u-margin-top-26 u-text-left">
					<view class="u-body-item-title u-line-2 u-font-19 u-type-warning-dark u-skeleton-rect">¥199~296 (未实现)</view>
				</view>
				<!--活动金额-->
				
				<!--活动时间-->
				<view class="u-body-item u-flex u-margin-top-26 u-text-left">
					<u-icon name="clock" class="u-skeleton-circle"></u-icon>
					<view class="u-body-item-title u-line-2 u-font-lg u-type-info u-margin-left-20 u-margin-right-20 u-skeleton-rect">
					{{contextResults.start_date}}~{{contextResults.end_date}}
					<!-- <u-count-down ref="uCountDown" :timestamp="timestamp" :show-days="true"></u-count-down> -->
					</view>
				</view>
				<!--活动时间-->
				
				<!--活动地点-->
				<view v-for="(item,index) in contextResults.amap" :key="index" class="u-body-item u-flex u-margin-top-26 u-text-left">
					<u-icon name="map" class="u-skeleton-circle"></u-icon>
					<view class="u-body-item-title u-line-2 u-font-lg u-type-info u-margin-left-20 u-margin-right-20 u-text-left u-skeleton-rect">
						{{item.cityname}}{{item.adname}}{{item.address}}{{item.name}}
					</view>
					<!-- <u-icon name="arrow-right" class="u-flex u-row-right"></u-icon> -->
				</view>
				<!--活动地点-->
			</view>
		</u-card>
			
		<u-card title="title" :full="true" :show-head="false">
			<view class="u-text-left u-relative u-skeleton-rect" slot="body">

				<!--活动发布人-->
				<view class="u-body-item u-margin-top-26 u-text-left u-skeleton-rect">
					<x-avatar class="avatar" :tag="tag" :username="contextResults.user_name" :dateday="contextResults.dateday"></x-avatar>
				</view>
				<!--活动发布人-->
			</view>
		</u-card>
		
		<u-card title="title" :full="true" :show-head="false">
			<view class="u-text-left u-relative u-skeleton-rect" slot="body">
				<view class="u-body-item u-margin-top-26 u-skeleton-rect" v-if="contextResults.context">
					<read-more ref="uReadMore" :shadow-style="shadowStyle" :show-height="1000">
						<rich-text :nodes="contextResults.context" @load="parseLoaded" @ready="parseLoaded"></rich-text>
					</read-more>
				</view>
				<view class="u-body-item u-margin-top-26 u-skeleton-rect" v-else>
					<view class="u-skeleton-rect" style="height: 500upx;"></view>
				</view>
			</view>
		</u-card>
		
		<u-no-network></u-no-network>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		
		<x-tabber v-if="user.openid" @enroll="enroll" :list="tabber" :skeleton="false"></x-tabber>
		<x-tabber v-else name="登陆后才可以报名" :skeleton="false" @enroll="getUserInfo"></x-tabber>
	</view>
</template>

<script>
	import pageRouter from '@/router/index.js'
	import xStatus from '../../components/status/index.vue'
	import xNavbar from '@/components/navbar/index.vue'
	import xtabber from '@/components/tabber/index.vue'
	import xAvatar from '@/components/avatar/index.vue'
	import readMore from '@/components/read-more/u-read-more.vue'
	import store from '@/store/index.js' 
	import axios from '@/axios/index.js'
	import {DateMat} from '@/utils/date.js'
	
	export default {
		data() {
			return {
				loading: true,
				shadowStyle: {
					backgroundImage: 'linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 80%)',
					paddingTop: '150px',
					marginTop: '-150px',
					marginBottom: '25px',
				},
				tabber: [
					{name: '首页', icon:'home'},
					{name: '分享', icon:'share'}
				],
				contextResults: {
					id: null,
					name: '占位符 占位符 占位符 占位符 占位符',
					context: '',
					images_341x171: '../../static/card.png',
					user_name: '',
					dateday: 1,
					browse: 1,
					user_attend_num: 0,
					start_date: '00/00/00 00:00',
					end_date: '00/00/00 00:00',
					amap: [
						 {
						    lnglat: {
						        lng: 116.3190890000,
						        lat: 39.9423490000
						    },
						    name: '紫竹院公园',
						    address: '中关村南大街35号',
						    adname: '海淀区',
						    cityname: '北京市'
						}
					]
				},
				timestamp: 0,
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
		created() {
		}, 
		onLoad(options) {
			uni.setNavigationBarTitle({
			    title: '活动详情'
			});
			uni.showLoading({
			    title: '加载中',
				mask: true
			});
			
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
			
			this.contextResults.id = options.activityId
			this.contextResults.images = options.image_uri
			this.contextResults.user_name = options.username
			this.contextResults.dateday = options.dateday
			axios.activity('GET', {}, this.contextResults.id).then((res)=>{
				this.contextResults = res
				this.contextResults.start_date = DateMat(this.contextResults.start_date).format("yy/MM/dd hh:mm")
				this.contextResults.end_date = DateMat(this.contextResults.end_date).format("yy/MM/dd hh:mm")
				setTimeout(()=> {
					uni.hideLoading();
					this.loading = false
				}, 300)
			})
		},
		props: {
			tag: {
				type: String,
				default: "华夏文化研习会"
			}
		},
		components: {
			"x-avatar": xAvatar,
			"x-navbar": xNavbar,
			"x-status": xStatus,
			"x-tabber": xtabber,
			'read-more': readMore
		},
		methods:{
			parseLoaded() {
				/**
				 * 展开阅读更多
				 * 计算内容的高度
				 */
				this.$nextTick(() => {
					this.$refs.uReadMore.init();
				})
			},
			enroll(){
				/**
				 * 立即报名
				 */
				uni.navigateTo({
				    url: pageRouter.article_order({
						'id': this.contextResults.id,
						'title': this.contextResults.name
					})
				});
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
					
			}
			
			
		}
	}
</script>

<style lang="scss">
	/**
	 * 主颜色 1a1a1a
	 * 副标色 646464
	 * 子标色 999999
	 * 
	 * 文本色 444444
	 */

	.details-image {
		width: 100%;
		height: 402upx;
		border-radius: 15upx;
	}
	
	.rich-text {
		    background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%);
		    padding-top: 150px;
		    margin-top: -150px;
		    margin-bottom: 40px;
	}
</style>
