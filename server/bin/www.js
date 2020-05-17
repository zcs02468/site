const app = require("../app");
const debug = require("debug")("demo:server");
const http = require("http");

// 设置端口号7778
const port = normalizePort(process.env.PORT || "7000");
const server = http.createServer(app.callback());


const io = require('socket.io')(server);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);


io.on( 'connection', socket => {
    
    socket.emit('open')
    console.log( '初始化成功' );
    socket.on('send', data=> {
        console.log( '客户端发送的消息', data );
        socket.emit('getMsg', '我是返回的消息... ...');
    })
    socket.on('msg',(data)=>{
        //监听msg事件（这个是自定义的事件）
        console.log(data);//你好服务器
        socket.emit('msg','你好浏览器');
         //向socket用户发送信息
    })
    socket.on('news',(data)=>{
        //监听msg事件（这个是自定义的事件）
        console.log(data,'eeeeeeee');//你好服务器
        socket.emit('news','111111111');
         //向socket用户发送信息
    })
    setTimeout( () => {
        socket.emit('getMsg', '我是初始化3s后的返回消息... ...') 
    }, 3000)
} )




function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) return port;
    if (port >= 0) return port;
    return false;
}

function onError(error) {
    if (error.syscall !== "listen") throw error;

    let bind = typeof port == "string" ? "Pipe " + port : "port " + port;

    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    let addr = server.address();
    let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}
