/**
 * 路由
 */
const app = {
	'article': '/pages/article/index',
	'article_order': '/pages/article/order/index',
	'center': '/pages/tabBar/uni-center'
}


export default {
	/**
	 * 返回活动页面路由地址
	 * @param {Object}  params
	 */
	article(params = null) {
	    return uriRouter(app.article, params)
	},
	/**
	 * 返回活动报名页面路由
	 * @param {Object}  params
	 */
	article_order(params = null) {
	    return uriRouter(app.article_order, params)
	},
	/**
	 * 返回个人主页页面路由（用于登陆等等）
	 * @param {Object}  params
	 */
	center(params = null) {
	    return uriRouter(app.center, params)
	}
}


export function uriParams(params){
	/**
	 * @param {Object} params in {name:'junsi', ...}
	 * @return {String} '?name=junsi&...'
	 */
	
	let uri = ['?'] 
	for (let i in params) {
		uri.push(i + '=' + params[i])
		uri.push('&')
	}
	uri = uri.slice(0, uri.length -1)
	return uri.join('')
}

export function uriRouter(router, params){
	/**
	 * 路由地址拼接
	 * @param {String}  router
	 * @param {String}  params
	 * @return {String} router_params
	 */
	if (params) return router + uriParams(params)
	return router
}
