import { html } from 'snabbdom-jsx';
import { run } from '@cycle/run';
import {
  makeDOMDriver,
  h2,
  div,
  span,
  input,
} from '@cycle/dom';
import isolate from '@cycle/isolate';
import xs from 'xstream';

function LabeledSlider(sources) {
  const domSource = sources.DOM;
  const props$ = sources.props;

  const newValue$ = domSource
    .select('.slider')
    .events('input')
    .map(e => e.target.value);

  const state$ = props$
    .map(props => newValue$
      .map(val => ({
        label: props.label,
        unit: props.unit,
        min: props.min,
        value: val,
        max: props.max
      }))
      .startWith(props)
    )
    .flatten()
    .remember();

  const vdom$ = state$
    .map(state => (
      <div>
        <span className="label">{state.label} {state.value} {state.unit}</span>
        <input className="slider" type="range" min={state.min} max={state.max} value={state.value} />
      </div>
    ));

  const sinks = {
    DOM: vdom$,
    value: state$.map(state => state.value),
  };

  return sinks;
}

function main(sources) {
  const weightProps$ = xs.of({
    label: 'Weight', unit: 'kg', min: 40, value: 70, max: 150
  });
  const heightProps$ = xs.of({
    label: 'Height', unit: 'cm', min: 140, value: 170, max: 210
  });

  const weightSources = {
    DOM: sources.DOM,
    props: weightProps$,
  };
  const heightSources = {
    DOM: sources.DOM,
    props: heightProps$,
  };

  /**
   * isolate는 분리되지 않은 컴퍼넌트를 첫 번째 인자로 사용하고, 두 번째 인자를 사용하여 범위를 제한한다.
   * 두 번째 인자는 생략될 수 있는데, scope는 고유하고 자동 생성된다는 점을 제외하면 아무런 차이가 없다.
   * Cycle.js는 함수형 프로그래밍 기법으 따르기 때문에 대부분의 API는 참조가 투명하지만, isolate는 편의상 예외이다.
   * (투명하다 = 같은 입력이 주어지면 항상 같은 값이 출력된다.)
   */
  const weightSlider = isolate(LabeledSlider, 'weight')(weightSources);
  const heightSlider = isolate(LabeledSlider, 'height')(heightSources);

  const weightVDom$ = weightSlider.DOM;
  const weightValue$ = weightSlider.value;

  const heightVDom$ = heightSlider.DOM;
  const heightValue$ = heightSlider.value;

  /**
   * sources.DOM의 isolateSource, isolateSink대신 @cycle/isolate의 isolate를 사용한다.
   */
  /*
  const { isolateSource, isolateSink } = sources.DOM;

  const weightSources = {
    DOM: isolateSource(sources.DOM, 'weight'),
    props: weightProps$,
  };
  const heightSources = {
    DOM: isolateSource(sources.DOM, 'height'),
    props: heightProps$,
  };

  const weightSlider = LabeledSlider(weightSources);
  const heightSlider = LabeledSlider(heightSources);

  const weightVDom$ = isolateSink(weightSlider.DOM, 'weight');
  const weightValue$ = weightSlider.value;

  const heightVDom$ = isolateSink(heightSlider.DOM, 'height');
  const heightValue$ = heightSlider.value;
  */

  const bmi$ = xs.combine(weightValue$, heightValue$)
    .map(([weight, height]) => {
      const heightMeters = height * 0.01;
      const bmi = Math.round(weight / (heightMeters ** 2));

      return bmi;
    })
    .remember();

  const vdom$ = xs.combine(bmi$, weightVDom$, heightVDom$)
    .map(([bmi, weightVDom, heightVDom]) => (
      <div>
        {weightVDom}
        {heightVDom}
        <h2>BMI : {bmi}</h2>
      </div>
    ));

  return {
    DOM: vdom$,
  };
}

run(main, {
  DOM: makeDOMDriver('#cycle-app')
});
