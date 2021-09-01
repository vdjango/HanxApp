export default{
	// #ifndef H5
    data(){
        return {
            //设置默认的分享参数
            share:{
                title:'分享',
                path:'/pages/index/index',
                imageUrl:'',
                desc:'',
                content:''
            }
        }
    },
	onLoad(options) {
		uni.showShareMenu({
		  withShareTicket: true,
		  title: this.share.title,
		  content: this.share.content,
		  imageUrl: this.share.imageUrl,
		  path: this.share.path,
		  menus: ['shareAppMessage', 'shareTimeline']
		})
	},
    onShareAppMessage(res) {
        return {
            title: this.share.title,
            path: this.share.path,
            imageUrl: this.share.imageUrl,
            desc: this.share.desc,
            content: this.share.content,
            success(res){
                uni.showToast({
                    title:'分享成功'
                })
            },
            fail(res){
                uni.showToast({
                    title:'分享失败',
                    icon:'none'
                })
            }
        }
    }
	// #endif
}