<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<u-cell-group>
			<u-cell-item v-for="(item,index) in userResults.results" :key="index" @click="clickCellItem" icon="account-fill" :index="index" :title="item.full_name"></u-cell-item>
		</u-cell-group>
		
		<u-modal v-model="useradd.loading" @confirm="confirmUserInfo" :async-close="true" ref="uModalUserInfo" show-cancel-button>
			<view class="slot-content">
				<u-form :model="useradd" ref="uForm">
						<u-form-item label="姓名" prop="full_name">
							<u-input v-model="useradd.full_name" placeholder="请输入身份证真实姓名" />
						</u-form-item>
						<u-form-item label="身份证号" prop="certificates_no">
							<u-input v-model="useradd.certificates_no" placeholder="请输入真实的身份证号" />
						</u-form-item>
						<u-form-item label="手机号" prop="mobile">
							<u-input v-model="useradd.mobile" placeholder="请输入真实的手机号" />
						</u-form-item>
					</u-form>
			</view>
		</u-modal>
		
		<x-tabber v-if="user.openid" @enroll="enroll" :list="tabber" :skeleton="false" name="添加用户"></x-tabber>
	</view>
</template>

<script>
	import store from '@/store/index.js'
	import axios from '@/axios/index.js'
	import xtabber from '@/components/tabber/index.vue'
	export default {
		data(){
			return {
				useradd: {
					loading: false,
					full_name: null,
					certificates_no: null,
					mobile: null
				},
				user: {
					token: null,
					openid: null,
					userid: null
				},
				userResults: {
					count: 0,
					next: null,
					previous: null,
					results: []
				},
				contextResults: {
					id: null,
					name: '第四届中国·北京汉服文化节',
					context: '',
					money: 198000,
					images: 'https://api.hanfuc.com/media/activity-image/1629911108/2021-08-26_010508.jpeg',
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
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
			    title: '选择用户'
			});
			const user = store.getters['getUser']
			
			this.user.token = user.token
			this.user.userid = user.userid
			this.user.openid = user.openid
			
			axios.userInfo('GET', {
				user: this.user.userid
			}).then((response) => {
				console.log(response)
				this.userResults = response

			}).catch(()=>{
				this.$refs.uTips.show({
					title: '获取用户信息失败',
					type: 'error',
					duration: '5000'
				})
			}).finally(()=>{
			})
			
		},
		components: {
			"x-tabber": xtabber
		},
		methods:{
			clickCellItem(item){
				console.log(item)
				store.commit('ticketUserId', this.userResults.results[item].id)
				store.commit('ticketUserFullName', this.userResults.results[item].full_name)
				uni.navigateBack({
				    delta: 1
				});
			},
			enroll(){
				console.log('enroll')
				this.useradd.loading = true
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
							full_name: this.useradd.full_name,
							certificates_no: this.useradd.certificates_no,
							mobile: this.useradd.mobile
						}).then((response) => {
							console.log('验证通过')
							this.$refs.uTips.show({
								title: '用户信息添加成功',
								type: 'success',
								duration: '2300'
							})
						}).catch(()=>{
							this.$refs.uTips.show({
								title: '用户信息添加失败，请重试',
								type: 'error',
								duration: '5000'
							})
						}).finally(()=>{
							axios.userInfo('GET', {
								user: this.user.userid
							}).then((response) => {
								console.log(response)
								this.userResults = response
							
							}).catch(()=>{
								this.$refs.uTips.show({
									title: '获取用户信息失败',
									type: 'error',
									duration: '5000'
								})
							}).finally(()=>{
							})
							setTimeout(() => {
								this.useradd.loading = false
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
		}
	}
</script>

<style>
</style>
