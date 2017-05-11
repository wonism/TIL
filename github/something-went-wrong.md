Github 에서 새로운 저장소를 만들기 위해 (https://github.com/new) 저장소 이름의 유효성 검사를 하던 도중, 'Something went wrong.' 이라는 메시지가 출력되었다.
구글에 검색을 해보니, 같은 문제를 겪은 사람이 또 있었다.
해결 방법은 'Allow-Control-Allow-Origin' 이라는 크롬 확장프로그램을 중지시키는 것이었다.
('Allow-Control-Allow-Origin' 은 CORS (Cross-Origin Resource Sharing) 관련 디버깅을 위해 설치했던 확장프로그램이다.)

# Reference
http://stackoverflow.com/questions/32851144/cannot-create-repository-on-github

