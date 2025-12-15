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

// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// function loadPDF(pdfURL) {
//     const container = document.getElementById('pdf-container');

//     // Загружаем документ
//     pdfjsLib.getDocument(pdfURL).promise.then(pdfDoc => {
//         console.log(`PDF загружен, всего страниц: ${pdfDoc.numPages}`);

//         // Загружаем первую страницу
//         return pdfDoc.getPage(1).then(page => {
//             // Устанавливаем масштаб
//             const viewport = page.getViewport({ scale: 1.5 });

//             // Создаем canvas для рендеринга
//             const canvas = document.createElement('canvas');
//             const context = canvas.getContext('2d');
//             canvas.height = viewport.height;
//             canvas.width = viewport.width;

//             container.appendChild(canvas);

//             // Рендерим PDF страницу в canvas
//             const renderContext = {
//             canvasContext: context,
//             viewport: viewport
//             };

//             page.render(renderContext);
//         });
//     }).catch(error => {
//     console.error('Ошибка при загрузке PDF:', error);
//     container.innerHTML = `<p>Ошибка загрузки PDF: ${error.message}</p>`;
//     });
// }

// Вызываем функцию с URL вашего PDF-файла


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
            pdfFileName: "Результаты выполнения Лабораторной работы №3.pdf#view=Fit",
            absolutePdfUrl: "C:\Users\Roma\Documents\VS Code\JS\Текущий\test\src\data\\",
            resultPdfUrl: "/public/",
        };
    },
	async mounted() {
        this.config.data = this.data

        // Используем Canvas элемент для создания графика в Chart.js
        let canvas = document.getElementById('myChart')
        // loadPDF('/public/Результаты выполнения Лабораторной работы №3.pdf');

        // this.delOldPdf()
        // this.generatePdf(canvas)

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
            // console.log(this.new_lab_data)
            // this.new_lab_data["data"]["weights"].splice(5)

            doc.text('Лабораторная работа №3', 105, 20, null, null, 'center');

            let text1 =
                'ПРОВЕРКА ОСНОВНОГО ЗАКОНА ДИНАМИКИ\n' +
                'ВРАЩАТЕЛЬНОГО ДВИЖЕНИЯ АБСОЛЮТНО ТВЕРДОГО ТЕЛА\n' +
                'ВОКРУГ НЕПОДВИЖНОЙ ОСИ\n\n';
            doc.text(text1, 105, 30, null, null, 'center');

            
            let students = [];
            let students_data = this.new_lab_data.students
            let student_groups = []
            let maxGroupCount = -1
            let totalGroup = this.new_lab_data["students"][0].group;

            for(let i = 0; i < this.new_lab_data["students"].length; i++) {
                students.push(students_data[i].lastName + " " + students_data[i].firstName[0] + "." + students_data[i].patronimic[0] +".")
                student_groups.push(students_data[i].group)
            }
            
            for(let group in new Set(student_groups)){
                let count = 0                

                while(student_groups.indexOf(group) != -1) {
                    count++
                    student_groups.pop(group)                    
                }

                if(count > maxGroupCount) {
                    maxGroupCount = count
                    totalGroup = group
                }                    
            }        
            
            text1 = 'Студенты  ' 
            for(let i = 0; i < students.length; i++) {
                text1 += students[i]  
                
                if(i != students.length-1)   
                    text1 += ',' 
                
                text1 += '  '
            }
                
            text1 += '\n' +
            'Группа   ' +
            totalGroup +
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

            let data = this.new_lab_data["data"]

            var radius = data.pulleyRadius;
            var h = data.loadLoweringHeight;
            var g = data.freeFallAcceleration;
            text1 =
                'Значение радиуса шкива ' + ' '.repeat(40) + 'r =  ' + radius + ' м\n' +
                'Значение высоты опускания груза ' + ' '.repeat(25) + 'h = ' + h + '        м\n' +
                'Значение ускорения свободного падения ' + ' '.repeat(13) + 'g = ' + g + '   м\n';

            doc.text(text1, 10, 85);

            doc.cell(10, 100, 95, 10, ' '.repeat(18) + 'Опытные данные', 1);
            doc.cell(110, 100, 95, 10, ' '.repeat(17) + 'Расчетные данные', 1);

            let headerRow = [
                '      m,            кг',
                '       t₁,             с',
                '       t₂,             с',
                '       t₃,             с',
                '      <t>,            с',
                '      M,           H·м',
                '       e,        рад / с²',
                '      I,            кг·м²',
            ];

            for (let i = 0; i < headerRow.length; i++) {
                doc.cell(10 + (i * 190) / 8, 110, 190 / 8, 14, headerRow[i]);
            }

            let dataRow = [data.weights];

            for(let i = 0; i < data.timeMeasurings[0].length; i++) {
                let arr = []

                for(let j = 0; j < data.timeMeasurings.length; j++) {
                    arr.push(data.timeMeasurings[j][i])
                }

                dataRow.push(arr)
            }     
            console.log(dataRow)
                
            let masNames = ['avgTimes', 'forceMoments', 'angularAccelerations', 'inertiaMoments']
            masNames.forEach(masName => {
                dataRow.push(data[masName])
            })

            // this.new_lab_data['data']['inertiaMoments'].forEach((num, index) => {
            //     this.new_lab_data['data']['inertiaMoments'][index] = num.toFixed(4)
            // })

            // console.log(this.new_lab_data['data']['inertiaMoments'])

            // let strDataRow = []
            // for(let i = 0; i < dataRow.length; i++) {
            //     // console.log(dataRow.length, dataRow)
            //     let strRow = Array.from(dataRow[i].map(String))
            //     // console.log(strRow)
            //     let sortedStrRow = strRow.slice(0).sort()
            //     let maxStrLen = sortedStrRow[0].length
            //     // console.log(Number(0.2341).toFixed(2))
            //     if(i < 1 || i > 4) {
            //         for(let j = 0; j < strRow.length; j++) {
                        
            //             strRow[j] += "0".repeat(maxStrLen-strRow[j].length)
                        
            //         }
            //     }      

            //     strDataRow.push(strRow)      
            // }

            console.log(dataRow)
            let colStr
            for (let i = 0; i < dataRow.length; i++) {
                if(i >= 1 && i <= 4) {
                    colStr = "     "
                } else if(i == 0 || i == 6) {
                    colStr = "    "
                } else {
                    colStr = "  "
                }
                

                let sep 
                if(i >= 1 && i <= 4) {
                    sep = "\n      "
                } else if(i == 5 || i == 7) {
                    sep = "\n  "
                } else {
                    sep = "\n    "
                }
                
                colStr += dataRow[i].toString().replaceAll(",", sep)
                
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
            
            let dm = data.weightErr
            let dg = data.freeFallAccelerationAbsErr
            let dr = data.pulleyRadiusErr
            let dh = data.loadLoweringHeightErr
            let dt = data.stopwatchErr
            let alpha = data.confidenceCoefficient
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
            
            doc.cell(10, 187, 190 / 8, 20, " ".repeat(23) + "№")

            headerRow = ['Δt', 'ΔM', 'Δe', 'ΔI']
            let cellWidth = (190 - 190/8) / 4
            for(let i = 0; i < 4; i++) {
                doc.cell(10+190/8 + i*cellWidth, 187, cellWidth, 10, " ".repeat(12) + headerRow[i])
            }

            headerRow = ['       с', '    H·м', ' рад / с²', '   кг·м²']
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
                    header = "    %"
                    x = 10+190/8 + i*cellWidth+2
                    newCellWidth = cellWidth - 2
                }        

                doc.cell(x, 197, newCellWidth, 10, header)
            }

            let numbersStr = " ".repeat(7)
            for(let i = 1; i < 6; i++) {
                numbersStr += i + " ".repeat(14)
            }

            doc.cell(10, 207, 190 / 8, 28, numbersStr)

            dataRow = []
            masNames = ['avgTimeAbsErrors', 'avgTimeRelativeErrors',
                'forceMomentAbsErrors', 'forceMomentRelativeErrors',
                'angularAccelerationAbsErrors', 'angularAccelerationRelativeErrors',
                'inertiaMomentAbsErrors', 'inertiaMomentRelativeErrors']

            masNames.forEach(masName => {
                dataRow.push(data[masName])
            })

            let strDataRow = []

            for(let i = 0; i < dataRow.length; i++) {
                // let strRow = dataRow[i].map(String)
                // let sortedStrRow = strRow.slice(0).sort()
                // let maxStrLen = sortedStrRow[sortedStrRow.length-1].length     
                let strRow = []   
            
                // console.log(dataRow)
                for(let j = 0; j < dataRow[i].length; j++) {
                    strRow.push(dataRow[i][j])

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
                    colStr = "     "
                    sep = "\n     " 
                } else if(i == 2 || i == 6) {
                    colStr = "  "
                    sep = "    "
                }                    
                else if(i == 4) {
                    colStr = "   "
                    sep = "      "
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

            doc.cell(10, 255, 70, 17, " ".repeat(19) + "Величина")
            doc.cell(80, 255, 25, 17, "  Единица" + " ".repeat(7) + "изм.")
            doc.cell(105, 255, 95, 17/2, " ".repeat(31) + "Значения")
            doc.cell(105, 263.5, 95/2, 17/2, " ".repeat(7) + "Усредненные")
            doc.cell(105+95/2, 263.5, 95/2, 17/2, " ".repeat(10) + "Метод НК")

            text1 = " ".repeat(5) + "Момент инерции" + " ".repeat(29) +
                    "Погрешность" 
            doc.cell(10, 272, 70, 14, text1)

            text1 = "     кг·м²" + " ".repeat(11) +
                    "%" 
            doc.cell(80, 272, 25, 14, text1)
            console.log(data)
            let avgIn = data.avgInertiaMoment
            let absEr = data.avgInertiaMomentRelativeErr
            text1 = " ".repeat(13) + avgIn + " ".repeat(26) +
                    absEr 
            doc.cell(105, 272, 95/2, 14, text1)

            let MKIn = data.leastSqrInertiaMoment
            absEr = data.leastSqrInertiaMomentRelativeError
            text1 = " ".repeat(13) + MKIn + " ".repeat(26) +
                    absEr 
            doc.cell(105 + 95/2, 272, 95/2, 14, text1)

            doc.addPage()

            doc.addImage({imageData: this.chartDataUrl, x: 12, y: -175, angle: -90, w: 275, h: 185})

            // doc.setFontSize(16)
            // doc.text("e, рад / с²", 200, 4, {angle: -90})
            // doc.text("M · 10-², H · м", 6, 258, {angle: -90})

            doc.setFontSize(16)
            text1 = "Y = " + data.funcFreeTerm + " + " 
                + data.funcCoef + " * X"
            doc.text(text1, 258, 6, {angle: -90})
            
            let pdf = doc.output('datauristring', { filename: 'RAB' });
            doc.save(this.pdfFileName.replace("#view=Fit", ""))
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

        <div class="red-arrow-down-container">
            <img src="/src/assets/redArrowDown.png" alt="">
        </div>
        <div class="red-round-highlight">
        </div>
        <object class="pdf-viewer" :data="this.resultPdfUrl+this.pdfFileName"  type="application/pdf">Не удалось показать документ</object>
        
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
        width: 40%;
        height: 50vh;          
        border-radius: 9px;

        margin-top: 60px;
    }

    .red-arrow-down-container {        
        width: 30px;
        height: 45px;

        position: absolute;
        top: 245px;
        right: 664px;
    }

    .red-arrow-down-container img {
        width: 100%;
        height: 100%;
    }

    .red-round-highlight {
        width: 28px;
        height: 28px;
        /* background-color: aqua; */
        border-radius: 50%;

        position: absolute;
        top: 294px;
        right: 665.5px;

        pointer-events: none;

        -webkit-box-shadow: 0px 0px 8px 4px rgba(189, 31, 45, 0.38);
        -moz-box-shadow: 0px 0px 8px 4px rgba(189, 31, 45, 0.38);
        box-shadow: 0px 0px 8px 4px rgba(189, 31, 45, 0.38);
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

