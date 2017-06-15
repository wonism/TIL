# React Native
## React 와 React Native
- `state`, `props` 등 모든 것이 리액트와 비슷한 방식으로 작동한다.
- `<div />`대신 `<View />`를 사용한다.
- `<input type="text" />`대신 `<TextInput />`를 사용한다.
- 많은 CSS 속성이 사용된다.
  - `flexbox`, `absolute positioning`, `color`, `border` 등이 있다.
  - `transition`이 없지만, 애니메이션을 위한 API가 존재한다.
  - `미디어 쿼리`가 없다.
- `className`이 없으며, 스타일을 컴퍼넌트에 직접 전달해야 한다.
- `fetch` API를 사용할 수 있다.
- `localStorage`대신 `AsyncStorage`를 사용한다.

## 설치
```
# install node 4.x or higer
$ brew install node

# install watchman
$ brew install watchman
```
```
# install React Native CLI
$ npm install -g react-native-cli
```
```
# install X-code higer than version 8
# visit https://itunes.apple.com/us/app/xcode/id497799835?mt=12

# and install Xcode Command Line Tools on Locations Tab on Preferences....
```
```
# Testing
$ react-native init AwesomeProject
$ cd AwesomeProject
$ react-native run-ios
# Then, you can see your new app running in the iOS Simulator.
```

## 수정
- `index.ios.js` 파일 수정 후, `Command⌘ + R`로 앱 새로고침하기

## 참고
- https://facebook.github.io/react-native/

