# Web Bluetooth API
> 네이티브 애플리케이션에서만 가능했던 블루투스 기기와의 상호작용을 웹 애플리케이션에서도 가능하게 해준다.

## 시작하기 전에
- 웹 블루투스 API 는 크롬 56 이상에서 사용할 수 있다.
  - 크롬 55 버전에서 사용하기 위해서는 `Flag` 설정을 변경한다.
    - [chrome://flags/#enable-web-bluetooth](chrome://flags/#enable-web-bluetooth)
- 보안을 위해 HTTPS 환경에서만 사용할 수 있다.
  - HTTPS 적용을 위한 방법은 다음 [링크](https://jaewonism.com/posts/6)에서 볼 수 있다.
- 연결 가능한 디바이스 목록을 띄우기 위한 메소드인 `navigator.bluetooth.requestDevice` 는 터치나 클릭과 같은 사용자의 인터랙션에 의해 트리거되어야 한다.
- 웹 블루투스 API 는 Java Script `Promise` 에 의존한다.
  - Promise 에 대한 설명은 다음 [링크](https://jaewonism.com/posts/39)에서 볼 수 있다.

__용어 설명__
- `GATT (Generic Attribute Profile)` : GATT 는 두 BLE(Bluetooth Low Energy) 장치간에 Service, Characteristic 을 이용해서 데이터를 주고 받는 방법을 정의한 것이다.
- `Characteristic` : 하나의 characteristic 은 하나의 값과 `n` 개의 디스크립터를 포함한다.
- `Descriptor` : descriptor 는 characteristic 의 값을 기술한다.
- `Service` : 하나의 service 는 characteristic 의 집합이다.

## 시작하기
### 블루투스 디바이스 검색하기
- 웹 블루투스 API 를 사용하면, BLE 연결을 통해 원격 GATT 서버에 연결할 수 있으며, 블루투스 4.0 이상을 구현하는 장치 간의 통신을 지원한다.
- `navigator.bluetooth.requestDevice(options)` 를 통해 주변 기기에 대한 액세스를 요청하면, 브라우저는 `사용자에게 하나의 기기를 선택` 하거나, `취소` 를 하는 창을 띄운다.
  - `requestDevice` 의 파라미터 `options` 를 통해 받아올 기기들에 대한 정보를 정의한다.
    - `acceptAllDevices: true` 를 통해 모든 디바이스 리스트를 가져올 수 있다.
    - `filters: [...]` 를 통해 특정한 디바이스 리스트를 가져올 수 있다. (`filter` 를 사용하는 것이 더 좋다고 한다.)

```js
navigator.bluetooth.requestDevice({ acceptAllDevices: true, })
  .then(device => { /* Do something with device */ })
  .catch(error => { /* Error handling*/ });
```

- GATT 서비스가 표준화된 GATT 서비스 목록에 없으면, 전체 블루투스 UUID 혹은 짧은 `16비트 / 32비트` 형식을 제공할 수 있다.

```js
navigator.bluetooth.requestDevice({
    filters: [{
      services: [0x1234, 0x12345678, '99999999-0000-1000-8000-00805f9b34fb'],
    }],
  })
  .then(device => { /* Do something with device */ })
  .catch(error => { /* Error handling*/ });
```

- 디바이스 이름이나 이름의 접두사를 기준으로 디바이스를 검색할 수도 있다.
  - 이 경우, 일부 서비스에 접근하려면, optionalServices 키를 정의해야 한다. (그렇지 않으면, 이후 접근 시 오류가 발생한다고 한다.)

```js
navigator.bluetooth.requestDevice({
    filters: [{
      name: 'jaewon',
    }, {
      namePrefix: 'jae',
    }],
    optionalServices: ['battery_service'],
  })
  .then(device => { /* Do something with device */ })
  .catch(error => { /* Error handling*/ });
```

### 디바이스에 연결하기
- `navigator.bluetooth.requestDevice` 로 디바이스를 받은 뒤, GATT 서버에 연결한다.
```js
navigator.bluetooth.requestDevice({ acceptAllDevices: true, })
  .then(device => {
    // Human-readable name of the device.
    console.log(device.name);

    // Attempts to connect to remote GATT Server.
    return device.gatt.connect();
  })
  .then(server => { /* ... */ })
  .catch(error => { console.log(error); });
```

## 참고
- [google developers](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web)
- [hardcopyworld](http://www.hardcopyworld.com/gnuboard5/bbs/board.php?bo_table=lecture_tip&wr_id=20)

