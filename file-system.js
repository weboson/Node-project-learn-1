// МОДУЛИ ФАЙЛОВОЙ СИСТЕМЫ №2
// Тайм-код "44:07": https://youtu.be/243pQXC5Ebs?t=2646

// ПОДКЛЮЧИМ ЭТИ МОДУЛИ с использованием синтаксиса CommonJS, хотя можно и ES6 (ESM).
const fs = require('fs');
const { system } = require('nodemon/lib/config');
const path = require('path');




// У модуля 'fs' методы бывают обычные (асинхронные) и синхронные
// синхронные - блокруют главный поток, пока не завершатся

//!=========================fs.mkdirSync(path[, options]) синхронно СОЗДАЁТ файлы и папки===============
// создает папку по указанному пути
// подробнее: https://nodejs.org/dist/latest-v17.x/docs/api/fs.html#fsmkdirsyncpath-options
// path <string> | <Buffer> | <URL>
// options <Object> | <integer>
// recursive <boolean> Default: false
// mode <string> | <integer> Not supported on Windows. Default: 0o777.
// Returns: <string> | <undefined>

// в аргументы пишем путь:
// path.resolve(first, second...) ->  склеивает наши пути => first/second
// __dirname - возращает путь до текущего файла => E:\Practics-JavaScript\JsGame
// в  итоге мы склеили: путь и имя папки "dir" - а fs.mkdirSync() создал папку "dir" по указанному пути
// Чтобы активировать метод, нужно запустить файл: node file-system


//fs.mkdirSync(path.resolve(__dirname, 'dir')); // то есть мы ввели аргументы: (E:\Practics-JavaScript\JsGame\dir)
//fs.mkdirSync('rishat/rishat2', {recursive: true});
//fs.mkdirSync("E:\Practics-JavaScript\JsGame\dir"); 


// В итоге: в текущей дериктории появилась в списке НОВАЯ ПАПКА "dir"
// замечание: если снова запустить данный метод, выйдет ошибка: Error: EEXIST: file already exists, mkdir 'E:\Practics-JavaScript\JsGame\dir'
// которая гласит, что папка уже созадана, т. е. у fs/mkdirSync() есть своя проверка на сущетвующие или нет папки

// Чтобы создать вложенность папок (одна папка в другой, та еще в другой и т.д.),нужно:
// удленнить путь на конце которого будут наши папки
// и т.к. по-умолчанию в методе не подключена рекурсия, нужно в конце добавить аргумент "{recursive: true}"
// ВАЖНО: не должно быть аналогичных строк, где создается та же папка, то есть предыдущий код нужно 
// закоментить метод имеющий одинаковое имя папки: fs.mkdirSync(path.resolve(__dirname, 'dir'));
//а то замучался, не мог создать папку в папке

//fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir2', 'dir3'), {recursive: true});
// https://youtu.be/243pQXC5Ebs?t=2740

//console.log(path.resolve(__dirname, 'dir'));




//!=========================fs.mkdir(path[, options], callback) асинхронно СОЗДАЁТ файлы и папки===============
// Асинхронный вариант метода mkdir - создающий новую папку с использованием коллбэков (позже расмотрим враиант с Промисами),
// в аргументах которого есть error
// тайм-код: https://youtu.be/243pQXC5Ebs?t=2751
// подробнее: https://nodejs.org/dist/latest-v17.x/docs/api/fs.html#fsmkdirpath-options-callback

// код для проверки синхронности. Если внешний код не остановиться, значит асинхронный.
// то есть выведет сначала "START" => "END", и только потом 'Папка создана' - из кода асинхронного метода.


//..............код....................
console.log('START');
// асинхронный код
fs.mkdir(path.resolve(__dirname, 'async-Creat'), { recursive: true }, (err) => {
    if(err) {
        console.log(err)
    }
    console.log('Папка создана');
    
});

console.log('END');
//..................................


// вывело (в первом случае, когда не было { recursive: true }):
// START
// END
// [Error: EEXIST: file already exists, mkdir 'E:\Practics-JavaScript\JsGame\async-Creat'] {
//   errno: -4075,
//   code: 'EEXIST',
//   syscall: 'mkdir',
//   path: 'E:\\Practics-JavaScript\\JsGame\\async-Creat'
// }
// Папка создана

