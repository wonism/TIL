import { html } from 'snabbdom-jsx';
import { run } from '@cycle/run';
import {
  makeDOMDriver,
  div,
  input,
  h2,
} from '@cycle/dom';
import xs from 'xstream';

function renderWeightSlider(weight) {
  return (
    <div>
      <span>Weight : {weight} kg</span>
      <input className="weight" type="range" min="40" max="140" value={weight} />
    </div>
  );
}

function renderHeightSlider(height) {
  return (
    <div>
      <span>Height : {height} cm</span>
      <input className="height" type="range" min="140" max="210" value={height} />
    </div>
  );
}

function bmi(weight, height) {
  const heightMeters = height * 0.01;

  return Math.round(weight / (heightMeters ** 2));
}

/**
 * @param  {object} domSource
 * @return {object} actions
 *
 * DOM 이벤트를 유저의 의도된 동작으로 해석하기 위해 사용한다.
 */
function intent(domSource) {
  return {
    changeWeight$: domSource.select('.weight')
      .events('input')
      .map(e => e.target.value),
    changeHeight$: domSource.select('.height')
      .events('input')
      .map(e => e.target.value),
  };
}

/**
 * @param  {object} actions
 * @return {object} state$
 *
 * 상태를 관리하기 위해 사용한다.
 */
function model(actions) {
  const weight$ = actions.changeWeight$.startWith(65);
  const height$ = actions.changeHeight$.startWith(180);

  return xs.combine(weight$, height$)
    .map(([weight, height]) => (
      { weight, height, bmi: bmi(weight, height) }
    ));
}

/**
 * @param  {object} state$
 * @return {object} vdom$
 *
 * model로부터 온 상태를 시각적으료 표한하기 위해 사용한다.
 */
function view(state$) {
  return state$.map(({weight, height, bmi}) =>
    <div>
      {renderWeightSlider(weight)}
      {renderHeightSlider(height)}
      <h2>
        BMI : {bmi}
      </h2>
    </div>
  );
}

function main(sources) {
  const actions = intent(sources.DOM);
  const state$ = model(actions);
  const vdom$ = view(state$);

  return {
    DOM: vdom$,
  };
}

run(main, { DOM: makeDOMDriver('#cycle-app') });
