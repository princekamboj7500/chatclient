import axios from 'axios'
import router from '../router'

export default {
    namespaced: true,
    state:{
        isShow: false,
        isGroupShow: false,
        groupdata: {}
    },
    getters:{
        getmessagedata(state){
            return state.isShow
        },
    },
    mutations:{
        SET_USER_SHOW(state, value) {
            state.isShow = value;
        },
        SET_GROUP_SHOW(state, value){
            state.isGroupShow = value;
        },
        SET_GROUP_DATA(state, value){
            state.groupdata = value;
        }
    },
    actions:{
        ShowProfileSidebar({commit}, { value }){
            commit('SET_USER_SHOW',value);
            //console.log("showUserProfileSidebar",value);
        },
        ShowGroupProfileSidebar({commit}, { value , groupdata}){
            commit('SET_GROUP_SHOW',value);
            commit('SET_GROUP_DATA',groupdata);
            //console.log("showGroupProfileSidebar",value);
        }
    }
}