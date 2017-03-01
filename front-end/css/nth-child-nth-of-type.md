# nth-child vs nth-of-type
- `nth-child()` 와 `nth-of-type()` 는 문서 트리 내의 정보를 기반으로 요소를 선택할 수 있게 해주는 구조적인 의사 클래스이다.
- `nth-child()` 와 `nth-of-type()` 는 비슷하지만, 다른 방식으로 작동한다.
  - `nth-child() vs nth-of-type()` 의 비교 http://jsfiddle.net/8acbf5ar

## nth-child()
- `nth-child()` 는 형제 사이의 요소 위치를 나타낼 수 있게 해주며, 숫자를 기반으로 요소를 선택한다.
- `nth-child()` 안에 들어가는 수는 `1차 방정식`과 같이 표현된다.
  - `an + b` 와 같은 식으로 표현되며, `a`, `b` 는 모두 정수이다.
  - 단일 정수만을 넘길 수도 있다.
- 다음과 같이 표현되는 선택자는 모든 요소를 선택한다.
```css
:nth-child(1n + 0) { /* styles */ }
:nth-child(n + 0) { /* styles */ }
:nth-child(1n) { /* styles */ }
```

- `odd` 와 `even` 키워드를 통해 홀수/짝수 요소를 선택할 수도 있다.
```css
:nth-child(odd) { /* styles for odd elements */ }
:nth-child(2n+1) { /* styles for odd elements */ }

:nth-child(even) { /* styles for even elements */ }
:nth-child(2n+0) { /* styles for even elements */ }
```

- 하지만, 동일 레벨 노드에 여러 종류의 요소가 있는 곳에서 `:nth-child()` 와 `.class` 또는 `element` 선택자를 조합하여 사용하는 경우, 예상치 못한 결과가 발생할 수 있다.
  - 이 예는 코드를 통해 설명한다.
```css
.parent div:nth-child(1) {
  color: #f00;
}
```
```html
<div class="parent">
  <p>this is paragraph.</p>
  <div>this is divider.</div><!-- This element will not selected. -->
  <p>this is paragraph.</p>
  <div>this is divider.</div>
</div>
```

- 여러 클래스 혹은 태그가 존재하는 곳에서 `.class` 혹은 `element` 셀렉터를 `nth-child()` 와 같이 사용할 때, 선택이 제대로 되지 않는 이유는 선택자가 대상으로 하는 요소가 실제로 존재하지 않기 때문이다.
- 위 선택자가 요소를 선택하는 순서는 다음과 같다.
  - `.parent` 의 모든 하위 요소를 선택
  - 선택된 하위 요소들 중 유형에 관계 없이 1 번째 요소를 찾는다.
  - 선택된 1 번째 요소가 `div` 인지 확인하며, 이 요소는 `div` 가 아니므로 아무 것도 선택되지 않는다.
- 위와 같이 `.class`, `element` 등과 함께 조합하여 `n` 번째 요소를 찾으려면, `nth-of-type()` 를 사용한다.

## nth-of-type()
- `nth-of-type()` 은 숫자를 기반으로 요소를 선택하는 데 사용된다.
- 위에서 설명했듯이 `nth-child()` 와는 조금 다른 방식으로 작동하는데, 동일 레벨 노드의 동일한 유형 요소 사이에서 요소의 위치를 나타낸다.
- `nth-child()` 와 마찬가지로 `an + b` 와 같이 선택하고자 하는 것을 표현할 수 있으며, `odd`, `even` 도 사용 가능하다.
- 위 예시 코드에서 `nth-child` 라는 키워드만 바꾼다면, 원하는 요소를 선택할 수 있다.
```css
.parent div:nth-of-type(1) {
  color: #00f;
}
```
```html
<div class="parent">
  <p>this is paragraph.</p>
  <div>this is divider.</div><!-- This element will selected. -->
  <p>this is paragraph.</p>
  <div>this is divider.</div>
</div>
```
- 위 선택자가 요소를 선택하는 순서는 다음과 같다.
  - `.parent div` 인 요소를 모두 선택한다.
  - 선택된 요소들 중, 1 번째 요소를 찾는다.

