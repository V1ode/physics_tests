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
            inputData: {
                "confidenceCoefficient": 0.00001,
                "stopwatchErr": NaN,
                "loadLoweringHeightErr": NaN,
                "pulleyRadiusErr": NaN,
                "weightErr": NaN
            },            
		};
	},

	mounted() {
        
	},

	methods: {
        checkStrInput() {
            if(this.strNumber < 1)
                this.strNumber = 1
            else if(this.strNumber > this.new_lab_data['data']['weights'].length)
                this.strNumber = this.new_lab_data['data']['weights'].length
        },
        checkInputValue(valueName) {
            if(this.inputData[valueName] < 0.00001)
                this.inputData[valueName] = 0.00001
        },
        continueWork() {
            this.saveInputData()
            console.log(this.new_lab_data)
            this.goToFourthPage()
        },
        saveInputData() {
            this.new_lab_data["data"]["confidenceCoefficient"] = this.inputData["confidenceCoefficient"]
            this.new_lab_data["data"]["stopwatchErr"] = this.inputData["stopwatchErr"]
            this.new_lab_data["data"]["loadLoweringHeightErr"] = this.inputData["loadLoweringHeightErr"]
            this.new_lab_data["data"]["pulleyRadiusErr"] = this.inputData["pulleyRadiusErr"]
            this.new_lab_data["data"]["weightErr"] = this.inputData["weightErr"]
        },
		goToFourthPage() {
            this.$router.push({
                name: 'fourthPageLab3'
            })
        },        
    }
}
</script>

<template>
    <div class="main-container">           
        <div class="input-block wide-block">
            <p>Введите значение доверительной вероятности: </p> 
                

            <div class="right-section">
                <p>α =</p>

                <input class="value-input" type="number" v-model="inputData['confidenceCoefficient']" min="0.01" :max="1" :value="inputData['confidenceCoefficient']" 
                @change="checkInputValue('confidenceCoefficient')">
            </div>                
        </div>  
        
        <div class="input-block wide-block">
            <p>Введите значение погрешности секундомера:</p> 
            
            <div class="right-section">
                <p>Δt = </p>

                <input class="value-input" type="number" v-model="inputData['stopwatchErr']" :min="0.001" :value="inputData['stopwatchErr']" 
                placeholder="с" @change="checkInputValue('stopwatchErr')">
            </div>
        </div>  

        <div class="input-block wide-block">
            <p>Введите значение погрешности высоты опускания груза: </p>
                
                <div class="right-section">
                    <p>Δh = </p>

                    <input class="value-input" type="number" v-model="inputData['loadLoweringHeightErr']" :min="0.001" :value="inputData['loadLoweringHeightErr']" 
                    placeholder="м" @change="checkInputValue('loadLoweringHeightErr')">
                </div>
        </div>  

        <div class="input-block wide-block">
            <p>Введите значение погрешности радиуса шкива: </p>
                
                <div class="right-section">
                    <p>Δr = </p>

                    <input class="value-input" type="number" v-model="inputData['pulleyRadiusErr']" :min="0.00001" :max="1" :value="inputData['pulleyRadiusErr']" 
                    placeholder="м" @change="checkInputValue('pulleyRadiusErr')">
                </div>
        </div>  

        <div class="input-block wide-block">
            <p>Введите значение погрешности измерегия массы:</p> 
            
            <div class="right-section">
                <p>Δm = </p>

                <input class="value-input" type="number" v-model="inputData['weightErr']" :min="0.0001" :max="1" :value="inputData['weightErr']" 
                placeholder="кг" @change="checkInputValue('weightErr')">
            </div>
        </div>  
        
        <button class="login-btn start-btn" @click="continueWork">Вычислить</button>
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

    .wide-block {
        width: 775px;

        display: flex;
        justify-content: space-between;

        margin-top: 30px;
    }

    .right-section {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .value-input {
        width: 130px;

        padding: 5px;
    }




    .wrong-data {
        border-color: red;
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