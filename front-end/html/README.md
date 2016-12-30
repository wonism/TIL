# HTML5
## 목차
- 태그 관련 [(바로 가기)](#태그-관련)
  - 모바일 환경에서 상황에 맞는 키보드 띄우기 [(바로 가기)](#모바일-환경에서-상황에-맞는-키보드-띄우기)
  - table 태그와 max-width [(바로 가기)](#table-태그와-max-width)
  - Anchor 태그의 mailto 사용하기 [(바로 가기)](#Anchor-태그의-mailto-사용하기)

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

### table 태그와 max-width
- `max-width` 는 `display: inline;` 인 엘리먼트나 테이블을 제외한 엘리먼트에만 적용되는 속성이다.
- 따라서, 테이블 태그에 가로 길이 제한을 주기 위해서는 `display` 를 `block` 과 같은 값으로 설정한다.

```css
table {
  display: block;
  max-width: 100%;
}
```
- 참고 : [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width)

### Anchor 태그의 mailto 사용하기
- `<a>` 태그의 `href` 에 `mailto:` 를 사용한다.
- 참조를 추가할 땐, Query String 에 `cc=MAIL_ADDRESS@DOMAIN.COM` 를 작성한다.
- 숨은 참조를 추가할 땐, Query String 에 `bcc=MAIL_ADDRESS@Domain.COM` 을 작성한다.
- 여러 사람에게 메일을 보내게 할 때에는 받는 사람 사이에 `,` 를 추가하여, 코드를 작성한다. `참조`, `숨은 참조` 에도 적용할 수 있다.
- 제목을 추가할 땐, Query String 에 `subject=TITLE_OF_MAIL` 을 작성한다.
- 본문을 추가할 땐, Query String 에 `body=MAIL_CONTENTS` 을 작성한다.

```html
<!-- 기본 사용 방법 -->
<a href="mailto:MAIL_ADDRESS@DOMAIN.COM">Send mail</a>

<!-- 참조 추가하기 -->
<a href="mailto:MAIL_ADDRESS@DOMAIN.COM?cc=CC@DOMAIN.COM">Send mail</a>

<!-- 숨은 참조 추가하기 -->
<a href="mailto:MAIL_ADDRESS@DOMAIN.COM?bcc=BCC@DOMAIN.COM">Send mail</a>

<!-- 여러 사람에게 메일 보내기 -->
<a href="mailto:MAIL_ADDRESS@DOMAIN.COM,MAIL_ADDRESS_2@DOMAIN.COM">Send mail</a>

<!-- 제목 추가하기 -->
<a href="mailto:MAIL_ADDRESS@DOMAIN.COM?subject=TITLE">Send mail</a>

<!-- 본문 추가하기 -->
<a href="mailto:MAIL_ADDRESS@DOMAIN.COM?body=CONTENTS">Send mail</a>
```