// То есть у нас и ошибка и вывод наших строк
// Чтобы исправить, автор предлагает вставить после "console.log(err)" return, но все равно не ошибка,
// и посмотрев в документацию я добавил option = { recursive: true }
// и всё сработало без ошибок:





//!=========================fs.rmdir(path[, options], callback)-или-новый-аналог-fs.rm() УДАЛЯЕТ папку===============
// Асинхронный вариант метода fs.rm() (ramdir()) - удаляет файлы и папки с использованием коллбэков
// тайм-код: https://youtu.be/243pQXC5Ebs?t=2853
// подробнее: https://nodejs.org/dist/latest-v17.x/docs/api/fs.html#fsrmdirpath-options-callback
// fs.rm() - Асинхронно удаляет файлы и каталоги (по образцу стандартной утилиты POSIX rm). 
// коллбэку завершения не передаются никакие аргументы, кроме возможного исключения.
// Например удалим созданный выше каталог 'async-Creat'


//..............код....................
// при методе rmdir - выодится предупредление, что он УСТАРИВАЕТ, вместо него будет просто "rm".
// воспользуюсь им:
fs.rm(path.resolve(__dirname, 'async-Creat'), {recursive: true}, (err) => {
    if(err) { 
        console.log(`Папка не удалена, произошла ошибка: ${err.message}`);
     }

     console.log('Папка For-remove успешно удалена');
     // также попробую вместе еще удалить другую папку (dir)
     // без {recursive: true} также ошибка и вывод всего, и ошибки, и текста
     fs.rm(path.resolve(__dirname, 'dir'), {recursive: true}, (err) => {
        if(err) {
            console.log('Ошибка');
            
        };
        console.log('удалил еще другую папку');
     });
     
});
//..................................


// вывело:
// Папка For-remove успешно удалена
// удалил еще другую папку

//?ЗАМЕТКА: вместе с кодом вывело предупрждение об устаревании метода rmdir
// Предупреждение об устаревании: в будущих версиях Node.js файл fs.rmdir(path, {recursive: true}) будет удален. 
// Вместо этого используйте fs.rm(path, {recursive: true})





//!=========================fs.writeFile(file, data[, options], callback) ЗАПИСЫВАЕТ/ПЕРЕЗАПИСЫВАЕТ СВЕРХУ накладывая данные поверх старых===============
// Создает файл и записывает (и если запись уже была, то ПЕРЕЗАПИСЫВАЕТ) в этот файл данные. и
// Еще есть просто fs.write() - почти тоже самое делает.
// тайм-код 48:04: https://youtu.be/243pQXC5Ebs?t=2884
// подробнее: https://nodejs.org/dist/latest-v17.x/docs/api/fs.html#fswritefilefile-data-options-callback

// Например создадим файл 'async-Creat' и запишем в него строку


//..............код....................
// попробуем через перменную, а не просто строку, как у автора
let buff = "Данный текст записан с наружи. Из файла file-system.js с помощью метода fs.writeFile()";

fs.writeFile(path.resolve(__dirname, "write-File.js"), buff, (err) => {
    if(err) {
        console.log(err.massage);  
    };

    console.log('Файл создан write-File и записаны в него данные');
    
});

// ПОЛУЧИЛОСЬ:
// Создался файл "write-File" и в нем записанный нами код 
//..................................




//!=========================fs.appendFile(path, data[, options], callback) ЗАПИСЫВАЕТ-ДОБАВЛЯЯ К ПРЕДЫДУЩИМ ДАННЫМ===============
// Если "fs.writeFile()" ПЕРЕПИСЫВАЕТ содержимое файла (если повторно), то "fs.appendFile()" - ДОБАВЛЯЕТ данные в файл И СОЗДАЕТ этот файл
// тайм-код 49:00: https://youtu.be/243pQXC5Ebs?t=2940
// подробнее: https://nodejs.org/dist/latest-v17.x/docs/api/fs.html#fsappendfilepath-data-options-callback
// из документации: 
// Асинхронно ДОБАВЛЯЕТ данные в файл, СОЗДАВАЯ файл, если его не существует. data может быть строкой или <Buffer>.


//..............код....................
//Данные для файла, которые мы запишем/добавим
let appDate = "console.log('Записал/Добавил код в файл');"; // заметил, что СТРОКА ПРЕОБРАЗУЕТСЯ в js-код"


