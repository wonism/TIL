# Real-Time Chatting App with Faye
> Express JS에서 실시간 채팅앱을 개발할 때, 자주 사용되는 라이브러리 중 하나는 `socket.io`이다. 하지만, 여기에서는 `Bayeux`프로토콜을 기반으로 하는 `Faye`라는 라이브러리를 사용한다.

## 프로젝트 생성
```js
$ express chat-with-faye --ejs
$ cd chat-with-faye

# 의존성 설치
$ yarn && yarn add faye
```

## 서버 사이드
__bin/www__
```js
var app = require('../app');
var debug = require('debug')('faye-express:server');
var http = require('http');

// Add faye
var faye = require('faye');
var bayeux = new faye.NodeAdapter({ mount: '/faye', timeout: 45, });

/* ... */

var server = http.createServer(app);
// Attach bayeux
bayeux.attach(server);

/* ... */
```

## 클라이언트 사이드
__views/index.ejs__
```html
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <main>
    <h3>Messages</h3>
    <ul id="messages-history">
    </ul>
    <form id="message-form">
      <input id="id" type="hidden" value="<%= Date.now().toString().substr(9) %>" />
      <input id="new-message" type="text" placeholder="Messages..." />
      <input id="send-message" type="submit" value="Send" />
    </form>
  </main>
  <script type="text/javascript" src="/javascripts/faye-browser-min.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script>
    $(document).ready(function () {
      // Create the Faye client.
      var client = new Faye.Client('/faye');

      $('body').on('click', '#send-message', function (e) {
        e.preventDefault();

        var $newMessage = $('#new-message');

        // Publish new message to channel (/messages)
        client.publish("/messages", {
          id: $('#id').val(),
          text: $newMessage.val(),
        })

        $newMessage.val(null);
      });

      // Setup the client to subscribe the channel (/messages)
      client.subscribe('/messages', function (newMessage) {
        $('#messages-history').append('<li>' + newMessage.id + ' says : ' + newMessage.text + '</li>')
      });
    });
  </script>
</body>
</html>
```

## 서버에 메시지 저장하기
__app.js__
```js
/* ... */
var Faye = require("faye")
var client = new Faye.Client('http://localhost:3000/faye');

/* ... */

client.subscribe('/messages', function (newMessage) {
  // Do something ...
  console.log('New Message : ', newMessage);
});
```

## 참고
https://faye.jcoglan.com/

