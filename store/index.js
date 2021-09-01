import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({  
    state: {
		user: {
			token: null,
			userid: null,
			openid: null,
			login: null,
			avatarUrl: require('@/static/loginout.jpeg'),
			city: null,
			country: null,
			gender: null,
			language: null,
			nickName: null,
			province: null
		},
		article: {
			ticket: {
				list: {
					ticket_list: {
						ticketid: 1,
						name: "测试"
					}
				},
				user_list: {
					user:{
						userid: null,
						full_name: null
					}
					
				}
			}
		}
        
    },  
    mutations: {
        login(state, user) {
			/**
			 * 登陆
			 */
            console.log('mutations', user)  
			state.user.token = user.token
			state.user.userid = user.userid
			state.user.openid = user.openid
				
			state.user.login = user.login
			state.user.avatarUrl = user.avatarUrl
			state.user.city = user.city
			state.user.country = user.country
			state.user.gender = user.gender
			state.user.language = user.language
			state.user.nickName = user.nickName
			state.user.province = user.province
			
			uni.setStorage({
			    key: 'user',
			    data: {
					token: user.token,
					userid: user.userid,
					openid: user.openid,
						
					login: user.login,
					avatarUrl: user.avatarUrl,
					city: user.city,
					country: user.country,
					gender: user.gender,
					language: user.language,
					nickName: user.nickName,
					province: user.province
				},
			    success:() => {
			        console.log('setStorage.user');
			    }
			})
			
        },  
        logout(state) {
			/**
			 * 退出登陆
			 */
			state.user.token = null
			state.user.userid = null
			state.user.openid = null
				
			state.user.login = false
			state.user.avatarUrl = require('@/static/loginout.jpeg')
			state.user.city = null
			state.user.country = null
			state.user.gender = null
			state.user.language = null
			state.user.nickName = null
			state.user.province = null
			uni.setStorage({
			    key: 'user',
			    data: {
					token: null,
					userid: null,
					openid: null,
						
					login: false,
					avatarUrl: null,
					city: null,
					country: null,
					gender: null,
					language: null,
					nickName: null,
					province: null
				},
			    success:() => {
			        console.log('setStorage.user');
			    }
			})
        },
		ticketUserId(state, userid){
			/**
			 * 活动购票选择的用户信息
			 */
			console.log('state', userid)
			state.article.ticket.user_list.user.userid = userid
			// state.article.ticket.user_list.user.full_name = item.full_name
		},
		ticketUserFullName(state, full_name){
			/**
			 * 活动购票选择的用户信息
			 */
			console.log('state', full_name)
			state.article.ticket.user_list.user.full_name = full_name
		},
		ticketListId(state, ticketid){
			/**
			 * 活动购票选择的用户信息
			 */
			state.article.ticket.list.ticket_list.ticketid = ticketid
		},
		ticketListName(state, name){
			/**
			 * 活动购票选择的用户信息
			 */
			state.article.ticket.list.ticket_list.name = name
		}
    },
	getters: {
		getUser(state){
			/**
			 * 获取用户登陆信息
			 */
			return state.user
		},
		getLogin(state){
			return state.user.login
		},
		getTicketUserID(state){
			/**
			 * 获取活动购票选择的用户信息ID
			 */
			return state.article.ticket.user_list.user.userid
		},
		getTicketUserFullName(state){
			/**
			 * 获取活动购票选择的用户信息
			 */
			return state.article.ticket.user_list.user.full_name
		},
		getTicketListID(state){
			/**
			 * 获取活动购票选择的票种信息ID
			 */
			return state.article.ticket.list.ticket_list.ticketid
		},
		getTicketListName(state){
			/**
			 * 获取活动购票选择的票种信息
			 */
			return state.article.ticket.list.ticket_list.name
		}
	}
})

export default store