import { html } from 'snabbdom-jsx';
import { run } from '@cycle/run';
import {
  makeDOMDriver,
  a,
  h1,
  h4,
  div,
  button,
} from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import xs from 'xstream';

function main(sources) {
  /**
   * sinks는 main과 드라이버 사이에서 사이드이펙트를 수행하기 위한 명령이며, sources는 읽을 수 있는 사이드이펙트이다.
   * HTTP 요청은 sinks이며, HTTP 응답은 sources다.
   * HTTP 드라이버는 DOM 드라이버와 비슷하다.
   * 요청을 위해 sink 스트림을 기대하며, 응답을 위해 source 스트림을 제공한다.
   * 버튼을 클릭할 때, HTTP 요청이 전송된다면, HTTP 요청 스트림은 버튼 클릭 스트림에 직접 의존해야 한다.
   * getRandomUser$는 main 함수에서 sink로 반환하여 HTTP 드라이버에 제공하는 요청 스트림이다.
   */
  const getRandomUser$ = sources.DOM
    .select('.get-random')
    .events('click')
    .map(() => {
      const randomNum = Math.round(Math.random() * 9) + 1;

      return {
        url: `https://jsonplaceholder.typicode.com/users/${randomNum}`,
        category: 'users',
        method: 'GET'
      }
    });

  /**
   * HTTP 응답 스트림에 직접 의존하는 사용자 데이터 스트림이 필요하며, sources.HTTP를 통해 사용할 수 있다.
   * sources의 프로퍼티인 HTTP는 run을 호출할 때, HTTP 드라이버에 지정한 드라이버 이름과 일치해야 한다.
   * sources.HTTP는 HTTP 소스로 Cycle.js의 모든 네트워크 응답을 표현한다.
   * select(category) 메소드는 제공된 카테고리와 관련된 모든 응답 스트림의 스트림을 리턴한다.
   * 이 출력은 스트림의 스트림이므로 flatten 메소드를 통해 평평해진 응답의 스트림을 얻는다.
   */
  const user$ = sources.HTTP
    .select('users')
    .flatten()
    .map(res => res.body)
    .startWith(null);

  /**
   * vdom$이라는 노드 스트림은 user$에 직접 의존해야한다.
   */
  const vdom$ = user$.map(user =>
    <div className="users">
      <button className="get-random">
        Get Random User
      </button>
      <hr />
      {user === null ? [] : (
        <div className="user-details">
          <h1 className="user-name">{user.name}</h1>
          <h4 className="user-email">{user.email}</h4>
          <a
            className="user-website"
            href={user.website}
          >
            {user.website}
          </a>
        </div>
      )}
    </div>
  );

  return {
    DOM: vdom$,
    HTTP: getRandomUser$,
  };
}

run(main, {
  DOM: makeDOMDriver('#cycle-app'),
  HTTP: makeHTTPDriver(),
});
