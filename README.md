Есть три версии сервера:
1. простой http-server на js, запуск npm run start-http
2. сервер с использованием библиотеки express, тоже на js, запуск npm run start-express-js
3. сервер на typescript с использованием express. Запуск в два этапа (два терминала):
    а) переводим ts-файлы в js и кладем в папку /dist  (npm  run watch-tsc)
    б) запускаем получившийся js-файл (npm watch)

Запросы к базе
1. Для получения данных базы стоит пароль, который надо вводить как query-параметр 
    http://localhost:4000/db?pass=rnd
