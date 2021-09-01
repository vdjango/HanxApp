<template>
	<view style="margin: 15upx;">
		
		<view class="x-card-solid" v-if="distribution"></view>
		<view class="x-card">
			<view v-if="distribution" class="x-if-card">
				<view class="x-card-header">
					<view class="title">
						<navigator :url="url" hover-class="none">
							<text>{{ title }}</text>
						</navigator>
					</view>
					<view class="user">
						<navigator :url="url" hover-class="none">
							<image src="../../static/user.png" mode="aspectFit"></image>
							<text>{{ username }}</text>
						</navigator>
					</view>
					<view class="tips">
						<view class="tip">
							<navigator :url="url" hover-class="none">
								<image src="../../static/eye.png" mode="aspectFit"></image>
								<!-- <text>{{applicants}}  人报名</text> -->
							</navigator>
						</view>
						<view class="time">
							<text>{{dateday}} 人报名</text>
						</view>
					</view>
				</view>
				<view class="x-card-image">
					<navigator :url="url" hover-class="none">
						<image :src="image_uri" mode="aspectFit"></image>
					</navigator>
				</view>
			</view>
			
			<view v-else>
				<!-- 头部信息 （名称 时间 标签） -->
				<view>
					<xAvatar :url="url" :username="username" :dateday="dateday" :tag="tag"></xAvatar>
				</view>
				
				<!-- 正文 （标题 图片 报名人数） -->
				<view class="x-else-card-image">
					<navigator :url="url" hover-class="none">
						<image :src="image_uri" mode="aspectFit"></image>
					</navigator>
				</view>
				<view class="x-else-card-header">
					<view class="title">
						<navigator :url="url" hover-class="none">
							<text>{{ title }}</text>
						</navigator>
					</view>

					<view class="tips">
						<view class="tip">
							<navigator :url="url" hover-class="none">
								<image src="../../static/eye.png" mode="aspectFit"></image>
								
								<text>{{browse}}</text>
							</navigator>
						</view>
						<view class="time">
							<!-- <u-count-to :start-val="0" :end-val="applicants"></u-count-to> -->
							<!-- <text>{{applicants}} 人报名</text> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="x-card-solid" v-if="distribution"></view>
		
	</view>
</template>

<script>
	import {
		uniCard,
		uniTag
	} from "@dcloudio/uni-ui"
	import xTag from '@/components/tag/index.vue'
	import xAvatar from '@/components/avatar/index.vue'
	
	export default {
		data() {
			return {
				url: "/pages/article/index?activityId=" + this.activityId + "&image_uri=" + this.image_uri + "&title=" + this.title + "&username=" + this.username + "&dateday=" + this.dateday + "&title=" +this.title
			};
		},
		props: {
			activityId:{  // 图文ID
				default: null
			},
			distribution: { // 开启 【大图｜小图】 模式
				type: Boolean,
				default () {
					return true // true[横]|false[竖] 
				}
			},
			tag: { // 标签名称
				type: String,
				default: "进行中"
			},
			username: { // 用户名称（单位名称亦可）
				type: String,
				default: "junsi"
			},
			dateday: { // 多少天前发布
				type: [Number, String],
				default: '当天发布'
			},
			applicants: { // 报名人数
				type: Number,
				default: 2945
			},
			browse: { // 浏览人数
				type: Number,
				default: 1
			},
			image_uri: {
				default: '/static/1.jpg'
			},
			title: {
				default: '汉服运动X周年庆典 汉服运动'
			}
		},
		components: {
			"xTag": xTag,
			"xAvatar": xAvatar
		}
	}
</script>

<style lang="scss">
	/**
	 * 封装组件
	 * 750px 1px=1upx */
	
	.x-card-solid {
		border-top: 1px solid #FCFCFC;
	}
	.x-card {
		padding: 30upx 20upx 15upx 20upx;
		background: #FFFFFF;
		
		.x-if-card {
			height: 170upx;
		}
		.x-card-header {
			float: left;
			position: relative;
			.title {
				margin-top: 7upx;
				text {
					color: #222222;
					font-size: 32upx;
				}
			}
			.user {
				height: 40upx;
				margin-top: 18upx;
				
				image {
					float: left;
					width: 40upx;
					height: 40upx;
					// border-radius: 50upx;
					
				}
				text {
					float: left;
					color: #575757;
					font-size: 24upx;
					padding: 3upx 6upx;;
				}
			}
			.tips {
				height: 28upx;
				margin-top: 25upx;
				line-height: 29.45upx;
				.tip {
					float: left;
				}
				.time {
					float: right;
				}
				image {
					width: 28upx;
					height: 28upx;
					float: left;
					will-change: transform;
				}
				text {
					float: left;
					color: #7f7f7f;
					font-size: 20upx;
					margin: 0 5upx;
				}
			}
		}
		.x-card-image {
			float: right;
			image {
				width: 233upx;
				height: 170upx;
				// will-change: transform;
				// border-radius: 15upx;
			}
		}
		
		.x-else-card-image {
			// float: right;
			// height: 195px;
			// overflow: hidden;
			// margin: 15px 0 15px 0;
			image {
				width: 100%;  // 643upx
				height: 342upx;
				// will-change: transform;
				border-radius: 10upx;
			}
		}
		.x-else-card-header {
			// float: left;
			position: relative;
			.title {
				margin-top: 7upx;
				text {
					color: #222222;
					font-size: 32upx;
				}
			}
			.tips {
				height: 28upx;
				margin-top: 25upx;
				line-height: 29.45upx;
				.tip {
					float: left;
				}
				.time {
					float: right;
				}
				image {
					width: 28upx;
					height: 28upx;
					float: left;
					will-change: transform;
				}
				text {
					float: left;
					color: #7f7f7f;
					font-size: 20upx;
					margin: 0 5upx;
				}
			}
		}
		
	}
</style>
