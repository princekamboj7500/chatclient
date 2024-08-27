<template>
    <div>
      <div class="account-pages my-5 pt-sm-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-5">
              <div class="text-center mb-4">
                <a href="/" class="auth-logo mb-5 d-block">
                  <img src="../../assets/images/logo-dark.png" alt="Logo Dark" height="30" class="logo logo-dark">
                  <img src="../../assets/images/logo-light.png" alt="" height="30" class="logo logo-light">
                </a>
                <h4>Sign in</h4>
                <p class="text-muted mb-4">Sign in to continue to Chatvia..</p>
              </div>
  
              <div class="card">
                <div class="card-body p-4">
                  <div class="p-3">
                    <form @submit.prevent="login">
                      <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                          <div class="alert alert-danger">
                              <ul class="mb-0">
                                  <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                              </ul>
                          </div>
                      </div>
                      <div class="form-group">
                        <label class="form-label">Email<span class="text-danger">*</span></label>
                        <div class="input-group mb-3 bg-light-subtle input-group-lg rounded-lg">
                          <div class="input-group-prepend">
                            <span class="input-group-text border-light text-muted">
                              <i class="ri-user-2-line"></i>
                            </span>
                          </div>
                          <input v-model="email" type="email" class="form-control bg-light-subtle border-light" required autofocus>
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
                          <input v-model="password" type="password" class="form-control bg-light-subtle border-light" required>
                        </div>
                      </div>
  
                      <div class="form-check mb-4">
                        <input v-model="remember" class="form-check-input" type="checkbox" id="remember">
                        <label class="form-check-label" for="remember">Remember Me</label>
                      </div>
  
                      <div>
                        <button class="btn btn-primary w-100 waves-effect waves-light" type="submit" :disabled="loading">Sign in
                          <span v-if="loading" class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
  
              <div class="mt-5 text-center">
                <p>Don't have an account ?<router-link :to="{name:'register'}"> Register Now!</router-link></p>
                <p>© {{ new Date().getFullYear() }} Chatvia. Crafted with<i class="mdi mdi-heart text-danger"></i>by Themesbrand</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapActions } from 'vuex';

  export default {
    props: ['data'],
    data() {
      return {
        email: 'admin@themesbrand.com', // Set default email value
        password: 'password', // Set default password value
        remember: false,
        validationErrors:{},
        loading: false
      };
    },
    mounted() {
      //console.log("prop data:", this.data);
    },
    methods: {
      ...mapActions({
        SetOnlineUser: 'userstatus/SetOnlineUser'
      }),
      login() {
        this.loading = true;
        const post_data = { email: this.email, password: this.password };
        axios.post('/api/login', post_data).then(response => {
          console.log("api response => ",response.status);
          if(response.status == 200){
            localStorage.setItem('token', response.data.data.token);
            this.SetOnlineUser({isLogin: true});
            this.$router.push({ name: 'dashboard'});
          }else{
            console.log("There is some error in api call");
            alert("There is some error in api call")
          }
          this.loading = false;
        }).catch(({response})=>{
          this.loading = false;
          if(response.status===422){
            this.validationErrors = response.data.data
          }else{
            this.validationErrors = {}
            alert(response.data.message)
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  