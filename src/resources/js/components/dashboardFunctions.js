import axios from 'axios';
import { mapActions } from 'vuex';
export default {
    mounted() {
        console.log("in clone app");
        // Open the first accordion item by default
        this.token = localStorage.getItem('token');
        console.log("token",this.token);
        var headers = {
            "Content-Type": "application/json", 
            "Authorization": "Bearer " + this.token,
        };
        axios.get('/api/user-dashboard', { headers }).then(({ data }) => {
            console.log("user data", data);
            this.AuthUser = data.AuthUser;
            this.users = data.users;
            if(data.users.length > 0){
                this.recentChatUserId = data.users[0].id;
            }
            //console.log("recentChatUserId",this.recentChatUserId);
            this.getMessage(this.recentChatUserId);

            this.contacts = data.contacts;
            this.groupdata = data.groupdata;
            this.AttachedFiles = data.AttachedFiles;

            this.SetAuthUserData({AuthUser: data.AuthUser});
            this.SetUsersData({users: data.users});
            this.SetContactsData({contacts: data.contacts});
            this.SetGroupdataData({groupdata: data.groupdata});
            this.SetAttachedFilesData({AttachedFiles: data.AttachedFiles});
        }).catch(error => {
            console.error("Error fetching in data:", error);
            this.$router.push({ name: 'login' });
        });
        
        window.Echo.private('chat')
        .listen('MessageSent', (e) => {
            console.log("MessageSent",e);
            console.log("this.chatid",this.chatId,"e.message.from_user",e.message.from_user);
            if(this.chatId === e.message.from_user){
                this.$store.state.messages.getmessagedata.messages.push({
                    id: e.message.id,
                    from_user: e.message.from_user,
                    to_user: e.message.to_user,
                    message: e.message.message,
                    file: e.message.file,
                    is_read: e.message.is_read,
                    created_at: e.message.created_at,
                });
                this.user = e.user;
            }
        });

        window.Echo.private('groupchat')
        .listen('GroupMessageSent', (e) => {
            console.log("GroupMessageSent",e);
            console.log(this.groupId,e.message.group_id);
            if(this.groupId === e.message.group_id){
                this.$store.state.messages.getmessagedata.messages.push({
                    id: e.message.id,
                    from_user_id: e.message.from_user_id,
                    group_id: e.message.group_id,
                    message: e.message.message,
                    file: e.message.file,
                    created_at: e.message.created_at,
                });
                this.user = e.user;
            }
        });

        this.showUserProfileSidebar(false);
        this.showGroupProfileSidebar(false);
        this.getGroupMessage(1);
        this.listen();

        // Listen for the userLoggedIn event
        if(this.$store.state.userstatus.isLogin){
            window.Echo.private('useronline')
            .listen('UserOnline', (event) => {
                console.log("useronline event",event.user);
                // Handle the event, e.g., add the new user to online users list
                this.onlineusers.push(event.user.id);
                this.isOnline(event.user.id);
            });
        }
        this.SetOnlineUser({isLogin: false});
    },
    methods:{
        ...mapActions({
            messages2:'messages/getMessages',
            ShowProfileSidebar: 'profilesidebar/ShowProfileSidebar',
            ShowGroupProfileSidebar: 'profilesidebar/ShowGroupProfileSidebar',
            SetAuthUserData: 'LeftTabsData/SETAUTHUSER',
            SetUsersData: 'LeftTabsData/SETUSERSDATA',
            SetContactsData: 'LeftTabsData/SETCONTACTSDATA',
            SetGroupdataData: 'LeftTabsData/SETGROUPDATA',
            SetAttachedFilesData: 'LeftTabsData/SETATTACHEDFILES',
            SetOnlineUser: 'userstatus/SetOnlineUser'
        }),
        listen(){
            Echo.join('OnlineStatus')
            .here((users) => {
                console.log("users in created", users);
                //this.onlineusers = users;
                this.loadingOnlineStatus = true;
                // Iterate over the users array and check online status for each user
                if(this.loadingOnlineStatus){
                    users.forEach(user => {
                        this.onlineusers.push(user.id);
                        this.isOnline(user.id);
                    });
                }
            })
            .joining((user) => {
                this.onlineusers.push(user.id); // Push only the user ID
                console.log("joining", user.name);
                this.isOnline(user.id);
            })
            .leaving((user) => {
                this.onlineusers.splice(this.onlineusers.indexOf(user.id), 1);
                console.log("leaving", user.name);
                this.isOnline(user.id);
            });
        },
        isOnline(userId) {
            console.log("in isOnline",userId);
            return this.onlineusers.includes(userId);
        },
        logout(){
            const headers = { 
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + this.token,
            };
            axios.post('/api/logout', {}, { headers }).then(({data})=>{
                // Broadcast an event to notify the server that the user is logging out
                Echo.leave('OnlineStatus');
                localStorage.removeItem('token');
                this.$router.push({ name: 'login' });
            })
        },
        showUserProfileSidebar(isShow){
            this.ShowProfileSidebar({ value: isShow });
        },
        showGroupProfileSidebar(isShow){
            this.ShowGroupProfileSidebar({ value: isShow , groupdata: this.groupdata2});
        },
        handleItemClick(title) {
            console.log('Clicked item title:', title);
            // Loop through menuItems and set activeTab based on title
            this.activeTab = title;

            // Loop through tab-pane elements and add/remove classes based on the clicked title
            this.menuItems.forEach(item => {
                const tabPane = document.getElementById(`pills-${item.target}`);
                if (item.title === title) {
                    tabPane.classList.add('show', 'active');
                } else {
                    tabPane.classList.remove('show', 'active');
                }
            });

            if(title == "Chats"){
                var headers = {
                    "Content-Type": "application/json", 
                    "Authorization": "Bearer " + this.token,
                };
                axios.get('/api/user-dashboard', { headers }).then(({ data }) => {
                    console.log("api message data", data);
                    this.users = data.users;
                }).catch(error => {
                    console.error("Error fetching in data:", error);
                });
            }
        },
        sendMessage(file){
            console.log("comment",this.comment,"from_user_id",this.AuthUser.id,"to_user_id",this.to_user_id);
            if(this.comment == '' && !file){
                //alert("please enter message first");
                return false;
            }
            if(this.to_user_id){
                var postMessageData = {};
                if(file){
                    postMessageData = {
                        message: file.name,
                        file: file,
                        receiver_id: this.to_user_id
                    }
                }else {
                    postMessageData = {
                        message: this.comment,
                        receiver_id: this.to_user_id
                    }
                }
                
                console.log("post data",postMessageData);
                axios.post('/api/message', postMessageData, {
                    headers: {
                        "Authorization": "Bearer " + this.token,
                        'Content-Type': 'multipart/form-data' // Set the correct content type for FormData
                    }
                }).then(response => {
                console.log("api response => ",response.status);
                console.log("api response => ",response.data);
                //this.validationErrors = {}
                if(response.status == 201){
                    this.comment = '';
                    this.$store.state.messages.getmessagedata.messages.push({
                        id: response.data.id,
                        message: response.data.message,
                        from_user: response.data.from_user,
                        file: response.data.file,
                        created_at: response.data.created_at
                    });
                }
                }).catch(({response})=>{
                    alert(response.data.message)
                }).finally(()=>{
                    //this.processing = false
                })
            }else{
                alert("select user to send message");
            }
        },
        getMessage(user_id){
            var headers = {
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + this.token,
            };
            axios.get(`/api/message/${user_id}`, { headers }).then(({ data }) => {
                console.log("api message data", data);
                this.getmessagedata = data;
                this.messages = data.messages;
                this.chatUser = data.chatUser;
                if(this.chatUser){
                    this.chatId = this.chatUser.id;
                }
                // Call the Vuex action and pass AuthUser and getmessagedata
                this.isGroup = false;
                this.to_user_id = user_id;
                this.messages2({ AuthUser: this.AuthUser, getmessagedata: data, isGroup: this.isGroup });
                this.ShowProfileSidebar({ value: false });
                this.ShowGroupProfileSidebar({ value: false , groupdata: this.groupdata2});
                this.isShowMessageComponent = true;
                this.groupId = null;
            }).catch(error => {
                console.error("Error fetching in data:", error);
            });
        },
        getGroupMessage(group_id){
            this.from_group_id = group_id;
            var headers = {
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + this.token,
            };
            axios.get(`/api/groupmessage/${group_id}`, { headers }).then(({ data }) => {
                console.log("api getGroupMessage data", data);
                // Call the Vuex action and pass AuthUser and getmessagedata
                this.isGroup = true;
                //console.log(data.groupdata);
                this.groupdata2 = data.groupdata;
                if(this.groupdata2){
                    this.groupId = this.groupdata2.id;
                }
                this.messages2({ AuthUser: this.AuthUser, getmessagedata: data, isGroup: this.isGroup});
                this.ShowGroupProfileSidebar({ value: false , groupdata: this.groupdata2});
                this.ShowProfileSidebar({ value: false });
                this.isShowMessageComponent = true;
            }).catch(error => {
                console.error("Error fetching in data:", error);
            });
        },
        createGroup(){
            console.log("group_name",this.group_name,"checkboxusers",this.checkboxusers,"description",this.description);
            var postMessageData = {
                group_name: this.group_name,
                checkVal: this.checkboxusers,
                description: this.description
            }
            console.log("post data",postMessageData);
            axios.post('/api/groups', postMessageData, {
                headers: {
                    "Authorization": "Bearer " + this.token,
                    'Content-Type': 'multipart/form-data' // Set the correct content type for FormData
                }
            }).then(response => {
            console.log("api response status => ",response.status);
            console.log("api response => ",response.data);
            //this.validationErrors = {}
            if(response.status == 200){
                this.groupdata = response.data;
                //console.log("this.groupdata",this.groupdata);
            }
            }).catch(({response})=>{
                alert(response.data.message)
            }).finally(()=>{
                //this.processing = false
            })
        },
        sendGroupMessage(file){
            console.log("send group button clicked");
            console.log("message",this.comment,"group_id",this.from_group_id,"file",file);
            if(this.comment == '' && !file){
                //alert("please enter message first");
                return false;
            }
            if(this.from_group_id){
                var postData = {};
                if(file){
                    postData = {
                        message: file.name,
                        file: file,
                        group_id: this.from_group_id,
                    }
                }else {
                    postData = {
                        group_id: this.from_group_id,
                        message: this.comment
                    }
                }
                axios.post('/api/groupmessage', postData, {
                    headers: {
                        "Authorization": "Bearer " + this.token,
                        'Content-Type': 'multipart/form-data' // Set the correct content type for FormData
                    }
                }).then(response => {
                console.log("api response => ",response.status);
                console.log("api response => ",response.data);
                //this.validationErrors = {}
                if(response.status == 201){
                    this.comment = '';
                    this.$store.state.messages.getmessagedata.messages.push({
                        id: response.data.id,
                        message: response.data.message,
                        group_id: response.data.group_id,
                        from_user_id: response.data.from_user_id,
                        file: response.data.file,
                        created_at: response.data.created_at
                    });
                }
                }).catch(({response})=>{
                    alert(response.data.message)
                }).finally(()=>{
                    //this.processing = false
                })
            }else{
                alert("select group to send message");
            }
        },
        scrollToBottom() {
            // Scroll to the bottom of the chat conversation div
            this.$refs.chatConversation.scrollTop = this.$refs.chatConversation.scrollHeight;
        },
        showEditNameField(){
            this.isShowInputName = true;
        },
        editName(){
            console.log("edit name",this.AuthUser.name);
            if(!this.AuthUser.name){
                return false;
            }
            var postData = {
                name: this.AuthUser.name,
            }
            console.log("post data",postData);
            axios.post('/api/nameupdate', postData, {
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            }).then(response => {
            console.log("api response => ",response.data.data);
            //this.validationErrors = {}
            if(response.status == 200){
                this.isShowInputName = false;
            }
            }).catch(({response})=>{
                alert(response.data.message)
            }).finally(()=>{
                //this.processing = false
            })
        },
        deleteConversation(chat_user_id){
            console.log("in deleteConversation",chat_user_id);
            var headers = {
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + this.token,
            };
            axios.get(`/api/deleteConversation/${chat_user_id}`, { headers }).then(({ data }) => {
                console.log("deleteConversation api response data:", data);
                this.getMessage(chat_user_id);
            }).catch(error => {
                console.error("Error fetching in data:", error);
            });
        },
        deleteGroupConversation(group_id){
            console.log("in deleteGroupConversation",group_id);
            var headers = {
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + this.token,
            };
            axios.get(`/api/deleteGroupConversation/${group_id}`, { headers }).then(({ data }) => {
                console.log("deleteGroupConversation api response data:", data);
                this.getGroupMessage(group_id);
            }).catch(error => {
                console.error("Error fetching in data:", error);
            });
        },
        isImage(file) {
            const extension = file.split('.').pop().toLowerCase();
            return ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
        },
        isToday(dateString) {
            const date = new Date(dateString);
            const today = new Date();
            return date.toDateString() === today.toDateString();
        },
        formatTime(dateString) {
            return new Date(dateString).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' });
        },
        openFileInput(){
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            const formData = new FormData();
            this.sendMessage(file);
        },
        openFileInputGroup(){
            this.$refs.fileInputGroup.click();
        },
        handleFileUploadGroup(event){
            const file = event.target.files[0];
            console.log("group file",file);
            this.sendGroupMessage(file);
        },
        openFileInputAuthUser(){
            this.$refs.fileInputAuthUser.click();
        },
        handleFileUploadAuthUser(event) {
            const file = event.target.files[0];

            if(!file){
                console.log("please select a file");
                return false;
            }

            if(file && file.type != "image/jpeg" && file.type != "image/png" && file.type != "image/jpg" && file.type != "image/gif"){
                console.log("please upload image type file",file.type);
                return false;
            }
           
            var postData = {};
            if(file){
                postData = {
                    file: file,
                }
            }
            axios.post('/api/updateavatar', postData, {
                headers: {
                    "Authorization": "Bearer " + this.token,
                    'Content-Type': 'multipart/form-data' // Set the correct content type for FormData
                }
            }).then(response => {
            //console.log("api response => ",response.status);
            //console.log("api response => ",response.data);
            if(response.status == 200){
                console.log("image update api response",response.data);
                this.AuthUser.avatar = response.data.data;
            }
            }).catch(({response})=>{
                alert(response.data.message)
            }).finally(()=>{
                //this.processing = false
            })
        },
        searchContact(event){
            console.log("Search query:", event.target.value);
            var headers = {
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + this.token,
            };
            axios.get('/api/search', { params: { search: event.target.value }, headers: headers }).then(({ data }) => {
                //console.log("search contact api response data:", data);
                this.contacts = data;
            }).catch(error => {
                console.error("Error in search contact api data:", error);
            });
        },
        searchGroup(event){
            console.log("Search query:", event.target.value);
            var headers = {
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + this.token,
            };
            axios.get('/api/groupsearch', { params: { search: event.target.value }, headers: headers }).then(({ data }) => {
                //console.log("search group api response data:", data);
                this.groupdata = data;
            }).catch(error => {
                console.error("Error in group search api data:", error);
            });
        },
        recentSearch(event){
            console.log("Search query:", event.target.value);
            var headers = {
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + this.token,
            };
            axios.get('/api/recentsearch', { params: { search: event.target.value }, headers: headers }).then(({ data }) => {
                //console.log("recentsearch api response data:", data);
                this.users = data;
            }).catch(error => {
                console.error("Error in recentsearch api data:", error);
            });
        },
        messagesearch(event,user_id){
            console.log("Search query:", event.target.value,"user_id",user_id);
            var headers = {
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + this.token,
            };
            axios.get('/api/messagesearch', { params: { search: event.target.value, userid: user_id }, headers: headers }).then(({ data }) => {
                //console.log("messagesearch api response data:", data);
                this.isGroup = false;
                this.messages2({ AuthUser: this.AuthUser, getmessagedata: data, isGroup: this.isGroup });
            }).catch(error => {
                console.error("Error in messagesearch api data:", error);
            });
        },
        groupmessagesearch(event,group_id){
            console.log("Search query:", event.target.value,"group_id",group_id);
            var headers = {
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + this.token,
            };
            axios.get('/api/groupmessagesearch', { params: { search: event.target.value, groupid: group_id }, headers: headers }).then(({ data }) => {
                console.log("groupmessagesearch api response data:", data);
                this.isGroup = true;
                this.messages2({ AuthUser: this.AuthUser, getmessagedata: data, isGroup: this.isGroup});
            }).catch(error => {
                console.error("Error in groupmessagesearch api data:", error);
            });
        }
    },
    watch: {
        // Watch for changes in the messages and scroll to bottom when new messages are added
        getmessagedata: {
            handler() {
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            },
            deep: true
        }
    }
};