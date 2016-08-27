# Meta 태그
## Social Media 을 위한 Meta 태그
<p>Facebook 이나 Twitter 에 URL 을 공유하면, 대표이미지와 제목, 내용 등이 보이게 된다. 이와 같은 속성을 설정하는 방법을 알아보겠다.</p>
<p>먼저, 페이스북은 Open Graph protocol 을 사용하는데, 자세한 정보는 <a href="http://ogp.me/">Open Graph 공식 홈페이지</a>에서 볼 수 있다.<br />많은 속성들이 보이는데, 자주 쓰이게 되는 속성은 다음과 같다.</p>
```html
<meta property="og:title" content="제목" />
<meta property="og:description" content="설명" />
<meta property="og:image" content="대표 이미지" />
<meta property="og:url" content="표준 링크(같은 콘텐츠를 가리키는 여러 개의 URL 중 대표 URL)" />
```
<p>트위터는 Open Graph protocal 과 유사한 meta 태그를 사용하며, 다음과 같은 속성을 사용하면 된다.</p>
```html
<meta name="twitter:title" content="제목" />
<meta name="twitter:description" content="설명" />
<meta name="twitter:image" content="대표 이미지" />
<meta name="twitter:card" content="트위터 카드 타입" />
<!-- 트위터 카드 타입은 summary_large_image, summary, photo 중 하나를 선택할 수 있다. -->
```
<p>이 때, title, description, image 는 prefix 만 다르고, 모두 같은데, 두 번씩 써줘야 하나? 라는 의문이 생길 수 있다.<br /> Twitter 는 Twitter 용 메타태그를 Open Graph 로 대체할 수 있도록 허용하기 때문에 다음과 같이 설정하면 된다.</p>
```html
<meta property="og:title" content="제목" />
<meta property="og:description" content="설명" />
<meta property="og:image" content="대표 이미지" />
<meta property="og:url" content="표준 링크(같은 콘텐츠를 가리키는 여러 개의 URL 중 대표 URL)" />
<meta name="twitter:card" content="트위터 카드 타입" />
```
<p>이미지에 대한 가이드라인이 있는데 각각 다음과 같다.<br />페이스북은 이미지의 사이즈가 최소 1200x630 픽셀보다 크기를 권장하며, 1.91:1 의 비율인 이미지가 오길 권장한다.<br />트위터는 파일 사이즈가 1MB 보다 크기를 권장한다.</p>

### Meta 태그 검증하기
__페이스북__
https://developers.facebook.com/tools/debug/sharing/

__트위터__
https://cards-dev.twitter.com/validator

### 기타 메타 태그
```html
<meta name="og:site_name" content="사이트 이름" />
<meta name="twitter:image:alt" content="이미지 대체 텍스트" />
```

## IE 11 고정된 사이트 기능
<p>사이트를 고정하거나 즐겨찾기로 저장, 자주 보는 사이트로 표시를 할 때, 시각적인 효과를 주기위해 다음과 같은 메타 태그를 사용할 수 있다.</p>
```html
<meta name="application-name" content="사이트 이름" />
<meta name="msapplication-TileColor" content="#FFFF" />
<meta name="msapplication-TileImage" content="대표 이미지" />
```

## Icon (파비콘, 터치아이콘) 설정하기
```html
<link rel="shortcut icon" href="아이콘" />
<link rel="apple-touch-icon" href="아이콘" />
<link rel="apple-touch-icon" sizes="114x114" href="아이콘" />
<link rel="apple-touch-icon" sizes="72x72" href="아이콘" />
```

