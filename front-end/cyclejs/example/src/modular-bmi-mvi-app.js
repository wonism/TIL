import { html } from 'snabbdom-jsx';
import { run } from '@cycle/run';
import {
  makeDOMDriver,
  div,
  input,
  h2,
} from '@cycle/dom';
import xs from 'xstream';

function renderSlider(label, value, unit, className, min, max) {
  return (
    <div>
      <span>{label} : {value} {unit}</span>
      <input className={className} type="range" min={min} max={max} value={value} />
    </div>
  );
}

function renderWeightSlider(weight) {
  return renderSlider('Weight', weight, 'kg', 'weight', 40, 140);
}

function renderHeightSlider(height) {
  return renderSlider('Height', height, 'cm', 'height', 140, 210);
}

function bmi(weight, height) {
  const heightMeters = height * 0.01;

  return Math.round(weight / (heightMeters ** 2));
}

function getSliderEvent(domSource, className) {
  return domSource.select(`.${className}`)
    .events('input')
    .map(e => e.target.value);
}

function intent(domSource) {
  return {
    changeWeight$: getSliderEvent(domSource, 'weight'),
    changeHeight$: getSliderEvent(domSource, 'height'),
  };
}

function model(actions) {
  const weight$ = actions.changeWeight$.startWith(65);
  const height$ = actions.changeHeight$.startWith(180);

  return xs.combine(weight$, height$)
    .map(([weight, height]) => (
      { weight, height, bmi: bmi(weight, height) }
    ));
}


function view(state$) {
  return state$.map(({ weight, height, bmi }) =>
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
