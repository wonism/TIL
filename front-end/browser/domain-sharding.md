# 도메인 샤딩
<p>도메인 샤딩은 정적파일(이미지, CSS, JS 등)의 로딩 속도를 개선하는 방법으로, 여러개의 서브도메인을 생성하여 정적파일을 병렬로 가져온다.<br />도메인 샤딩의 등장 배경은 HTTP/1.x에서 도메인 당 동시 요청 갯수의 제한때문이다. (대부분의 모던 브라우저는 `6~8`개, IE 하위 버전은 `2`개까지 동시 요청을 할 수 있다.[^1] 이러한 제한은 웹서버에 과부하가 걸리지 않도록 IETF(Internet Engineering Task Force)에 의해 `HTTP/1.1 사양`으로 정의되었다.)</p>
<p>동시 요청을 함으로써 웹 페이지 로딩 속도가 무조건 빨라질 것 같지만 그렇지 않다. 각 하위 도메인에 DNS 조회를 함으로써 꽤 많은 시간과 CPU, 전력을 소모하기 때문이다.("김기정, 이성원. 웹 성능을 향상시키기 위한 DNS Resolution 감소 방안에 대한 연구"에 따르면, 3G환경에서는 평균 361ms, 4G환경에서는 평균 176ms의 왕복 지연시간이 발생한다고 한다.) 따라서, 도메인 샤딩은 동시 요청에 대한 완벽한 솔루션이라고 볼 수 없다.[^2]</p>
<p>+ 많은 모바일 브라우저가 HTTP 파이프라이닝[^3]을 구현하고 있다. 따라서, 도메인 샤딩은 더 이상 동시 요청에 대한 좋은 솔루션이 아니다.</p>

[^1:][표 1]
|Browser        |Request|
|---------------|:-----:|
|Firefox 2      |2      |
|Firefox 3+     |6      |
|Opera 9.26     |4      |
|Opera 12       |6      |
|Safari 3       |4      |
|Sarafi 5       |6      |
|IE 7           |2      |
|IE 8           |6      |
|IE 10          |8      |
|Chrome         |6      |
|Safari Mobile  |6      |
|Android Browser|4      |
|Chrome Mobile  |6      |
|Firefox Mobile |4      |
[^2:]도메인 샤딩 대신 HTTP/2로 전환하는 것이 좋다. HTTP/2 설정 방법은 [링크](https://github.com/wonism/TIL/tree/master/back-end/nginx/http2)를 참고한다.

## 참조
- [MDN : HTTP/1.x의 커넥션 관리](https://developer.mozilla.org/ko/docs/Web/HTTP/Connection_management_in_HTTP_1.x)
- [웹 성능을 향상시키기 위한 DNS Resolution 감소 방안에 대한 연구](https://www.kics.or.kr/storage/paper/event/winter2014/publish/3D-5.pdf)

## 이미지 출처
- [MDN : HTTP/1.x의 커넥션 관리](https://developer.mozilla.org/ko/docs/Web/HTTP/Connection_management_in_HTTP_1.x)