fs.appendFile(path.resolve(__dirname, "appendFile.js"), appDate, (err) => {
    if(err) {
        console.log(err.massage);    
    };
    console.log('Добавил в файл данные'); 
});
// РЕЗУЛЬТАТ:
// Создался (при первом запуске) файл, далее записались (при первом пуске)/ добавились данные
//..................................






//!====================================ПРОМИСЫ В NODEJS================================
// тайм-код 49:24: https://youtu.be/243pQXC5Ebs?t=2964
// подробнее: https://nodejs.org/dist/latest-v17.x/docs/api/fs.html#file-system

// Автор рассказ, про когда нужна определенная последовательность асинхронных задач, можно использовать callback,
// это когда, к примеру: 
// function loaderSecondFile(data, function-callback) { когда загрузится одна задача, запуститься вторая function-callback()}
// но колбэки можно использовать от 2 до 3-4 задачах, иначе будет "ад колбэков", придется постоянно вкладвать одну задачу в другую
// подробнее в учебнике: https://learn.javascript.ru/callbacks
// поэтому лучше использовать Promise


//..............пробую сам....................
// В Nodejs с какой-то версии, можно работать с файловой системой (fs) с помощью Промисов.
// ПРОБУЮ, тестю
// подключаю 
const fsPromise = require('fs/promises');
// console.log(`This is ${fsPromise}`); // Promise


fsPromise.appendFile(path.resolve(__dirname, "appendFile.js"), 
"console.log('Текст из Промиса fsPromise.appendFile(): Принимает только готовые и примитивные данные. И setTimeout() тоже не принимает');", 
(err) => {
    console.log('Проимссссс'); // данную строку не показывает
}).then(console.log("Промис от Nodejs, от appendFile")); // result
// Выводы:
// Также записыает/добавляет данные в файл, но теперь можно обрабатывать с помощью методов: then(), catch() и finnaly()
// Но почему-то не возращает данные (undefined), типа как у js-Промисов resolve(value), и свойств нет "state", "result".
//..................................



//..............от автора видео....................
// Тайм код 50:05: https://youtu.be/243pQXC5Ebs?t=3007
// примеры промисов от Nodejs:

// const fsPromise = require('fs/promises');

// fsPromise.mkdir('/').then().catch()
// fsPromise.readFile('/').then().catch()
// fsPromise.writeFile('/').then().catch()
// fsPromise.appendFile('/').then().catch()
// fsPromise.rm('/').then().catch()
// fsPromise.rmdir('/').then().catch()

//..................................



//!..............нативный ПРОМИС из javascript....................
// Тайм-код 50:20: https://youtu.be/243pQXC5Ebs?t=3021
//  функция async возращающая промис 
// Я слегка передал, у автора стрелочная функция, а меня обычная async функция
//было:
// const appendFileAsync = async () => {...}

//..............код....................
// async который ЗАПИСЫВАЕТ/перезаписывает (создает если нет файла ) данные в файл.
// То есть в функции используется метод "fs.writeFile(path, data, (err)=>)"
async function writeFileAsync(path, data) {
    return new Promise((resolve, reject) => fs.writeFile(path, data, (err) => {
        if(err) {
            return reject(err.message);
        }

        console.log('Добавлено с помощью async');
        resolve()
    }))
};




// async который ДОБАВЛЯЕТ(записывает добавляя данные) (создает если нет файла ) данные в файл.
// То есть в функции используется метод "fs.writeFile(path, data, (err)=>)"
async function appendFileAsync(path, data) {
    return new Promise((resolve, reject) => fs.appendFile(path, data, (err) => {
        if(err) {
            return reject(err.message);
        }

        console.log('Добавлено с помощью async');
        resolve()
    }))
};


//!..............продолжая промисы, расмотрим еще метод ЧТЕНИЯ файла: readFile()....................
// Тайм-код 53:33: https://youtu.be/243pQXC5Ebs?t=3213
// async который ЧИТАЕТ (возвращает данные, который можно принять/вывести следующим .then) данные в файле. 
// В функции используется метод "fs.readFile(path, (err)=>)"
async function readFileAsync(path) {
    //если не будет аргумента {encoding: 'utf-8'}, то данные должны вернутся, как buffer=разыне цыфры, но у меня все норм и без encoding
    return new Promise((resolve, reject) => fs.readFile(path, {encoding: 'utf-8'}, (err, data) => { // в колбэке два аргумента, ошибка и сами данные 
        if(err) {
            return reject(err.message);
        }
        resolve(data)
    }))
};

