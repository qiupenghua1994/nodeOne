
function socketRouter(server) {
    const io = require('socket.io')(server);

    io.on('connection', function(socket){
        console.log('a user connected');
        socket.on('chat', function(msg){
            setTimeout(function () {
                socket.emit('chatCB',{data:msg.content+' copy that'});
            },500)
        });
    });

};
module.exports = socketRouter;