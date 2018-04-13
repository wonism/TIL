# 문자열 치환 시 new line 추가
다음과 같은 텍스트 파일이 있다고 가정한다.
```
I want to add new line from here. blah~ blah~
```

`here.` 부분에서 새로운 라인을 추가하고자 한다면,<br />
`:%s/here\.\s/here.^M`을 입력한 뒤, `Return`한다.
여기서 중요한 것은, `^M`은 `Ctrl + V + M`을 통해 입력해야한다는 것이다. (Ctrl은 M을 누를 때까지 누르고 있어야 한다.)
