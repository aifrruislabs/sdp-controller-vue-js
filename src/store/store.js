import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({

	plugins: [createPersistedState()],

	state: {
		
		baseApi: 'https://sdpapi.aifrruislabs.com',

		// baseApi: 'http://localhost:4201',

		user: {
			authToken: '',

			firstName: '',

			lastName: '',

			email: '',
		}
		
	},

	mutations: {

		authLogout: state => {
			state.user.authToken = ''
			state.user.firstName = ''
			state.user.lastName = ''
			state.user.email = ''
		},

		//Set Token and Other Info
		successAuth: (state, payload) => {

			state.user.authToken = payload.token

		},

	},

	actions: {

	},

	getters: {

		//Get Auth Token
		getAuthToken: state => {
			return state.user.authToken
		},

		
		//Check if User is Authenticated
		isAuthenticated: state => {
			
			if (state.user.authToken != '')
				return true
			else
				return false
		}

	}

})
