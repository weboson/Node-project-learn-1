//=====================================================================================================
//=============================ПО ВИДЕО ВЛАДИЛЕНА:https://www.youtube.com/watch?v=3aGSqasVPsI&t=995s===
//=================================================В ДОКУМЕНТЕ: Конспект по лекции Node.js===============


//const path = require('path');  // так как я переключил режим с commonjs на es-модуль, 
// ведь cowsay больше не поддерживает require, и два режима разом нельзя использвовать
// поэтому я подключу в режиме EcmaScript, то есть "import/export"

//документация на молуль path: https://nodejs.org/api/path.html#pathdirnamepath
import path from 'path';

//расширение файла
const p = path.extname('path.js');

console.log(p); //  = вернуло js




// ОСТАНОВИЛСЯ ЗДЕСЬ - -ИЩУ МОДУЛЬ КОТОРЫЙ ВЫВЕДЕТ ПУТЬ ТЕКУЩЕГО ФАЙЛА
//имя файла:
const name = path.basename('C:\\temp\\myfile.html');
// Returns: 'myfile.html'