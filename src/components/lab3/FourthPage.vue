<script>
import LeastSquares from 'least-squares';
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
            strNumber: 1,
            inputData: {
                "avgTime": NaN,
                "forceMoment": NaN,
                "angularAcceleration": NaN,
                "inertiaMoment": NaN,
            },
            PULLEY_RADIUS: 0.017,
            LOAD_LOWERING_HEIGHT: 1,   
            FREE_FALL_ACCELERATION: 9.81,  
            FREE_FALL_ACCELERATION_ABS_ERR: 0.005,     
            avgTime: 0,                       
            forceMoment: 0,
            angularAcceleration: 0,
            inertiaMoment: 0,
            avgTimeAbsError: 0, 
            forceMomentAbsError: 0,
            angularAccelerationAbsError: 0,
            inertiaMomentAbsError: 0,
            wrongInputData: [false, false, false, false],
		};
	},

	mounted() {
        this.calcTotalResults()
        this.saveData()
	},

	methods: {
        checkStrInput() {
            if(this.strNumber < 1)
                this.strNumber = 1
            else if(this.strNumber > this.new_lab_data['data']['weights'].length)
                this.strNumber = this.new_lab_data['data']['weights'].length
        },
        checkInputValue(valueName) {
            if(this.inputData[valueName] < 0.01)
                this.inputData[valueName] = 0.01
        },
        checkForceMomentInput() {

        },
        finish() {
            this.calcStr()
            this.checkStudentResults()
            console.log(this.new_lab_data)
            if(!this.wrongInputData.includes(true))
                this.calcTotalResults()
                this.saveData()
                console.log(1)
                // this.goToResultsPage()
        },
        calcStr() {
            for(let i = 0; i < this.new_lab_data["data"]["timeMeasurings"][this.strNumber-1].length; i++) {
                this.avgTime += this.new_lab_data["data"]["timeMeasurings"][this.strNumber-1][i]                
            }          
            this.avgTime /= this.new_lab_data["data"]["timeMeasurings"][this.strNumber-1].length

            this.forceMoment = this.new_lab_data["data"]["weights"][this.strNumber-1] * this.PULLEY_RADIUS
                    * (this.FREE_FALL_ACCELERATION - 2*this.LOAD_LOWERING_HEIGHT / Math.pow(this.avgTime, 2))

            this.angularAcceleration = this.calcAngularAcceleration(this.avgTime)

            this.inertiaMoment = this.forceMoment / this.angularAcceleration


            for(let i = 0; i < this.new_lab_data["data"]["timeMeasurings"][this.strNumber-1].length; i++) {
                this.avgTimeAbsError += 
                    Math.pow(Math.abs(this.avgTime - this.new_lab_data["data"]["timeMeasurings"][this.strNumber-1][i]), 2)                        
            }
            
            this.forceMomentAbsError = this.forceMoment 
                        * Math.sqrt(Math.pow(this.new_lab_data['data']['weightErr'] / this.new_lab_data["data"]["weights"][this.strNumber-1], 2)
                        + Math.pow(this.new_lab_data['data']['pulleyRadiusErr'] / this.PULLEY_RADIUS, 2)
                        + Math.pow(this.FREE_FALL_ACCELERATION_ABS_ERR / this.FREE_FALL_ACCELERATION, 2)) 

            this.angularAccelerationAbsError = Math.sqrt(Math.pow(this.new_lab_data["data"]["loadLoweringHeightErr"]/this.LOAD_LOWERING_HEIGHT, 2) 
                + Math.pow(2*this.new_lab_data["data"]["pulleyRadiusErr"]/this.PULLEY_RADIUS, 2)
                + Math.pow(2*this.avgTimeAbsError/this.avgTime, 2)) * this.angularAcceleration

            this.inertiaMomentAbsError = Math.sqrt(Math.pow(this.new_lab_data["data"]["loadLoweringHeightErr"]/this.LOAD_LOWERING_HEIGHT, 2) 
                + Math.pow(2*this.new_lab_data["data"]["pulleyRadiusErr"]/this.PULLEY_RADIUS, 2)
                + Math.pow(2*this.avgTimeAbsError/this.avgTime, 2)
                + Math.pow(this.new_lab_data["data"]["weightErr"]/this.new_lab_data["data"]["weights"][this.strNumber-1], 2)
                + Math.pow(this.FREE_FALL_ACCELERATION_ABS_ERR/this.FREE_FALL_ACCELERATION, 2)) 
                * this.inertiaMoment
        },
        checkStudentResults() {
            if(Math.abs(this.avgTime - this.inputData["avgTime"]) > this.avgTimeAbsError) {
                for(let i = 0; i < this.wrongInputData.length; i++) {
                    this.wrongInputData[i] = true
                }
            } else {
                this.wrongInputData[0] = false
            }

            if(Math.abs(this.forceMoment - this.inputData["forceMoment"]) > this.forceMomentAbsError){
                for(let i = 1; i < this.wrongInputData.length; i++) {
                    this.wrongInputData[i] = true
                }
            } else {
                this.wrongInputData[1] = false
            }

            if(Math.abs(this.angularAcceleration - this.inputData["angularAcceleration"]) > this.angularAccelerationAbsError){
                for(let i = 2; i < this.wrongInputData.length; i++) {
                    this.wrongInputData[i] = true
                }
            } else {
                this.wrongInputData[2] = false
            }

            if(Math.abs(this.inertiaMoment - this.inputData["inertiaMoment"]) > this.inertiaMomentAbsError){
                for(let i = 3; i < this.wrongInputData.length; i++) {
                    this.wrongInputData[i] = true
                }
            } else {
                this.wrongInputData[3] = false
            }
        },
        calcAngularAcceleration(time) {
            return 2 * this.LOAD_LOWERING_HEIGHT / (this.PULLEY_RADIUS * Math.pow(time, 2))
        },
        calcInertiaMomentAbsError(weight, time, timeAbsError, inertiaMoment) {
            return Math.sqrt(Math.pow(this.new_lab_data["data"]["loadLoweringHeightErr"]/this.LOAD_LOWERING_HEIGHT, 2) 
                    + Math.pow(2*this.new_lab_data["data"]["pulleyRadiusErr"]/this.PULLEY_RADIUS, 2)
                    + Math.pow(2*timeAbsError/time, 2)
                    + Math.pow(this.new_lab_data["data"]["weightErr"]/weight, 2)
                    + Math.pow(this.FREE_FALL_ACCELERATION_ABS_ERR/this.FREE_FALL_ACCELERATION, 2)) 
                    * inertiaMoment
        },
        calcTotalResults() {            
            this.new_lab_data['data']['avgTimes'] 
                = new Array(this.new_lab_data['data']['weights'].length).fill(0)
            this.new_lab_data['data']['forceMoments'] = []
            this.new_lab_data['data']['angularAccelerations'] = []
            this.new_lab_data['data']['inertiaMoments'] = []

            this.new_lab_data['data']['avgTimeAbsErrors'] 
                = new Array(this.new_lab_data['data']['weights'].length).fill(0)
            this.new_lab_data['data']['forceMomentAbsErrors'] = []
            this.new_lab_data['data']['angularAccelerationAbsErrors'] = []
            this.new_lab_data['data']['inertiaMomentAbsErrors'] = []

            this.new_lab_data['data']['avgTimeRelativeErrors'] = []
            this.new_lab_data['data']['forceMomentRelativeErrors'] = []
            this.new_lab_data['data']['angularAccelerationRelativeErrors'] = []
            this.new_lab_data['data']['inertiaMomentRelativeErrors'] = []

            for(let strNum = 0; strNum < this.new_lab_data['data']['weights'].length; strNum++) {
                // Вычисление основных величин 
                for(let i = 0; i < this.new_lab_data["data"]["timeMeasurings"][strNum].length; i++) {
                    this.new_lab_data['data']['avgTimes'][strNum] += this.new_lab_data["data"]["timeMeasurings"][strNum][i]                
                }          
                this.new_lab_data['data']['avgTimes'][strNum] /= this.new_lab_data["data"]["timeMeasurings"][strNum].length

                this.new_lab_data['data']['forceMoments'][strNum] = this.new_lab_data["data"]["weights"][strNum] * this.PULLEY_RADIUS
                        * (this.FREE_FALL_ACCELERATION - 2*this.LOAD_LOWERING_HEIGHT / Math.pow(this.new_lab_data['data']['avgTimes'][strNum], 2))

                this.new_lab_data['data']['angularAccelerations'][strNum] = this.calcAngularAcceleration(this.new_lab_data['data']['avgTimes'][strNum]) 
                this.new_lab_data['data']['inertiaMoments'][strNum] 
                    = this.new_lab_data['data']['forceMoments'][strNum] / this.new_lab_data['data']['angularAccelerations'][strNum]

                // Вычисление абсолютных погрешностей
                for(let i = 0; i < this.new_lab_data["data"]["timeMeasurings"][strNum].length; i++) {
                    this.new_lab_data['data']['avgTimeAbsErrors'][strNum] += 
                        Math.pow(Math.abs(this.new_lab_data['data']['avgTimes'][strNum] - this.new_lab_data["data"]["timeMeasurings"][strNum][i]), 2)                        
                }
    
                this.new_lab_data['data']['forceMomentAbsErrors'][strNum] = this.new_lab_data['data']['forceMoments'][strNum] 
                        * Math.sqrt(Math.pow(this.new_lab_data['data']['weightErr'] / this.new_lab_data["data"]["weights"][strNum], 2)
                        + Math.pow(this.new_lab_data['data']['pulleyRadiusErr'] / this.PULLEY_RADIUS, 2)
                        + Math.pow(this.FREE_FALL_ACCELERATION_ABS_ERR / this.FREE_FALL_ACCELERATION, 2))

                this.new_lab_data['data']['angularAccelerationAbsErrors'][strNum] = Math.sqrt(Math.pow(this.new_lab_data["data"]["loadLoweringHeightErr"]/this.LOAD_LOWERING_HEIGHT, 2) 
                    + Math.pow(2*this.new_lab_data["data"]["pulleyRadiusErr"]/this.PULLEY_RADIUS, 2)
                    + Math.pow(2*this.new_lab_data['data']['avgTimeAbsErrors'][strNum]/this.new_lab_data['data']['avgTimes'][strNum], 2)) 
                    * this.new_lab_data['data']['angularAccelerations'][strNum]

                this.new_lab_data['data']['inertiaMomentAbsErrors'][strNum] = this.calcInertiaMomentAbsError(
                    this.new_lab_data["data"]["weights"][strNum],
                    this.new_lab_data['data']['avgTimeAbsErrors'][strNum],
                    this.new_lab_data['data']['avgTimes'][strNum],
                    this.new_lab_data['data']['inertiaMoments'][strNum]
                ) 

                // Вычисление относительных погрешностей
                this.new_lab_data['data']['avgTimeRelativeErrors'][strNum] = 
                    this.new_lab_data['data']['avgTimeAbsErrors'][strNum] / this.new_lab_data['data']['avgTimes'][strNum]   
                    
                this.new_lab_data['data']['forceMomentRelativeErrors'][strNum] =
                    this.new_lab_data['data']['forceMomentAbsErrors'][strNum] / this.new_lab_data['data']['forceMoments'][strNum]

                this.new_lab_data['data']['angularAccelerationRelativeErrors'][strNum] =
                    this.new_lab_data['data']['angularAccelerationAbsErrors'][strNum] / this.new_lab_data['data']['angularAccelerations'][strNum]

                this.new_lab_data['data']['inertiaMomentRelativeErrors'][strNum] =
                    this.new_lab_data['data']['inertiaMomentAbsErrors'][strNum] / this.new_lab_data['data']['inertiaMoments'][strNum]
            }
        },
        saveData() {
            // Сохранение констант
            this.new_lab_data['data']['pulleyRadius'] = this.PULLEY_RADIUS
            this.new_lab_data['data']['loadLoweringHeight'] = this.LOAD_LOWERING_HEIGHT
            this.new_lab_data['data']['freeFallAcceleration'] = this.FREE_FALL_ACCELERATION
            this.new_lab_data['data']['freeFallAccelerationAbsErr'] = this.FREE_FALL_ACCELERATION_ABS_ERR

            // Вычесление значений для сравнительной таблицы
            this.new_lab_data['data']['avgInertiaMoment'] = 0
            for(let i = 0 ; i < this.new_lab_data['data']['inertiaMoments'].length; i++) {
                this.new_lab_data['data']['avgInertiaMoment'] += this.new_lab_data['data']['inertiaMoments'][i]
            }
            this.new_lab_data['data']['avgInertiaMoment'] /= this.new_lab_data['data']['inertiaMoments'].length

            this.new_lab_data['data']['avgInertiaMomentRelativeErr'] = 0
            for(let i = 0 ; i < this.new_lab_data['data']['inertiaMomentRelativeErrors'].length; i++) {
                this.new_lab_data['data']['avgInertiaMomentRelativeErr'] += this.new_lab_data['data']['inertiaMomentRelativeErrors'][i]
            }
            this.new_lab_data['data']['avgInertiaMomentRelativeErr'] /= this.new_lab_data['data']['inertiaMomentRelativeErrors'].length

            ////// Нахождение оптимального графика зависимости углового ускорения от момента силы методом
            ////// наименьших квадратов с помощью библиотеки least-squares
            let xs = []
            let ys = []
            let weights = {}

            for(let i = 0; i < this.new_lab_data['data']['timeMeasurings'].length; i++) {
                for(let j = 0; j < this.new_lab_data['data']['timeMeasurings'][i].length; j++) {
                    xs.push(this.new_lab_data['data']['forceMoments'][i])
                    ys.push(this.calcAngularAcceleration(this.new_lab_data['data']['timeMeasurings'][i][j]))
                }
            }

            LeastSquares(xs, ys, weights)
            
            this.new_lab_data['data']['funcFreeTerm'] = weights['b']
            this.new_lab_data['data']['funcCoef'] = weights['m']

            // Расчет момента инерции и его относительной погрешности по оптимальному графику
            this.new_lab_data['data']['leastSqrInertiaMoment'] = 0
            this.new_lab_data['data']['leastSqrInertiaMomentRelativeError'] = 0
            let angularAccelerations = []
            let inertiaMomentAbsError = 0
            let inertiaMoment
            let weight
            let time            

            for(let i = 0; i < this.new_lab_data['data']['forceMoments'].length; i++) {
                angularAccelerations.push((weights['b'] + weights['m']*this.new_lab_data['data']['forceMoments'][i]))

                inertiaMoment = this.new_lab_data['data']['forceMoments'][i]
                    / angularAccelerations[i]
                
                this.new_lab_data['data']['leastSqrInertiaMoment'] += inertiaMoment

                time = Math.sqrt(angularAccelerations[i] * this.PULLEY_RADIUS
                / (2*this.LOAD_LOWERING_HEIGHT))

                weight = this.new_lab_data['data']['forceMoments'][i] /
                    (this.PULLEY_RADIUS * (this.FREE_FALL_ACCELERATION - angularAccelerations[i]))

                inertiaMomentAbsError = this.calcInertiaMomentAbsError(
                    weight, 
                    time,
                    this.new_lab_data['data']['stopwatchErr'],
                    inertiaMoment
                )
                this.new_lab_data['data']['leastSqrInertiaMomentRelativeError'] += inertiaMomentAbsError / inertiaMoment
            }

            this.new_lab_data['data']['leastSqrInertiaMoment'] /= this.new_lab_data['data']['forceMoments'].length
            this.new_lab_data['data']['leastSqrInertiaMomentRelativeError'] /= this.new_lab_data['data']['forceMoments'].length     
            
            // Расчет коэффициента парной корреляции
            let avgAngularAccel = 0
            let avgForceMoment  = 0
            let sum = 0
            let sqrForceMomentsSum = 0
            let sqrAngularAccelsSum = 0

            for(let i = 0; i < angularAccelerations.length; i++) {
                avgAngularAccel += angularAccelerations[i]
                avgForceMoment += this.new_lab_data['data']['forceMoments'][i]
            }

            avgAngularAccel /= angularAccelerations.length
            avgForceMoment /= angularAccelerations.length
            console.log('\nNewData')
            for(let i = 0; i < angularAccelerations.length; i++) {
                sum += (this.new_lab_data['data']['forceMoments'][i] - avgForceMoment)
                    *(angularAccelerations[i] - avgAngularAccel)

                sqrForceMomentsSum += Math.pow(this.new_lab_data['data']['forceMoments'][i] - avgForceMoment, 2)
                sqrAngularAccelsSum += Math.pow(angularAccelerations[i] - avgAngularAccel, 2)
            }

            this.new_lab_data['data']['pairedCorrelationCoef'] = sum 
                / Math.sqrt(sqrForceMomentsSum*sqrAngularAccelsSum) 
            
            
            console.log(sum, sqrForceMomentsSum, sqrAngularAccelsSum)

            console.log(this.new_lab_data['data']['leastSqrInertiaMoment'],
                this.new_lab_data['data']['leastSqrInertiaMomentRelativeError'], this.new_lab_data['data']['pairedCorrelationCoef'])
        },
		goToResultsPage() {
            this.$router.push({
                name: 'resultsPageLab3'
            })
        },        
    }
}
</script>

