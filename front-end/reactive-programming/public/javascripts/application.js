'use strict';

var source = Rx.Observable.fromEvent(document, 'click');
var clicks = source.map(function (e) {
  return e.timeStamp;
});
// 매 클릭마다 timestamp를 받아온다.
var subscribe = clicks.subscribe(function (val) {
  return console.log(source.map, val);
});
// output (clicks): 'Event time: 7276.390000000001'