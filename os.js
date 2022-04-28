// МОДУЛ взаимодействия с ОПЕРАЦИОННОЙ СИСТЕМЫ
// Тайм-код "59:10": https://youtu.be/243pQXC5Ebs?t=3539
// Станица в nodejs.org: https://nodejs.org/dist/latest-v17.x/docs/api/os.html

// Фрагмент с nodejs.org: 
// Исходный код: lib/os.js
// Модуль os предоставляет служебные методы и свойства, связанные с операционной системой. 

// Своими словами: os - это модуль. который позволяет взаимодейсвтовать с оперционной системой(os)

// Данный модуль нужно подключать. На сайте продемонстрирован метод "commonjs", а "es-module" не показан. Думаю, оба метода работают
const os = require('os');
const cluster = require('cluster');
const { signal } = require('nodemon/lib/config/defaults');


//!===================================os.platform()===================================
// Возвращает строку, идентифицирующую платформу операционной системы, для которой был скомпилирован двоичный файл Node.js. 
// Значение устанавливается во время компиляции. 
// Возможные значения: «aix», «darwin», «freebsd», «linux», «openbsd», «sunos» и «win32».
//? Возвращаемое значение эквивалентно process.platform.
console.log(os.platform()); // win32

//!===================================os.arch()===================================
// Возвращает архитектуру ЦП операционной системы. 
// Возможные значения: «arm», «arm64», «ia32», «mips», «mipsel», «ppc», «ppc64», «s390», «s390x», «x32» и «x64».
console.log(os.arch()); // x64

//!===================================os.cpus()===================================
// Возвращает массив объектов, содержащих информацию о каждом логическом ядре ЦП.
// Количесвто элементов в массиве это характеризует количество ядер в процессоре
console.log(os.cpus()); 
// [
//     {
//       model: 'Intel(R) Core(TM) i5-4670K CPU @ 3.40GHz',
//       speed: 3406,
//       times: { user: 228843, nice: 0, sys: 239359, idle: 3286484, irq: 33796 }
//     }, ...
// ]
console.log(os.cpus().length); // 4
// попробуем использовать os.cpus().length:
// задействуем каждому нужному ядру наш nodejs-процесс, а также осатвим пару ядер на работу оперционной системы
// отведём 2 ядра (length - 2) для работы опрционной системы, а остальные в нащ nodejs-процесс
for (let i = 0; i < os.cpus().length - 2; i++) {
    let CPUcore = os.cpus[i]; // вызвали (образно) процесс (CPUcore) в нужном количестве, чтобы не перегружать компьютер 
    console.log(" Запущен ещё один nodejs-процесс ")
}
// Повторим свойство process.pid, которое возращает id текущего процесса
console.log(process.pid) // 12872

//!----реализуем некоторую задачу-------------------
// if (cluster.isMaster) {
//     for(let i = 0; i < os.cpus().length - 2; i++) {
//         cluster.fork() // запускаем дочерний процесс
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`Воркер с pid = ${worker.process.pid} умер`) 
//         if (!code) {
//             cluster.fork()
//         } else {
//             console.log('Воркер умер ...')
//         }
//     })
// } else {
//     console.log(`Воркер с pid = ${process.pid} запущен`)

//     setTimeout(() => {
//         console.log(`Воркер с pid = ${process.pid} запущен`)
//     }, 5000)
// }

// console.log(os.platform());
// console.log(os.arch());
// console.log(os.cpus().length);

if (cluster.isMaster) {
    for (let i = 0; i < os.cpus().length - 2; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Воркер с pid = ${worker.process.pid} умер`)
        if(code ===) {
            cluster.fork()
        } else {
            console.log('Воркер умер...')
        }
    })
} else {
    console.log(`Воркер с pid= ${process.pid} запущен`)

    setInterval(() => {
        console.log(`Воркер с pid= ${process.pid} еще работает`)
    }, 5000)
}

console.log(process.env.NODE_UNIQUE_ID);