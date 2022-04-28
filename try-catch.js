//  ПОВТОРЯЮ, ЧТОБЫ ВСПОМНТИТЬ ЕКОТОРЫЕ ГЛАВЫ:
// КЛАССЫ

// Базовый синтаксис для классов выглядит так:
// class MyClass {
//   prop = value; // свойство
//   constructor(...) { // конструктор
//     // ...
//   }
//   method(...) {} // метод
//   get something(...) {} // геттер
//   set something(...) {} // сеттер
//   [Symbol.iterator]() {} // метод с вычисляемым именем (здесь - символом)
//   // ...
// }
// 
// …Впрочем, обычно мы не хотим полностью заменить родительский метод, а скорее хотим сделать новый на его основе, изменяя или расширяя его функциональность. Мы делаем что-то в нашем методе и вызываем родительский метод до/после или в процессе.

// У классов есть ключевое слово "super" для таких случаев.

// super.method(...) вызывает родительский метод.
// super(...) вызывает родительский конструктор (работает только внутри нашего конструктора).







// Повторяю главу "Обработка ошибок, "try..catch"": https://learn.javascript.ru/try-catch 

// try {
//   lalala; // ошибка, переменная не определена!
// } catch (err) {
//   console.log(err.name); // ReferenceError
//   console.log(err.message); // lalala is not defined
//   console.log(err.stack); // ReferenceError: lalala is not defined at (...стек вызовов)

//   // Можем также просто вывести ошибку целиком
//   // Ошибка приводится к строке вида "name: message"
//   console.log(err); // ReferenceError: lalala is not defined
// };



// let json = '{ "age": 30 }'; // данные неполны

// try {

//   let user = JSON.parse(json); // <-- выполнится без ошибок

//   if (!user.name) {
//     throw new SyntaxError("Данные неполны: нет имени"); // (*) создаем свою ошибку, со своим сообщением
//   }

//   alert(user.name);

// } catch (e) {
//   alert("JSON Error: " + e.message); // JSON Error: Данные неполны: нет имени
// };


// Шаблон
// try {
//   // исполняем код
// } catch(err) {
//   // если случилась ошибка, прыгаем сюда
//   // err - это объект ошибки
// } finally {
//   // выполняется всегда после try/catch
// }


// let num = +prompt("Введите положительное целое число?", 35)

// let diff, result;

// function fib(n) {
//   if (n < 0 || Math.trunc(n) != n) {
//     throw new Error("Должно быть целое неотрицательное число");
//   }
//   return n <= 1 ? n : fib(n - 1) + fib(n - 2);
// }

// let start = Date.now();

// try {
//   result = fib(num);
// } catch (e) {
//   result = 0;
// } finally {
//   diff = Date.now() - start;
// }

// alert(result || "возникла ошибка");

// alert( `Выполнение заняло ${diff}ms` );


//======================ПРОМИСЫ============================================
// варинат с колбэками, перевожу в вариант в виде промисов
// колбэк
// function loadScript(src, callback) {
//   let script = document.createElement('script');
//   script.src = src;

//   script.onload = () => callback(null, script);
//   script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));

//   document.head.append(script);
// };

// промис
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

    document.head.append(script);
  });
};
// использование промиса
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => console.log(`${script.src} загружен!`),
  error => console.log(`Ошибка: ${error.message}`)
);

promise.then(script => console.log('Ещё один обработчик...'));