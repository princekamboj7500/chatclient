import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
//import profilesidebar from '@/store/profilesidebar'
//import messages from '@/store/messages'
//import LeftTabsData from '@/store/LeftTabsData'
//import userstatus from '@/store/userstatus'

import profilesidebar from '../store/profilesidebar'
import messages from '../store/messages'
import LeftTabsData from '../store/LeftTabsData'
import userstatus from '../store/userstatus'

const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules:{
        messages,
        profilesidebar,
        LeftTabsData,
        userstatus
    }
})

export default store