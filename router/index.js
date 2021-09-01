/**
 * 路由
 */
const app = {
	'index': '/pages/tabBar/index',
	'article': '/pages/article/index',
	'article_order': '/pages/article/order/index',  // TODO
	article_ticket: '/pages/article/ticket/index',
	article_ticket_list: '/pages/article/ticket/list/index',
	article_ticket_user_list: '/pages/article/ticket/user_list/index',
	'center': '/pages/tabBar/uni-center',
	
}


export default {
	/**
	 * 返回首页路由地址
	 * @param {Object}  params
	 */
	index(params = null) {
	    return uriRouter(app.index, params)
	},
	/**
	 * 返回活动页面路由地址
	 * @param {Object}  params
	 */
	article(params = null) {
	    return uriRouter(app.article, params)
	},
	/**
	 * 
	 * @param {Object}  params
	 */
	article_order(params = null) {
	    return uriRouter(app.article_order, params)
	},
	/**
	 * 返回活动报名页面路由
	 * @param {Object}  params
	 */
	article_ticket(params = null) {
	    return uriRouter(app.article_ticket, params)
	},
	/**
	 * 返回活动报名活动票种页面路由
	 * @param {Object}  params
	 */
	article_ticket_list(params = null) {
	    return uriRouter(app.article_ticket_list, params)
	},
	/**
	 * 返回活动报名用户信息页面路由
	 * @param {Object}  params
	 */
	article_ticket_user_list(params = null) {
	    return uriRouter(app.article_ticket_user_list, params)
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
