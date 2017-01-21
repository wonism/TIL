# Atom 테마 커스터마이징

## 시작하기 전에
- 아톰의 렌더링 엔진은 크롬 브라우저에서 작동한다.
  - 따라서, `command + option + I` 또는 `control + shift + I` 를 통해 개발자 도구를 열 수 있다.
- 아톰은 텍스트 편집기로 확장 및 커스터마이징이 간단하다.
- 커스터마이징한 패키지와 테마를 공유할 수 있다.
- 아톰은 [Less](http://lesscss.org/features/) 를 사용한다.
  - `Less` 는 변수, 믹스인, 중첩 스타일, `&` 연산자 등을 사용하여 `CSS` 를 좀더 효율적으로 작성하게 해주는 전처리기이다.

## Syntax 테마 패키지 생성
- 아톰을 열고, `command + shift + P` 또는 `ctrl + shift + P` 를 누른다.
- `Package Generator: Generate Syntax Theme` 를 검색하여 패키지를 생성한다.
  - 원하는 위치에 패키지를 저장하면 된다.
  - 패키지의 구조는 다음과 같다.
```
.
├── CHANGELOG.md
├── LICENSE.md
├── README.md
├── index.less
├── package.json
└── styles
    ├── base.less
    ├── colors.less
    └── syntax-variables.less

```
  - 메인이 되는 스타일시트는 index.less 에 있다.
  - `package.json` 과 `README.md` 에 패키지에 관한 정보들을 작성하여, 다른 사용자들에게 패키지에 대한 설명을 할 수 있다.

## 색상 변경하기
- `style/colors.less` 파일을 연 뒤, `COLOR_VARIABLE: COLOR_VALUE` 와 같이 값을 변경한다.
  - Hex 코드끼리 연산도 가능하다. 한 `COLOR_VARIABLE` 의 코드가 `#00f` 즉 파란색이라고 가정한다. 이를 더 밝게 하고싶다면, `#00F + #111` 과 같이 작성할 수도 있다.

## 테마 적용 방법
- 코드를 수정한 뒤, `command + option + control + L` 또는 `View - Developer - Reload` 로 아톰을 리로드한 뒤, `Atom Settings (command + ,) - Themes`  에서 테마를 적용할 수 있다.

## 배포
- 아톰 패키지를 공개하고 업데이트하기 위해 `apm` 을 사용한다.
- `package.json` 에 테마의 이름, 설명, 저장소 등을 작성한다.
  - 이름이 중복되지 않도록, `atom.io` 패키지 레지스트리에 같은 이름의 테마가 게시되었는지 미리 확인하는 것이 좋다. (https://atom.io/packages/your-package-name 을 방문한다.)
- `apm publish` 명령을 통해 퍼블리싱한다.

```
$ cd path-to-your-package
$ apm publish [major|minor|patch]
```

## 참고
- [Atom docs : Creating a Theme](http://flight-manual.atom.io/hacking-atom/sections/creating-a-theme/)
- [Atom docs : Upgrading Your UI Theme Or Package Selectors](http://flight-manual.atom.io/upgrading-to-1-0-apis/sections/upgrading-your-ui-theme-or-package-selectors/)
- [Atom docs : Upgrading Your Syntax Theme](http://flight-manual.atom.io/upgrading-to-1-0-apis/sections/upgrading-your-syntax-theme/)

