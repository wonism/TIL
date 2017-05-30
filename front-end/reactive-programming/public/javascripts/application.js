'use strict';

var _Rx = Rx,
    BehaviorSubject = _Rx.BehaviorSubject;


var currentNameSubject = new BehaviorSubject('Jaewon');
var currentName = currentNameSubject.asObservable();

currentNameSubject.subscribe(function (val) {
  console.log(val);
});

currentNameSubject.next('Wonism');

console.log(currentName);