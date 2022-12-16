const http = require('http').createServer().listen(process.env.PORT || 3000, '0.0.0.0');
const io = require('socket.io')(http)

io.on('connection', (socket => {
    console.log(socket.id)
    socket.on('my-msg', (data) => {
        console.log(data)
    })
    socket.on("join-room", (room, cb) => {
        socket.join(room)
        if (cb) {

            cb(room)
        }
    })
    // socket.emit('my-msg', "AA")
    socket.on("from-native", (char, roomName) => {
        if (char["key"]) {
            io.to(roomName).emit('my-message', char)

        } else {
            const newX = (((char["x"] - 0) * (1980 - 0)) / (350 - 0)) + 0
            const newY = (((char["y"] - 0) * (1080 - 0)) / (222 - 0)) + 0
            io.to(roomName).emit('my-message', { x: newX, y: newY })
        }
        // console.log(char)

        //! for emit use io.emit
    })
}))
