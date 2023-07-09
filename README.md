# movies-explorer-api

Веб-сервис по поиску фильмом, созданный в рамках сдачи диплома на курсе Веб-разработчик в Яндекс Практикум. Сервис позволяет искать фильмы, сохранять и удалять их в личном кабинете.

# Структура проекта

 - BACKEND
 - FRONTEND

 # API

 - POST /signup — регистрация пользователя (name, email и password)
 - POST /signin — авторизация пользователя (email и password, возвращает jwt)
 - GET /users/me — возвращает информацию о пользователе (email и имя)
 - PATCH /users/me — обновляет информацию о пользователе (email и имя)
 - GET /movies — возвращает все сохранённые текущим пользователем фильмы
 - POST /movies — создаёт фильм (country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail и movieId)
 - DELETE /movies/_id — удаляет сохранённый фильм по id

 # Технологии

 - Node.js
 - Express
 - MongoDB
 - Mongoose
 - ESLint
 - Clebrate & Joi
 - Winston - логирование ошибок & запросов

 # Ссылки на проект 

 IP 158.160.53.237

 Backend https://api.movies.exp.nomoredomains.work/
 Frontend (в разработке)