<template>
    <div class="main-container">   
        <table class="constants-table" border="1">
            <thead><h2 class="table-title"> Таблица постоянных</h2></thead>

            <colgroup>                
                <col span="1" style="width: 70%;">
                <col span="1" style="width: 30%;">
            </colgroup>

            <tr>
                <td>Значение радиуса шкива</td>
                <td>r &nbsp&nbsp= &nbsp0.017 &nbspм</td>
            </tr>

            <tr>
                <td>Значение высоты опускания груза</td>
                <td>h &nbsp= &nbsp1.00 &nbsp&nbsp&nbspм</td>
            </tr>

            <tr>
                <td>Значение ускорения свободного падения</td>
                <td>g &nbsp= &nbsp9.81 &nbsp&nbsp&nbspкг·<math>
                            <msup>
                                <mi>
                                    м
                                </mi>
                                <mn>
                                    2
                                </mn>
                            </msup>
                        </math>
                </td>
            </tr>
        </table>
        
        <div class="input-block wide-block">
            <p>Введите номер строки данных, для которой Вы провели расчеты:</p> 
            
            <p>n = <input class="value-input n-input" type="number" v-model="strNumber" min="1" :max="this.new_lab_data['data']['weights'].length" :value="strNumber" 
                @change="checkStrInput"></p>
        </div>  
        
        <div class="input-block wide-block">
            <p>Введите значение среднего времени </p>

                    <p><math>
                        <msub>
                            <mi>t</mi>
                            <mn>ср</mn>
                        </msub>
                    </math> 
                    = <input :class="'value-input', [wrongInputData[0] ? 'wrong-data' : ''] " type="number" min="0.01" step="0.01" placeholder="с" v-model="inputData['avgTime']" 
                        @change="checkInputValue('avgTime')"></p>
        </div>  
        
        <div class="input-block wide-block">
            <p>Введите значение момента силы</p> 
            
            <p>M = <input type="number" v-model="inputData['forceMoment']" placeholder="H" @change="checkInputValue('forceMoment')"
                :class="'value-input', [wrongInputData[1] ? 'wrong-data' : '']"></p>
        </div>

        <div class="input-block wide-block">
            <p>Введите значение углового ускорения</p> 
            
            <p>e = <input type="number" v-model="inputData['angularAcceleration']" 
                placeholder="кг·м2
                                    <math>
                                <mfrac>
                                    <mrow>
                                        <mi>
                                            рад
                                        </mi>                                        
                                    </mrow>
                                    <mrow>
                                        <mi>
                                            с2
                                        </mi>                                        
                                    </mrow>
                                </mfrac>
                            </math>" 
                @change="checkInputValue('angularAcceleration')" :class="'value-input', [wrongInputData[2] ? 'wrong-data' : '']"></p>
        </div>

        <div class="input-block wide-block" :class="[wrongInputData[3] ? 'wrong-data' : '']">
            <p>Введите значение момента инерции</p> 
            
            <p>I (кг·<math>
                <msup>
                    <mi>
                        м
                    </mi>
                    <mn>
                        2
                    </mn>
                </msup>
            </math>) 
                = <input type="number" v-model="inputData['inertiaMoment']" placeholder="H" @change="checkInputValue('inertiaMoment')" 
                :class="['value-input', wrongInputData[3] ? 'wrong-data' : '']"></p>
        </div>
        
        <button class="login-btn start-btn m-b-100" @click="finish">Вычислить</button>
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

    .constants-table {
        width: 700px;

        padding: 10px;

        margin-bottom: 30px;
    }

    .constants-table tr {
        border: 2px solid;
    }

    .constants-table td {
        border: none;

        margin-bottom: 5px;
    }

    .table-title {
        font-size: 32px;

        margin-bottom: 10px;
    }
    
    .n-input {
        width: 90px;
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