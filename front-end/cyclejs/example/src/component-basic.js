import { html } from 'snabbdom-jsx';
import { run } from '@cycle/run';
import {
  makeDOMDriver,
  h2,
  div,
  span,
  input,
} from '@cycle/dom';
import xs from 'xstream';

function LabeledSlider(sources) {
  const domSource = sources.DOM;
  /**
   * props는 객체로 인코딩되고 스트림으로 감싸지며, main함수에는 소스 입력으로써 전달된다.
   * 또한, props는 초기값을 설정할 때 사용된다.
   */
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

  /**
   * 가상 DOM 외에도 value$ 스트림을 반환한다.
   */
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

  /**
   * sources.DOM은 올바른 이벤트 스트림을 선택하는데 도움이 되는 함수가 포함된 객체이다.
   * sources.DOM.select(selector)는 select() 또는 events()를 다시 호출할 수 있는 새로운 DOM Source를 반환한다.
   * .select()를 통해 sink에서 패치된 것과 동일한 className을 사용함으로써 다른 컴퍼넌트에 영향을 주거나 받지 않도록 한다.
   */
  const weightSources = {
    DOM: sources.DOM.select('.weight'),
    props: weightProps$,
  };
  const heightSources = {
    DOM: sources.DOM.select('.height'),
    props: heightProps$,
  };

  const weightSlider = LabeledSlider(weightSources);
  const heightSlider = LabeledSlider(heightSources);

  /**
   * 컴퍼넌트는 자신의 출력을 다른 컴퍼넌트에 내보내면 안되며, 다른 컴퍼넌트의 출력을 감지할 수도 없다.
   * 소스와 싱크를 다른 컴퍼넌트의 영향으로부터 격리시키기 위해 현재 컴퍼넌트에 범위를 추가한다.
   * 그러기 위해 DOM sink에 패치를 하여 가상 노드에 고유한 식별자를 추가한다.
   * (여기선, weight와 height)
   */
  const weightVDom$ = weightSlider.DOM
    .map(vnode => {
      vnode.sel += '.weight';

      return vnode;
    });
  const weightValue$ = weightSlider.value;

  const heightVDom$ = heightSlider.DOM
    .map(vnode => {
      vnode.sel += '.height';

      return vnode;
    });
  const heightValue$ = heightSlider.value;

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
