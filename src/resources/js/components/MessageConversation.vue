<template>
    <div v-if="this.$store.state.messages.isGroup" v-for="(message, index) in this.$store.state.messages.getmessagedata.messages" :key="index">
        <li :class="{'right': message.from_user_id === this.$store.state.messages.AuthUser.id, 'left': message.from_user_id !== this.$store.state.messages.AuthUser.id}" :id="'msg-' + message.id">
            <div class="conversation-list">
                <div class="chat-avatar">
                    <div v-if="message.from_user === this.$store.state.messages.AuthUser.id">
                        <img :src="this.$store.state.messages.AuthUser.avatar" alt="" class="imgavatar">
                    </div>

                    <div v-else v-for="item in this.$store.state.messages.getmessagedata.userdata">
                        <img v-if="message.from_user_id == item.id" :src="item.avatar" alt="" class="imgavatar">
                    </div>
                </div>

                <div class="user-chat-content">
                    <div class="ctext-wrap">
                        <div class="ctext-wrap-content">
                                <div v-if="message.file">
                                    <ul v-if="isImage(message.file)" class="list-inline message-img  mb-0">
                                        <li class="list-inline-item message-img-list">
                                            <div>
                                                <a class="popup-img d-inline-block m-1" :href="message.file" title="Project 1">
                                                    <img :src="message.file" alt="" class="rounded border">
                                                </a>
                                            </div>
                                            <div class="message-img-link">
                                                <ul class="list-inline mb-0">
                                                    <li class="list-inline-item">
                                                        <a :href="message.file" download="">
                                                            <i class="ri-download-2-line"></i>
                                                        </a>
                                                    </li>
                                                    <li class="list-inline-item dropdown">
                                                        <a class="dropdown-toggle" :href="message.file" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i class="ri-more-fill"></i>
                                                        </a>
                                                        <div class="dropdown-menu">
                                                            <a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a>
                                                            <a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a>
                                                            <a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a>
                                                            <a class="dropdown-item deleteMessage" href="javascript:void(0)" :id="'msg-' + message.id">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                
                                    <div v-else class="card p-2 mb-2">
                                        <div class="media align-items-center">
                                            <div class="avatar-sm me-3">
                                                <div class="avatar-title bg-primary-subtle text-primary rounded font-size-20">
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
                                                <ul class="list-inline mb-0 font-size-20">
                                                    <li class="list-inline-item">
                                                        <a :href="message.file" class="text-muted">
                                                            <i class="ri-download-2-line"></i>
                                                        </a>
                                                    </li>
                                                    <li class="list-inline-item dropdown">
                                                        <a class="dropdown-toggle text-muted" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i class="ri-more-fill"></i>
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-end" style="">
                                                            <a class="dropdown-item" href="#">Share <i class="ri-share-line float-end text-muted"></i></a>
                                                            <a class="dropdown-item deleteMessage" href="javascript:void(0)" :id="'msg-' + message.id">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p v-else class="mb-0" id="aaa">
                                    {{ message.message }}
                                </p>
                                <p class="chat-time mb-0">
                                    <i class="ri-time-line align-middle"></i>
                                    <span class="align-middle"> 
                                        {{ formatDate(message.created_at) }}
                                    </span>
                                </p>
                        </div>
                        <div class="dropdown align-self-start">
                            <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <i class="ri-more-2-fill"></i>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item copyTextToClipboard" @click="copyToClipboard(message.message)" :data-text="message.message">Copy <i class="ri-file-copy-line float-end text-muted"></i></a>
                                <a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a>
                                <a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a>
                                <a class="dropdown-item deleteMessage" href="javascript:void(0)" :id="'msg-' + message.id">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
                            </div>
                        </div>
                    </div>
                    <div v-if="message.from_user_id === authuser.id" class="conversation-name profile-newname">{{ authuser.name }}</div>
                    <div v-else v-for="item in this.$store.state.messages.getmessagedata.userdata">
                        <div v-if="message.from_user_id == item.id" class="conversation-name">{{ item.name }}</div>
                    </div>
                </div>
            </div>
        </li>
    </div>
    <div v-else v-for="(message, index1) in this.$store.state.messages.getmessagedata.messages" :key="index1">
        <li :class="{'right': message.from_user === this.$store.state.messages.AuthUser.id, 'left': message.from_user !== this.$store.state.messages.AuthUser.id }" :id="'msg-' + message.id">
            <div class="conversation-list">
                <div class="chat-avatar tt">
                    <img v-if="message.from_user === this.$store.state.messages.AuthUser.id" :src="this.$store.state.messages.AuthUser.avatar" alt="" class="imgavatar">
                    <img v-else :src="this.$store.state.messages.getmessagedata.chatUser.avatar" alt="">
                </div>

                <div class="user-chat-content">
                    <div class="ctext-wrap">
                        <div class="ctext-wrap-content">
                                <div v-if="message.file">
                                    <ul v-if="isImage(message.file)" class="list-inline message-img  mb-0">
                                        <li class="list-inline-item message-img-list">
                                            <div>
                                                <a class="popup-img d-inline-block m-1" :href="message.file" title="Project 1">
                                                    <img :src="message.file" alt="" class="rounded border">
                                                </a>
                                            </div>
                                            <div class="message-img-link">
                                                <ul class="list-inline mb-0">
                                                    <li class="list-inline-item">
                                                        <a :href="message.file" download="">
                                                            <i class="ri-download-2-line"></i>
                                                        </a>
                                                    </li>
                                                    <li class="list-inline-item dropdown">
                                                        <a class="dropdown-toggle" :href="message.file" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i class="ri-more-fill"></i>
                                                        </a>
                                                        <div class="dropdown-menu">
                                                            <a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a>
                                                            <a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a>
                                                            <a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a>
                                                            <a class="dropdown-item deleteMessage" href="javascript:void(0)" :id="'msg-' + message.id">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                
                                    <div v-else class="card p-2 mb-2">
                                        <div class="media align-items-center">
                                            <div class="avatar-sm me-3">
                                                <div class="avatar-title bg-primary-subtle text-primary rounded font-size-20">
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
                                                <ul class="list-inline mb-0 font-size-20">
                                                    <li class="list-inline-item">
                                                        <a :href="message.file" class="text-muted">
                                                            <i class="ri-download-2-line"></i>
                                                        </a>
                                                    </li>
                                                    <li class="list-inline-item dropdown">
                                                        <a class="dropdown-toggle text-muted" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i class="ri-more-fill"></i>
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-end" style="">
                                                            <a class="dropdown-item" href="#">Share <i class="ri-share-line float-end text-muted"></i></a>
                                                            <a class="dropdown-item deleteMessage" href="javascript:void(0)" :id="'msg-' + message.id">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p v-else class="mb-0" id="aaa">
                                    {{ message.message }}
                                </p>
                                <p class="chat-time mb-0">
                                    <i class="ri-time-line align-middle"></i>
                                    <span class="align-middle"> 
                                        {{ formatDate(message.created_at) }}
                                    </span>
                                </p>
                        </div>
                        <div class="dropdown align-self-start">
                            <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <i class="ri-more-2-fill"></i>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item copyTextToClipboard" @click="copyToClipboard(message.message)" :data-text="message.message">Copy <i class="ri-file-copy-line float-end text-muted"></i></a>
                                <a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a>
                                <a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a>
                                <a class="dropdown-item deleteMessage" href="javascript:void(0)" @click="deleteMessage(message.id)" :id="'msg-' + message.id">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
                            </div>
                        </div>
                    </div>
                    <div v-if="message.from_user === authuser.id" class="conversation-name profile-newname">{{ authuser.name }}</div>
                
                    <div v-else-if="chatUser" class="conversation-name">{{ this.$store.state.messages.getmessagedata.chatUser.name }}</div>
                </div>
            </div>
        </li>
    </div>
