export default {
    namespaced: true,
    state:{
        isLogin: false,
    },
    getters:{
       
    },
    mutations:{
        SET_ONLINE_USER(state, value) {
            state.isLogin = value;
        }
    },
    actions:{
        SetOnlineUser({commit}, { isLogin }){
            commit('SET_ONLINE_USER',isLogin);
            console.log("SetOnlineUser in vuex",isLogin);
        }
    }
}