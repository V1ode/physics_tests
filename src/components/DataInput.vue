<script>
import newLabData from '@/data/newLabData';
import labsData from '@/data/labsData';

import store from '../store';
import { mapGetters } from 'vuex';

export default {
	components: {

	},
    computed: {
        ...mapGetters([
            'labs_data',
            'new_lab_data',
        ]) 
    },
	data() {
		return {
			labNumber: this.$route.params.labNumber,
            maxStudentsCount: 5,
            studentCount: 1,
            groups: [
                "ПрИ-101",
                "ПИ-101",
                "ИВТ-101",
                "ИСТ-101",
                "ПрИ-201",
                "ПИ-201",
                "ИВТ-201",
                "ИСТ-201",
            ],
            studentsLastNames: [],
            studentsFirstNames: [],
            studentsPatronimics: [],
            studentsGroups: ["ПрИ-101", "ПрИ-101", "ПрИ-101", "ПрИ-101", "ПрИ-101"],
		};
	},

	mounted() {
        
	},

	methods: {
        startWork() {
            if(!this.checkEmptyInputs()) {
                this.saveStudentData()
                this.goToLab()
            } 
        },
        checkEmptyInputs() {
            for(let i = 0; i < this.studentCount; i++) {
                if(this.studentsLastNames[i] == null || this.studentsLastNames[i].trim().length === 0 ||
                        this.studentsFirstNames[i] == null || this.studentsFirstNames[i].trim().length === 0 ||
                        this.studentsPatronimics[i] == null || this.studentsPatronimics[i].trim().length === 0) {
                    document.querySelector(`.error-text`)
                        .classList.remove('hidden')

                    document.querySelector(`.students-container`)
                        .classList.add('wrong-data')

                    return true
                }
            }

            return false
        },
        removeError() {
            document.querySelector(`.error-text`)
                .classList.add('hidden')
            
            document.querySelector(`.students-container`)
                .classList.remove('wrong-data')
        },
        saveStudentData() { 
            let newLabData = {}
            newLabData['id'] = this.labs_data.length;
            newLabData['labNumber'] = this.labNumber
            newLabData['students'] = []

            for(let i = 0; i < this.studentsLastNames.length; i++) {
                newLabData['students'][i] = {}
                newLabData['students'][i]['lastName'] = this.studentsLastNames[i]
                newLabData['students'][i]['firstName'] = this.studentsFirstNames[i]
                newLabData['students'][i]['patronimic'] = this.studentsPatronimics[i]
                newLabData['students'][i]['group'] = this.studentsGroups[i]
            }

            store.dispatch('saveNewLabData', newLabData)
        },
		goToLab() {
            this.$router.push({
                name: 'firstPageLab3'
            })
        },        
    }
}
</script>

<template>
    <div class="main-container">
        <!-- <h1 class="title">Лабораторная работа № {{labNumber}}</h1>

        <h2 class="second-title">
            Проверка основного закона динамики вращательного движения абсолютно твердого тела вокруг подвижной оси
        </h2> -->

        <div class="input-block">
            <p class="input-text">Число человек в звене: </p> 
            
            <select class="select-number" v-model="studentCount" @change="removeError">
                <option v-for="index in maxStudentsCount" :value="index">{{index}}</option>                
            </select>
        </div>

        <div class="students-container">
            <div v-for="index in studentCount" class="student-input-block">                
                <input type="text" class="text-input" @input="removeError" v-model="studentsLastNames[index-1]" placeholder="Фамилия" :name="'f'+index">
                    
                <input type="text" class="text-input" @input="removeError" v-model="studentsFirstNames[index-1]" placeholder="Имя" :name="'n'+index">

                <input type="text" class="text-input" @input="removeError" v-model="studentsPatronimics[index-1]" placeholder="Отчество" :name="'p'+index">
                    
                <select class="select-data" @change="removeError" v-model="studentsGroups[index-1]">
                    <option v-for="group in groups" :value="group">{{group}}</option>                
                </select>
            </div>
        </div>
        
        <p class="error-text hidden">Заполните все поля</p>
        
        <button class="login-btn start-btn" @click="startWork">Начать работу</button>
    </div>
</template>

<style>
    .main-container {
        /* height: 87vh; */
        /* background-color: rgb(237, 237, 248); */
        font-family: 'Inter', sans-serif;

        padding-top: 50px;

        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    .title {
        font-size: 41px;
        color: rgb(57, 57, 255);
    }

    .second-title {
        width: 900px; 
        font-size: 30px;
        color: black;

        text-align: center;
    }

    .input-block {
        border: 3px solid;
        border-radius: 16px;
        border-color: #5F7FEB;

        display: flex;
        align-items: center;
        gap: 30px;

        margin-top: 50px;
        padding: 20px;
    }

    .input-text {
        font-size: 18px;
    }

    .select-number {
        font-size: 18px;

        padding: 12px 20px;

        background-color: #f9f9f9;
        border: 3px solid #a49cf1b9;
        border-radius: 9px;
    }

    .select-number:hover {
        cursor: pointer;
    }

    .select-number:focus {
        outline: none;
        border: 3px solid #8b82dddc;
    }

    .students-container {
        border: 3px solid;
        border-radius: 16px;
        border-color: #5F7FEB;

        display: flex;
        gap: 40px;

        margin-top: 50px;
        padding: 20px;
    }    

    .student-input-block {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .text-input {
        font-size: 18px;

        border: none;
        border-bottom: 1px solid;
        border-color: #1144eb50;

        padding: 5px;
    }

    .text-input:focus {
        outline: none;
        border-color: #1144eb8a;
    }

    .select-data {
        font-size: 18px;

        padding: 10px;

        margin-top: 15px;
    }

    .select-data:hover {
        cursor: pointer;
    }

    .login-btn {
        height: fit-content;
        font-size: 20px;
        font-weight: 600;        
        color: rgb(28 28 255 / 67%);

        background-color: rgba(197, 197, 248, 0.25);
        border-color: #0000ff7a;
        border-radius: 16px;

        padding: 15px 30px;

        margin-right: 10vw;

        transition: all ease .4s;
    }

    .login-btn:hover {
        color: rgba(33, 33, 255, 0.781);

        background-color: rgba(154, 154, 255, 0.644);
        border-color: #0202ffa4;

        cursor: pointer;
        transition: all ease .4s;
    }

    .start-btn {
        height: fit-content;
        font-size: 25px;
        color: #1143EB;

        background-color: #1144eb50;
        border-color: #1143EB;
        
        box-shadow: 0 0 0 0;

        margin: 0px;
        margin-top: 50px;
    }

    .start-btn:hover {
        color: #3865fa;

        background-color: #3a66f531;
        border-color: #3865fa;
        
        box-shadow: 0 0 0 0;

        margin: 0px;
        margin-top: 50px;
    }

    .hidden {
        position: absolute;
        bottom: 0px;
        opacity: 0;
    }

    .error-text {
        color: red;

        margin-top: 15px;
    }

    .wrong-data {
        border-color: red;
    } 
</style>