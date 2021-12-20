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
import DemoVideosComponent from '@/components/pages/DemoVideosComponent.vue'

import SDPClientsComponent from '@/components/configuration/SDPClientsComponent.vue'
import SDPGatewayComponent from '@/components/configuration/SDPGatewayComponent.vue'

import SDPServicesComponent from '@/components/admin/SDPServicesComponent.vue'
import UsersManagerComponent from '@/components/pages/UsersManagerComponent.vue'
import FaceRecognitionHistoryComponent from '@/components/pages/FaceRecognitionHistoryComponent.vue'
import FaceRecognitionManageFacesComponent from '@/components/pages/FaceRecognitionManageFacesComponent.vue'

import TrustScoresComponent from '@/components/pages/TrustScoresComponent.vue'

const authMiddleware = (to, from, next) => {

	console.log(store.state.user.authToken)

	if (store.state.user.authToken != undefined) {
		if ( store.state.user.authToken.length == 0 ) {
			return next('/auth/login')
		}else {
			return next()
		}
		
	}

    return next();
}

//Router
export default new Router({
	mode: 'history',

	routes: [

		//Clients
		{ path: '/sdp/clients', component: SDPClientsComponent, name: 'sdp-clients' },

		//Services
		{ path: '/admin/services', component: SDPServicesComponent, name: 'sdp-services' },

		//Trust Scores
		{ path: '/trust/scores', component: TrustScoresComponent, name: 'trust-scores' },

		//Face Recognition Manage Faces
		{ path: '/face/recognition/manage/faces', component: FaceRecognitionManageFacesComponent, name: 'face-recognition-manage-faces'},

		//Face Recognition History
		{ path: '/face/recognition/history', component: FaceRecognitionHistoryComponent, name: 'face-recognition-history'},

		//Users Manager
		{ path: '/users/manager', component: UsersManagerComponent, name: 'users-manager' },

		//SDP Gateway
		{ path: '/sdp/gateway', component: SDPGatewayComponent, name: 'sdp-gateway' },

		//SDP Services
		{ path: '/sdp/services', component: SDPServicesComponent, name: 'sd-services' },

		//Dashboard Route
		{ path: '/dashboard', component: DashboardComponent, name: 'dashboard', beforeEnter: authMiddleware },

		//Demo Videos
		{ path: '/demo/videos', component: DemoVideosComponent, name: 'demo-videos' },

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
