# PSD JS
> `psd.js`는 `PSD.rb`기반의 `PSD`파서로 `Node.js`와 브라우저 모두에서 사용될 수 있다.

## 기능
- 문서 구조 및 크기
- 레이어/폴더 크기 + 위치, 이름, 가시성, 투명도
- 폰트 데이터
- 텍스트 영역 내용
- 폰트 종류, 크기, 색상
- 색상 모드 및 비트 심도
- 벡터 마스크 데이터
- 병합된 이미지 데이터
- 레이어 구성요소

## 설치
```
$ npm i psd
```

## 사용
__Node.js__

```js
import PSD from 'psd';

PSD
  .open('PATH/TO/FILE.PSD')
  .then(psd => psd.image.saveAsPng('./output.png'))
  .then(() => {
    console.log('Finished');
  });
```

__Browser__
```js
const PSD = require('psd');

PSD
  .fromURL('PATH/TO/FILE.PSD')
  .then(psd =>
    document.getElementById('image-container').appendChild(psd.image.toPng()));

function getImageFromEvent(e) {
  PSD.fromEvent(e).then(psd => console.log(psd.tree().export()));
}
```
