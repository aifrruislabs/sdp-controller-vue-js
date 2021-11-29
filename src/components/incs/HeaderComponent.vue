<template>
    <div>
        <nav class="navbar navbar-custom">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link class="navbar-brand" to="/">SDP Controller</router-link>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active">
                        <router-link to="/">Home</router-link>
                    </li>
                    
                    <li>
                        <router-link to="/about">About</router-link>
                    </li>
                </ul>

                <ul class="nav navbar-nav navbar-right" v-if="!isAuthenticated">
                    <li>
                        <router-link to="/auth/login">Login</router-link>
                    </li>

                    <li>
                        <router-link to="/auth/create/new/account">Register</router-link>
                    </li>
                </ul>

                <ul class="nav navbar-nav navbar-right" v-else>
                    <li>
                        <a href="#" v-text="welcomeText"></a>
                    </li>

                    <li>
                        <a @click="logout">Logout</a>
                    </li>
                </ul>

                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
            </nav>
    </div>
</template>


<script>

import axios from 'axios'
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'
import router from './../../router/index'

    export default {
        name: 'HeaderComponent',
        
        data() {
            return {
                welcomeText: 'Welcome ' + this.$store.state.user.firstName
            }
        },

        methods: {

            async logout() {
                await axios.post(this.$store.state.baseApi + "/api/auth/logout", {
                    email: this.email
                }, {
                    headers: {
                        'Authorization': 'token ' + this.$store.getters.getAuthToken
                    }
                }).then( (response) => {

                    const data = response.data

                    if (data['status'] == true) {
                        //Logged Out Success
                        this.$store.commit('authLogout')

                        //Redirect to Index Page
                        try{
                            router.push('/')
                        }catch (error) {
                            console.log("Error Occured : " + error.message)
                        }
                        

                    }else {
                        //Failed to Logout - Toast
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to Logout. Please Try Again Later',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                    }

                } ).catch( (error) => {

                    console.log('Error Occured : ' + error.message)

                })
            }

        },

    
        computed: {
            ...mapGetters(
                ['isAuthenticated']
            )
        },


    }

</script>
