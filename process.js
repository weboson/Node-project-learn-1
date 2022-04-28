
// подключение пакета dotenv для иницилизации наших переменных (2-й способ) в ГЛАБАЛЬНОМ объекте process.env
// удалил поле ""type": "module"," из package.js, тем самы откючил режим подключения пакетов ES-module.
// чтобы подключить пакет по-умолчанию, через require()
const dotenv = require('dotenv');
dotenv.config()


console.log(process.env.PORT) // 6000
console.log(process.env.NODE_ENV) // development
//====================================process.pid==================================
// Напишем бесконечный цикл и посмотрим его в ОС в "диспетчере задач" во вкладке "подробности", по id процесс Node
// Далее удалим процесс, прописав команду в НОВОМ терминале (снова Ctrl +Shift + `): kill [номер процесса]

//для начала узнаем id данного процесса
// console.log(process.pid)
// while(true) {

// };
// написал "kill 7908" и процесс и диспетчера задач исчезла.




//======================================process.env========================================
// таймкод: https://youtu.be/243pQXC5Ebs?t=2075
//Переменные окружения доступные в поле 'env' у объекта process:
//Пример того, что выдадо в терминале:
//----------------код----------------------
//console.log(process.env);
//-----------------------------------------
// HOMEDRIVE: 'C:',
// SUBLIME_TERMINAL_PATH: 'C:\\Users\\F397~1\\AppData\\Roaming\\SUBLIM~1\\Packages\\Terminal',
// USERNAME: 'Ришат',
// SYSTEMROOT: 'C:\\Windows',
// OS: 'Windows_NT',
// и так далее. 
// уточним количество этих свойств:
// переберем объект "process.env"
//----------------код----------------------
// let count = 0
// for (let key in process.env) {
//   count++
// };
// console.log(count); // 42
//-----------------------------------------
// мы можем создавать эти переменные (свойства объекта process.env) сами 
// ("для чего нужно" написано в спойлере ниже, а также в норм дополнительном видео: https://www.youtube.com/watch?v=oocz2prLXQo)
//1) если просто написать придуманную переменную, то естественно вернет "undefined"
//----------------код----------------------
console.log(process.env.NODE_ENV) // undefined, а после иницилизации production
console.log(process.env.PORT) // undefined, после иницилизации 5000
//-----------------------------------------
// Проиницилизируем наши переменные:


// *****************СПОСОБ №1 (с помощью пакета cross-env и поля scripts)
// Для начала:
// заходим в поле "scripts" в файле 'package.json'
// и пропишем туда свой скрипт: "start": "node process" - чтобы удобно запускать наш файл process.js
// И также, попробуем прописать туда же нашу перменную: "PORT=5000 node process"
// и получаем (в терминале набрав "npm start") ошибку: 
// "PORT" не является внутренней или внешней командой, исполняемой программой или пакетным файлом.
// Ошибка, из-за того, что нужно сначала установить специальный пакет "cross-env", для этого напишем команду:
// npm i cross-env
// после установки cross-env, 
// можно уже иницилизировать свои переменные объекта process.env 
// в поле "scripts" в файле 'package.json', можно иницилизировать наши переменные, в команде:
// формат которого, после строки "cross-env..." можно писать нужную переменую, 
// например:
// cross-env PORT=5000 NODE_ENV=production node process
// И так, чтобы проиницилизировать свою переменную объекта process.env, нужно: 
// установить cross-env и
// по шаблону писать в script: 
// ---cross-env VAR=value node app.js----
// и готовый результат:
//    "start": "cross-env PORT=5000 NODE_ENV=production node ./process"
//>>>>>>>>>>>>>>>>>>>
// СПОЙЛЕР: эти переменые (константы) используются для констант используемые в проекте, например: 
// значение PORT для config-файлов, еще для чего-либо. 
// Плюс в том, что process.env доступен ГЛОБАЛЬНО, и 
// к его пременным всегда есть доступ в любом файле проекта
// доказательство, эти переменные в этом файле не были подключениы, как модули, но они доступны
console.log(`Эти константы доступны ГЛОБАЛЬНО, и их не нужно подключать в файлах, как модули, PORT = ${process.env.PORT}`) // undefined, после иницилизации 5000
//^^^^^^^^^^^^^^^^^^^^



// *****************СПОСОБ №2 (с помощью пакета dotenv и файлов .env)
// Второй способ иницилизации наших констант, выглядит так:
// 1) Установить пакет "dotenv":
// npm i dotenv
// 2) подключить(импортировать) пакет в файле process.js. И лучше это делать в началае файла

// 3) И теперь уже можноинициализировать в отдельном файле, имя-расширение которого выглядит так:
// .env
// На странице (https://www.npmjs.com/package/dotenv) этой библиотеки написано: 
// "Создайте файл .env в корневом каталоге вашего проекта".
// Прописав в файле .env:
// PORT=6000
// NODE_ENV=development
// Получаю в консоле, теже значения (строки console.log() в первом примере). Что говорит, что 2-й способ работает.






//====================================process.argv==================================

//тайм-код 37:28: https://youtu.be/243pQXC5Ebs?t=2248
// Как я догадваюсь, process.argv - содержит введенные в терминал команды относящиеся к определенному файлу 
// т.е. пишутся после файла, например:
// node (или npm) process asda dadas sadasdas 
// "asda dadas sadasdas" - это и есть рандомная команда - аргументы процесса
// пробуем:
console.log(`process.argv возвращает: ${process.argv}`);
// после введеня псевдо команды в терминал:
// node process randomm wordss oops
// В терминале (зеленым текстом) выдало массив:
// [
//   'E:\\SoftWare\\Node\\node.exe',
//   'E:\\Practics-JavaScript\\JsGame\\process',
//   'randomm',
//   'wordss',
//   'oops'
// ]

// Соответсвенно с такими возможностями, мы можем по командам определять логику:
// например:

//если ввести команду "", то будет бесконечный цикл, а если нет процесс завершится

// arr.indexOf(item, from) ищет item, начиная с индекса from, и возвращает индекс,
// на котором был найден искомый элемент, в противном случае -1.
// инфа в учебнике: https://learn.javascript.ru/array-methods#indexof-lastindexof-i-includes
let comparison = process.argv.indexOf("infinite", "cycle");
console.log(comparison) // -1

if(~comparison) { // если не -1, то есть совпадение в массиве есть, с ожидаемыми командами
	// то запустить бесконечный цикл 
	console.log(`У процесса, id которого ${process.pid} происходит бесконеный цикл`)
	while(true) {
	};

} else { // команда не верна, то процесс завершается
	console.log('Команда не верна, процесс завершен');
// также можно воспользоватся методом process.exit(), который завершает процесс (выполнение нашего файла)

//====================================process.exit==================================
	process.exit(); // 
};




