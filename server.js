const { Server } = require("socket.io");
const express = require('express');
const { connect } = require("net");
const app = express();
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000;

http.listen(PORT,()=>{console.log(` port is listing at ${PORT}`)})


// ADD MIDDDLE WARE TO SERVE STATIC FILE
app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

//------------------------------socket

count=0;
const io = require('socket.io')(http)

io.on("connection", (socket) => {
   
    // console.log("connetted")
    count++;
    io.emit('usercnt',count);
    

    socket.on('message',(mssgArr)=>{
        socket.broadcast.emit('message',mssgArr)
    })

    socket.on("disconnect", () => {
        count--;
        io.emit('usercnt',count);
    });
  
  });


  