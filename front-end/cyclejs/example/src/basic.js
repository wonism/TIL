import { html } from 'snabbdom-jsx';
import { run } from '@cycle/run';
import {
  makeDOMDriver,
  h1,
  div,
  label,
  input,
} from '@cycle/dom';

/**
 * @param  {Object} sources DOM streams
 * @return {Object} sinks   Virtual DOM
 */
function main(sources) {
  /**
   * sources.DOM을 통해 (가상) 노드를 선택하고, 해당 노드에 전달되는 이벤트를 매핑한다.
   * startWith는 노드 스트림으로 변환되기 위한 기본값을 제공한다.
   * 이 때, startWith가 없으면 아무 동작도 하지 않는다.
   * sources는 sinks와 서로 반응하기때문에 첫 번째 이벤트를 트리거하지 않으면 아무 일도 일어나지 않는 것이다.
   */
  const input$ = sources.DOM.select('.form-control').events('input');
  const name$ = input$.map(e => e.target.value).startWith('');
  const vdom$ = name$.map(name =>
    <div>
      <h1>Hello, {name}!</h1>
      <label>User Name : </label>
      <input className="form-control" type="text" />
    </div>
  );

  return { DOM: vdom$ };
}

/**
 * @param {Function} main    Pure function
 * @param {Object}   drivers Handling side effects
 *
 * run은 main과 드라이버를 묶는다.
 * DOM 드라이버의 경우, main이 DOM을 통해 사용자와 소통한다.
 * (DOM 드라이버를 사용하지 않고, 웹 오디오나 모바일을 타겟으로 하는 애플리케이션 개발도 가능하다.)
 */
run(main, { DOM: makeDOMDriver('#cycle-app') });
