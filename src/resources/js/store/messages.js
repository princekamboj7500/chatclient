import axios from 'axios'
import router from '../router'

export default {
    namespaced: true,
    state:{
        authenticated:false,
        AuthUser:{},
        getmessagedata: {},
        isGroup: false,
    },
    getters:{
        getmessagedata(state){
            return state.getmessagedata
        },
        user(state){
            return state.AuthUser
        },
        isGroup(state){
            return state.isGroup
        }
    },
    mutations:{
        SET_MESSAGES(state, value) {
            //console.log("in SET_MESSAGES",value);
            state.getmessagedata = value;
        },
        SET_USER(state, value) {
            //console.log("in SET_USER",value);
            state.AuthUser = value;
        },
        SET_ISGROUP(state, value){
            state.isGroup = value;
        }
    },
    actions:{
        getMessages({commit}, { AuthUser, getmessagedata, isGroup }){
            commit('SET_USER',AuthUser);
            commit('SET_MESSAGES',getmessagedata);
            commit('SET_ISGROUP',isGroup);
            //console.log("in messages store getMessage",getmessagedata);
            //console.log("in messages store AuthUser",AuthUser);
        }
    }
}