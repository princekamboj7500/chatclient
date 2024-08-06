<template>
    <div :style="{ display: this.$store.state.profilesidebar.isShow ? 'block' : 'none' }" class="user-profile-sidebar user" id="user-profile-right">
        <div class="px-3 px-lg-4 pt-3 pt-lg-4">
            <div class="user-chat-nav text-right">
                <button type="button" class="btn nav-btn" @click="hideProfileSidebar" id="user-profile-hide">
                    <i class="ri-close-line"></i>
                </button>
            </div>
        </div>

        <div class="text-center p-4 border-bottom">
            <div class="mb-4">
                <img :src="this.$store.state.messages.getmessagedata.chatUser.avatar" class="rounded-circle avatar-lg img-thumbnail" alt="">
            </div>
            <h5 class="font-size-16 mb-1 text-truncate">{{ this.$store.state.messages.getmessagedata.chatUser.name }}</h5>
           
            <p v-if="is_online" class="text-muted text-truncate mb-1"><i class="ri-record-circle-fill font-size-10 text-success me-1"></i>Active</p>
        
            <p v-else class="text-muted text-truncate mb-1"><i class="ri-record-circle-fill font-size-10 text-warning me-1"></i> Deactivate</p>
           
        </div>
        <!-- End profile user -->

        <!-- Start user-profile-desc -->
        <div class="p-4 user-profile-desc" style="overflow: hidden scroll;">
            <div class="text-muted">
                <p class="mb-4">
                    If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.
                </p>
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
                                <p class="text-muted mb-1">Name</p>
                                <h5 class="font-size-14">{{ this.$store.state.messages.getmessagedata.chatUser.name }}</h5>
                            </div>

                            <div class="mt-4">
                                <p class="text-muted mb-1">Email</p>
                                <h5 class="font-size-14">{{ this.$store.state.messages.getmessagedata.chatUser.email }}</h5>
                            </div>

                            <div class="mt-4">
                                <p class="text-muted mb-1">Time</p>
                                <h5 class="font-size-14">{{ formattedDateTime }}</h5>
                            </div>

                            <div class="mt-4">
                                <p class="text-muted mb-1">Location</p>
                                <h5 class="font-size-14 mb-0">{{ this.$store.state.messages.getmessagedata.chatUser.location }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End About card -->

                <div class="card mb-1 shadow-none border">
                    <a href="#collapseTwo" class="text-dark collapsed" data-bs-toggle="collapse" aria-expanded="false"
                        aria-controls="collapseTwo">
                        <div class="card-header" id="headingTwo">
                            <h5 class="font-size-14 m-0">
                                <i class="ri-attachment-line me-2 align-middle d-inline-block"></i>
                                Attached Files
                                <i class="mdi mdi-chevron-up float-end accor-plus-icon"></i>
                            </h5>
                        </div>
                    </a>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                        data-parent="#profile-user-accordion">
                        <div class="card-body">
                            <div v-for="(message, index) in this.$store.state.messages.getmessagedata.messages" :key="index">
                               
                                    <div v-if="message.file" class="card p-2 border mb-2" :id="'msg-' + message.id">
                                            <div v-if="isImage(message.file)" class="media align-items-center">
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
                                                            <a :href="message.file" class="text-muted px-1"
                                                                download="">
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
                                                                <a class="dropdown-item"
                                                                    href="#">Another action</a>
                                                                <div class="dropdown-divider"></div>
                                                                <a class="dropdown-item deleteMessage"
                                                                    href="javascript:void(0)"
                                                                    :msg-id="message.id">Delete</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        
                                            <div v-else class="media align-items-center">
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
                                                            <a :href="message.file" class="text-muted px-1"
                                                                download="">
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
                                                                <a class="dropdown-item"
                                                                    href="#">Another action</a>
                                                                <div class="dropdown-divider"></div>
                                                                <a class="dropdown-item deleteMessage"
                                                                    href="javascript:void(0)"
                                                                    :msg-id="message.id">Delete</a>
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
                </div>
                <!-- End Attached Files card -->
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
        const dateTimeString = this.$store.state.messages.getmessagedata.chatUser.created_at;
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
        this.chatUser = this.$store.state.messages.getmessagedata.chatUser;
        //console.log("vuex data in isShow:", this.$store.state.profilesidebar.isShow);
        this.messages = this.$store.state.messages.getmessagedata.messages;
    },
    methods: {
        ...mapActions({
            ShowProfileSidebar: 'profilesidebar/ShowProfileSidebar'
        }),
        isImage(file) {
            const extension = file.split('.').pop().toLowerCase();
            return ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
        },
        hideProfileSidebar(){
            //console.log("in hideProfileSidebar");
            this.ShowProfileSidebar({ value: false });
        }
    }
  };
</script>