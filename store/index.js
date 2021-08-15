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
			avatarUrl: null,
			city: null,
			country: null,
			gender: null,
			language: null,
			nickName: null,
			province: null
		},
        
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
			state.user.avatarUrl = null
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
						
					login: null,
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
		}
	}
})

export default store