# 자바스크립트 이벤트
- DOM 이벤트는 이벤트 중심 프로그래밍 언어가 DOM 트리 내의 요소 노드(HTML, XHTML, SVG 등)에 `이벤트 처리기/수신기`를 등록할 수 있도록 한다.
- DOM과 마찬가지로 다양한 웹 브라우저에서 사용되는 이벤트 모델에는 몇 가지 차이점이 있었는데, 이로 인해 호환성 문제가 발생했다. 이를 해결하기 위해 `W3C`에서는 `DOM Level 2`에서 이벤트 모델을 표준화하였다.

## 이벤트 핸들링 모델
### DOM Level 0에서의 이벤트 핸들링 모델
- 이 이벤트 핸들링 모델은 `Netscape Navigator`에서 소개되었으며, 인라인 모델과 기존 모델의 두 가지 모델 유형이 있다.
__인라인 모델__
- 인라인 모델에서 이벤트 핸들러는 태그의 속성으로 추가된다.
  - 예 : `<button onclick="alert('Hello, Event!'); return false;"></button>`
  - `JavaScript 엔진`이 `onclick`속성의 내용을 포함하는 익명 함수를 생성하며, `<button>`의 onclick 핸들러는 다음 익명 함수에 바인드된다.
```js
function () {
  alert('Hello, Event!');
  return false;
}
```
__기존 모델__
- 기존 모델에서 스크립트로 이벤트 핸들러를 추가하거나 제거할 수 있다.
- 인라인 모델처럼 각 이벤트는 하나의 이벤트 핸들러만 등록할 수 있다.
- 이벤트는 태그의 이벤트 속성에 핸들러 이름을 할당하여 추가되며, 이벤트 핸들러를 제거하려면 속성을 `null`로 설정한다.
- 인자를 넘기기 위해 클로저 개념을 사용할 수도 있다.
```js
function triggeredEvent() {
  console.log('Event is fired!');
}

window.onload = triggeredEvent;
window.onload = null;

document.onclick = (function (str) {
  return function () {
    console.log(str);
  };
})('Event is fired!');
```

