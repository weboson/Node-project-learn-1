// смотря в одно видео, дошел до момента с темой "cluster" и ничего не понял, 
// https://youtu.be/243pQXC5Ebs?t=3651
// поэтому перешел на лдругое видео, чтобы понять тему:
// https://youtu.be/YHPWG23cS4c

const http = require('http'); // подключим модуль сервера
const pid = process.pid; // модуль глобальный, подключать не нужно. Просто сохраним id процесса

// создали сервер
http.createServer((req, res) => {
    res.end("Hello, from Nodejs")
// установили какой-то слушатель   
}).listen(8800, () => {
    console.log(`Server started.Pid: ${pid}`); // Server started.Pid: 13924
});
// Далее убили процесс, написав в терминал: kill 13924
