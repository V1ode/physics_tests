<script setup>
defineProps({
    labNumber: Number
})
</script>

<script>
import { Chart } from 'chart.js';
import {CategoryScale, LinearScale, LineController, PointElement, LineElement} from 'chart.js'; 

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(LineController);
Chart.register(PointElement);
Chart.register(LineElement);


export default {
	components: {
        
	},
	data() {
		return {
			labs: [
                {
                    labNumber: 3,
                    labDescription: "Проверка основного закона динамики вращательного движения абсолютно твердого тела вокруг подвижной оси",                    
                }
            ],
		};
	},

	mounted() {      
	},

	methods: {
        goToDataInput(labNumberArg) {
            this.$router.push({
                name: 'dataInput',
                params: {
                    labNumber: labNumberArg
                }
            })
        },
        goToResultsPage() {
            this.$router.push({
                name: 'resultsPageLab3'
            })
        },
		// async uploadImg(event) {
		// 	this.uploadedImg = URL.createObjectURL(event.target.files[0])

		// 	console.log(this.uploadedImg)

		// 	qrcodeParser(event.target.files[0])
		// 		.then( (value) => {
		// 			console.log(value)
		// 			this.decodedText = value
		// 		}			
		// 	)						
		// }
    }
}
</script>

<template>    
    <div class="main-container">
        <div class="list-container">
            <div v-for="lab in labs" class="lab-container" @click="goToDataInput(lab.labNumber)">
                <h3 class="lab-title">Лабораторная работа №{{ lab.labNumber }}</h3>

                <p class="lab-description">{{ lab.labDescription }}</p>
            </div>            
        </div>

        <button @click="goToResultsPage">На последнюю страницу</button>
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

    .list-container {       
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-top: 3vh;
    }

    .lab-container {
        width: 75vw;
        position: relative;

        border-radius: 19px;      
        background-color: rgb(37 100 194 / 79%);

        padding: 40px 40px;

        display: flex;
        align-items: center;
        gap: 95px;

        transition: all ease .4s;
    }

    .lab-container:hover {        
        /* background-color: rgba(119, 168, 241, 0.555); */
        background-color: rgba(37, 100, 194, 0.158);        

        cursor: pointer;
        transition: all ease .4s;
    } 

    .lab-title {
        color: rgb(5 19 240);
        font-size: 40px;
        white-space: nowrap;
        
        transition: all ease .3s;
    }

    .lab-container:hover .lab-title {
        opacity: 0;
        transition: all ease .3s;
    }

    .lab-description {  
        color: rgba(40, 51, 196, 0.911);;
        font-size: 25px;
        text-shadow: 5px 5px 39px rgb(123, 66, 255);

        opacity: 0;
        transition: all ease .3s;
    }

    .lab-container:hover .lab-description {
        opacity: 1;
        transition: all ease .3s;
    }
</style>