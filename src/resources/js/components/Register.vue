<template>
    <div class="account-pages my-5 pt-sm-5">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-5">
                <div class="text-center mb-4">
                    <a href="#" class="auth-logo mb-5 d-block">
                        <img src="../../assets/images/logo-dark.png" alt="Logo Dark" height="30" class="logo logo-dark">
                        <img src="../../assets/images/logo-light.png" alt="" height="30" class="logo logo-light">
                    </a>
                    <h4>Sign up</h4>
                    <p class="text-muted mb-4">Get your Chatvia account now.</p>
                </div>

                <div class="card">
                    <div class="card-body p-4">
                        <div class="p-3">
                            <form method="POST" action="javascript:void(0)" @submit="register" enctype="multipart/form-data">
                                <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                                    <div class="alert alert-danger">
                                        <ul class="mb-0">
                                            <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Email <span class="text-danger">*</span></label>
                                    <div class="input-group mb-3 bg-light-subtle input-group-lg rounded-lg">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text border-light text-muted">
                                                <i class="ri-mail-line"></i>
                                            </span>
                                        </div>
                                        <input id="email" type="email" class="form-control bg-light-subtle border-light" v-model="user.email" required autocomplete="email" placeholder="Enter Email">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Contact No. <span class="text-danger">*</span></label>
                                    <div class="input-group mb-3 bg-light-subtle input-group-lg rounded-lg">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text border-light text-muted">
                                                <i class="ri-user-2-line"></i>
                                            </span>
                                        </div>
                                        <input id="phone" type="text" class="form-control bg-light-subtle border-light" v-model="user.phone" required autocomplete="phone" autofocus placeholder="Enter Contact No.">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Username <span class="text-danger">*</span></label>
                                    <div class="input-group mb-3 bg-light-subtle input-group-lg rounded-lg">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text border-light text-muted">
                                                <i class="ri-user-2-line"></i>
                                            </span>
                                        </div>
                                        <input id="name" type="text" class="form-control bg-light-subtle border-light" v-model="user.name" required autocomplete="name" autofocus placeholder="Enter Username">
                                    </div>
                                </div>

                                <div class="form-group mb-4">
                                    <label class="form-label">Password <span class="text-danger">*</span></label>
                                    <div class="input-group mb-3 bg-light-subtle input-group-lg rounded-lg">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text border-light text-muted">
                                                <i class="ri-lock-2-line"></i>
                                            </span>
                                        </div>
                                        <input id="password" type="password" class="form-control bg-light-subtle border-light" v-model="user.password" required autocomplete="new-password" placeholder="Enter Password">
                                    </div>
                                </div>

                                <div class="form-group mb-4">
                                    <label class="form-label">Confirm Password <span class="text-danger">*</span></label>
                                    <div class="input-group mb-3 bg-light-subtle input-group-lg rounded-lg">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text border-light text-muted">
                                                <i class="ri-lock-2-line"></i>
                                            </span>
                                        </div>
                                        <input id="password-confirm" type="password" class="form-control bg-light-subtle border-light" v-model="user.password_confirmation" required autocomplete="new-password" placeholder="Enter Confirm Password">
                                    </div>
                                </div>

                                <div class="form-group mb-4">
                                    <label for="avatar" class="form-label">Profile Picture <span class="text-danger">*</span></label>
                                    <input type="file" class="form-control bg-light-subtle border-light" @change="uploadFile" required id="avatar">
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Location <span class="text-danger">*</span></label>
                                    <div class="input-group mb-3 bg-light-subtle input-group-lg rounded-lg">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text border-light text-muted">
                                                <i class="ri-user-2-line"></i>
                                            </span>
                                        </div>
                                        <textarea id="location" rows="1" type="text" class="form-control bg-light-subtle border-light" v-model="user.location" required autocomplete="location" autofocus></textarea>
                                    </div>
                                </div>

                                <div>
                                    <button class="btn btn-primary w-100 waves-effect waves-light" type="submit">Sign up</button>
                                </div>

                                <div class="mt-4 text-center">
                                    <p class="text-muted mb-0">By registering you agree to the Chatvia <a href="#" class="text-primary">Terms of Use</a></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <div class="mt-5 text-center">
                    <p>Already have an account ? <router-link :to="{name:'login'}"> Signin</router-link> </p>
                    <p>© {{ new Date().getFullYear() }} Chatvia. Crafted with <i class="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                </div>
            </div>
        </div>
    </div>
</div>

</template>
  
  <script>
  import axios from 'axios';

  export default {
    data(){
        return {
            user:{
                name: "",
                email: "",
                phone: "",
                location: "",
                password: "",
                password_confirmation: "",
                profile_image: ""
            },
            validationErrors:{},
            processing:false
        }
    },
    methods: {
        uploadFile(event){
            this.user.profile_image = event.target.files[0];
        },
        register() {
        console.log("post data",this.user);
        axios.post('/api/register', this.user, {
            headers: {
            'Content-Type': 'multipart/form-data' // Set the correct content type for FormData
            }
        }).then(response => {
          console.log("api response => ",response.status);
          console.log("api response => ",response.data.data);
          this.validationErrors = {}
          if(response.status == 201){
            localStorage.setItem('token', response.data.data.token);
            this.$router.push({ name: 'dashboard'});
          }
        }).catch(({response})=>{
            if(response.status===422){
                this.validationErrors = response.data.data
            }else{
                this.validationErrors = {}
                alert(response.data.message)
            }
        }).finally(()=>{
            this.processing = false
        })
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  