//!..............И также продолжая промисы, расмотрим уже метод УДАЛЕНИЯ файла: fs.rm(path[, options], callback)....................
// Тайм-код 55:40: https://youtu.be/243pQXC5Ebs?t=3340
// async который УДАЛЯЕТ данные в файле. 
// В функции используется метод "fs.rm(path[, options], callback)" - который удаляет файлы и папки (данный метод мы уже расматривали в строке 100)
//..................код........................
async function removeFileAsync(path) {
    //если не будет аргумента {encoding: 'utf-8'}, то данные должны вернутся, как buffer=разыне цыфры, но у меня все норм и без encoding
    return new Promise((resolve, reject) => fs.rm(path, (err) => { // в колбэке два аргумента, ошибка и сами данные 
        if(err) {
            return reject(err.message);
        }
        resolve()
    }))
};
//.............................................


//исопльзование этих функций
//  спровцировать ошибку добавив левый путь "sdfsdfsdfsdfsd",
writeFileAsync(path.resolve(__dirname,  "write-File.js"),  "1111111111111111111111111111111111111111111") // использую функцию writeFileAsync
// и так как async возврощают промисы,, воспользуемся обработчиками .then, .catch (finnaly)
.then(() => appendFileAsync(path.resolve(__dirname, "write-File.js"),  "2222222222222222222222")) // использую функцию appendFileSync
.then(() => appendFileAsync(path.resolve(__dirname, "write-File.js"),  "3333333333333333333333")) // использую функцию appendFileSync
.then(() => readFileAsync(path.resolve(__dirname, "write-File.js")))// функция readFileAsync, как и метод readFile(path) принимает в аргументы только путь к файлу
.then((data) => console.log(`Данные, которые вырнула функция readFileAsync: ${data}`)) // выведем прочитанные данные в консоль
.then(() => { removeFileAsync(path.resolve(__dirname, "write-File.js"))}) // УДАЛИЛ ФАЙЛ
.then(() => console.log('Файл был удален'))
.catch((err) => console.log('Ошибка в async-функциях!')) // спровоцировать ошибку, добавить левый путь для склеивания: "sdfsdfsdfsdfsd",

// результат: в файл "write-File.js" сначало записалось, а потом добавилось --- то есть в нужной паследовательности



//?++++++++++++++++++++МОЙ КОД++++++++++++++++++++++++++
//МОЙ КОД,  я пытался  сделать промисы по смоему, по учебнику, и постоянно были ошибки с resolve и reject.
// ПОТОМУ ЧТО: resolve/rejcet можно использовать толкьо в врезнем уровне вложенности, тюею не глубже скобок {} async или promise

// async который записывает (создает если нет файла ) данные в файл.
// То есть в функции используется метод "fs.writeFile(path, data, (err)=>)"
//..............закомменченный код....................
// async function writeFileAsync(path, data) {
//     fs.writeFile(path, data, (err) => {
//         if(err) {
//             return err;
//         }

//         console.log('Добавлено с помощью async');
//         //resolve(1) // бросает ошибку
//     })
// }

// // async который добавляет (создает если нет файла ) данные в файл. 
// // То есть в функции используется метод "fs.appendFile(path, data, (err)=>)"
// async function appendFileAsync(path, data) {
//     fs.appendFile(path, data, (err) => {
//         if(err) {
//             return err;
//         }

//         console.log('Добавлено с помощью async');
//         //resolve(1) // бросает ошибку
// //?почему то: ругается на resolve() <---------СПОЙЛЕР: потому, что в async, что reject, что resolve можно испозтвать только в верхнем уровне, т.е внутри {}, глубже их нельзя
//     })
// }


// // запускаем наши async функции
// // первая async функция ЗАПИСЫВАЕТ/перезаписывает данные.
// // В аргументы вводим путь и данные
// writeFileAsync(path.resolve(__dirname, "write-File.js"),  "console.log('Код из async функции')")
// // И так как, async функции возращают Promise, то воспользуемся обработчиками .then() 
// // В обработчике будем запускать вторую async функцию, которая ДОБАВЛЯЕТ данные в файл
// .then(() => appendFileAsync(path.resolve(__dirname, "write-File.js"), "console.log('123----Код добавлен из .then(appendFileSync)')"))
// .then(() => appendFileAsync(path.resolve(__dirname, "write-File.js"), "console.log('456----Код добавлен из .then(appendFileSync)')"))
// .catch((err) => console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'));
//......................................................................................







