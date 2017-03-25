# GulpBlank
Blank project on Gulp with Pug, Stylus, autoprefixer, browser-sync and other


https://img.shields.io/github/downloads/atom/atom/total.svg

Установка
-------

- Для начала нужно установить [node.js](https://nodejs.org/en/) ,       [bower](https://bower.io/#install-bower) и       [git](https://git-scm.com/downloads)

- Сделать клон проекта или [скачать архив](https://github.com/pelinoleg/GulpBlank/archive/master.zip) 

- Установите Gulp, выполнив в терминале: 
```
sudo npm i gulp -g
```
- Откройте папку проекта в терминале и выполните

``` 
npm install
```
потом 
``` 
bower install
``` 
- Для запуска проекта выполните:
``` 
gulp
``` 
в браузере должна открыться страница с адресом http://localhost:3000


Основные команды
-------------
```gulp``` - Компилирует все pug и  stylus файлы, прописывает все пути для плагинов которые были установлены через bower (пути для css файлов и js файлов), форматирует html код,  запускает сервер для авторефреша страниц при изменениях.

```gulp stylus``` - компилирует все stylus файлы, добавляет автопрефиксы для css стилей, создает sourcemap, делает рефреш для браузера.

```gulp pug``` - компилирует все pug файлы, делает рефреш для браузера.

```gulp bower``` - прописывает все пути для плагинов которые были установлены через bower.

``` gulp htmlbeautify ``` - форматирует html код

```gulp zip``` - создает архив из скомпилированного проекта (папака dist).

```gulp compile``` - компилирует stylus и pug, прописывает все пути для плагинов которые были установлены через bower, форматирует html код.

```gulp build``` - собирает весь проект в папке "dist",  сохраняя только нужные файлы css и js, при этом происходит их конкатенация. JS файлы минифицируются. После этого вся папка dist архивируется, архив записывается в корневую папку проекта.