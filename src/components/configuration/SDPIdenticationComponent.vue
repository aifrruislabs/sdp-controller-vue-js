<template>
    <div>        
        <div class="col-md-12">

            <div class="row">
                <div class="col-md-10">
                    <h3>SDP Identifications</h3>
                </div>

                <div class="col-md-2">
                    <div class="float-right">
                        <i class="fa fa-plus" aria-hidden="true" 
                        style="margin-top: 30px; font-size: 20px;" data-toggle="modal" data-target="#addNewSDPIdModal"></i>
                    </div>
                    
                </div>
            </div>
            
            <hr/>

        </div>

        <!-- Add New SDP Id Modal -->
        <div class="modal fade" id="addNewSDPIdModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Add New SDP Identification</h4>
            </div>
            <div class="modal-body">

                <table>
                    <tr>
                        <td>Type</td>
                        <td>
                            <select v-model="sdpid_type" class="form-control">
                                <option value="client">Client</option>
                                <option value="gateway">Gateway</option>
                                <option value="controller">Controller</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Environment</td>
                        <td>
                            <select class="form-control">
                                
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td><button class="btn btn-primary form-control" @click="addNewSdpId">Add New SDP Identication</button></td>
                    </tr>
                </table>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>


    </div>

</template>


<script>

export default {
    name: 'SDPIdentificationComponent',

    data() {
      
        return {
            sdpid_type: ''
        }

    },

    methods: {
        async addNewSdpId() {
            
        }
    }
}

</script>
