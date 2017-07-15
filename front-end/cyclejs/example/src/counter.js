import { html } from 'snabbdom-jsx';
import { run } from '@cycle/run';
import {
  makeDOMDriver,
  div,
  input,
  button,
} from '@cycle/dom';
import xs from 'xstream';

function main(sources) {
  /**
   * 두 개의 스트림을 action$이라는 단일 스트림으로 병함한다.
   * 하나는 감소 버튼 클릭의 스트림, 다른 하나는 증가 버튼 클릭의 스트림이다.
   * 이 두 가지 이벤트를 각각 -1과 +1로 매핑한다.
   */
  const action$ = xs.merge(
    sources.DOM.select('.decrement').events('click').map(ev => -1),
    sources.DOM.select('.increment').events('click').map(ev => +1)
  );

  /**
   * count$는 0으로 시작하며, action$에 의해 생성된 모든 숫자의 합계이다.
   * 시간이 지남에 따라 트스림의 모든 이벤트를 합치려면, fold 메소드를 사용한다.
   * fold는 reduce와 비슷하게 시퀸스에 값을 누적하며, 2번째 인자로 초기값이 필요하다.
   */
  const count$ = action$.fold((acc, x) => acc + x, 0);

  const vdom$ = count$.map(count =>
    div([
      button('.decrement', '-'),
      input('.form-control', { attrs: { type: 'text', value: count } }),
      button('.increment', '+'),
    ])
  );

  return {
    DOM: vdom$,
  };
}

run(main, { DOM: makeDOMDriver('#cycle-app') });
