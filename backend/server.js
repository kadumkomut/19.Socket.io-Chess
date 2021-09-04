const app = require('express')();
const server = require('http').createServer(app);

const io = require('socket.io')(server,{
    cors:{
        origin:"*"
    }
})

// unique id
const crypto = require('crypto')
const randomId = () => crypto.randomBytes(8).toString("hex");

const users = {};
const game = {};

// middle ware
io.use((socket,next)=>{
    let user = {
        username : socket.handshake.auth.username,
    }
    users[socket.id] = user;
    next();
})


io.on('connection',(socket)=>{
    console.log('iam connected')
    io.emit('list',users);

    
    socket.on('create',(res)=>{
        const gameid = randomId();
        let data = {
            white : socket.id,
            whiteUsername : socket.handshake.auth.username
        }
        game[gameid] = data;
        console.log(res);
        let id = socket.id
        delete users[socket.id]
        io.emit('list',users);
        io.to(res).emit('create',{gameid, id});
    })

    socket.on('join',({gameid,id,myid})=>{
        let data = game[gameid];
        data['black'] = socket.id;
        data['blackUsername'] = socket.handshake.auth.username
        game[gameid] = data;
        delete users[socket.id]
        io.emit('list',users);
        io.to(id).to(myid).emit('join',game[gameid]);
    })

    socket.on('move',(res)=>{
        io.to(res.otherid).emit('move', res);
        console.log(res)
    })


    socket.on('disconnect',()=>{
        console.log('disconnect')
    })
    
})

const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log("server is listening on port 5000")
})