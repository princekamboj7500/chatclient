import axios from 'axios'
import router from '../router'

export default {
    namespaced: true,
    state:{
        AuthUser: {},
        AttachedFiles: [],
        users: [],
        contacts: [],
        groupdata: [],
    },
    getters:{
        
    },
    mutations:{
        SET_AUTH_USER(state, value) {
            state.AuthUser = value;
        },
        SET_ATTACHED_FILES(state, value){
            state.AttachedFiles = value;
        },
        SET_USERS_DATA(state, value){
            state.users = value;
        },
        SET_CONTACTS_DATA(state, value){
            state.contacts = value;
        },
        SET_GROUP_DATA(state, value){
            state.groupdata = value;
        }
    },
    actions:{
        SETAUTHUSER({commit}, { AuthUser }) {
            //console.log("AuthUser in leftsidetabs",AuthUser);
            commit('SET_AUTH_USER',AuthUser);
        },
        SETATTACHEDFILES({commit}, { AttachedFiles }){
            //console.log("AttachedFiles in leftsidetabs",AttachedFiles);
            commit('SET_ATTACHED_FILES',AttachedFiles);
        },
        SETUSERSDATA({commit}, { users }){
            //console.log("users in leftsidetabs",users);
            commit('SET_USERS_DATA',users);
        },
        SETCONTACTSDATA({commit}, { contacts }){
            //console.log("contacts in leftsidetabs",contacts);
            commit('SET_CONTACTS_DATA',contacts);
        },
        SETGROUPDATA({commit}, { groupdata }){
            //console.log("groupdata in leftsidetabs",groupdata);
            commit('SET_GROUP_DATA',groupdata);
        }
    }
}