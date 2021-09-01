<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<u-cell-group>
			<u-cell-item v-for="(item, index) in contextResults.results" :key="index" :index="index" :arrow="false">
		
				<u-card slot="title" :border="false" 
					:foot-border-top="false" 
					:head-border-bottom="false" 
					:show-head="false" 
					:show-foot="false"
					:border-radius="36"
					@click="clickCellItem(item)"
					:foot-style="{padding: '0 15px 15px 0'}" :margin="0">
					<view class="xxu-card  u-relative u-padding-35" slot="body">
						<view class="u-body-item u-flex u-margin-top-20">
							<view class="u-body-item-title u-line-2 u-text-left u-font-xl u-flex-nowrap" style="color: #FFF; font-weight: bold;">{{item.name}}</view>
						</view>
						<view class="u-body-item u-flex u-row-center ">
							<view class="u-body-item-title u-line-2 u-font-19 u-skeleton-rect" style="color: #ff5252;">¥ {{item.money/100}}元</view>
						</view>
					
						<view class="u-body-item u-flex u-margin-top-36" slot="foot">
							<u-icon name="clock" class="u-skeleton-circle" style="color: #FFF; font-weight: bold;"></u-icon>
							<view class="u-body-item-title u-line-2 u-font-lg u-margin-left-20 u-margin-right-20 u-skeleton-rect" style="color: #FFF;">
								截止 {{datetime(item.date)}}
							</view>
						</view>
					</view>
				</u-card>

			</u-cell-item>
		</u-cell-group>
		
	</view>
</template>

<script>
	import store from '@/store/index.js'
	import axios from '@/axios/index.js'
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
				contextResults: {
					count: 11,
					next: null,
					previous: null,
					results: [
					    {
					        "id": 1,
					        "name": "测试",
					        "money": 1,
					        "rwm_image": null,
					        "date": "2021-08-28T00:00:00+08:00",
					        "num": 12,
					        "create_date": "2021-08-25T22:20:09.049429+08:00",
					        "change_date": "2021-08-25T22:20:09.049443+08:00",
					        "activity_key": 1
					    },
					],
						
				},
			}
		},
		onLoad(options) {
			uni.hideShareMenu()
			uni.setNavigationBarTitle({
			    title: '选择票种'
			});
			uni.showLoading({
			    title: '加载中',
				mask: true
			});
			const user = store.getters['getUser']
			
			this.user.token = user.token
			this.user.userid = user.userid
			this.user.openid = user.openid
			
			const activityId = options.id
			const activityName = options.title
			this.contextResults.id = activityId
			this.contextResults.title = activityName
			
			axios.activityTicket('GET', {activity_key: activityId}, null).then((response)=>{
				this.contextResults = response
				console.log('response', response)
				setTimeout(()=> {
					this.loading = false
				}, 300)
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
		computed: {
			
		},
		methods:{
			clickCellItem(item){
				console.log(item)
				store.commit('ticketListId', item.id)
				store.commit('ticketListName', item.name)
				uni.navigateBack({
				    delta: 1
				});
			},
			enrollContext(e){
				
			},
			enroll(e){
				
			},
			getUserInfo(e){},
			datetime(date){
				return DateMat(date).format("yyyy/MM/dd hh:mm")
			}
		}
	}
</script>

<style>
	.xxu-card{
		border-radius: 7px;
		background: -webkit-linear-gradient(135deg, #FFD3A5 10%, #FD6585 100%); /* Safari 5.1 - 6.0 */
	    background: -o-linear-gradient(135deg, #FFD3A5 10%, #FD6585 100%); /* Opera 11.1 - 12.0 */
	    background: -moz-linear-gradient(135deg, #FFD3A5 10%, #FD6585 100%); /* Firefox 3.6 - 15 */ 
		background: linear-gradient(135deg, #FFD3A5 10%, #FD6585 100%);
		background-image: linear-gradient(135deg, #FFD3A5 10%, #FD6585 100%);
	}
	.u-cell{
		display: contents !important;
	}
	.u-cell-box {
		margin-bottom: 100upx !important;
	}
</style>
