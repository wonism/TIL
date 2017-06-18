import Rx from 'rxjs';

export default () => {
  const docEl = document.documentElement;
  const newDiv = document.createElement('div');

  newDiv.id = 'care';
  newDiv.style.cssText = 'margin: 25vh auto; width: 50%; height: 50vh; background-color: bisque;';
  document.body.append(newDiv);

	// From an array or iterable.
	// The observable emits each item from the array, then completes.
	const myNumber$ = Rx.Observable.from([1, 2, 3, 4, 5]);
  myNumber$.subscribe(number => console.log(number));

  const rotateElement = (pos) => {
    const rotX = (pos.y / docEl.clientHeight * -50) + 25;
    const rotY = (pos.x / docEl.clientWidth * 50) - 25;

    newDiv.style.cssText += `transform: rotateX(${rotX}deg) rotateY(${rotY}deg);`;
  };

  // Linear Interpolation makes animation more smoothly
  const lerp = (start, end) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;

    return {
      x: start.x + dx * 0.1,
      y: start.y + dy * 0.1,
    };
  };

	// From an event.
	// The observable continuously emits events from the event listener.
	const mouseMove$ = Rx.Observable
		.fromEvent(docEl, 'mousemove')
    .map(event => ({ x: event.clientX, y: event.clientY }));

  const touchMove$ = Rx.Observable
    .fromEvent(docEl, 'touchmove')
    .map(event => ({ x: event.touches[0].clientX, y: event.touches[0].clientY }));

  // Combine with .merge method
  // Return single observable has merged datas from multiple observables
  const move$ = Rx.Observable.merge(mouseMove$, touchMove$);
  move$.subscribe(rotateElement);
};
