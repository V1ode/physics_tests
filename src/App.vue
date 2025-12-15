<script>
  import LabsList from './views/LabsList.vue';
  import NavbarBlock from './components/NavbarBlock.vue';
  import { RouterView } from 'vue-router'

  export default {
    components: {
      NavbarBlock,
      LabsList
    },
    mounted() {
      this.$router.push({
        name: 'home'
      })
    },
    methods: {
      goHome() {
            this.$router.push({
                name: 'home'
            })
        },  
    }
  }
</script>

<template>
  <div class="app">
    <navbar-block />
    <router-view></router-view>
  </div>  
</template>

<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }
</style>



// Последний столбец предпосл таблицы
// Значения посл таблицы
// График
// Подписать уравнение функции на графике
// Подставлять результаты вычислений при создании графика


// После хавера логотипа, когда он возврается в обычный размер, картинка дергается
// ?Логотип не подходит по стилю
// При выполнении лабы при попытке выхода в главное меню выводить предупреждение о потере введенных данных 
// После введения десятичной дроби с точкой вместо запятой, изменяется значение и не понятно, что нужно ввести
// Проверять при вводе дробных чисел, была ли точка, если да, то изменять ее на запятую


// Создать обработку ошибок: страница не существует, доступ запрещен, что-то пошло не так


// // Предзащита №1
// // Scorm и интеграция в другие проекты
// // Плохой UI
// // Чего то не хватает 🤔