# D3
> D3는 데이터 시각화 라이브러리로, 데이터를 HTML, CSS, SVG 등을 사용하여 데이터를 그래프 형식으로 보여준다.

## 들어가기 전에..
- [상황에 따른 차트 선택하기](http://extremepresentation.typepad.com/files/choosing-a-good-chart-09.pdf)

## 설치
```sh
$ bower install d3
$ npm i d3
```

```html
<!-- add d3.js in your html -->
<script type="text/javascript" src="PATH/TO/d3.js"></script>

<!-- if you use AMD or CommonJS -->
<script>
  require(["PATH/TO/d3"], function (d3) {
    // Do something..
  });

  /* or */

  var d3 = require("d3");
</script>
```

## 사용방법
### 노드 선택하기
- D3는 selections라고 하는 임의의 노드의 세트에서 작동하는 선언적 접근방식을 사용한다.
```js
// <p>태그 전체를 선택할 때,
d3.selectAll('p');

// <div>태그 하나를 선택할 때,
d3.select('div');
```

### 문자열 추가하기
```js
d3.select('body')
  .append('p')
  .text('Hello, World!');
```

### 그래프 생성하기
```js
const data = [
  { k: 1, v: 1, },
  { k: 2, v: 4, },
  { k: 3, v: 9, },
  { k: 4, v: 16, },
  { k: 5, v: 25, }
];

const p = d3.select('#d3-graph') // <main id="d3-graph">를 선택
  .selectAll('div') // <main> 하위의 모든 <div>를 선택
  .data(data) // 요소에 데이터를 바인딩
  .style('width', d => `${ d.v * 10 }px`) // 요소에 스타일 적용
  .text(d => d.v); // 데이터 출력

p.enter() // 요소와 바인드되지 않는 데이터에 대한 Selection 객체 반환
  .append('div') // enter에 의해 반환된 객체들에 대해 실제 <div> 요소를 생성
  .attr('id', d => d.k) // 생성된 요소에 id를 부여
  .style('width', d => `${ d.v * 10 }px`) // 요소에 스타일 적용
  .text(d => d.v); // 생성된 요소들에 데이터를 출력

p.exit() // 데이터와 바인드되지 않은 요소에 대한 Selection 객체 반환
  .remove(); // exit에 의해 반환된 객체들을 제거
```

__select, selectAll__
- `d3.select('#d3-graph')`의 결과로 반환되는 값은 `Selection`객체로 `D3`의 코드에서 `Selection`생성자 함수를 보면 알 수 있듯이 `_groups`속성과 `_parents`속성을 가진다.
  - `_groups`는 선택된 가장 하위 레벨의 노드 리스트이며, 위 코드에서는 `<main>`이다.
  - `_parents`는 선택된 가장 하위 레벨의 노드 리스트의 부모 노드이며, 위 코드에서는 `<html>`이다.

__data, enter__
- `Selection`의 `data`메소드는 데이터를 `Selection`객체에 바인딩한다.
- `enter`메소드는 `Selection`객체에 바인드된 데이터 중 실제로 요소를 갖지 못하는 데이터를 찾아 새로운 `Selection`객체를 만들고 이를 반환한다.
  - 이후, `enter`로 생성된 가상 요소들을 `append`메소드로 붙여 넣으며, `text`메소드로 `data[n].v`를 출력한다.

__바인딩이란?__
- 바인딩은 특정 요소에 데이터를 연결하는 것과 같으며, 나중에 해당 값을 참조하여 매핑 규칙을 적용할 수 있다.
- 바인딩을 하기 위해선 두 가지가 반드시 필요하다.
  - `데이터`와 `DOM 요소로 구성된 Selection 객체`

### SVG 그래프 생성하기
```js
const data = [
  { k: 1, v: 1, },
  { k: 2, v: 4, },
  { k: 3, v: 9, },
  { k: 4, v: 16, },
  { k: 5, v: 25, }
];

const x = d3.scaleLinear() // 선형 그래프
  .domain([0, d3.max(data, d => d.v)]) // 실제 데이터들의 범위를 지정한다.
  .range([0, 250]); // 화면에 렌더링되는 구간의 범위를 px 단위로 지정한다.

const chart = d3.select('#line-graph') // 그래프의 크기를 지정한다.
  .attr('width', 250) // 가로 : 250px
  .attr('height', 25 * data.length); // 세로 : 25px * 데이터의 개수

const bar = chart.selectAll('g')
  .data(data)
  .enter()
  .append('g')
  .attr('transform', (d, i) => `translate(0, ${ i * 25 })`); // 바마다 25px만큼 간격을 준다.

bar.append('rect') // <g> 안에 <rect>를 추가한다.
  .attr('width', d => x(d.v)) // <rect>의 가로길이는 데이터의 값을 range에 매핑한 값이다.
  .attr('height', 20) // <rect>의 세로길이는 20이다.
  .attr('fill', '#f00'); // rect는 붉은 색으로 칠한다.

bar.append('text') // <g> 안에 <text>를 추가한다.
  .attr('x', 0) // <text>의 x절대좌표는 0이다.
  .attr('y', 10) // <text>의 y절대좌표는 10이다.
  .attr('dy', 5) // <text>의 y상대좌표는 5이다.
  .attr('fill', '#000') // <text>는 흰색이다.
  .text(d => d.v); // <text>의 텍스트는 데이터의 값이다.
```

- `scale 관련 메소드`는 입력된 도메인에서 출력될 범위로 매핑한다.

__domain, range__
- `domain`은 입력 가능한 데이터 값의 범위이다.
- `range`는 출력 가능한 값들의 범위로 범위는 정보 설계자에게 달려있다.
- 예를 들어, 입력 도메인이 `100, 500`이고 출력 범위가 `10, 350`이면, 데이터 100은 10을 반환하고, 500은 350을, 300은 180을 반환한다.

## 예제
- [막대 차트](https://github.com/wonism/TIL/tree/master/front-end/libraries/d3/svg-bar-chart)
- [반응형 차트](https://github.com/wonism/TIL/tree/master/front-end/libraries/d3/responsive-chart)
- [원 그리기](https://github.com/wonism/TIL/tree/master/front-end/libraries/d3/create-circles)

## 참고한 사이트
- https://d3js.org/
- https://bost.ocks.org/
- http://alignedleft.com/tutorials/d3

<!--
## 나중에 참고할 사이트
[bost blog](https://bost.ocks.org)
[awesome d3](https://github.com/wbkd/awesome-d3#charts)
[visual cinnamon](https://www.visualcinnamon.com/category/d3-js)
[SVG Primer](http://alignedleft.com/tutorials/d3/an-svg-primer)
[Introducing d3-scale](https://medium.com/@mbostock/introducing-d3-scale-61980c51545f)
[Introducing d3-shape](https://medium.com/@mbostock/introducing-d3-shape-73f8367e6d12)
[d3-selections](https://github.com/d3/d3-selection#d3-selection)
[Thinking with Joins](https://bost.ocks.org/mike/join/)
[d3-collection](https://github.com/d3/d3-collection/blob/master/README.md#d3-collection)
[d3-hierarchy](https://github.com/d3/d3-hierarchy#d3-hierarchy)
[d3-zoom](https://github.com/d3/d3-zoom#d3-zoom)
[d3-zoom examples](http://blockbuilder.org/search#text=zoom;user=mbostock;d3version=v4)
[d3-force](https://github.com/d3/d3-force#d3-force)
[block builder search](http://blockbuilder.org/search)
[Scott Murray Blog](http://alignedleft.com/tutorials/d3/chaining-methods)
[Aligned Left's project](http://alignedleft.com/projects/2014/easy-as-pi/)
-->

