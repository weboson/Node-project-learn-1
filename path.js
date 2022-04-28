//ФАЙЛОВАЯ СИСТЕМА
// таймкод "38:49": https://youtu.be/243pQXC5Ebs?t=2329

//====================================path==================================
// path модуль по-умолчанию входит в Node.js, который позволяет взаимодействовать с путями (абсолютными и относительными)
const path = require('path'); // подключается

//====================================path.join()==================================
// path имеет ряд методов, но есть часто используемые, такие как:
// path.join - "склеивает" пути, по аналогии: путь1/путь2/путь3...
// данное "склеивание" работает для каждой ОS(MacOS, Linux, Windows) ИНДИВИДУАЛЬНО
// То есть, даже, если мы создадим строку, которая разделена знаком слеш "\", она сработает только в Windows, 
// а благодаря puth.join() сработает на любой OS, т.к. метод это учитывает
console.log(path.join('first', 'second', 'third')); // first\second\third

//====================================path.extname()==================================
//возвращает расширения файла
const ext = path.extname('path.js');
console.log(ext); // .js


//===================================__dirname, __filename=================================
// "__dirname", и "__filename" - глобальные переменные в Nodejs
// Где "dirname" - возращает строку, где относительный путь, пример: "E:\Practics-JavaScript\JsGame"
// Где "filename" - возращает строку, где абсолютный путь, пример: "E:\Practics-JavaScript\JsGame\path.js"
// Проверю, строку ли возращает:
let pth = __dirname;
if(typeof pth ===  "string") {
console.log('__dirname вернул строку'); // __dirname вернул строку
};
// Да, строку
// Вернемся к переменным, и посмотрим, что они возвращают:
  console.log(`__dirname вернул: ${__dirname}, а __filename вернул: ${__filename}`); 
// ВЕРНУЛО: 
// __dirname вернул: E:\Practics-JavaScript\JsGame, 
// а __filename вернул: E:\Practics-JavaScript\JsGame\path.js

//==================================='..'=================================
// '..' - дает возможность вернуться на один уров вложенности в папках, используется с участием "__dirname"/"__filename"
// С console.log() не получается.
console.log(`Из дериктории ${__dirname} вернулся на 2 уровня ниже ${"..", ".."}`); 
// Из дериктории E:\Practics-JavaScript\JsGame вернулся на 2 уровня ниже ..
console.log(__dirname,"..", ".."); // E:\Practics-JavaScript\JsGame .. ..
// А с path.join(), как в видео, получилось
console.log(path.join(__dirname, '..', '..')); // E:\
// Т.е. с "E:\Practics-JavaScript\JsGame" спустился на "E:\"


//===================================path.resolve()=================================
// path.resolve() - она работает похожа на метод "path.join()", однако она имеет ряд различий, одна из них:
// 1) возращает только абсолютный (полный,от корня) путь. 
// И она менее предсказуема, если не знать её полностью, то лучше использовать метод path.join
console.log('Получить абсолютный путь', path.resolve('first', 'second', 'third')); // E:\Practics-JavaScript\JsGame\first\second\third
// как видно, к "склейке" "\first\second\third" добавился еще путь от корня "E:\Practics-JavaScript\JsGame\"
// 2) Еще, с аргументах можно указывать знаком слеш "/" аргумент, который станет первым в пути
console.log(path.resolve('first', 'second', '/thid')); //E:\thid
console.log(path.resolve('/first', 'second', 'thid')); //E:\first\second\thid
console.log(path.resolve(__dirname, 'first', 'second', 'thid')); //E:\first\second\thid

//===================================path.parse()=================================
// Тайм код "42:00": https://youtu.be/243pQXC5Ebs?t=2523
// Данный метод позволяет "проспарсить" (разложить на составляющие) нужный путь
const fullpath = path.resolve(__dirname, 'first', 'second', 'thid.js'); // сохранить какой-нибудь путь
console.log(path.parse(fullpath)); // и вернуло:
// {
//   root: 'E:\\',
//   dir: 'E:\\Practics-JavaScript\\JsGame\\first\\second',
//   base: 'thid',
//   ext: '.js',
//   name: 'thid'
// }

//============================Есть еще целый ряд методов и свойств, и автор не стал останавливаться и разбирать каждый=======
// Тайм-код "42:40": https://youtu.be/243pQXC5Ebs?t=2561
// Но продемострировал некоторый код из которого всё ясно:
//===================================path.sep=================================
// separator - разделитель \
console.log('Разделитель в ОС', path.sep); // Разделитель в ОС \
//===================================path.isAbsolute(путь)=================================
console.log('Проверка на абсолютный путь', path.isAbsolute('first/second')); // Проверка на абсолютный путь false
console.log('Проверка на абсолютный путь', path.isAbsolute(__filename)); // Проверка на абсолютный путь true
//===================================path.basename(путь)=================================
console.log('Название файла', path.basename(__filename)); // Название файла path.js
//--------------path.extname расмотрел выше 




//!====================================new URL==================================
// Глобальный класс new URL - парсит любой URL-адрес на составляющие, например:
// некоторый url-адерс:
const siteURL = 'http://localhost:8080/users?id=5123';
//  в несем в аргумент класса newURL() наш url-адрес
const url = new URL(siteURL);
//и теперь разбив на составляющие (поля - ключи:свойства), можно узнать о нашем URL подробнее:
console.log(url); // вернуло:
/*URL {
  href: 'http://localhost:8080/users?id=5123',
  origin: 'http://localhost:8080',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost:8080',
  hostname: 'localhost',
  port: '8080',
  pathname: '/users',
  search: '?id=5123',
  searchParams: URLSearchParams { 'id' => '5123' },
  hash: ''
}*/

const myURL = new URL('/foo', 'https://example.org/');
console.log(myURL);



function sayHi(string) {
  console.log(string);
};
sayHi("'Привет, VSC'");

console.log(__dirname);
console.log(__filename);
