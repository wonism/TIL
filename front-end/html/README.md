# HTML5
## 태그 관련
### 모바일 환경에서 상황에 맞는 키보드 띄우기
__숫자만 입력 받기__
```html
<input type="text" pattern="\d*" />
```

__URL 주소 입력 받기__
```html
<input type="url" />
```

### <table> 태그와 max-width
- `max-width` 는 `display: inline;` 인 엘리먼트나 테이블을 제외한 엘리먼트에만 적용되는 속성이다.
- 따라서, 테이블 태그에 가로 길이 제한을 주기 위해서는 `display` 를 `block` 과 같은 값으로 설정한다.

```css
table {
  display: block;
  max-width: 100%;
}
```
- 참고 : [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width)

