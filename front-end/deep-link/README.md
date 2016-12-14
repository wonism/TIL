# 모바일 앱 딥링크 구현하기

__iframe 을 이용하던 방식에 대해__
- `<iframe>` 을 이용하는 방법이 있지만,
  - `모바일 크롬 25 이상` 의 버전에서는 작동하지 않는다.
  - `iOS 9` 부터는 앱링크 실행 시, 사용자에게 `confirm` 을 띄운다. 때문에, 사용자에게는 `<iframe>` 의 `confirm` 이 보이지 않으므로, 앱을 실행할 수 없다.
    - 여기서 `confirm` 은 JS 의 `confirm` 이 아니라 OS 레벨에서의 `confirm`

```js
const isIos = window.navigator.userAgent.match(/ipod|ipad|ios/i);
const isAndroid = window.navigator.userAgent.match(/android/i);

function runNativeApp() {
  let url = 'CUSTOM_SCHEME://';
  if (isIos) {
    window.location = url;
    setTimeout(() => {
      if (!(document.hidden || document.webkitHidden)) {
        window.location = 'http://itunes.apple.com/app/id0000000000';
      }
    }, 400);
  } else if (isAndroid) {
    window.location = 'intent://detail?URL#Intent;package=PACKAGE_NAME;scheme=SCHEME_NAME;end;';
  } else {
    alert(`Support only iOS and Android.`);
  }
}
```

