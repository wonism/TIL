# React-Router 사용하기
__nginx__
```
location / {
    root   html;
    index  index.html index.htm;

    # 추가
    try_files $uri /index.html;
}
```

__Node.JS (Express JS)__
```js
app.use(express.static(__dirname + '/public'));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});
```

