<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8">
                <h4>SDP Services</h4>
            </div>

            <div class="col-md-4 right">
                <i class="fa fa-plus" style="font-size: 20px;" 
                    data-toggle="modal" data-target="#createNewServiceModal"></i>
            </div>
        </div>
        <hr/>
        
        <table class="table">
            <tr>
                <td>Service Title</td>
                <td>Service Info</td>
                <td>Service Port</td>
                <td>Actions</td>
            </tr>

            <tr v-for="(service, id) in services" :key="service.id">
                <td>{{ id + 1}}</td>
                <td>{{ service.serviceTitle }}</td>
                <td>{{ service.serviceInfo }}</td>
                <td>{{ service.servicePort }}</td>
                <td>
                    <div style="width: 100%;">
                        <div class="float-left">
                            <i class="fa fa-pencil" style="font-size: 24px; color: green;" aria-hidden="true"></i>
                        </div>

                        <div class="float-right">
                            <i class="fa fa-times" style="font-size: 24px; color: red;" aria-hidden="true"></i>
                        </div>
                    </div>
                </td>
            </tr>
        </table>

        <!-- Create New Service Modal -->
        <div class="modal fade" id="createNewServiceModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Create New Service</h4>
            </div>
            <div class="modal-body">
                
                <table>
                    <tr>
                        <td>Service Title</td>
                        <td><input type="text" class="form-control" v-model="serviceTitle"></td>
                    </tr>

                    <tr>
                        <td>Service Info</td>
                        <td><input type="text" class="form-control" v-model="serviceInfo"></td>
                    </tr>

                    <tr>
                        <td>Service Port</td>
                        <td><input type="number" class="form-control" v-model="servicePort"></td>
                    </tr>

                    <tr>
                        <td></td>
                        <td>
                            <button class="btn btn-primary form-control" @click="createNewService()">Create New Service</button>
                        </td>
                    </tr>
                </table>
                
            </div>
            <div class="modal-footer">
                
            </div>
            </div>
        </div>
        </div>

    </div>
</template>


<script>

import $ from 'jquery'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'SDPServicesComponent',

    data() {
      
        return {

            serviceTitle: '',

            serviceInfo: '',

            servicePort: '',

            services: []

        }

    },

    methods: {

        async pullAllServices() {

            await axios.get(this.$store.state.baseApi + "/api/v1/admin/services/get/all",
                { 
                headers : {
                    'Content-Type': 'application/json',
                    userId: this.$store.getters.getAuthId,
                    authToken: this.$store.getters.getAuthToken
                }

            })
            
            .then( (response) => {

                const resData = response.data

                this.services = resData.data

            })

        },

        async createNewService() {

            if (this.serviceTitle != "" && this.servicePort != "") {

                await axios.post(this.$store.state.baseApi + "/api/v1/admin/create/service",
                    {
                        serviceTitle: this.serviceTitle,
                        serviceInfo: this.serviceInfo,
                        servicePort: this.servicePort,
                    }, { 
                    headers : {
                        'Content-Type': 'application/json',
                        userId: this.$store.getters.getAuthId,
                        authToken: this.$store.getters.getAuthToken
                    }

                })
                
                .then( (response) => {

                    const resData = response.data

                    //Adding Data to Services
                    this.services.splice(resData.data)

                    if (resData['status'] == true) {
                        $("#createNewServiceModal").css({'display': 'none'})

                        Swal.fire({
                            title: 'Success!',
                            text: 'Service was Added Successfully.',
                            icon: 'success',
                        })
                    }else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to Create New Service. Please Try Again Later',
                            icon: 'warning',
                        })        
                    }

                })

            }else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Please Enter Service Title and Service Port',
                    icon: 'warning',
                })        
            }

        }

    },

    created() {
        this.pullAllServices()
    }

}

</script>
