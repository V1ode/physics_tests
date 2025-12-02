import { createStore } from 'vuex'
import newLabData from './data/newLabData'
import labsData from './data/labsData'

export default createStore({
    state: {
        newLabData: {},
        labsData: []
    },
    getters: {
        new_lab_data : (state) => {
            return state.newLabData
        },
        labs_data : (state) => {
            return state.labsData
        }
    },
    mutations: {
        setNewLabData: (state, newData) => {
            state.newLabData = newData
        }
    },
    actions: {
        saveNewLabData: async (context, newData) => {
            context.commit('setNewLabData', newData)
        }
    },
})