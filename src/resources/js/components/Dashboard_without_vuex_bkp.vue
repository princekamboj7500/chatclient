<template>
    <div class="layout-wrapper d-lg-flex">
        <div class="side-menu flex-lg-column me-lg-1">
        <!-- LOGO -->
        <div class="navbar-brand-box">
            <a href="#" class="logo logo-dark">
                <span class="logo-sm">
                    <img src="/public/build/images/logo.svg" alt="" height="30">
                </span>
            </a>
    
            <a href="#" class="logo logo-light">
                <span class="logo-sm">
                    <img src="/public/build/images/logo.svg" alt="" height="30">
                </span>
            </a>
        </div>
        <!-- end navbar-brand-box -->
    
        <!-- Start side-menu nav -->
        <div class="flex-lg-column my-auto">
            <ul class="nav nav-pills side-menu-nav justify-content-center" role="tablist">
                <li class="nav-item" v-for="item in menuItems" :key="item.title" data-bs-toggle="tooltip" data-bs-placement="top" :class="{ 'active': item.title === 'Chats' }">
                <a class="nav-link" 
                    :class="{ active: item.title === activeTab }"
                    :id="item.id"
                    @click="handleItemClick(item.title)"
                    data-bs-toggle="pill" 
                    :data-bs-target="'#pills-' + item.target"
                    role="tab"
                    :title="item.title"
                    :aria-selected="item.title === activeTab">
                    <i :class="item.iconClass"></i>
                </a>
                </li>
            </ul>
        </div>
        <!-- end side-menu nav -->
    
        <div class="flex-lg-column d-none d-lg-block">
            <ul class="nav side-menu-nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link light-dark-mode" href="#" data-bs-toggle="tooltip" data-bs-trigger="hover"
                        data-bs-placement="right" title="Dark / Light Mode">
                        <i class='ri-sun-line theme-mode-icon'></i>
                    </a>
                </li>
    
                <li class="nav-item btn-group dropup profile-user-dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <img :src="AuthUser.avatar" alt="" class="profile-user rounded-circle imgavatar">
                    </a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" @click="handleItemClick('Profile')" id="profile-tab">Profile <i class="ri-profile-line float-end text-muted"></i></a>
                            <a class="dropdown-item" href="#" @click="handleItemClick('Settings')" id="setting-tab">Setting <i class="ri-settings-3-line float-end text-muted"></i></a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#" @click="logout()">Log out
                            <i class="ri-logout-circle-r-line float-end text-muted"></i>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
        <!-- Side menu user -->
        </div>
        <!-- Start User chat -->
        <!-- start chat-leftsidebar -->
        <div class="chat-leftsidebar mr-lg-1">
            <div class="tab-content">
                <!-- Start Profile tab-pane -->
                <div class="tab-pane" id="pills-user" role="tabpanel" aria-labelledby="pills-user-tab">
                    <!-- @include('layouts.tabpane-profile') -->
                    <div>
                        <div class="px-4 pt-4">
                            <div class="user-chat-nav float-end">
                                <div class="dropdown">
                                    <a href="javascript: void(0);" class="font-size-18 text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="ri-more-2-fill"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#" @click="handleItemClick('Settings')">Edit</a>
                                        <a class="dropdown-item" href="#">Action</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">Another action</a>
                                    </div>
                                </div>
                            </div>
                            <h4 class="mb-0">My Profile</h4>
                        </div>
    
                        <div class="text-center p-4 border-bottom">
                            <div class="mb-4">
                                <img :src="AuthUser.avatar" class="rounded-circle avatar-lg img-thumbnail imgavatar" alt="">
                            </div>
    
                            <h5 class="font-size-16 mb-1 text-truncate profile-newname">{{ AuthUser.name }}</h5>
                           
                            <p v-if="is_online" class="text-muted text-truncate mb-1"><i class="ri-record-circle-fill font-size-10 text-success me-1 d-inline-block"></i>Active</p>
                            <p v-else class="text-muted text-truncate mb-1"><i class="ri-record-circle-fill font-size-10 text-warning me-1 d-inline-block"></i>Deactivate</p>
                           
                        </div>
                        <!-- End profile user -->
    
                        <!-- Start user-profile-desc -->
                        <div class="p-4 user-profile-desc" style="overflow: hidden scroll;" data-simplebar="init">
                            <div class="text-muted">
                                <p class="mb-4">If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.</p>
                            </div>
    
                            <div id="profile-user-accordion-1" class="custom-accordion">
                                <div class="card shadow-none border mb-2">
                                    <a href="/dashboard#profile-user-collapseOne" class="text-dark" data-bs-toggle="collapse" aria-expanded="true" aria-controls="profile-user-collapseOne">
                                        <div class="card-header" id="profile-user-headingOne">
                                            <h5 class="font-size-14 m-0">
                                                <i class="ri-user-2-line me-2 align-middle d-inline-block"></i>About
                                                <i class="mdi mdi-chevron-up float-end accor-plus-icon"></i>
                                            </h5>
                                        </div>
                                    </a>
    
                                    <div id="profile-user-collapseOne" class="collapse show"
                                        aria-labelledby="profile-user-headingOne" data-parent="#profile-user-accordion-1">
                                        <div class="card-body">
                                            <div>
                                                <p class="text-muted mb-1">Name</p>
                                                <h5 class="font-size-14 profile-newname text-truncate">{{ AuthUser.name }}</h5>
                                            </div>
                                            <div class="mt-4">
                                                <p class="text-muted mb-1">Email</p>
                                                <h5 class="font-size-14">{{ AuthUser.email }}</h5>
                                            </div>
                                            <div class="mt-4">
                                                <p class="text-muted mb-1">Time</p>
                                                <h5 class="font-size-14">{{ AuthUser.created_at }}</h5>
                                            </div>
                                            <div class="mt-4">
                                                <p class="text-muted mb-1">Location</p>
                                                <h5 class="font-size-14 mb-0">{{ AuthUser.location }}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- End About card -->
                                <div class="card mb-1 shadow-none border">
                                    <a href="#profile-user-collapseTwo" class="text-dark" data-bs-toggle="collapse" aria-expanded="false" aria-controls="profile-user-collapseTwo">
                                        <div class="card-header" id="profile-user-headingTwo">
                                            <h5 class="font-size-14 m-0">
                                                <i class="ri-attachment-line me-2 align-middle d-inline-block"></i> Attached Files
                                                <i class="mdi mdi-chevron-up float-end accor-plus-icon"></i>
                                            </h5>
                                        </div>
                                    </a>
                                    <div id="profile-user-collapseTwo" class="collapse" aria-labelledby="profile-user-headingTwo" data-parent="#profile-user-accordion-1">
                                        <div class="card-body">
                                            <div v-for="(message, index) in AttachedFiles" :key="index">
                                                <div class="card p-2 border mb-2" :id="'msg-' + message.id">
                                                    <div v-if="isImage(message.file)" class="media align-items-center" >
                                                        <div class="avatar-sm me-3">
                                                            <div class="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                                                                <i class="ri-image-fill"></i>
                                                            </div>
                                                        </div>
                                                        <div class="media-body">
                                                            <div class="text-left">
                                                                <h5 class="font-size-14 mb-1">{{ message.message }}</h5>
                                                                <p class="text-muted font-size-13 mb-0">
                                                                    <!-- @php
                                                                        echo App\Http\Controllers\HomeController::bytesToHuman(File::size(public_path($message->file)));
                                                                    @endphp -->
                                                                </p>
                                                            </div>
                                                        </div>
    
                                                        <div class="ms-4">
                                                            <ul class="list-inline mb-0 font-size-18">
                                                                <li class="list-inline-item">
                                                                    <a :href="message.file" class="text-muted px-1" download="">
                                                                        <i class="ri-download-2-line"></i>
                                                                    </a>
                                                                </li>
                                                                <li class="list-inline-item dropdown">
                                                                    <a class="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i class="ri-more-fill"></i>
                                                                    </a>
                                                                    <div class="dropdown-menu dropdown-menu-end">
                                                                        <a class="dropdown-item" href="#">Action</a>
                                                                        <a class="dropdown-item" href="#">Another action</a>
                                                                        <div class="dropdown-divider"></div>
                                                                        <a class="dropdown-item deleteMessage" href="javascript:void(0)" :msg-id="message.id">Delete</a>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div v-else class="media align-items-center">
                                                        <div class="avatar-sm me-3">
                                                            <div class="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                                                                <i class="ri-file-text-fill"></i>
                                                            </div>
                                                        </div>
                                                        <div class="media-body">
                                                            <div class="text-left">
                                                                <h5 class="font-size-14 mb-1">{{ message.message }}</h5>
                                                                <p class="text-muted font-size-13 mb-0">
                                                                    <!-- @php
                                                                        echo App\Http\Controllers\HomeController::bytesToHuman(File::size(public_path($message->file)));
                                                                    @endphp -->
                                                                </p>
                                                            </div>
                                                        </div>
    
                                                        <div class="ms-4">
                                                            <ul class="list-inline mb-0 font-size-18">
                                                                <li class="list-inline-item">
                                                                    <a href="#" class="text-muted px-1" download="">
                                                                        <i class="ri-download-2-line"></i>
                                                                    </a>
                                                                </li>
                                                                <li class="list-inline-item dropdown">
                                                                    <a class="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i class="ri-more-fill"></i>
                                                                    </a>
                                                                    <div class="dropdown-menu dropdown-menu-end">
                                                                        <a class="dropdown-item" href="#">Action</a>
                                                                        <a class="dropdown-item" href="#">Another action</a>
                                                                        <div class="dropdown-divider"></div>
                                                                        <a class="dropdown-item deleteMessage" href="javascript:void(0)" :msg-id="message.id">Delete</a>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- end card -->
                                        </div>
                                    </div>
                                </div>
                                <!-- End Attached Files card -->
                            </div>
                            <!-- end profile-user-accordion -->
    
                        </div>
                        <!-- end user-profile-desc -->
                    </div>
                </div>
                <!-- End Profile tab-pane -->
    
                <!-- Start chats tab-pane -->
                <div class="tab-pane fade show active" id="pills-chat" role="tabpanel" aria-labelledby="pills-chat-tab">
                    <!-- @include('layouts.tabpane-chats') -->
                    <div>
                        <div class="px-4 pt-4">
                            <h4 class="mb-4">Chats</h4>
                            <div class="search-box chat-search-box">
                                <div class="input-group mb-3 bg-light  input-group-lg rounded-lg">
                                    <div class="input-group-prepend">
                                        <button class="btn btn-link text-muted pr-1 text-decoration-none" type="button">
                                            <i class="ri-search-line search-icon font-size-18"></i>
                                        </button>
                                    </div>
                                    <input type="text" @input="recentSearch" class="form-control bg-light" placeholder="Search messages or users" id="recentcontactsearch">
                                </div>
                                
                            </div> <!-- Search Box-->
                        </div> <!-- .p-4 -->
                        
                        <!-- Start user status -->
                        <div class="px-4 pb-4" dir="ltr">
    
                            <div class="owl-carousel owl-theme owl-loaded owl-drag" id="user-status-carousel">
                    
                                <div class="owl-stage-outer" v-for="(user, index) in users" :key="index">
                                    <div class="owl-stage" style="transform: translate3d(0px, 0px, 0px); transition: all 0s ease 0s; width: 87px;">
                                        <div class="owl-item active" style="width: 71px; margin-right: 16px;">
                                            <div v-if="is_online" class="item user chat-user-click" :id="user.id" :user-id="user.id">
                                                <a href="#" class="user-status-box">
                                                    <div class="avatar-xs mx-auto d-block chat-user-img online">
                                                        <img :src="user.avatar" alt="user-img" class="img-fluid rounded-circle">
                                                        <span class="user-status"></span>
                                                    </div>
                                                    <h5 class="font-size-13 text-truncate mt-3 mb-1">{{ user.name }}</h5>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="owl-nav disabled">
                                    <button type="button" role="presentation" class="owl-prev">
                                        <span aria-label="Previous">‹</span>
                                    </button>
                                    <button type="button" role="presentation" class="owl-next">
                                        <span aria-label="Next">›</span>
                                    </button>
                                </div>
                                <div class="owl-dots disabled">
    
                                </div> -->
                            </div>
                            <!-- end user status carousel -->
                        </div>
                        <!-- end user status -->
    
                        <!-- Start chat-message-list -->
                        <div class="px-2">
                            <h5 class="mb-3 px-3 font-size-16">Recent</h5>
    
                            <div class="chat-message-list px-2" data-simplebar>
                                <div class="chat-message-chatlist">
                                    <ul class="list-unstyled chat-list chat-user-list">
                                        <div v-for="(user, index) in users" :key="index">
                                            <li class="user" :recentChatUserId="user.id" :id="'user-' + user.id" :user-id="user.id">
                                                <a href="#" @click="getMessage(user.id)">
                                                    <div class="d-flex">
                                                        <div v-if="is_online" class="chat-user-img online align-self-center me-3">
                                                            <img :src="user.avatar" class="rounded-circle avatar-xs" alt="">
                                                            <span class="user-status"></span>
                                                        </div>
                                                        
                                                        <div v-else class="chat-user-img away align-self-center me-3">
                                                            <img :src="user.avatar" class="rounded-circle avatar-xs" alt="">
                                                            <span class="user-status"></span>
                                                        </div>
    
                                                        <div class="flex-grow-1 overflow-hidden">
                                                            <h5 class="text-truncate font-size-15 mb-1">{{ user.name }}</h5>
    
                                                            <div v-if="user.file">
                                                                <p v-if="isImage(user.file)" class="chat-user-message text-truncate mb-0"><i class="ri-image-fill align-middle me-1"></i> {{ user.message }}</p>
                                                            
                                                                <p v-else class="chat-user-message text-truncate mb-0"><i class="ri-file-text-fill align-middle me-1"></i> {{ user.message }}</p>
                                                            </div>
                                                            <div v-else>
                                                                <p class="chat-user-message text-truncate mb-0">{{ user.message }}</p>
                                                            </div>
                                                        </div>
                                                       
                                                        <div v-if="isToday(user.created_at)">
                                                            <div class="font-size-11">{{ formatTime(user.created_at) }}</div>
                                                        </div>
                                                        <div v-else>
                                                            <div class="font-size-11">{{ formatDate(user.created_at) }}</div>
                                                        </div>
                                                       
                                                        <div v-if="user.unread" class="unread-message">
                                                            <span class="badge badge-soft-danger badge-pill pending">{{ user.unread }}</span>
                                                        </div>
                                                       
                                                    </div>
                                                </a>
                                            </li>
                                        </div>
                                    </ul>
                                </div> 
                            </div>
                            
                        </div>
                        <!-- End chat-message-list -->
                    </div>
                </div>
                <!-- End chats tab-pane -->
    
                <!-- Start groups tab-pane -->
                <div class="tab-pane" id="pills-groups" role="tabpanel" aria-labelledby="pills-groups-tab">
                    <div>
                        <div class="p-4">
                            <div class="user-chat-nav float-end">
                                <div data-bs-toggle="tooltip" data-placement="bottom" title="Create group">
                                    <!-- Button trigger modal -->
                                    <button type="button" class="btn btn-link text-decoration-none text-muted font-size-18 py-0"
                                        data-bs-toggle="modal" data-bs-target="#addgroup-exampleModal">
                                        <i class="ri-group-line me-1"></i>
                                    </button>
                                </div>
                            </div>
    
                            <h4 class="mb-4">Groups</h4>
    
                            <!-- Start add group Modal -->
                            <div class="modal fade" id="addgroup-exampleModal" tabindex="-1" role="dialog"
                                aria-labelledby="addgroup-exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title font-size-16" id="addgroup-exampleModalLabel">
                                                Create a New Group</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                            </button>
                                        </div>
                                        <div class="modal-body p-4">
                                            <form method="POST" action="" enctype="multipart/form-data">
                                                <div class="form-group mb-4">
                                                    <label for="addgroup_name-input" class="form-label">Group Name<span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" placeholder="Enter Group Name" v-model="group_name" id="group_name" required>
                                                </div>
                                                <div class="form-group mb-4">
                                                    <label class="form-label">Group Members<span class="text-danger">*</span></label>
                                                    <div class="mb-3">
                                                        <button class="btn btn-light btn-sm" type="button" data-bs-toggle="collapse"
                                                            data-bs-target="#groupmembercollapse" aria-expanded="false"
                                                            aria-controls="groupmembercollapse">
                                                            Select Members
                                                        </button>
                                                    </div>
    
                                                    <div class="collapse" id="groupmembercollapse">
                                                        <div class="card border">
                                                            <div class="card-header">
                                                                <h5 class="font-size-15 mb-0">Contacts</h5>
                                                            </div>
                                                            <div class="card-body p-2 overflow-hidden overflow-scroll">
                                                                <div data-simplebar style="max-height: 150px;">
                                                                    <div v-for="(contactsArray, key) in contacts" :key="key">
                                                                       
                                                                            <div class="p-3 font-weight-bold text-primary text-uppercase">
                                                                                {{ key }}
                                                                            </div>
                                                                            <ul class="list-unstyled contact-list">
                                                                                    <li v-for="contact in contactsArray" :key="contact.id" id="contact-id">
                                                                                        <div class="custom-control custom-checkbox">
                                                                                            <input type="checkbox"
                                                                                                class="custom-control-input batchCheckbox"
                                                                                                :id="'contact-' + contact.id"
                                                                                                v-model="checkboxusers"
                                                                                                :value="contact.id" required>
                                                                                            <label class="custom-control-label"
                                                                                                :for="'contact-' + contact.id">{{ contact.name }}</label>
                                                                                        </div>
                                                                                    </li>
                                                                            </ul>
                                                                    </div>
    
                                                                </div>
                                                            </div>
    
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="addgroupdescription-input" class="form-label">Description<span class="text-danger">*</span></label>
                                                    <textarea class="form-control" required id="description" rows="3"
                                                        placeholder="Enter Description" v-model="description"></textarea>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-link" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary create-group"
                                                data-bs-dismiss="modal" @click="createGroup">Create</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End add group Modal -->
    
                            <div class="search-box chat-search-box">
                                <div class="input-group bg-light  input-group-lg rounded-lg">
                                    <div class="input-group-prepend">
                                        <button class="btn btn-link text-decoration-none text-muted pr-1" type="button">
                                            <i class="ri-search-line search-icon font-size-18"></i>
                                        </button>
                                    </div>
                                    <input type="text" @input="searchGroup" class="form-control bg-light" placeholder="Search groups..."
                                        id="groupsearch">
                                </div>
                            </div>
                            <!-- end search-box -->
                        </div>
                        <div class="p-4 chat-message-list chat-group-list" data-simplebar="init">
                            <div id="chat-group-list">
                                <ul class="list-unstyled chat-list">
                                    <div v-for="(group, index) in groupdata" :key="index">
                                        <li class="group" :group-id="group.id" :id="'group-' + group.id">
                                            <a href="#" @click="getGroupMessage(group.id)">
                                                <div class="d-flex align-items-center">
                                                    <div class="chat-user-img me-3">
                                                        <div class="avatar-xs">
                                                            <span class="avatar-title rounded-circle bg-primary-subtle text-primary text-uppercase">
                                                                {{ group.group_name.charAt(0) }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="flex-grow-1 overflow-hidden">
                                                        <h5 class="text-truncate font-size-14 mb-0">#{{ group.group_name }}
                                                            <span v-if="group.users.is_read != 0" class="group-unread badge badge-soft-danger badge-pill float-end">+{{ group.users.is_read }}</span>
                                                        </h5>
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
                <!-- End groups tab-pane -->
    
                <!-- Start contacts tab-pane -->
                <div class="tab-pane" id="pills-contacts" role="tabpanel" aria-labelledby="pills-contacts-tab">
                    <div>
                        <div class="p-4">
                            <div class="user-chat-nav float-end">
                                <div data-bs-toggle="tooltip" data-placement="bottom" title="Add Contact">
                                    <!-- Button trigger modal -->
                                    <button type="button" class="btn btn-link text-decoration-none text-muted font-size-18 py-0" data-bs-toggle="modal" data-bs-target="#addContact-exampleModal">
                                        <i class="ri-user-add-line"></i>
                                    </button>
                                </div>
                            </div>
                            <h4 class="mb-4">Contacts</h4>
    
                            <!-- Start Add contact Modal -->
                            <div class="modal fade" id="addContact-exampleModal" tabindex="-1" role="dialog" aria-labelledby="addContact-exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title font-size-16" id="addContact-exampleModalLabel">Add New Contact</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                            </button>
                                        </div>
                                        <div class="modal-body p-4">
                                            <form>
                                                <div class="form-group mb-4">
                                                    <label for="addcontactemail-input" class="form-label">Email<span class="text-danger">*</span></label>
                                                    <input type="email" class="form-control" id="addcontactemail-input" placeholder="Enter Email">
                                                </div>
                                                <div class="form-group">
                                                    <label for="addcontact-invitemessage-input" class="form-label">Invitation Message</label>
                                                    <textarea class="form-control" id="addcontact-invitemessage-input" rows="3" placeholder="Enter Message"></textarea>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-link" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End Add contact Modal -->
    
                            <div class="search-box chat-search-box">
                                <div class="input-group bg-light  input-group-lg rounded-lg">
                                    <div class="input-group-prepend">
                                        <button class="btn btn-link text-decoration-none text-muted pr-1" type="button">
                                            <i class="ri-search-line search-icon font-size-18"></i>
                                        </button>
                                    </div>
                                    <input type="text" @input="searchContact" class="form-control bg-light " placeholder="Search users.." id="search">
                                </div>
                            </div>
                            <!-- End search-box -->
                        </div>
                        <!-- end p-4 -->
                        <!-- Start contact lists -->
                        <div class="p-4 chat-message-list chat-group-list" data-simplebar="init" style="overflow: hidden scroll;">
                            <div class="chat-contactlist">
                                <!-- @include('layouts.tabpane-contact-list') -->
                                <div v-for="(contactsArray, key) in contacts" :key="key">
                                    <div class="p-3 font-weight-bold text-primary text-uppercase">{{ key }}</div>
                                    <ul class="list-unstyled contact-list">
                                        <div v-for="contact in contactsArray" :key="contact.id">
                                            <li class="user" :id="contact.id" @click=getMessage(contact.id)>
                                                <div class="d-flex align-items-center">
                                                    <div class="flex-grow-1">
                                                        <h5 class="font-size-14 m-0 chat-user-click" :user-id="contact.id">
                                                            {{ contact.name }}</h5>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="#" class="text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true"
                                                            aria-expanded="false">
                                                            <i class="ri-more-2-fill"></i>
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-end">
                                                            <a class="dropdown-item" href="#">Share<i
                                                                    class="ri-share-line float-end text-muted"></i></a>
                                                            <a class="dropdown-item" href="#">Block'<i
                                                                    class="ri-forbid-line float-end text-muted"></i></a>
                                                            <a class="dropdown-item" href="#"
                                                                id="deleteContact" type="submit" :data-id="contact.id">Remove<i
                                                                    class="ri-delete-bin-line float-end text-muted"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- end contact lists -->
                    </div>
                </div>
                <!-- End contacts tab-pane -->
    
                <!-- Start settings tab-pane -->
                <div class="tab-pane" id="pills-settings" role="tabpanel" aria-labelledby="pills-setting-tab">
                    <!-- @include('layouts.tabpane-settings') -->
                    <div>
                        <div class="px-4 pt-4">
                            <h4 class="mb-0">Settings</h4>
                        </div>
    
                        <div class="text-center border-bottom p-4">
                            <div class="mb-4 profile-user">
                                <input type="file" ref="fileInputAuthUser" @change="handleFileUploadAuthUser" name="avatar" id="avatar" style="display:none;" />
                                <img id="imgAvatar" :src="AuthUser.avatar"
                                    class="rounded-circle avatar-lg img-thumbnail imgavatar" alt="">
                                <button type="button" id="btnAvatar"
                                    class="btn bg-light avatar-xs p-0 rounded-circle profile-photo-edit"
                                    @click="openFileInputAuthUser()">
                                    <i class="ri-pencil-fill"></i>
                                </button>
                            </div>
    
                            <h5 id="user-profile-name" class="font-size-16 mb-1 text-truncate profile-newname">{{ AuthUser.name }}</h5>
                            <div class="dropdown d-inline-block mb-1">
                                <a class="text-muted dropdown-toggle pb-1 d-block" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    Available<i class="mdi mdi-chevron-down"></i>
                                </a>
    
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Available</a>
                                    <a class="dropdown-item" href="#">Busy</a>
                                </div>
                            </div>
                        </div>
                        <!-- End profile user -->
    
                        <!-- Start User profile description -->
                        <div class="p-4 user-profile-desc" data-simplebar="init" style="overflow: hidden scroll;">
    
                            <div id="profile-setting-accordion" class="custom-accordion">
                                <div class="card shadow-none border mb-2">
                                    <a href="#profile-setting-personalinfocollapse" class="text-dark" data-bs-toggle="collapse"
                                        aria-expanded="true" aria-controls="profile-setting-personalinfocollapse">
                                        <div class="card-header" id="profile-setting-personalinfoheading">
                                            <h5 class="font-size-14 m-0">
                                                Personal Info
                                                <i class="mdi mdi-chevron-up float-end accor-plus-icon"></i>
                                            </h5>
                                        </div>
                                    </a>
    
                                    <div id="profile-setting-personalinfocollapse" class="collapse show"
                                        aria-labelledby="profile-setting-personalinfoheading" data-parent="#profile-setting-accordion">
                                        <div class="card-body">
                                            <div class="float-end">
                                                <button type="button" @click="showEditNameField" id="btnName" class="btn btn-light btn-sm"><i
                                                    class="ri-edit-fill me-1 align-middle"></i> Edit
                                                </button>
                                            </div>
                                            <div>
                                                <p class="text-muted mb-1">Name</p>
                                                <h5 id="profile-newname" class="font-size-14 profile-newname text-truncate">{{ AuthUser.name }}</h5>
                                                <div class="d-flex justify-content-between">
                                                    <input type="text" class="form-control bg-light-subtle border-light" v-model="AuthUser.name"
                                                        id="profile-name" v-show="isShowInputName" />
                                                    <div class="float-end">
                                                        <button type="button" @click="editName" id="btnSave"
                                                            class="btn btn-primary btn-block waves-effect waves-light"
                                                            v-show="isShowInputName"> Save</button>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div class="mt-4">
                                                <p class="text-muted mb-1">Email</p>
                                                <h5 class="font-size-14">{{ AuthUser.email }}</h5>
                                            </div>
    
                                            <div class="mt-4">
                                                <p class="text-muted mb-1">Time</p>
                                                <h5 class="font-size-14">{{ AuthUser.created_at }}</h5>
                                            </div>
    
                                            <div class="mt-4">
                                                <p class="text-muted mb-1">Location</p>
                                                <h5 class="font-size-14 mb-0">{{ AuthUser.location }}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end profile card -->
                                <div class="card shadow-none border mb-2">
                                    <a href="#profile-setting-privacycollapse" class="text-dark collapsed" data-bs-toggle="collapse"
                                        aria-expanded="false" aria-controls="profile-setting-privacycollapse">
                                        <div class="card-header" id="profile-setting-privacyheading">
                                            <h5 class="font-size-14 m-0">
                                                Privacy
                                                <i class="mdi mdi-chevron-up float-end accor-plus-icon"></i>
                                            </h5>
                                        </div>
                                    </a>
                                    <div id="profile-setting-privacycollapse" class="collapse"
                                        aria-labelledby="profile-setting-privacyheading" data-parent="#profile-setting-accordion">
                                        <div class="card-body">
                                            <div class="py-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="flex-grow-1 overflow-hidden">
                                                        <h5 class="font-size-13 mb-0 text-truncate">Profile photo</h5>
                                                    </div>
                                                    <div class="dropdown ms-2">
                                                        <button class="btn btn-light btn-sm dropdown-toggle w-sm" type="button"
                                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Everyone <i class="mdi mdi-chevron-down"></i>
                                                        </button>
                                                        <div class="dropdown-menu dropdown-menu-end">
                                                            <a class="dropdown-item" href="#">Everyone</a>
                                                            <a class="dropdown-item" href="#">selected</a>
                                                            <a class="dropdown-item" href="#">Nobody</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="py-3 border-top">
                                                <div class="d-flex align-items-center">
                                                    <div class="flex-grow-1 overflow-hidden">
                                                        <h5 class="font-size-13 mb-0 text-truncate">Last seen</h5>
                                                    </div>
                                                    <div class="ms-2">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input" id="privacy-lastseenSwitch"
                                                                checked>
                                                            <label class="custom-control-label" for="privacy-lastseenSwitch"></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div class="py-3 border-top">
                                                <div class="d-flex align-items-center">
                                                    <div class="flex-grow-1 overflow-hidden">
                                                        <h5 class="font-size-13 mb-0 text-truncate">Status</h5>
                                                    </div>
                                                    <div class="dropdown ms-2">
                                                        <button class="btn btn-light btn-sm dropdown-toggle w-sm" type="button"
                                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Everyone <i class="mdi mdi-chevron-down"></i>
                                                        </button>
                                                        <div class="dropdown-menu dropdown-menu-end">
                                                            <a class="dropdown-item" href="#">Everyone</a>
                                                            <a class="dropdown-item" href="#">selected</a>
                                                            <a class="dropdown-item" href="#">Nobody</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div class="py-3 border-top">
                                                <div class="d-flex align-items-center">
                                                    <div class="flex-grow-1 overflow-hidden">
                                                        <h5 class="font-size-13 mb-0 text-truncate">Read receipts</h5>
                                                    </div>
                                                    <div class="ms-2">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input"
                                                                id="privacy-readreceiptSwitch" checked>
                                                            <label class="custom-control-label" for="privacy-readreceiptSwitch"></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div class="py-3 border-top">
                                                <div class="d-flex align-items-center">
                                                    <div class="flex-grow-1 overflow-hidden">
                                                        <h5 class="font-size-13 mb-0 text-truncate">Groups</h5>
                                                    </div>
                                                    <div class="dropdown ms-2">
                                                        <button class="btn btn-light btn-sm dropdown-toggle w-sm" type="button"
                                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Everyone <i class="mdi mdi-chevron-down"></i>
                                                        </button>
                                                        <div class="dropdown-menu dropdown-menu-end">
                                                            <a class="dropdown-item" href="#">Everyone</a>
                                                            <a class="dropdown-item" href="#">selected</a>
                                                            <a class="dropdown-item" href="#">Nobody</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
    
                                    </div>
                                </div>
                                <!-- end Privacy card -->
    
                                <div class="card shadow-none border mb-2">
                                    <a href="#profile-setting-securitynoticollapse" class="text-dark collapsed" data-bs-toggle="collapse"
                                        aria-expanded="false" aria-controls="profile-setting-securitynoticollapse">
                                        <div class="card-header" id="profile-setting-securitynotiheading">
                                            <h5 class="font-size-14 m-0">
                                                Security
                                                <i class="mdi mdi-chevron-up float-end accor-plus-icon"></i>
                                            </h5>
                                        </div>
                                    </a>
                                    <div id="profile-setting-securitynoticollapse" class="collapse"
                                        aria-labelledby="profile-setting-securitynotiheading" data-parent="#profile-setting-accordion">
                                        <div class="card-body">
                                            <div>
                                                <div class="d-flex align-items-center">
                                                    <div class="flex-grow-1 overflow-hidden">
                                                        <h5 class="font-size-13 mb-0 text-truncate">Show security notification</h5>
                                                    </div>
                                                    <div class="ms-2">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input"
                                                                id="security-notificationswitch">
                                                            <label class="custom-control-label" for="security-notificationswitch"></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end Security card -->
    
                                <div class="card shadow-none border mb-2">
                                    <a href="#profile-setting-helpcollapse" class="text-dark collapsed" data-bs-toggle="collapse"
                                        aria-expanded="false" aria-controls="profile-setting-helpcollapse">
                                        <div class="card-header" id="profile-setting-helpheading">
                                            <h5 class="font-size-14 m-0">
                                                Help
                                                <i class="mdi mdi-chevron-up float-end accor-plus-icon"></i>
                                            </h5>
                                        </div>
                                    </a>
                                    <div id="profile-setting-helpcollapse" class="collapse" aria-labelledby="profile-setting-helpheading"
                                        data-parent="#profile-setting-accordion">
                                        <div class="card-body">
                                            <div>
                                                <div class="py-3">
                                                    <h5 class="font-size-13 mb-0"><a href="#" class="text-body d-block">FAQs</a></h5>
                                                </div>
                                                <div class="py-3 border-top">
                                                    <h5 class="font-size-13 mb-0"><a href="#" class="text-body d-block">Contact</a></h5>
                                                </div>
                                                <div class="py-3 border-top">
                                                    <h5 class="font-size-13 mb-0"><a href="#" class="text-body d-block">Terms & Privacy policy</a></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end Help card -->
                            </div>
                            <!-- end profile-setting-accordion -->
                        </div>
                        <!-- End User profile description -->
                    </div>
                </div>
                <!-- End settings tab-pane -->
            </div>
            <!-- end tab content -->
    
        </div>
        <!-- end chat-leftsidebar -->
        <div class="user-chat w-100 overflow-hidden">
            <div class="d-lg-flex">
                <!-- start chat conversation section -->
                <div class="w-100 overflow-hidden position-relative">
                    <div id="messages">
                        <!-- Start chat user head -->
                        <div v-if="isGroup && groupdata2" class="p-3 p-lg-4 border-bottom">
                            <div class="row align-items-center">
                                <div class="col-sm-4 col-8">
                                    <div class="d-flex align-items-center GROUP" :id="groupdata2.id">
                                        <div class="d-block d-lg-none me-2">
                                            <a href="javascript: void(0);" class="user-chat-remove text-muted font-size-16 p-2"><i class="ri-arrow-left-s-line"></i></a>
                                        </div>
                                        <div class="me-3 ms-0">
                                                <div class="avatar-xs">
                                                    <span class="avatar-title rounded-circle bg-primary-subtle text-primary text-uppercase">
                                                        {{ groupdata2.group_name.charAt(0) }}
                                                    </span>
                                                </div>
                                        </div>
                                        <div class="flex-grow-1 overflow-hidden">
                                            <h5 class="font-size-16 mb-0 text-truncate">
                                                <a href="#" class="text-reset user-profile-show"
                                                    id="user-profile-sender-name">{{ groupdata2.group_name }}
                                                </a>
                                                    
                                                <i v-if="is_online" class="ri-record-circle-fill font-size-10 text-success d-inline-block ms-1"></i>
                                            
                                                <i v-else class="ri-record-circle-fill font-size-10 text-warning d-inline-block ms-1"></i>
                                            </h5>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="col-sm-8 col-4">
                                    <ul class="list-inline user-chat-nav text-end mb-0">
    
                                        <li class="list-inline-item">
                                            <div class="dropdown">
                                                <button class="btn nav-btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                    <i class="ri-search-line"></i>
                                                </button>
                                                <div class="dropdown-menu p-0 dropdown-menu-end dropdown-menu-md">
                                                    <div class="search-box p-2">
                                                        <input type="text" class="form-control bg-light border-0" placeholder="Search"
                                                            id="messagesearch">
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
    
                                        <li class="list-inline-item d-none d-lg-inline-block">
                                            <button type="button" @click="showGroupProfileSidebar" class="btn nav-btn user-group-show">
                                                <i class="ri-user-2-line"></i>
                                            </button>
                                        </li>
    
                                        <li class="list-inline-item">
                                            <div class="dropdown">
                                                <button class="btn nav-btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                    <i class="ri-more-fill"></i>
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-end">
                                                    <a class="dropdown-item d-block d-lg-none user-profile-show">View profile <i
                                                            class="ri-user-2-line float-end text-muted"></i></a>
                                                    <a class="dropdown-item" href="#">Archive <i
                                                            class="ri-archive-line float-end text-muted"></i></a>
                                                    <a class="dropdown-item" href="#">Muted <i
                                                            class="ri-volume-mute-line float-end text-muted"></i></a>
                                                    <a class="dropdown-item deleteConversation" href="javascript:void(0);" @click="deleteGroupConversation(groupdata2.id)"
                                                        :group-id="groupdata2.id">Delete <i
                                                            class="ri-delete-bin-line float-end text-muted"></i></a>
                                                </div>
                                            </div>
                                        </li>
    
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div v-else v-if="chatUser" class="p-3 p-lg-4 border-bottom">
                            <div class="row align-items-center">
                                <div class="col-sm-4 col-8">
                                    <div class="d-flex align-items-center CHATUSER" v-if="chatUser" :id="chatUser.id">
                                        <div class="d-block d-lg-none me-2">
                                            <a href="javascript: void(0);" class="user-chat-remove text-muted font-size-16 p-2"><i class="ri-arrow-left-s-line"></i></a>
                                        </div>
                                        <div class="me-3 ms-0">
                                            <img :src="chatUser.avatar" class="rounded-circle avatar-xs" alt=""
                                                id="user-profile-sender-img">
                                        </div>
                                        <div class="flex-grow-1 overflow-hidden">
                                            <h5 class="font-size-16 mb-0 text-truncate">
                                                <a href="#" class="text-reset user-profile-show"
                                                    id="user-profile-sender-name">{{ chatUser.name }}
                                                </a>
                                                    
                                                <i v-if="is_online" class="ri-record-circle-fill font-size-10 text-success d-inline-block ms-1"></i>
                                            
                                                <i v-else class="ri-record-circle-fill font-size-10 text-warning d-inline-block ms-1"></i>
                                            </h5>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="col-sm-8 col-4">
                                    <ul class="list-inline user-chat-nav text-end mb-0">
    
                                        <li class="list-inline-item">
                                            <div class="dropdown">
                                                <button class="btn nav-btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                    <i class="ri-search-line"></i>
                                                </button>
                                                <div class="dropdown-menu p-0 dropdown-menu-end dropdown-menu-md">
                                                    <div class="search-box p-2">
                                                        <input type="text" class="form-control bg-light border-0" placeholder="Search"
                                                            id="messagesearch">
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
    
                                        <li class="list-inline-item d-none d-lg-inline-block">
                                            <button type="button" @click="showUserProfileSidebar" class="btn nav-btn user-profile-show">
                                                <i class="ri-user-2-line"></i>
                                            </button>
                                        </li>
    
                                        <li class="list-inline-item">
                                            <div class="dropdown">
                                                <button class="btn nav-btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                    <i class="ri-more-fill"></i>
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-end">
                                                    <a class="dropdown-item d-block d-lg-none user-profile-show">View profile <i
                                                            class="ri-user-2-line float-end text-muted"></i></a>
                                                    <a class="dropdown-item" href="#">Archive <i
                                                            class="ri-archive-line float-end text-muted"></i></a>
                                                    <a class="dropdown-item" href="#">Muted <i
                                                            class="ri-volume-mute-line float-end text-muted"></i></a>
                                                    <a class="dropdown-item deleteConversation" href="javascript:void(0);" v-if="chatUser.id" @click="deleteConversation(chatUser.id)" :user-id="chatUser.id">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
                                                </div>
                                            </div>
                                        </li>
    
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- end chat user head -->
    
                        <!-- start chat conversation -->
                        <div ref="chatConversation" class="chat-conversation p-3 p-lg-4" data-simplebar="init" style="overflow: hidden scroll;">
                            <ul v-if="isShowMessageComponent" class="list-unstyled mb-0" id="chatul">
                                <!-- @include('layouts.message-conversation') -->
                                <MessageConversation :isGroup="isGroup" :authuser="AuthUser" :getmessagedata="getmessagedata"></MessageConversation>
                            </ul>
                        </div>
                        <!-- end chat conversation end -->
    
                        <!-- start chat input section -->
                        
                        <div v-if="!isGroup && chatUser"  class="chat-input chat-input-section p-3 p-lg-4 border-top mb-0">
                            <div class="row g-2 g-md-0">
                                <div class="col-12 col-md">
                                    <div>
                                        <p class="emoji-picker-container d-flex align-items-end m-0">
                                            <input @keyup.enter="sendMessage()" class="input-field form-control form-control-lg bg-light border-light" data-emojiable="true"
                                                data-emoji-input="true" type="text" v-model="comment" id="comment"
                                                placeholder="Enter Message..." />
                                        </p>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="chat-input-links ms-md-2">
                                        <ul class="list-inline mb-0">
                                            <li class="list-inline-item">
                                                <input type="file" ref="fileInput" @change="handleFileUpload" name="fileUpload" id="fileUpload" data-user="chatUser-id"
                                                    style="display:none;" />
                                                <button type="button" id="btnFile"
                                                    class="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect"
                                                    data-bs-toggle="tooltip" data-placement="top" title="Attached File"  @click="openFileInput()">
                                                    <i class="ri-attachment-line"></i>
                                                </button>
                                            </li>
                                            <li class="list-inline-item">
                                                <button type="button" id="startButton" class="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect"><i class="ri-mic-line"></i></button>
                                            </li>
                                            <li class="list-inline-item">
                                                <button type="button" @click="sendMessage()"
                                                    class="btn btn-primary font-size-16 btn-lg chat-send waves-effect waves-light send-chat-message"
                                                    data-user="chatUser-id">
                                                    <i class="ri-send-plane-2-fill"></i>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
    
                                </div>
                            </div>
                        </div>
                        <div v-if="isGroup && groupdata2" class="chat-input group-chat-input p-3 p-lg-4 border-top mb-0">
                            <div class="row no-gutters">
                                <div class="col">
                                    <div>
                                        <p class="emoji-picker-container d-flex align-items-end m-0">
                                            <input class="input-field form-control form-control-lg bg-light border-light" data-emojiable="true"
                                                data-emoji-input="true" type="text" v-model="comment"
                                                id="comment" placeholder="Enter Message..." />
                                        </p>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="chat-input-links ms-md-2">
                                        <ul class="list-inline mb-0">
                                            <li class="list-inline-item">
                                                <input type="file" ref="fileInputGroup" @change="handleFileUploadGroup" name="fileUpload" id="GroupfileUpload" :group-id="groupdata.id"  style="display:none;"/>
                                                <button type="button" id="btnFile" class="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect" data-bs-toggle="tooltip" data-placement="top" title="Attached File" @click="openFileInputGroup()">
                                                    <i class="ri-attachment-line"></i>
                                                </button>
                                            </li>
                                            <li class="list-inline-item">
                                                <button type="button" id="startButton" class="btn btn-ghost-success btn-icon"><i class="ri-mic-line"></i></button>
                                            </li>
                                            <li class="list-inline-item">
                                                <button type="submit" @click="sendGroupMessage(group_id)" class="btn btn-primary font-size-16 btn-lg chat-send waves-effect waves-light send-group-message" :group-id="groupdata.id">
                                                    <i class="ri-send-plane-2-fill"></i>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
    
                                </div>
                            </div>
                        </div>
                        <!-- end chat input section -->
    
                    </div>
                </div>
                <!-- start User profile detail sidebar -->
                <div v-if="this.$store.state.profilesidebar.isShow" id="userprofiledetail">
                    <UserProfileDetail></UserProfileDetail>
                </div>
                <div v-if="this.$store.state.profilesidebar.isGroupShow" id="groupprofiledetail">
                    <GroupProfileDetail></GroupProfileDetail>
                </div>
                <!-- end User profile detail sidebar -->
            </div>
        </div>
        <!-- End User chat -->
    </div>
    </template>
    <script>
    import axios from 'axios';
    import MessageConversation from "../../../resources/js/components/MessageConversation.vue";
    import UserProfileDetail from "../../../resources/js/components/UserProfileDetail.vue";
    import GroupProfileDetail from "../../../resources/js/components/GroupProfileDetail.vue";
    import ChatLeftSidebarTabs from "../../../resources/js/components/ChatLeftSidebarTabs.vue";
    import { mapActions } from 'vuex';
    
    export default {
      components: {
        MessageConversation: MessageConversation,
        UserProfileDetail: UserProfileDetail,
        GroupProfileDetail: GroupProfileDetail,
        ChatLeftSidebarTabs: ChatLeftSidebarTabs
      },
      data() {
        return {
          token: null,
          is_online: true,
          AuthUser: {},
          users: [],
          contacts: {},
          groupdata: [],
          messages: [],
          chatUser: {},
          AttachedFiles: [],
          getmessagedata: {},
          recentChatUserId: null,
          activeTab: 'Chats', // Track active tab
          menuItems: [ // Define menu items
            { title: 'Profile', id: 'pills-user-tab', target: 'user', iconClass: 'ri-user-2-line' },
            { title: 'Chats', id: 'pills-chat-tab', target: 'chat', iconClass: 'ri-message-3-line' },
            { title: 'Groups', id: 'pills-groups-tab', target: 'groups', iconClass: 'ri-group-line' },
            { title: 'Contacts', id: 'pills-contacts-tab', target: 'contacts', iconClass: 'ri-contacts-line' },
            { title: 'Settings', id: 'pills-settings-tab', target: 'settings', iconClass: 'ri-settings-2-line' },
          ],
          comment: '',
          isShowMessageComponent: false,
          groupdata2: {},
          isGroup: false,
          to_user_id: '',
          group_name: "",
          checkboxusers: [],
          description: "",
          from_group_id: "",
          isShowInputName: false,
          chatId: '',
          groupId: '',
        };
      },
        mounted() {
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
                // if(this.groupId === e.message.group_id){
                    this.$store.state.messages.getmessagedata.messages.push({
                        id: e.message.id,
                        from_user_id: e.message.from_user_id,
                        group_id: e.message.group_id,
                        message: e.message.message,
                        file: e.message.file,
                        created_at: e.message.created_at,
                    });
                    this.user = e.user;
                // }
            });
    
            this.showUserProfileSidebar(false);
            this.showGroupProfileSidebar(false);
            this.getGroupMessage(1);
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
            }),
            logout(){
                const headers = { 
                    "Content-Type": "application/json", 
                    "Authorization": "Bearer " + this.token,
                };
                axios.post('/api/logout', {}, { headers }).then(({data})=>{
                    localStorage.removeItem('token');
                    //router.push({ name: 'login'})
                    this.$router.push({ name: 'login'});
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
                    this.chatId = this.chatUser.id;
                    // Call the Vuex action and pass AuthUser and getmessagedata
                    this.isGroup = false;
                    this.to_user_id = user_id;
                    this.messages2({ AuthUser: this.AuthUser, getmessagedata: data, isGroup: this.isGroup });
                    this.ShowProfileSidebar({ value: false });
                    this.ShowGroupProfileSidebar({ value: false , groupdata: this.groupdata2});
                    this.isShowMessageComponent = true;
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
                    this.groupId = this.groupdata2.id;
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
    </script>
    