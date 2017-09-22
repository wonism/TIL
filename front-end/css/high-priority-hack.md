# CSS 우선순위 높이기
- 같은 선택자를 `n` 번씩 사용한다.
```html
<div class="example">
  <!-- color will be blue -->
  Hello
</div>
```
```css
.example.example {
  color: #00f; // higher than .example
}

.example {
  color: #f00;
}
```