### DOM Level 2에서의 이벤트 핸들링 모델
- `W3C`에서는 보다 유연한 이벤트 핸들링 모델을 설계했다.
- `addEventListener`를 통해 이벤트 대상에 이벤트 리스너를 등록할 수 있다. (IE 구버전에서는 `attachEvent`를 사용한다.)
- `removeEventListener`를 통해 이벤트 대상에서 이벤트 리스터를 제거할 수 있다. (IE 구버전에서는 `detachEvent`를 사용한다.)
- `dispatchEvent`를 통해 구독된 이벤트 리스너에 이벤트를 보낼 수 있다. (IE 구버전에서는 `fireEvent`를 사용한다.)
- `DOM Level 0`과는 달리, 동일한 이벤트에 대해 여러 이벤트 핸들러를 등록할 수 있으며, `useCapture` 옵션을 통해 캡처 단계에서 핸들러를 호출하도록 지정할 수 있다.
- 이벤트가 버블링되지 않게 하기위해 이벤트 객체의 `stopPropagation` 메소드를 호출한다. (IE 구버전에서는 이벤트 객체의 `cancelBubble` 속성을 `true`로 한다.)
- 이벤트의 기본 동작이 호출되지 않게 하기위해 이벤트 객체의 `preventDefault`메소드를 호출한다. (IE 구버전에서는 이벤트 객체의 `returnValue` 속성을 `false`로 한다.)
- 더 자세한 내용은 [링크](https://en.wikipedia.org/wiki/DOM_events#DOM_Level_2)에서 볼 수 있다.

## 이벤트 종류
- 공통/W3C 이벤트 : 대부분의 요소 노드에서 생성할 수 있는 이벤트들이다.
  - 마우스 이벤트
  - 키보드 이벤트
  - HTML 프레임 / 객체 이벤트
  - HTML 폼 이벤트
  - UI 이벤트
  - 변경 이벤트(문서 구조에 대한 변경 사항 알림)
  - 진행 이벤트(XMLHttpRequest, File Api 등에서 사용)
- 터치 이벤트 : iOS, Android 등과 같은 터치 지원 디바이스에서 실행되는 웹 브라우저는 추가 이벤트를 생성한다.
- 포인터 이벤트 : 마우스, 터치 패털, 펜 등을 포함한 입력장치가 있는 장치의 웹 브라우저는 통합 입력 이벤트를 생헝한다.
- 인디 UI 이벤트
- Internet Explorer 관련 이벤트
- XUL 이벤트
- 더 자세한 내용은 [링크](https://en.wikipedia.org/wiki/DOM_events#HTML_events)에서 볼 수 있다.

## 이벤트 흐름
- 이벤트 흐름은 이벤트가 전달되는 과정으로, 이벤트는 먼저 대상 요소에 도달할 때까지 캡처된 다음 위로 올라간다.
- 예를 들어, `<main>` 요소 안에 `<button>`요소가 있다고 가정한다. 이 때, `<button>`요소에 `click` 이벤트가 발생하면, `<button>`요소는 물론, `<main>`요소도 이벤트를 감지할 수 있다. 이렇게 중첩되는 요소가 있는 구조에서 이벤트가 발생할 때, 다음과 같이 이벤트가 발생한다.
  - Event capturing 단계 : `document` ▶ `<html>` ▶ `<body>` ▶ `<main>` ▶ `<button>` (이벤트를 가로채는 단계)
  - Target : `<button>` (실제 타겟이 이벤트를 가져오는 단계)
  - Event bubbling 단계 : `<button>` ▶ `<main>` ▶ `<body>` ▶ `<html>` ▶ `document` (이벤트에 최종 응답을 허용하는 단계)

### 이벤트 버블링 예제
```html
<!DOCTYPE>
<html onclick="onClick(this);">
<head>
  <title>Event Bubbling</title>
  <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
</head>
<body onclick="onClick(this);">
  <main onclick="onClick(this);">
    <button onclick="onClick(this);">Click me!</button>
  </main>
  <script>
  function onClick(element, e) {
    e = window.event || e;
    console.log(element.nodeName);
  }
  </script>
</body>
</html>
```
- 이 예제 코드를 실행하면, 콘솔창에 `BUTTON` ▶ `MAIN` ▶ `BODY` ▶ `HTML`이 출력되는 것을 볼 수 있다.

#### 이벤트 버블링 방지하기
- 위에서 언급한 것처럼 다음과 같은 코드를 삽입한다.
```js
function onClick(element, e) {
  e = window.event || e;
  console.log(element.nodeName);

  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
}
```

### 이벤트 캡쳐링 예제
- `addEventListener`의 `useCapture`를 통해 이벤트 캡처링 방식으로 이벤트를 핸들링할 수 있다.
```html
<!DOCTYPE>
<html>
<head>
  <title>Event Capturing</title>
  <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
</head>
<body>
  <main>
    <button>Click me!</button>
  </main>
  <script>
  // DOM LEVEL 2 Event Model 처리 함수
  function addEvent(element, type, handler, capture) {
    type = typeof type === 'string' && type || '';
    handler = handler || function () {};

    if (element.addEventListener) {
      element.addEventListener(type, handler, capture);
    } else if (element.attachEvent) { // For IE8
      element.attachEvent('on' + type, handler);
    }

    return element;
  };

  addEvent(window, 'load', function () {
    addEvent(document, 'click', function (e) {
      var event = e || window.event,
          target = e.target || e.srcElement;

      console.log(this.nodeName, target.nodeName);
    }, true);

    addEvent(document.documentElement, 'click', function (e) {
      var event = e || window.event,
          target = e.target || e.srcElement;

      console.log(this.nodeName, target.nodeName);
    }, true);

    addEvent(document.body, 'click', function (e) {
      var event = e || window.event,
          target = e.target || e.srcElement;

      console.log(this.nodeName, target.nodeName);
    }, true);

    addEvent(document.querySelector('main'), 'click', function (e) {
      var event = e || window.event,
          target = e.target || e.srcElement;

      console.log(this.nodeName, target.nodeName);
    }, false);

    addEvent(document.querySelector('button'), 'click', function (e) {
      var event = e || window.event,
          target = e.target || e.srcElement;

      console.log(this.nodeName, target.nodeName);
    }, true);
  }, false);
  </script>
</body>
</html>
```
- 이 예제 코드를 실행한 뒤 버튼을 클릭하면, 콘솔창에 `#document BUTTON` ▶ `HTML BUTTON` ▶ `BODY BUTTON` ▶ `BUTTON BUTTON` ▶ `MAIN BUTTON`이 출력되는 것을 볼 수 있다.
  - `MAIN BUTTON`이 가장 늦게 출력되는 이유는 이벤트 버블링 방식으로 이벤트가 등록되기 때문이다.
  - 구버전의 IE에서 이를 수행하면, 이벤트 버블링 방식으로 `BUTTON BUTTON` ▶ `MAIN BUTTON` ▶ `BODY BUTTON` ▶ `HTML BUTTON` ▶ `#document BUTTON`가 출력된다.

## 참조
- [Wiki : DOM events](https://en.wikipedia.org/wiki/DOM_events)
- [Tutorials Park : Javascript : Event Flow](http://www.tutorialspark.com/javascript/JavaScript_Event_Flow.php)

