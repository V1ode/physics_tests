<script>
import store from '../../store';
import { mapGetters } from 'vuex';

import jsPDF from 'jspdf';
import '../../assets/PTSans-Regular-normal.js';

import { Buffer } from 'buffer';
// import {fse} from 'fs-extra'
import { Chart } from 'chart.js';
import {CategoryScale, LinearScale, LineController, PointElement, LineElement} from 'chart.js'; 

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(LineController);
Chart.register(PointElement);
Chart.register(LineElement);

import { getDocument, GlobalWorkerOptions } from "../../../pdfjs/pdf.mjs"
GlobalWorkerOptions.workerSrc = '../../../pdfjs/pdf.worker.mjs';

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
            data: {
                labels: [, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5, 0],
                datasets: [{
                    label: 'График зависимости углового ускорения от момента силы',
                    data: [,7.6,6.7, 5.8, 4.95, 4, 3.1, 2.2, 1.3, 0.4],
                    fill: false,                   
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                }]  
            },
            config: {
                type: 'line',
                // data: this.data,
                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true,
                        }
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'M · 10 ⁻²,  H · м',
                                color: '#000000',
                                align: 'end',
                                font: {
                                family: 'Comic Sans MS',
                                size: 20,
                                weight: 'bold',
                                lineHeight: 1.2,
                                },
                                padding: {top: 0, left: 0, right: 0, bottom: 0}
                            },
                            min: 0,
                            max: 7,
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'e, рад / с²',
                                color: '#000000',
                                align: 'end',
                                font: {
                                family: 'Comic Sans MS',
                                size: 20,
                                weight: 'bold',
                                lineHeight: 1.2,
                                },
                                padding: {top: 0, left: 0, right: 0, bottom: 0}
                            }
                        },
                    }
                },
            },
            pdfFileName: "Результаты выполнения Лабораторной работы №3.pdf",
            absolutePdfUrl: "C:\Users\Roma\Documents\VS Code\JS\Текущий\test\src\data\\",
            resultPdfUrl: "/public/",
        };
    },
	async mounted() {
        this.config.data = this.data

        // Используем Canvas элемент для создания графика в Chart.js
        let canvas = document.getElementById('myChart')

        // this.delOldPdf()
        this.generatePdf(canvas)

        // Прячем Canvas элемент, чтобы пользователь его не увидел
        canvas.style.position = "absolute"
        canvas.style.visibility = "hidden"

        // let render = (async () => {
        //     const loadingTask = getDocument(this.resultPdfUrl + this.pdfFileName);
        //     const pdf = await loadingTask.promise;

        //     // Load the first page.
        //     const page = await pdf.getPage(1);

        //     const scale = 1;
        //     const viewport = page.getViewport({ scale });

        //     // Get the canvas element and set its size based on the PDF page.
        //     const canvas1 = document.getElementById('pdfFile');
        //     const context = canvas1.getContext('2d');
        //     canvas1.height = viewport.height;
        //     canvas1.width = viewport.width;

        //     // Render the page into the canvas.
        //     const renderContext = {
        //         canvasContext: context,
        //         viewport: viewport,
        //     };
        //     await page.render(renderContext).promise;
        //     console.log('Page rendered!');
        // })();

        let pdfCanvas = document.getElementById('pdfFile')
        pdfCanvas.style.position = "absolute"
        pdfCanvas.style.visibility = "hidden"
	},

	methods: {
        delOldPdf() {
            // if(fs.existsSync(this.absolutePdfUrl + this.pdfFileName))
            //     fs.unlinkSync(this.absolutePdfUrl + this.pdfFileName) 
        },
        generatePdf(canvas) {
            const doc = new jsPDF()
            let ctx = canvas.getContext('2d')

            let chart = new Chart(ctx, this.config)
            this.chartDataUrl = chart.toBase64Image('image/jpg', 1)

            doc.setFont('PTSans-Regular'); // set font
            doc.setFontSize(12);

            doc.text('Лабораторная работа №3', 105, 20, null, null, 'center');

            var text1 =
                'ПРОВЕРКА ОСНОВНОГО ЗАКОНА ДИНАМИКИ\n' +
                'ВРАЩАТЕЛЬНОГО ДВИЖЕНИЯ АБСОЛЮТНО ТВЕРДОГО ТЕЛА\n' +
                'ВОКРУГ НЕПОДВИЖНОЙ ОСИ\n\n';
            doc.text(text1, 105, 30, null, null, 'center');

            var students = ['Терешин Р.П.', 'Круглик Е.Д.', 'Абрамов А.А.'];
            var group = 'ПрИ-201';
            text1 =
                'Студенты  ' +
                students[0] +
                '  ' +
                students[1] +
                '  ' +
                students[2] +
                '\n' +
                'Группа   ' +
                group +
                '\n' +
                'Оформлен 10.11.2025';
            doc.text(text1, 10, 50);

            doc.text('Контрольные расчеты выполнены верно', 10, 70);

            doc.text(
                'ТАБЛИЦА ОПЫТНЫХ И РАСЧЕТНЫХ ДАННЫХ',
                105,
                80,
                null,
                null,
                'center'
            );

            var rad = 0.017;
            var h = 1;
            var g = 9.81;
            text1 =
                'Значение радиуса шкива ' + ' '.repeat(40) + 'r =  ' + rad + ' м\n' +
                'Значение высоты опускания груза ' + ' '.repeat(25) + 'h = ' + h + '        м\n' +
                'Значение ускорения свободного падения ' + ' '.repeat(13) + 'g = ' + g + '   м\n';

            doc.text(text1, 10, 85);

            doc.cell(10, 100, 95, 10, ' '.repeat(18) + 'Опытные данные', 1);
            doc.cell(110, 100, 95, 10, ' '.repeat(17) + 'Расчетные данные', 1);

            let headerRow = [
                '     m,          кг',
                '     t₁,           с',
                '     t₂,           с',
                '     t₃,           с',
                '    <t>,          с',
                '     M,         H·м',
                '      e,      рад / с²',
                '      I,         кг·м²',
            ];

            for (let i = 0; i < headerRow.length; i++) {
                doc.cell(10 + (i * 190) / 8, 110, 190 / 8, 14, headerRow[i]);
            }

            let dataRow = [
                [0.114, 0.209, 0.259, 0.311, 0.365],
                [12.48, 9.62, 8.15, 7.79, 7.27],
                [12.48, 9.62, 8.15, 7.79, 7.27],
                [12.48, 9.62, 8.15, 7.79, 7.27],
                [12.48, 9.62, 8.15, 7.79, 7.27],
                [0.019, 0.0348, 0.043, 0.0517, 0.0606],
                [0.767, 1.554, 2.073, 2.387, 2.787],
                [0.0248, 0.0224, 0.0208, 0.0216, 0.0217],
            ];
            let strDataRow = []

            for(let i = 0; i < dataRow.length; i++) {
                let strRow = dataRow[i].map(String)
                let sortedStrRow = strRow.slice(0).sort()
                let maxStrLen = sortedStrRow[sortedStrRow.length-1].length
                
                if(i < 1 || i > 4) {
                    for(let j = 0; j < strRow.length; j++) {
                    strRow[j] += "0".repeat(maxStrLen-strRow[j].length)
                    }
                }      

                strDataRow.push(strRow)      
            }

            let colStr
            for (let i = 0; i < strDataRow.length; i++) {
                colStr = "  "

                let sep 
                if(i >= 1 && i <= 4) {
                    sep = "\n      "
                } else if(i == 5 || i == 7) {
                    sep = "\n  "
                } else {
                    sep = "\n    "
                }
                
                colStr += strDataRow[i].toString().replaceAll(",", sep)
                
                doc.cell(10 + (i * 190) / 8, 124, 190 / 8, 28, colStr);
            }

            doc.text(
                'ИСХОДНЫЕ И РАСЧЕТНЫЕ ПОГРЕШНОСТИ',
                105,
                162,
                null,
                null,
                'center'
            );
            
            let dm = 0.005
            let dg = 0.005
            let dr = 0.0001
            let dh = 0.01
            let dt = 0.1
            let alpha = 0.95
            text1 =
                'Массы ' + ' '.repeat(29) +
                'Δm =  ' + dm + '    кг          ' +
                'Высоты ' + ' '.repeat(28) +
                'Δh  =  ' + dh + '   м\n' +
                'Радиуса шкива ' + ' '.repeat(15) +
                'Δr   =  ' + dr +  '  м           ' +
                'Времени ' + ' '.repeat(26) +
                'Δt  =  ' + dt + '     с\n' +
                'Ускорения св. падения ' + ' '.repeat(2) +
                'Δg   =  ' + dg +  '    м / с²    ' +
                'Доверит. вероятности ' + ' '.repeat(5) +        
                'a    =  ' + alpha 

            doc.text(text1, 10, 172);
            
            doc.cell(10, 187, 190 / 8, 20, " ".repeat(19) + "№")

            headerRow = ['Δt', 'ΔM', 'Δe', 'ΔI']
            let cellWidth = (190 - 190/8) / 4
            for(let i = 0; i < 4; i++) {
                doc.cell(10+190/8 + i*cellWidth, 187, cellWidth, 10, " ".repeat(12) + headerRow[i])
            }

            headerRow = ['      с', '   H·м', 'рад / с²', '  кг·м²']
            cellWidth /= 2
            for(let i = 0; i < 8; i++) {
                let header
                let x
                let newCellWidth

                if(i % 2 == 0) {
                    header = headerRow[i/2]
                    x = 10+190/8 + i*cellWidth
                    newCellWidth = cellWidth + 2
                }                
                else {
                    header = "   %"
                    x = 10+190/8 + i*cellWidth+2
                    newCellWidth = cellWidth - 2
                }        

                doc.cell(x, 197, newCellWidth, 10, header)
            }

            let numbersStr = " ".repeat(6)
            for(let i = 1; i < 6; i++) {
                numbersStr += i + " ".repeat(12)
            }

            doc.cell(10, 207, 190 / 8, 28, numbersStr)

            dataRow = [
                [1.34, 2.74, 2.14, 2.25, 2.09],
                [10.81, 31.5, 28.47, 32.09, 32.24],
                [0.0008, 0.0009, 0.0009, 0.0009, 0.0009],
                [4.43, 2.48, 2.04, 1.74, 1.53],
                [0.166, 0.979, 1.181, 1.532, 1.798], 
                [21.64, 63.01, 56.96, 64.19, 64.49],
                [0.0055, 0.0141, 0.0118, 0.0139, 0.014],
                [22.09, 63.05, 56.99, 64.21, 64.51]
            ];
            strDataRow = []

            for(let i = 0; i < dataRow.length; i++) {
                let strRow = dataRow[i].map(String)
                let sortedStrRow = strRow.slice(0).sort()
                let maxStrLen = sortedStrRow[sortedStrRow.length-1].length        
            
                for(let j = 0; j < strRow.length; j++) {
                    strRow[j] += "0".repeat(maxStrLen-strRow[j].length)

                    if(i % 2 == 1)
                        strRow[j] += "\n" + " ".repeat((5-strRow[j].length)*2)            
                }
                
                strDataRow.push(strRow)      
            }

            for (let i = 0; i < strDataRow.length; i++) {      
                let x
                let newCellWidth
                colStr = ""

                let sep = ""
                if(i == 0) {
                    colStr = "   "
                    sep = "\n     " 
                } else if(i == 2)
                    sep = " "
                else if(i == 4) {
                    colStr = "  "
                    sep = "    "
                } else if(i % 2 == 1) {
                    if(strDataRow[i][0].length == 7) {
                        colStr = "  "
                    }
                }

                if(i % 2 == 0) {
                    x = 10+190/8 + i*cellWidth
                    newCellWidth = cellWidth + 2
                }                
                else {
                    x = 10+190/8 + i*cellWidth+2
                    newCellWidth = cellWidth - 2
                }        
                
                colStr += strDataRow[i].toString().replaceAll(",", sep)
                
                doc.cell(x, 207, newCellWidth, 28, colStr);
            }

            text1 = "Сравнительная таблица значений момента инерции,\n" +
                    "полученных методом усреднения и методом наименьших квадратов"
            doc.text(text1, 110, 245, null, null, 'center')

            doc.cell(10, 255, 70, 17, " ".repeat(16) + "Величина")
            doc.cell(80, 255, 25, 17, "Единица" + " ".repeat(5) + "изм.")
            doc.cell(105, 255, 95, 17/2, " ".repeat(25) + "Значения")
            doc.cell(105, 263.5, 95/2, 17/2, " ".repeat(7) + "Усредненные")
            doc.cell(105+95/2, 263.5, 95/2, 17/2, " ".repeat(10) + "Метод НК")

            text1 = "   Момент инерции" + " ".repeat(29) +
                    "Погрешность" 
            doc.cell(10, 272, 70, 14, text1)

            text1 = "     кг·м²" + " ".repeat(11) +
                    "%" 
            doc.cell(80, 272, 25, 14, text1)

            let avgIn = 0.0223
            let absEr = 55.35
            text1 = " ".repeat(13) + avgIn + " ".repeat(26) +
                    absEr 
            doc.cell(105, 272, 95/2, 14, text1)

            let MKIn = 0.0181
            absEr = 4.74
            text1 = " ".repeat(13) + MKIn + " ".repeat(26) +
                    absEr 
            doc.cell(105 + 95/2, 272, 95/2, 14, text1)

            doc.addPage()

            doc.addImage({imageData: this.chartDataUrl, x: 12, y: -175, angle: -90, w: 275, h: 185})

            // doc.setFontSize(16)
            // doc.text("e, рад / с²", 200, 4, {angle: -90})
            // doc.text("M · 10-², H · м", 6, 258, {angle: -90})
            
            let pdf = doc.output('datauristring', { filename: 'RAB' });
            doc.save(this.pdfFileName)
        },
		goHome() {
            this.$router.push({
                name: 'home'
            })
        },       
    }
}
</script>

<template>
    <div class="main-container">   
        <canvas id="myChart" class="chart"></canvas>
        <canvas id="pdfFile" class="pdf-canvas"></canvas>

        <object class="pdf-viewer" :data="this.resultPdfUrl+this.pdfFileName" type="application/pdf">Не удалось показать документ</object>
        
        <button class="login-btn start-btn" @click="goHome">На главную</button>
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

    .pdf-viewer {
        width: 80%;
        height: 50vh;
    }

    .table {
        width: 700px;
    }

    .table-title {
        font-size: 20px;
        font-weight: 700;
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



// Сделать предпросмотр пдф
// Подставлять результаты вычислений при создании графика