# Handlebars 사용하기
- Handlebars 는 클라이언트 사이드 템플릿 엔진으로 Mustache 를 기반으로 만들어졌다.

## Basic Usage
__HTML__
```html
<script type="text/javascript" src="path/to/handlebars.js"></script>
<script id="index-hbs" type="text/x-handlebars-template">
<section id="container">
  {{!COMMENT}}
  {{each articles}}
  {{if @first}}
  <article>
    <h2>
      {{title}}
    </h2>
    <p>
      {{content}}
    </p>
  </article>
  {{/if}}
  {{/each}}
</section>
</script>
```
- 핸들바 js 를 import 시킨 뒤, &gt;script&lt; 태그에 렌더링하고자 하는 내용을 작성한다.
- 주석은 `{{!COMMENT}}`, 조건문은 `{{if CONDITION}} CODE {{/if}}`, 반복문은 `{{each OBJECT}} CODE {{/each}}` 와 같이 사용한다.

__Java Script__
```js
// Get handlebars template
const hbsContents = $("#index-hbs").html();

// Compile handlebars template
const compiledHbs = Handlebars.compile(hbsContents);

// The data that binding to handlebars
const data = {
  articles: [
    { title: 'title 1', content: 'content 1', },
    { title: 'title 2', content: 'content 2', },
    { title: 'title 3', content: 'content 3', }
  ]
};

// Generate HTML with handlebars
const html = compileHbs(data);

// Append HTML to body
$('body').append(html);
```

## I will add..
- Use Partial Template
- Use External Handlebars Template
- Use Helper

