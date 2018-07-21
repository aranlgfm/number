var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var addr = "";
var name = "apex";

var userIndex = ["aRan", "junYong", "hyoSook", "hyeYeon", "yeNa", "Apex"];

console.log('server start');

// 리스트 만들기
function List() {
    this.elements = {};
    this.idx = 0;
    this.length = 0;
}
List.prototype.add = function (element) {
    this.length++;
    this.elements[this.idx++] = element;
};

List.prototype.get = function (idx) {
    return this.elements[idx];
};

// 접속한 유저 리스트
var userList = new List();

// 서버 포트
http.listen(2700);

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    addr = add;
});

// 메인 페이지 접속
app.get('/', function (req, res) {
    // res.sendfile('chat.ejs');
    res.render('chat.ejs');
});

// 유저 접속
io.on('connection', function (socket) {
    checkUser(socket);
    console.log(name + '-------in');
    // socket.broadcast.emit('guestIn', name);
    io.emit('guestIn', name);
    // for (var i = 0; i < userList.length; i++) {
    //     if (userList[i] == name) {
    //         userList.add(name);
    //     }
    // }
    // io.emit('user list', userList);
    // 채팅 업데이트
    console.log('connection' + name);
    socket.on('chat message', function (msg) {
        checkUser(socket);
        io.emit('chat message', name + ' >> ' + msg);
    });

    // 유저 퇴장
    // socket.on('disconnect', function () {
    //     console.log(name + '-------out');
    //     io.emit('guestOut', name);
    // });
});

// 유저 리스트 확인
var checkUserList = function () {

}

// 유저 확인
var checkUser = function (socket) {
    var addr = socket.client.conn.remoteAddress;

    if (addr == '::1' || addr == '::ffff:192.168.3.12') {
        name = "aRan";
    } else if (addr == '::ffff:192.168.3.3') {
        name = "junYong";
    } else if (addr == '::ffff:192.168.3.14') {
        name = "hyoSook";
    } else if (addr == '::ffff:192.168.3.13') {
        name = "hyeYeon";
    } else if (addr == '::ffff:192.168.3.4') {
        name = "yeNa";
    } else {
        name = "Apex";
    }
}