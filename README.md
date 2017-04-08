# GulpBlank
Blank project on Gulp with Pug, Stylus, autoprefixer, browser-sync and other


[![GitHub forks](https://img.shields.io/github/forks/pelinoleg/GulpBlank.svg)](https://github.com/pelinoleg/GulpBlank/network)
[![GitHub issues](https://img.shields.io/github/issues/pelinoleg/GulpBlank.svg)](https://github.com/pelinoleg/GulpBlank/issues)
[![GitHub stars](https://img.shields.io/github/stars/pelinoleg/GulpBlank.svg)](https://github.com/pelinoleg/GulpBlank/stargazers)

Установка
-------

- Для начала нужно установить [node.js](https://nodejs.org/en/)
- Сделать клон проекта или [скачать архив](https://github.com/pelinoleg/GulpBlank/archive/master.zip)

- Установите Gulp, выполнив в терминале:
```
sudo npm i gulp -g
```
- Откройте папку проекта в терминале и выполните

```
npm install
```

- Для запуска проекта выполните:
```
gulp
```
в браузере должна открыться страница с адресом http://localhost:3000


Основные команды
-------------
```gulp``` - Компилирует все pug и  stylus файлы, прописывает все пути для плагинов которые были установлены через bower (пути для css файлов и js файлов), форматирует html код,  запускает сервер для авторефреша страниц при изменениях.

```gulp compile``` - компилирует все stylus и pug файлы, добавляет автопрефиксы для css стилей, создает sourcemap, делает рефреш для браузера.

```gulp build``` - собирает весь проект в папке "dist",  сохраняя только нужные файлы css и js, при этом происходит их конкатенация. Все файлы минифицируются. После этого вся папка dist архивируется, архив записывается в корневую папку проекта.
