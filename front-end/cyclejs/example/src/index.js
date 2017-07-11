import { html } from 'snabbdom-jsx';
import { run } from '@cycle/run';
import {
  makeDOMDriver,
  h1,
  div,
  label,
  input,
} from '@cycle/dom';

function main(sources) {
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

run(main, { DOM: makeDOMDriver('#cycle-app') });
