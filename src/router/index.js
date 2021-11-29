import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store/store'

Vue.use(Router)

//Import Components
import IndexComponent from '@/components/pages/IndexComponent.vue'
import LoginComponent from '@/components/auth/LoginComponent.vue'
import CreateNewAccountComponent from '@/components/auth/CreateNewAccountComponent.vue'

import AboutComponent from '@/components/pages/AboutComponent.vue'
import DashboardComponent from '@/components/pages/DashboardComponent.vue'

const authMiddleware = (to, from, next) => {
	
	if (store.state.user.authToken.length == 0) {
		return next('/auth/login')
	}
	
    return next();
}

//Router
export default new Router({
	mode: 'history',

	routes: [

		//Dashboard Route
		{ path: '/dashboard', component: DashboardComponent, name: 'dashboard', beforeEnter: authMiddleware },

        //Index Route
		{ path: '/', component: IndexComponent, name: 'index'},

		//About Route
		{ path: '/about', component: AboutComponent, name: 'about' },

		//Login Route
		{ path: '/auth/login', component: LoginComponent, name: 'login' },

        //Create New Account Route
		{ path: '/auth/create/new/account', component: CreateNewAccountComponent, name: 'create-new-account' },

    ]

})
