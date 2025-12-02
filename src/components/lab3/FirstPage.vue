<script>
export default {
	components: {

	},
	data() {
		return {
			
		};
	},

	mounted() {
        
	},

	methods: {
		goToSecondPage() {
            this.$router.push({
                name: 'secondPageLab3'
            })
        },        
    }
}
</script>

<template>
    <div class="main-container">
        <h1 class="title">Описание работы</h1>

        <div class="text-block">
            <p class="description">Эксперементальные результаты будут обрабатываться по методу <span class="highlighted">наименьших квадратов</span>. 
            Результаты расчета будут представлены в виде таблицы и графика, на котором нанесены эксперементальные точки и регрессионная зависимость, 
            построенная по ним указаным методом. Коэффициент парной корреляции R покажет их соответствие.</p>
            
            <ol class="numbered-list">
                <li>Для успешной работы с программой Вы должны иметь при себе экспериментальные значения следующих величин и их погрешностей:

                    <ul class="unmarked-list">
                        <li>а) Число масс грузов и значения этих масс;</li>
                        <li>б) Число измерений времени при каждой массе и их значения;</li>
                        <li>в) Значения радиуса шкива и высота опускания груза;</li>
                        <li>г) Значения доверительной вероятности и погрешности измерений времени, массы, высоты опускания груза, радиуса шкива.</li>
                    </ul>
                </li>
                <li>
                    Кроме того, Вы должны самостоятельно определить <span class="highlighted">(для одной строки данных)</span> расчетные значения следующих величин:

                    <ul class="unmarked-list">
                        <li>а) Среднего времени 
                            <math>
                                <msub>
                                    <mi>t</mi>
                                    <mn>ср</mn>
                                </msub>
                            </math>, с;</li>
                        <li>б) Момента силы   М, Н·м;</li>
                        <li>в) Углового ускорения e, 
                            <math>
                                <mfrac>
                                    <mrow>
                                        <mi>
                                            рад
                                        </mi>                                        
                                    </mrow>
                                    <mrow>
                                        <mi>
                                            с²
                                        </mi>                                        
                                    </mrow>
                                </mfrac>
                            </math> ;</li>
                        <li>г) Момента инерции  I, кг·<math>
                                                        <msup>
                                                            <mi>
                                                                м
                                                            </mi>
                                                            <mn>
                                                                2
                                                            </mn>
                                                        </msup>
                                                    </math>.</li>
                    </ul>
                </li>
            </ol>

            <p class="warning-text">Только после ввода указанных величин и проверки правильности расчета будут произведены дальнейшая
                обработка данных и создание протокола! При расчете использовать значение g = 9.81
                    <math>
                        <mfrac>
                            <mrow>
                                <mi>
                                    м
                                </mi>                                        
                            </mrow>
                            <mrow>
                                <msup>
                                    <mi>
                                        с
                                    </mi>
                                    <mn>
                                        2
                                    </mn>
                                </msup>                                        
                            </mrow>
                        </mfrac>
                    </math>.</p>
        </div>        
        
        <button class="login-btn start-btn m-b-100" @click="goToSecondPage">Приступить к вводу данных</button>
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

    .m-b-100 {
        margin-bottom: 100px;
    }

    .m-b-100:hover {
        margin-bottom: 100px;
    }
</style>