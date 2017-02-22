# Java Script Tips
## Date constructor in IE
- MySQL 에서 받아온 `Date Time` 타입의 데이터를 가지고, 지금 시간을 기준으로 얼마나 시간이 경과했는지 계산해주는 함수를 만들 일이 있었다.
- 데이터는 `2016-11-05 00:00:00` 과 같은 형식으로 넘어왔으며, `new Date(2016-11-05 00:00:00)` 으로 `Object` 를 생성했다.
- 이 방식이 크롬에서는 잘 동작하였으나, 알고보니, IE 에서는 제대로 동작하지 않는 것이었다.
- 구글링을 해보니, 역시나 SO 에 이런 경우로 인한 질문이 많이 올라와 있었다.
  - [Reference Link](http://stackoverflow.com/questions/11291206/passing-an-array-to-the-javascript-date-constructor-is-it-standard)
- IE 에서도 잘 동작하게 하려면, `new Date('2016-11-05 00:00:00')` 가 아닌, `(new (Function.prototype.bind.apply(Date, [null].concat(timeArr))))` 와 같은 형태로 `Object` 를 생성해야 했다.
- 완성된 코드는 다음과 같았으며, 위와 같은 방법으로 수정한 라인은 12 번째 줄에 있다.
  - `typeof time` 이 `string` 인지 비교한 구문은, 해당 함수에 `+new Date()` 로 만든 `timestamp (number 타입)` 를 매개변수로 넘기기도 하기 때문이다.
```js
export default ((time) => {
  const now = +new Date();
  let interval;
  let timestamp;
  let timeArr;
  let pastTimeStr = '';

  timeArr = typeof time === 'string' ? (
    time.split(/\D/).map((t, i, arr) => {
      return i === 1 ? t - 1 : t;
    })) : [];
  timestamp = (typeof time === 'string' ? +(new (Function.prototype.bind.apply(Date, [null].concat(timeArr)))) : +time);
  interval  = now - timestamp;

  if (interval < 60000) {
    pastTimeStr = '방금 전';
  } else if (interval < 3600000) {
    pastTimeStr = Math.round(interval / 60000) + '분 전';
  } else if (interval < 86400000) {
    pastTimeStr = Math.round(interval / 3600000) + '시간 전';
  } else if (interval < 604800000) {
    pastTimeStr = Math.round(interval / 86400000) + '일 전';
  } else {
    pastTimeStr = Math.round(interval / 604800000) + '주 전';
  }

  return pastTimeStr;
});
```
- 참고 : [Stack Overflow : Passing an array to the Javascript Date constructor, is it standard?](http://stackoverflow.com/questions/11291206/passing-an-array-to-the-javascript-date-constructor-is-it-standard)

