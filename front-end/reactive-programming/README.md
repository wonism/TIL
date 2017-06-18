# Learn about RxJS
> RxJS는 리액티브 프로그래밍의 개념을 웹에 제공하는 자바스크립트 라이브러리이다.

## 들어가기 전에
### Reactive Programming
- 리액티브 프로그래밍은 비동기 데이터 스트림을 사용한 프로그래밍이다.
- 이벤트 버스 또는 일반적인 클릭 이벤트는 실제로 비동기 이벤트 스트림으로 이를 관찰하고 사이드 이펙트를 수행할 수 있다.
- 리액티브는 클릭, 호버 이벤트뿐만 아니라, 모든 데이터 스트림을 만들 수 있게한다.
- 스트림은 비용이 저렴하며 어디에나 있으며, 무엇이든(변수, 사용자 입력, 속성, 캐시, 자료 구조 등) 스트림이 될 수 있다.

- 참고 : https://gist.github.com/staltz/868e7e9bc2a7b8c1f754

### Dollar sign `$`
- 변수 끝의 `$`은 변수가 옵저버블임을 나타내는 컨벤션이다.

### Observer & Observable
- Observer 객체는 관찰 가능한 시퀸스에 대해 푸시 스타일 반복을 지원한다.
- Observer와 Observable, Objects 인터페이스는 옵저버 디자인 패턴이라고도 하는 푸시 기반 알림을 위한 일반화된 매커니즘을 제공한다.
- Observable 객체는 알림을 보내는 객체(제공자)를 나타내며, Observer객체는 객체를 받는 클래스(옵저버)를 나타낸다.
- Observable 객체는 푸시 기반 컬렉션을 나타낸다.
- Observable은 Observer가 내보내는 새로운 변경 사항을 청취, 즉 구독하기 위해 사용할 수 있다.(읽기 전용)

### Subject
- Subject는 단순히 Observer이며, Observable하다.
- 새 값을 보낼 수 있으며, 구독할 수도 있다.(읽기 & 쓰기 가능)
- 관찰가능한 시퀸스뿐만 아니라, 관찰자인 객체를 나타낸다.
- 각 알림은 모든 구독하는 옵저버에게 알려진다.
- Subject는 Rx.Observable 클래스와 Rx.Observer 클래스를 모두 상속받는다.

### Operators
- RxJS의 연산자의 목적은 다른 프로그래밍 언어/라이브러리의 대부분의 연산자와 동일하다.
- RxJS는 Observable이 기초임에도 불고하고, RxJS의 연산자들에 유용하다.
- 연산자는 복잡한 비동기 코드를 선언적 방식으로 쉽게 구성할 수 있게 하는 필수 요소이다.
- RxJS에서는 연산자를 Observable로 보내지 전에 Subject(또는 Observer)에서 오는 데이터를 조작하는 방법으로 생각할 수 있다.

### BehaviorSubject
- BehaviorSubject는 Subject의 종류이며 가장 많이 사용된다.
- 시간이 지남에 따라 변하는 값을 나타낸다.
- Observer는 Subject를 구독하여 마지막(또는 초기) 값과 후속 알림을 수신할 수 있다.
- BehaviorSubject는 Rx.Observable 클래스와 Rx.Observer 클래스를 모두 상속받는다.

__시간에 따라 변하는 값에 BehaviorSubject 사용하기__
```js
// Load RxJS Before use Rx's classes
const { BehaviorSubject } = Rx;

// 초기값을 Jaewon으로 하는 BehaviorSubject 객체 선언
const currentNameSubject = new BehaviorSubject('Jaewon');

// 현재 값 가져오기
currentNameSubject.getValue(); // Jaewon

// 새 값으로 변경하기
currentNameSubject.next('Wonism');

// 새로 변경된 값 가져오기
currentNameSubject.getValue(); // Wonism
```

__값의 변화 구독하기__
```js
const { BehaviorSubject } = Rx;

const currentNameSubject = new BehaviorSubject('Jaewon');

// getValue를 동기적으로 호출하는 대신, Observable을 구독한다.
currentNameSubject.subscribe(val => {
  console.log(val);
});

currentNameSubject.next('Wonism');

currentNameSubject.next('Kim');
```

__Subject로부터 Observable 생성하기__
```js
const { BehaviorSubject } = Rx;

const currentNameSubject = new BehaviorSubject('Jaewon');
const currentName = currentNameSubject.asObservable();

currentNameSubject.subscribe(val => {
  console.log(val);
});

currentNameSubject.next('Wonism');

// currentName.next('Kim'); // throw Error. `currentName` is read-only.
```

## 참고
- https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
- https://github.com/Reactive-Extensions/RxJS

