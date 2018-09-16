
function socketRouter(server) {
    const io = require('socket.io')(server);

    var socketList = {};
    io.on('connection', function(socket){
        console.log('a user connected',socket.handshake.headers.referer,socket.client.id);
        var socketItem = socketList[socket.id] = {};
        socketItem.socket = socket;


        socket.on('login',function (data) {
            socketItem.userName =data.name;
            updateLinkMan();
        })

        function updateLinkMan(){
            var linkMan=[];
            for(var key in socketList){
                linkMan.push(socketList[key].userName);
            }
            io.emit('updateLinkMan',{data:linkMan})
        }

        socket.emit('connection',{a:'a'});
        socket.on('chat', function(msg){
            setTimeout(function () {
                io.emit('chatCB',{data:msg.content,userName:socketItem.userName});
            },500)
        });
        socket.on('disconnect', function () {
            delete socketList[socket.id];
            updateLinkMan();
            console.log(socketList.toString())
        });
    });

};
module.exports = socketRouter;