//!..............................ЗАДАЧА СПРОМИСАМИ.............................
// Тайм-код 56:24: https://youtu.be/243pQXC5Ebs?t=3384
// Для зкарепления материала, автор решил выполнить задачу с использованием Промисов
// Условия задачи:
// 1. - Через инициализации нашей константы в глобальной переменной окружения "process.env" мы передадим данные (строку):
// использую 2 способа:
//  (1: cross-env и запись в терминале: cross-env TEXT="1 2 3 4 5 6 Rishat" node ./file-system или можно в package.json)
//!-----------ВАЖНО: чтобы иницилизировать нашу константу в process.env. в команды "cross-env..." нужно запускать в Gir-BASH, 
// в стандартном терминале в VSCode PowerShell выдает ошибку. Но можно и использвоать файл .env (с пакетом dotenv)
//  (2: dotenv + подключить его и инициализация констант в файле .env )
// 2. - Записываем нашу константу (process.env.TEXT) в файл text.txt
// 3. - Считываем данные (fs.readFiel())
// 4. - Посчитаем количество слов в строке в файле
// 5. - И записываем их в другой файл (text2.txt), при этом первый файл (text.txt) мы удалим
// 6. - Удалим первый файл text.txt
// Пробую решить задачу самостоятельно:


// 1. - Через инициализации нашей константы в глобальной переменной окружения "process.env" мы передадим данные (строку):

//1) Предисловие: на самом деле этот способ был, который я использовал был вторым. И я с ним намучался, так как:
// терминал (PowerShell), который по-умолчанию в VSCode не принимает такие команды. Чтобы это исправить:
// Нужно в окне папки проекта, нажать Правой клавиши мыши и выбрать Git-BASH она с этим справляется. 
// Приступим:
// Так как плагин "cross-env" уже установлен, глобально. То мы можем написать в Git-Bash (недавно установленный) используя шаблон:\
//  cross-env TEXT="1 2 3 4 5 6 Rishat" node ./file-system
// после чего все заработает и все async-функции-промисы рсботают как пологается


// 2) создаим СВОЮ глобальную константу в process.env
// теперь воспользуюсь ВТОРЫМ способом, который описан в файле process.js и в документе "Конспект по видео - Node JS фундамен курс.odt" (X:\Самоброзование\JavaScript для начинающих\Node)
// для начала ПОДКЛЮЧУ плагин "dotenv", который мы установили, когда использовали в process.js. Все это для того, чтобы работал файл .env
const dotenv = require('dotenv');
dotenv.config()
// И создам переменную TEXT сохранив в него текст В ФАЙЛЕ .env
// вывод: получилось


// начало от автора
// сохранить в text = либо константу TEXT либо пустую строку ''
const text = process.env.TEXT || ''; 


// восользуемся async функциями, которые мы понасоздавали: writeFileAsync, appendFileAsync, readFileAsync, removeFileAsync
// (начиная с строки 260):

// 2. - Записываем нашу константу (process.env.TEXT) в файл text.txt
writeFileAsync(path.resolve(__dirname, "text.txt"), text) // создал "text.txt" / записал text
// 3. - Считываем данные (fs.readFiel())
.then(() => readFileAsync(path.resolve(__dirname, "text.txt"))) // прочитал. Методом fs.readFile() -возращает промис С ПРОЧИТАННЫМИ ДАННЫМИ
// 4. - Посчитаем количество слов в строке в файле
.then((data) => data = data.split(' ').length) // показал, сколько слов
// 5. - И записываем их в другой файл (count.txt), при этом первый файл (text.txt) мы удалим
.then((count) => writeFileAsync(path.resolve(__dirname, "count.txt"), count.toString())) // второй аргумент должен быть строкой (варианты: "" + count, `Итого: ${count}`)
// 6. - Удалим первый файл text.txt
.then(() => removeFileAsync((path.resolve(__dirname, "text.txt")))) // удалил файл text.txt

//...................................................................


