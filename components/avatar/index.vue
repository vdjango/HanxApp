<template>
	<view class="x-else-user">
		<view v-if="size === 'large'">
			大实例未实现
		</view>
		<view v-else-if="size === 'small'">
			小实例未实现
		</view>
		<view v-else-if="size === 'default'">
			<navigator :url="url" hover-class="none">
				<image src="/static/user.png" mode="aspectFit"></image>
			</navigator>
			<view class="x-else-user-class">
				<navigator :url="url" hover-class="none">
					<view class="x-else-user-text">
						<text>{{username}}</text>
					</view>
				</navigator>
					<view class="x-else-user-font">
						<text v-if="dateday > 0">{{dateday}} 天前发布</text>
						<text v-else>{{dateday}}</text>
					</view>
			</view>
			<view class="x-else-user-tabs">
				<xTag :title="tag"></xTag>
			</view>
		</view>
	</view>
</template>

<script>
	import xTag from '@/components/tag/index.vue'
	export default {
		props: {
			url: {
				type: String,
				default () {
					return "/pages/article/index"
				}
			},
			size: {
				/**
				 * large: 大图标
				 * default: 默认大小
				 * small: 小图标**/
				type: String,
				default () {
					return "default"
				}
			},
			tag: {
				type: String,
				default () {
					return "原创"
				}
			},
			username: {
				type: String,
				default: "小敏子"
			},
			dateday: {
				type: [Number, String],
				default: '当天发布'
			}
		},
		components: {
			"xTag": xTag
		}
	}
		
</script>

<style lang="scss">
	.x-else-user {
		height: 75upx;
		color: #575757;
		margin-bottom: 20upx;
		
		.x-else-user-class {
			float: left;
			margin-left: 10upx;
			.x-else-user-text {
				display: flex;
			}
			.x-else-user-font {
				display: flex;
				margin-top: 3upx;
				text {
					color: #909090;
					font-size: 20upx;
				}
			}
			text {
				float: left;
				color: #575757;
				font-size: 30upx;
				padding: 0upx 6upx;
			}
		}
		.x-else-user-tabs {
			float: right;
			padding: 16upx;
			font-size: 30upx;
		}
		
		
		
		
		image {
			float: left;
			width: 75upx; 
			height: 75upx;
			border-radius: 50upx;
		}
		
	}
</style>
