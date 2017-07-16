import { html } from 'snabbdom-jsx';
import { run } from '@cycle/run';
import {
  makeDOMDriver,
  div,
  input,
  h2,
} from '@cycle/dom';
import xs from 'xstream';

function main(sources) {
  const changeWeight$ = sources.DOM
    .select('.weight')
    .events('input')
    .map(e => e.target.value);
  const changeHeight$ = sources.DOM
    .select('.height')
    .events('input')
    .map(e => e.target.value);

  const weight$ = changeWeight$.startWith(65);
  const height$ = changeHeight$.startWith(180);

  /**
   * 두 가지 상태를 결합하여 값을 사용해 BMI를 계산하기 위해 combine 메소드를 사용한다.
   * merge는 OR와 같은 의미가 있지만, combine은 AND와 같은 의미를 지닌다.
   * combine은 여러 스트림을 입력으로 사용하여,
   * 각 입력 스트림에 대해 하나씩 여러 값을 포함하는 하나의 배열 스트림을 생성한다.
  */
  const state$ = xs.combine(weight$, height$)
    .map(([weight, height]) => {
      const heightMeters = height * 0.01;
      const bmi = Math.round(weight / (heightMeters ** 2));

      return { weight, height, bmi };
    });

  const vdom$ = state$.map(({ weight, height, bmi }) => (
      <div>
        <div>
          <span>Weight : {weight} kg</span>
          <input className="weight" type="range" min="40" max="140" value={weight} />
        </div>
        <div>
          <span>Height : {height} cm</span>
          <input className="height" type="range" min="140" max="210" value={height} />
        </div>
        <h2>
          BMI : {bmi}
        </h2>
      </div>
    ));

  return {
    DOM: vdom$,
  };
}

run(main, { DOM: makeDOMDriver('#cycle-app') });
