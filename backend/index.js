const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
var cors = require('cors')
const auth = require('./routes/authRoute')
const test = require('./middlewares/authMiddleware')
const { Server } = require('socket.io');

dotenv.config()

// db config
connectDB();

const app = express();

// middlewares
app.use(cors())
app.use(express.json());

//api 
app.use('/api/auth',auth)


const PORT = process.env.PORT || 8080;

const server=app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`)
})

const io = new Server(server,{
    // pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });;

io.on('connection',(socket)=>{


    console.log(`connected id is ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('user disconnected');
      })

      socket.on('message',(messageData)=>{
        socket.broadcast.emit('recieve', messageData);
    })

    socket.on('codechange',(messageData)=>{

      console.log(messageData.code);
socket.broadcast.emit('codeadded', messageData);
    })


    socket.on('outputchange',(outputData)=>{

      socket.broadcast.emit('outputchange', outputData)
  })

  socket.on('inputchange',(inputData)=>{
    socket.broadcast.emit('inputchange', inputData)

})
//webRTC code
socket.on('room:join',data=>{
  const {username,roomId} = data;
  io.to(roomId).emit('user:joined',{username,id:socket.id})
  socket.join(roomId)
  io.to(socket.id).emit('room:join',data);
})
socket.on('user:call',({to, offer})=>
  {
    io.to(to).emit('incoming:call',{from:socket.id,offer})
  })
  socket.on('call:accepted',({to,ans})=>{
    io.to(to).emit('call:accepted',{from:socket.id,ans})
  })
  socket.on('peer:nego:needed',({to,offer})=>{
    console.log('peer:nego:needed', offer)
    io.to(to).emit('peer:nego:needed',{from:socket.id,offer})
    
  })
  socket.on('peer:nego:done',({to,ans})=>{
    console.log('peer:nego:done',ans);
    io.to(to).emit('peer:nego:final',{from:socket.id,ans})
    
  })
})






