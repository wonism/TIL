const { BehaviorSubject } = Rx;

const currentNameSubject = new BehaviorSubject('Jaewon');
const currentName = currentNameSubject.asObservable();

currentNameSubject.subscribe(val => {
  console.log(val);
});

currentNameSubject.next('Wonism');

console.log(currentName);

