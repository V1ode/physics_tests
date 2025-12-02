<script>
import store from '../../store';
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
            minWeightsCount: 3,
			maxWeightsCount: 5,
            weightsCount: 5,
            minTimeCount: 3,
			maxTimeCount: 5,
            timeMeasuringCount: 3,
            weights: [],
            timeMeasurings: [[], [], [], [], []]
		};
	},

	mounted() {
        
	},

	methods: {
        checkWeightInput(weigthIndex) {
            if(this.weights[weigthIndex] < 0.03) {
                this.weights[weigthIndex] = 0.03
            } else if(this.weights[weigthIndex] > 0.7) {
                this.weights[weigthIndex] = 0.7
            }
        },
        checkTimeMeasuringInput(weigthIndex, timeMeasuringIndex) {
            if(this.timeMeasurings[weigthIndex][timeMeasuringIndex] < 0.01) {
                this.timeMeasurings[weigthIndex][timeMeasuringIndex] = 0.01
            }
        },
        continueWork() {
            this.saveInputData()
            this.goToThirdPage()
        },
        saveInputData() { 
            console.log(this.new_lab_data) 

            this.new_lab_data["data"] = {}
            this.new_lab_data["data"]["weights"] = this.weights
            this.new_lab_data["data"]["timeMeasurings"] = this.timeMeasurings

            console.log(this.new_lab_data) 

            store.dispatch('saveNewLabData', this.new_lab_data)
        },
		goToThirdPage() {
            this.$router.push({
                name: 'thirdPageLab3'
            })
        },        
    }
}
</script>

<template>
    <div class="main-container">
        <div class="input-blocks-container">
            <div class="input-block m-t-0">
                <p>Число различных масс, использованных в работе: </p> 
                
                <select class="select-number" v-model="weightsCount">
                    <option v-for="index in (maxWeightsCount-minWeightsCount+1)" :value="maxWeightsCount-index+1">{{maxWeightsCount-index+1}}</option>                
                </select>
            </div>    

            <div class="input-block m-t-0">
                <p>Число измерений времени при постоянной массе: </p> 
                
                <select class="select-number" v-model="timeMeasuringCount">
                    <option v-for="index in (maxTimeCount-minTimeCount+1)" :value="index+minTimeCount-1">{{index+minTimeCount-1}}</option>                
                </select>
            </div>
        </div>       

        <table class="table" border="1">
            <tr v-for="weigthIndex in weightsCount">
                <td>
                    <math>
                        <msub>
                            <mi>m</mi>
                            <mn>{{weigthIndex}}</mn>
                        </msub>
                    </math> 
                    = <input class="weight-input" type="number" min="0.03" max="0.7" step="0.01" v-model="weights[weigthIndex-1]"
                        placeholder="От 0.03 до 0.7 кг" @change="checkWeightInput(weigthIndex-1)">
                </td>

                <td v-for="timeMeasuringIndex in timeMeasuringCount">
                    <math>
                        <msub>
                            <mi>t</mi>
                            <mn>{{weigthIndex}}{{timeMeasuringIndex}}</mn>
                        </msub>
                    </math> 
                    = <input class="time-input" type="number" min="0.01" step="0.01" placeholder="с" v-model="timeMeasurings[weigthIndex-1][timeMeasuringIndex-1]" 
                        @change="checkTimeMeasuringInput(weigthIndex-1, timeMeasuringIndex-1)">
                </td>
            </tr>
        </table>
        
        <button class="login-btn start-btn" @click="continueWork">Продолжить</button>
    </div>
</template>

<style>
    .main-container {
        /* height: 87vh; */
        /* background-color: rgb(237, 237, 248); */
        font-family: "Inter", sans-serif;
        font-size: 18px;

        padding-top: 50px;

        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    .input-blocks-container {
        display: flex;
        gap: 60px;
    }

    .m-t-0 {
        margin-top: 0px;
    }

    .table {
        height: 384px;

        border: none;

        margin-top: 40px;
    }

    .table tr {       
        display: flex;
        gap: 10px;
    }

    .table td {
        border: 1px solid;
        border-radius: 1px;

        padding: 15px;

        display: flex;
        align-items: center;
        gap: 5px;

        margin-bottom: 15px;
    }

    input::-webkit-outer-spin-button,   
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
    }

    .weight-input, .time-input {
        padding: 5px;

        text-align: end;
    }

    .weight-input {
        width: 121px;
    }

    .time-input {
        width: 121px;
        
    }



    .title {
        font-size: 41px;
        color: rgb(57, 57, 255);
    }

    .text-block {
        width: 900px;

        display: flex;
        flex-direction: column;
        gap: 40px;

        margin-top: 45px;
        margin-bottom: 30px;
    }

    .description {
        text-indent: 3em;
    }

    .highlighted {
        color: #0000ff7a;
    }

    .numbered-list-title {
        margin-bottom: 20px;
    }

    .numbered-list {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .numbered-list li[type="text"] {
        text-indent: 3em;
    }

    .numbered-list li {
        text-indent: 2.5em;
    }

    .unmarked-list {
        list-style-type: none;

        display: flex;
        flex-direction: column;
        gap: 10px;

        margin-top: 10px;
    }

    .warning-text {
        color: red;
    }
</style>