var express = require('express')
var app = express()
var http = require('http').createServer(app);
const bodyparser = require("body-parser")
const io = require('socket.io')(http, {
    cors: {
        origin: "http://26.116.165.221:3000",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});

io.on("connection",(socket)=>{

    socket.on("disconnect", () => {
        console.log("X desconectou: " + socket.id)
    })

    socket.on("msg", (data) => {
        io.emit("showmsg",data);
        console.log(data)
    })
})

app.set("view engine","ejs")
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())



app.get('/',(req,res)=> {
    res.render('index')
})

http.listen(3000, ()=> {
    console.log("app rodando")
})