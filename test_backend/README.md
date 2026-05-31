# README - BACKEND-часть приложения для автоматизации лабораторных работ по физике в университете

## Описание проекта

Используется для работы с базой данных PostgreSQL веб-приложения

Проект разработан с использованием:
- Express.js 
- Node.js 
- Sequelize (работа с PostgreSQL)

## Установка и настройка

### Требования
- Node.js v10+
- npm/yarn
 
### Инструкция по установке

1. Клонировать репозиторий:
```bash
git clone https://github.com/V1ode/physics_tests/test_backend
cd test_backend

Установить зависимости:
bash
npm install

Запустить сервер:
bash
nodemon index.js 

Структура проекта:
test_backend/
├── config/            # Конфигурация подключения к бд
│   └── db.config.js   		# Файл настроек подключения к бд
├── controllers/       # Контроллеры
│   └── constant.controller.js  	# Контроллер таблицы текущих значений констант
│   └── default_constant.controller.js  # Контроллер таблицы начальных значений констант
│   └── lab.controller.js       	# Контроллер таблицы записей о лабораторных работах
├── models/            # Модели
│   └── constant.model.js  		# Модель для таблицы текущих значений констант
│   └── default_constant.model.js  	# Модель для таблицы начальных значений констант
│   └── index.js       			# Базовый файл работы с моделями
│   └── lab.model.js       		# Модель для таблицы записей о лабораторных работах
├── routes/            # Роуты приложения
│   └── constant.routes.js  		# Роуты таблицы текущих значений констант
│   └── default_constant.routes.js  	# Роуты таблицы начальных значений констант
│   └── lab.routes.js       		# Роуты таблицы записей о лабораторных работах
├── index.js           # Основной серверный файл
├── package.json       # Зависимости проекта
│
└── README.md              # Документация

Зависимости и требования:
Express.js
Axios
CORS (для запросов от клиента к серверу)
Sequelize (для работы с PostgreSQL)
body-parser (для обработки POST-запросов)

Контактная информация
Автор: Терешин Роман
GitHub: https://github.com/V1ode/physics_tests/test_backend
Email: gf.356@yandex.ru
