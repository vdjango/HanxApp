import 'es6-promise/auto'
import axios from '@/request/index.js';

import {
    authorization,
    authorizationRefresh,
    authorizationVerify,
    authorizationRegister,
    activity,
    activityAMap,
    activityTicket,
	paymentPay,
	wechatAuthCode2,
	userInfo
} from './restful'

const request = axios();

export default {
	/**
	     * 拼接data/pagination数据部分
	     * @param data 用户请求数据
	     * @param pagination 分页器，实现数据条目分页处理
	     * @returns {*}
	     *     pagination.index 分页索引
	     *     pagination.pageSize 分页大小(一个分页多少条数据)
	     *     pagination.count 分页总数(接口数据集合条目)
	     *     pagination.next 下一页(没有数据为null)
	     *     pagination.previous 上一页(没有数据为null)
	     * @constructor
	     */
	    Data: function (data, pagination = {}) {
	        if (pagination) {
	            let offset = pagination.index
	            const limit = pagination.pageSize
	            if (offset && limit) {
	                offset = Math.round(limit * (offset - 1) + 0.4)
	                data['offset'] = offset
	                data['limit'] = limit
	            }
	        }
	        return this.UpFormData(data)
	    },
	    UpFormData: function (data) {
	        /**
	         * 针对文件上传操作进行优化
	         * 支持上传文件操作
	         * @type {boolean}
	         */
	        var objects = false
	        for (const key in data) {
	            // [object Date]
	            if (Object.prototype.toString.call(data[key]) === '[object File]') {
	                objects = true
	                console.log(Object.prototype.toString.call(data[key]))
	                continue
	            }
	        }
	        if (objects) {
	            var formData = new FormData()
	            for (const key in data) {
	                formData.append(key, data[key])
	            }
	            return formData
	        }
	        return data
	    },
	    /**
	     * 获取JwtToken令牌
	     * @param username 用户名
	     * @param password 密码
	     * @returns {Promise<unknown>}
	     */
	    authorization: function (username, password) {
	        return Axios(authorization(), 'POST', this.Data({
	            username: username,
	            password: password
	        }))
	    },
	
	    /**
	     * 刷新JwtToken令牌过期时间
	     * @param token
	     * @returns {Promise<unknown>}  JwtToken令牌
	     */
	    authorizationRefresh: function (token) {
	        return Axios(authorizationRefresh(), 'POST', this.Data({
	            token: token
	        }, {}))
	    },
	
	    /**
	     * 验证JwtToken令牌是否有效
	     * @param token JwtToken
	     * @returns {Promise<token>} JwtToken令牌
	     */
	    authorizationVerify: function (token) {
	        return Axios(authorizationVerify(), 'POST', this.Data({
	            token: token
	        }, {}))
	    },
	
	    /**
	     * 用户注册
	     * @param method [POST|OPTIONS] 等请求方式
	     * @param data 请求数据
	     * @returns {Promise<token>}
	     */
	    authorizationRegister: function (method = 'POST', data = {}) {
	        return Axios(authorizationRegister(), method, this.Data(data))
	    },
		
		/**
		 * 微信获取openid
		 * @param method 请求方式
		 * @param data 请求数据
		 * @param index 数据索引
		 * @param pagination 分页器
		 * @returns {Promise<unknown>}
		 */
		wechatAuthCode2: function (method = 'GET', data = {}, index = null, pagination = {}) {
		    return Axios(wechatAuthCode2(index), method, this.Data(data, pagination))
		},
		
		/**
		 * 用户信息
		 * @param method 请求方式
		 * @param data 请求数据
		 * @param index 数据索引
		 * @param pagination 分页器
		 * @returns {Promise<unknown>}
		 */
		userInfo: function (method = 'GET', data = {}, index = null, pagination = {}) {
		    return Axios(userInfo(index), method, this.Data(data, pagination))
		},
	    /**
	     * 活动信息
	     * @param method 请求方式
	     * @param data 请求数据
	     * @param index 数据索引
	     * @param pagination 分页器
	     * @returns {Promise<unknown>}
	     */
	    activity: function (method = 'GET', data = {}, index = null, pagination = {}) {
	        return Axios(activity(index), method, this.Data(data, pagination))
	    },
		/**
		 * 活动票种
		 * @param method 请求方式
		 * @param data 请求数据
		 * @param index 数据索引
		 * @param pagination 分页器
		 * @returns {Promise<unknown>}
		 */
		activityTicket: function (method = 'GET', data = {}, index = null, pagination = {}) {
		    return Axios(activityTicket(index), method, this.Data(data, pagination))
		},
		
		/**
		 * 微信支付
		 * @param method 请求方式
		 * @param data 请求数据
		 * @param index 数据索引
		 * @param pagination 分页器
		 * @returns {Promise<unknown>}
		 */
		paymentPay: function (method = 'GET', data = {}, index = null, pagination = {}) {
		    return Axios(paymentPay(index), method, this.Data(data, pagination))
		}
}

/* 封装好的请求方法
 * @param {String} url 请求接口地址，不带http://xxx.xxx.xxx
 * @param {String} method 请求方式[GET|POST|PUT|PATCH|DELETE|...], restful有的method方法都支持，只需传入即可
 * @param {Object} data 用户接口请求的data数据 */
export function Axios(url, method = 'GET', data = {}, headers = {}) {
    return new Promise((resolve, reject) => {
        let params = null
        if (method.toUpperCase() === 'GET') {
            params = data
            data = null
        }
        const validateStatus = status => {
            /* 定义接口有效状态码范围 */
			console.log('定义接口有效状态码范围', status)
            return status >= 199 && status < 300
        }
		
        request.request({
            url: url,
            data: data,
            params: params,
            method: method,
            validateStatus: validateStatus
        }).then(response => {
            return resolve(response)
        }).catch(error => {
            return reject(error)
        })
    })
}

