# Critical Rendering Path
> 브라우저가 서버로부터 HTML 응답을 받아 화면을 그리기 위해 실행하는 과정

> <p>이 글은 <a href="https://ireaderinokun.com/" target="_blank">Ire Aderinokun</a> 의 허락을 받고, <a href="https://bitsofco.de/understanding-the-critical-rendering-path/" target="_blank">Understanding the Critical Rendering Path</a>라는 글의 일부를 번역한 것입니다.</p>

## CRP 의 6 단계
1. DOM 트리 만들기
2. CSSOM 트리 만들기
3. Java Script 실행
4. Render 트리 만들기
5. 레이아웃 생성하기
6. 페인팅

### DOM 트리 만들기
<p>DOM 트리는 완전하게 파싱된 HTML 페이지의 Object 표현이다.<br />`<html>` 로부터 시작되어, 페이지의 각 element, text 에 대한 노드가 만들어진다.<br /> 다른 요소 내에 중첩된 요소는 자식 노드로 표시되며, 각 노드에는 해당 요소의 특성(attribute) 가 포함된다.</p>
<p>이 예제 코드는 아래 이미지와 같은 DOM 트리를 구성한다.</p>
```html
<html>
<head>
  <title>Understanding the Critical Rendering Path</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Understanding the Critical Rendering Path</h1>
  </header>
  <main>
    <h2>Introduction</h2>
    <p>Lorem ipsum dolor sit amet</p>
  </main>
  <footer>
    <small>Copyright 2017</small>
  </footer>
</body>
</html>
```
<img src="https://github.com/wonism/TIL/blob/master/front-end/browser/images/DOM.png" />
<p>HTML 은 부분적으로 실행될 수 있으며, 페이지에 내용이 표시되기 위해 문서 전체를 로드할 필요가 없다. 하지만, CSS 와 Java Script 는 페이지의 렌더링을 차단할 수 있다.</p>

### CSSOM 트리 만들기
<p>CSSOM 은 DOM 과 관련된 스타일의 Object 표현이다.<br />CSSOM 은 DOM 과 비슷한 방식으로 표현되지만, (명시적으로) 선언되었는지 (암시적으로) 상속되었는지 상관없이 각 노드에 대한 스타일이 포함된다.</p>
<p>위 HTML 예제 코드에서 포함된 `style.css` 는 다음과 같다고 가정하며, 이는 아래 이미지와 같은 CSSOM 트리를 구성한다.</p>
```css
body { font-size: 18px; }

header { color: plum; }
h1 { font-size: 28px; }

main { color: firebrick; }
h2 { font-size: 20px; }

footer { display: none; }
```
<img src="https://github.com/wonism/TIL/blob/master/front-end/browser/images/CSSOM.png" />

<p>CSS 는 렌더링을 차단하는 리소스로, 완전히 파싱되지 않으면 Render 트리를 구성할 수 없다. HTML 과 달리 CSS 는 상속된 계단식 특성때문에 부분적으로 실행될 수 없으며, 문서의 뒷부분에 정의된 스타일은 이전에 정의된 스타일을 덮어쓰게된다.<br />(CSS 전체가 파싱되기 전에 먼저 스타일 시트에 정의한 CSS 스타일을 사용하면, 잘못된 CSS 가 적용되는 상황이 발생할 수 있다. 하지만, 완전히 파싱되기 전까지 렌더링을 차단함으로써 이와 같은 일이 일어나지 않는다.)</p>
<p>`<link rel="stylesheet" />` 태그는 미디어 속성을 받을 수 있고, 미디어 속성은 스타일이 적용되는 미디어쿼리를 지정할 수 있다. 만약, 미디어 속성이 `orientation:landscape` 인 스타일 시트가 있고, 페이지를 세로모드로 보고있는 경우 해당 리소스는 렌더링 블로킹으로 간주되지 않는다.</p>
<p>CSS 는 "스크립트 블로킹" 일수도 있다. 왜냐하면, Java Script 파일은 실행되기 전에 CSSOM 이 생성되는 것을 기다려야 하기 때문이다.</p>

### Java Script 실행
<p>Java Script 는 "파서 차단 리소스" 로 간주된다. 이것은 HTML 문서 자체의 파싱이 Java Script 에 의해 차단된다는 뜻이다.</p>
<p>파서가 내부 태그이든 외부 태그이든 `<script>` 태그에 도달하면, (외부 태그라면, 외부 스크립트를 가져오고) 스크립트를 실행한다. 따라서 문서 내의 요소를 참조하는 Java Script 파일이 있는 경우, 해당 문서가 표시된 후에 오도록 해야한다.</p>
<p>Java Script 가 파서를 차단하는 것을 피하기 위해 `async` 속성을 사용할 수도 있다.</p>

### Render 트리 만들기
<p>Render 트리는 DOM 과 CSSOM 이 합쳐진 것으로 페이지에서 최종적으로 렌더링할 내용을 나타내는 트리이다. `display: none;` 으로 숨겨진 요소는 포함되지 않는다.<br />위의 DOM, CSSOM 예제 코드는 다음 렌더 트리를 생성한다.</p>
<img src="https://github.com/wonism/TIL/blob/master/front-end/browser/images/Render-Tree.png" />

__레이아웃 생성하기__
<p>레이아웃은 뷰포트의 크기를 결정하며, 뷰포트의 크기는 뷰포트의 크기와 관련있는 CSS 스타일에 대한 컨텍스트를 제공한다. 뷰포트 크기는 `<meta>` 태그의 `viewport` 속성을 통해 결정되는데, 기본 뷰포트 너비는 `980px` 이다.</p>
<p>일반적으로 메타태그의 뷰포트 값은 장치 너비에 맞게 설정한다.</p>
```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

### 페인팅
<p>그리는 단계에서는 페이지의 가시적인 내용을 픽셀로 변환하여 화면에 표시한다.</p>
<p>페인팅 단계에서 소요되는 시간은 DOM 의 크기와 적용되는 스타일에 따라 다르다. (예를 들면, 복잡한 gradient 배경은 단순 배경색보다 더 많은 시간이 소요된다.)</p>

## Reference
- https://bitsofco.de/understanding-the-critical-rendering-path/

