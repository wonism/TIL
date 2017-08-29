# ES2015에서 import로 이미지 불러오기
```js
import * as url from '/PATH/TO/IMAGE/filename.extension';

/* Native DOM */
const image = document.createElement('img');
img.src = url.default;

/* JSX */
<img src={url.default} />
```