</template>
<script>
export default {
    props: ['isGroup','authuser','getmessagedata'],
    data() {
    return {
        messages: [],
        chatUser: {},
      };
    },
    mounted() {
        //console.log("vuex data in conversation:", this.$store.state.messages.getmessagedata);
        //console.log("vuex data in conversation:", this.$store.state.messages.getmessagedata);
        this.messages = this.$store.state.messages.getmessagedata.messages;
        this.chatUser = this.$store.state.messages.getmessagedata.chatUser;
    },
    methods: {
        isImage(file) {
            const extension = file.split('.').pop().toLowerCase();
            return ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
        },
        formatDate(dateTime) {
            // Convert the datetime string to a JavaScript Date object
            const dateObj = new Date(dateTime);
            
            // Format the date using native JavaScript methods or a library like moment.js
            // Here, I'm using native methods for simplicity, but you can replace it with moment.js if needed
            const formattedDate = `${dateObj.getDate()} ${this.getMonthAbbreviation(dateObj.getMonth())} ${dateObj.getFullYear()}, ${this.formatAMPM(dateObj)}`;

            return formattedDate;
        },
        getMonthAbbreviation(monthIndex) {
            // Array of month abbreviations
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months[monthIndex];
        },
        formatAMPM(date) {
            let hours = date.getHours();
            let minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            const strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        },
        copyToClipboard(text) {
            console.log("in copy function");
            const el = document.createElement('textarea');
            el.value = text;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            // Optionally, you can provide some feedback to the user
            // For example, show a tooltip or a message indicating the text has been copied
        },
        deleteMessage(id){
            console.log("id",id);
            document.getElementById("msg-" + id).remove();
            var token = localStorage.getItem('token');
            console.log("tttt",token);
            var headers = {
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + token,
            };
            axios.get(`/api/deleteMessage/${id}`, { headers }).then(({ data }) => {
                console.log("api deleteMessage data", data);
            }).catch(error => {
                console.error("Error fetching in data:", error);
            });
        }
    }
  };
  </script>