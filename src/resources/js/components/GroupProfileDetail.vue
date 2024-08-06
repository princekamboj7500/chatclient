<template>
    <div :style="{ display: this.$store.state.profilesidebar.isGroupShow ? 'block' : 'none' }" class="user-profile-sidebar group-profile-sidebar">
        <div class="px-3 px-lg-4 pt-3 pt-lg-4">
            <div class="user-chat-nav text-right">
                <button type="button" @click="hideGroupProfileSidebar" class="btn nav-btn" id="user-profile-hide">
                    <i class="ri-close-line"></i>
                </button>
            </div>
        </div>

        <div class="text-center p-4 border-bottom">
            <div class="mb-4 d-flex justify-content-center">
                <span
                    class="avatar-title rounded-circle bg-primary-subtle text-primary text-uppercase avatar-lg img-thumbnail"
                    style="height:70px;width:70px;">
                    {{ this.$store.state.profilesidebar.groupdata.group_name.charAt(0) }}
                </span>
            </div>

            <h5 class="font-size-16 mb-1 text-truncate">{{ this.$store.state.profilesidebar.groupdata.group_name }}</h5>
        </div>
        <!-- End profile user -->

        <!-- Start user-profile-desc -->
        <div class="p-4 user-profile-desc" style="overflow: hidden scroll;">
            <div class="text-muted">
                <p class="mb-4">If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.</p>
            </div>

            <div id="profile-user-accordion" class="custom-accordion">
                <div class="card shadow-none border mb-2">
                    <a href="#collapseOne" class="text-dark" data-bs-toggle="collapse" aria-expanded="true"
                        aria-controls="collapseOne">
                        <div class="card-header" id="headingOne">
                            <h5 class="font-size-14 m-0">
                                <i class="ri-user-2-line me-2 align-middle d-inline-block"></i> About
                                <i class="mdi mdi-chevron-up float-end accor-plus-icon"></i>
                            </h5>
                        </div>
                    </a>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                        data-parent="#profile-user-accordion">
                        <div class="card-body">

                            <div>
                                <p class="text-muted mb-1">Group Name</p>
                                <h5 class="font-size-14">{{ this.$store.state.profilesidebar.groupdata.group_name }}</h5>
                            </div>

                            <div class="mt-4">
                                <p class="text-muted mb-1">Time</p>
                                <h5 class="font-size-14">{{ formattedDateTime }}</h5>
                            </div>

                            <div class="mt-4 chat-message-chatlist">
                                <p class="text-muted mb-1">Users List</p>
                                <ul class="list-unstyled py-2">
                                    <div v-for="user in this.$store.state.messages.getmessagedata.userdata">
                                        <li class="user mb-2" :user-id="user.id" :id="'user-' + user.id">
                                            <a href="#">
                                                <div class="media align-items-center">
                                                    <div class="chat-user-img align-self-center me-3">
                                                        <img :src="user.avatar" class="rounded-circle avatar-xs"
                                                            alt="">
                                                    </div>
                                                    <div class="media-body overflow-hidden">
                                                        <h5 class="text-truncate font-size-15 mb-0">{{ user.name }}</h5>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </div>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- End About card -->
                <div v-for="message in this.$store.state.messages.getmessagedata.messages">
                    
                        <div v-if="message.file" class="card mb-1 shadow-none border">
                            <a href="#collapseTwo" class="text-dark collapsed" data-bs-toggle="collapse" aria-expanded="false"
                                aria-controls="collapseTwo">
                                <div class="card-header" id="headingTwo">
                                    <h5 class="font-size-14 m-0">
                                        <i class="ri-attachment-line me-2 align-middle d-inline-block"></i> Attached Files
                                        <i class="mdi mdi-chevron-up float-end accor-plus-icon"></i>
                                    </h5>
                                </div>
                            </a>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                                data-parent="#profile-user-accordion">
                                <div class="card-body">
                                    <div v-if="isImage(message.file)" class="card p-2 border mb-2">
                                        <div class="media align-items-center">
                                            <div class="avatar-sm me-3">
                                                <div
                                                    class="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                                                    <i class="ri-image-fill"></i>
                                                </div>
                                            </div>
                                            <div class="media-body">
                                                <div class="text-left">
                                                    <h5 class="font-size-14 mb-1">{{ message.message }}</h5>
                                                    <p class="text-muted font-size-13 mb-0">
                                                        
                                                    </p>
                                                </div>
                                            </div>

                                            <div class="ms-4">
                                                <ul class="list-inline mb-0 font-size-18">
                                                    <li class="list-inline-item">
                                                        <a href="#" class="text-muted px-1">
                                                            <i class="ri-download-2-line"></i>
                                                        </a>
                                                    </li>
                                                    <li class="list-inline-item dropdown">
                                                        <a class="dropdown-toggle text-muted px-1" href="#"
                                                            role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                                            aria-expanded="false">
                                                            <i class="ri-more-fill"></i>
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-end">
                                                            <a class="dropdown-item" href="#">Action</a>
                                                            <a class="dropdown-item" href="#">Another action</a>
                                                            <div class="dropdown-divider"></div>
                                                            <a class="dropdown-item" href="#">Delete</a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end card -->
                                    <div v-else class="card p-2 border mb-2">
                                        <div class="media align-items-center">
                                            <div class="avatar-sm me-3">
                                                <div
                                                    class="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                                                    <i class="ri-file-text-fill"></i>
                                                </div>
                                            </div>
                                            <div class="media-body">
                                                <div class="text-left">
                                                    <h5 class="font-size-14 mb-1">{{ message.message }}</h5>
                                                    <p class="text-muted font-size-13 mb-0">
                                                       
                                                    </p>
                                                </div>
                                            </div>

                                            <div class="ms-4">
                                                <ul class="list-inline mb-0 font-size-18">
                                                    <li class="list-inline-item">
                                                        <a href="#" class="text-muted px-1">
                                                            <i class="ri-download-2-line"></i>
                                                        </a>
                                                    </li>
                                                    <li class="list-inline-item dropdown">
                                                        <a class="dropdown-toggle text-muted px-1" href="#"
                                                            role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                                            aria-expanded="false">
                                                            <i class="ri-more-fill"></i>
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-end">
                                                            <a class="dropdown-item" href="#">Action</a>
                                                            <a class="dropdown-item" href="#">Another action</a>
                                                            <div class="dropdown-divider"></div>
                                                            <a class="dropdown-item" href="#">Delete</a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end card -->
                                </div>
                            </div>
                        </div>
                        <!-- End Attached Files card -->
                </div>
            </div>
            <!-- end profile-user-accordion -->
        </div>
        <!-- end user-profile-desc -->
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data() {
    return {
        chatUser: {},
        messages: [],
        is_online: true,
      };
    },
    computed: {
        formattedDateTime() {
        const dateTimeString = this.$store.state.profilesidebar.groupdata.created_at;
        if (!dateTimeString) return ''; // Return empty string if dateTimeString is falsy

        const dateTime = new Date(dateTimeString);
        const year = dateTime.getFullYear();
        const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
        const day = ('0' + dateTime.getDate()).slice(-2);
        const hours = ('0' + dateTime.getHours()).slice(-2);
        const minutes = ('0' + dateTime.getMinutes()).slice(-2);
        const seconds = ('0' + dateTime.getSeconds()).slice(-2);

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
    },
    mounted() {
        console.log("vuex data in groupdeatils groupdata", this.$store.state.profilesidebar.groupdata);
        console.log("vuex data in groupdeatils userdata:", this.$store.state.messages.getmessagedata.userdata);
        console.log("vuex data in groupdeatils messages:", this.$store.state.messages.getmessagedata.messages);
    },
    methods: {
        ...mapActions({
            ShowGroupProfileSidebar: 'profilesidebar/ShowGroupProfileSidebar'
        }),
        isImage(file) {
            const extension = file.split('.').pop().toLowerCase();
            return ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
        },
        hideGroupProfileSidebar(){
            //console.log("in hideProfileSidebar");
            this.ShowGroupProfileSidebar({ value: false });
        }
    }
  };
</script>