// МОДУЛ events (события)
// Тайм-код "1:04": https://youtu.be/243pQXC5Ebs?t=3894
// Станица в nodejs.org: https://nodejs.org/dist/latest-v17.x/docs/api/events.html

// СВОИМИ СЛОВАМИ:
//также хороший видеоролик (решил повторить проект по этому видео в папке "Node-project-learn №2") на эту тему: https://www.youtube.com/watch?v=RFh85sV8080
//Если коротко, своими словами, то: если, что-то происходит (запрос на сервер, удаление процесса, да что-угодно), 
// то это событие можно зарегистрировать, а потом сделать что-то в ответ (в следствие события)
// И именно благодаря классу events  в nodejs мы можем работать с этими событиями (действиями), 
// и что-то делать в ответ на эти события, лубой функционал

// этот момент (события в nodejs) используется на примере:
// в одном файле вешается прослушиватель (emitter.on("любое имя события"))
// в другом, где происходит событие, мы пишем emitter.emit() - она запусает событие, то есть мы сами регистрируем и запускаем событие
// типа пишем условие, если что-то сделано, то запустите событие emitter.emit(), а потом можете ответить на это событие emitter.on()

// ПРИМЕРЫ ИЗ ДОКУМЕНТАЦИИ NODE.JS:
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

// const myEmitter = new MyEmitter();
// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });
// myEmitter.emit('event');

const myEmitter = new MyEmitter();
myEmitter.on('event', function(a, b) {
  console.log(a, b, this, this === myEmitter);
  // Prints:
  //   a b MyEmitter {
  //     domain: null,
  //     _events: { event: [Function] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined } true
});
myEmitter.emit('event', 'a', 'b');