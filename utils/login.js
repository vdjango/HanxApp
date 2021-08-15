import axios from '@/axios/index.js'
import pageRouter from '@/router/index.js'
	
export default {
	getUserInfo(e) {
		let thx = this
		uni.getUserProfile({
			lang: 'zh_CN',
			desc: '测试授权',
			withCredentials: true,
			success:(res) => {
				uni.showLoading({
					title: '加载中'
				});
				thx.uerInfo = res.userInfo
				thx.uerInfo.login = true
				thx.getOpenId(thx.uerInfo)
				uni.setStorage({
					key: 'userInfo',
					data: thx.uerInfo
				});
			},
			fail: function(res) {
				console.log('getUserInfo.fail');
				console.log(res);
			}
		})
	},
	getOpenId(resdata) {
		let thx = this
		uni.login({
			provider: 'weixin',
			success: (loginRes) => {
				axios.wechatAuthCode2('POST', {code: loginRes.code, res: resdata}).then((res) => {
					console.log('wechatAuthCode2', res)
					if (res.code === 200){
						// 域名没有备案，微信手机小程序端无法请求（调试可以）
						uni.setStorage({
							key: 'userid',
							data: res.userid,
							success:() => {
							    console.log('setStorage.userid');
							}
						});
						uni.setStorage({
							key: 'openid',
							data: res.openid,
							success:() => {
							    console.log('setStorage.openid');
							}
						});
						uni.showToast({
							title: '登陆成功'
						});
							
					} else {
						console.log('登陆失败');
					}
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