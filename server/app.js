const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')

const io = require('socket.io')(server,{
    cors: {
        origin:'*',
        methods:['GET','POST']
    }
})

app.use(cors())


io.on('connection',(socket) => {
    //return the socket id back to the client

    socket.emit('getId',socket.id)

    //handle call user 

    socket.on('calluser',(userToCall,signalData,from,name) => {
        //send proper information to call recipient 
        io.to(userToCall).emit('calluser',{signal:signalData,from,name})
    })

    //handle answer call
    socket.on('answercall',(data) => {
        //notify caller of acceptance
        io.to(data.to).emit('callaccepted',data.signal)
    })
})

app.get('/',(req,res) => {
    res.status(200).json({
        message:"Server is up and running 🔥"
    })
})
const PORT = 5000 || process.env.PORT

server.listen(PORT,() => {
    console.log(`**** SERVER IS LISTENING ON PORT ${PORT} ****`)
})