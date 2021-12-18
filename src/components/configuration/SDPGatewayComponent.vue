<template>
    <div class="container-fluid">
        
        <div class="row">
            <div class="col-md-8">
                <h4>SDP Services Gateways</h4>
            </div>

            <div class="col-md-4" >
                <div class="right" style="margin-top: 2%;">
                    <i class="fa fa-plus" style="font-size: 20px;" 
                        aria-hidden="true" data-toggle="modal" data-target="#addNewgatewayModal"></i>
                </div>
            </div>
        </div>
        <hr/>

        <div class="row">

            <div class="col-md-12">

                <table class="table table-bordered">
                    <tr>
                        <td>ID</td>
                        <td>Gateway Title</td>
                        <td>Gateway Info</td>
                        <td>Gateway IP</td>
                        <td>Access Token</td>
                        <td>Gateway Services</td>
                        <td>Actions</td>
                    </tr>

                    <tr v-for="(gateway, id) in gatewaysList" :key="gateway.id">
                        <td>{{ id + 1 }}</td>
                        <td>{{ gateway.gatewayTitle }}</td>
                        <td>{{ gateway.gatewayInfo }}</td>
                        <td>{{ gateway.gatewayIP }}</td>

                        <td>{{ gateway.gatewayAccessToken}}</td>

                        <td>
                            <button class="btn btn-success">Services (0)</button>
                        </td>
                        
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

            </div>

        </div>
                

        <!-- Add New Gateway Modal -->
        <div class="modal fade" id="addNewgatewayModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Add New Gateway</h4>
            </div>
            <div class="modal-body">
                
                <table>
                    <tr>
                        <td>Gateway Title</td>
                        <td><input type="text" class="form-control" placeholder="Gateway Title" 
                            v-model="gatewayTitle"></td>
                    </tr>

                    <tr>
                        <td>Gateway Info</td>
                        <td><input type="text" class="form-control" placeholder="Gateway Info"
                            v-model="gatewayInfo"></td>
                    </tr>

                    <tr>
                        <td>Gateway IP</td>
                        <td><input type="text" class="form-control" placeholder="Gateway IP"
                            v-model="gatewayIP"></td>
                    </tr>

                    <tr>
                        <td></td>
                        <td><button class="btn btn-primary form-control" @click="addNewgateway()">Add New Gateway</button></td>
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
    name: 'SDPServicesgatewaysComponent',

    data() {
      
        return {
            gatewayTitle : '',
            gatewayInfo : '',
            gatewayIP : '',

            gatewaysList: []
        }

    },

    methods: {

        pullGatewaysList() {

            axios.get(this.$store.state.baseApi + "/api/v1/user/gateway/get/all", { 
                    headers : {
                        'Content-Type': 'application/json',
                        userId: this.$store.getters.getAuthId,
                        authToken: this.$store.getters.getAuthToken
                    }

                })
                
                .then( (response) => {

                    const resData = response.data

                    const data = resData.data

                    this.gatewaysList = data

                });

        },

        async addNewgateway() {
            
            if (this.gatewayTitle != "" && this.gatewayIP != "") {
                
                await axios.post(this.$store.state.baseApi + "/api/v1/user/gateway/create", {
                        gatewayTitle: this.gatewayTitle,
                        gatewayInfo: this.gatewayInfo,
                        gatewayIP: this.gatewayIP,
                    }, { 
                    
                        headers : {
                            'Content-Type': 'application/json',
                            userId: this.$store.getters.getAuthId,
                            authToken: this.$store.getters.getAuthToken
                        }

                })
                
                .then( (response) => {

                    const resData = response.data

                    //Adding Gateway to Table
                    this.gatewaysList.shift(resData.data)

                    if (resData['status'] == true) {

                        $("#addNewgatewayModal").modal('dismiss');

                        this.gatewayTitle = this.gatewayInfo = this.gatewayIP = ""

                        Swal.fire({
                                title: 'Success!',
                                text: 'Gateway was Added Successfully',
                                icon: 'success',
                            })
                    }else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to create New Gateway. Please Try Again Later',
                            icon: 'warning',
                        })        
                    }
 
                });

            }else {
                //Toast
                Swal.fire({
                        title: 'Error!',
                        text: 'Please Enter Gateway Title and Gateway IP',
                        icon: 'warning',
                    })
            }

        }

    },

    created() {

        this.pullGatewaysList()

    }
}

</script>
