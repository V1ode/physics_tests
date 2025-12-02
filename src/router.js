import { createRouter, createWebHistory } from "vue-router";
import LabsList from "./views/LabsList.vue";
import DataInput from "./components/DataInput.vue";
import FirstPageLab3 from "./components/lab3/FirstPage.vue";
import SecondPageLab3 from "./components/lab3/SecondPage.vue";
import ThirdPageLab3 from "./components/lab3/ThirdPage.vue";
import FourthPageLab3 from "./components/lab3/FourthPage.vue";
import ResultsPage from "./components/lab3/ResultsPage.vue";

import FirstPageLab9 from "./components/lab9/FirstPage.vue";

// let firstPages = {
//     "3": FirstPageLab3,
//     "9": FirstPageLab9
// }

export default createRouter({
    // Сохранение истории переходов
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'home',
            component: LabsList
        },
        {
            path: '/dataInput/lab:labNumber',
            name: 'dataInput',
            component: DataInput                   
        },   
        {
            path: '/firstPageLab3',
            name: 'firstPageLab3',
            component: FirstPageLab3        
        }, 
        {
            path: '/secondPageLab3',
            name: 'secondPageLab3',
            component: SecondPageLab3        
        },   
        {
            path: '/thirdPageLab3',
            name: 'thirdPageLab3',
            component: ThirdPageLab3        
        }, 
        {
            path: '/fourthPageLab3',
            name: 'fourthPageLab3',
            component: FourthPageLab3        
        },
        {
            path: '/resultsPageLab3',
            name: 'resultsPageLab3',
            component: ResultsPage        
        }, 
    ]
})