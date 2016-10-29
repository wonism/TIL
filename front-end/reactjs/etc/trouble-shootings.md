# React 를 사용하면서 겪은 문제들
## React Slick 를 쓰면서 겪은 문제 해결
> [React Slick](https://github.com/akiran/react-slick) 은 Carousel 컴퍼넌트로 흔히 말하는 슬라이드 컴퍼넌트이다.
__Cannot read property 'getBoundingClientRect' of null__
- 내가 react-slick 을 사용하면서 겪은 문제는 바로 `Cannot read property 'getBoundingClientRect' of null` 였다.
- 당시 사용된 코드는 대충 다음과 같다.
```js
import React from 'react';
import Slider from 'react-slick';

class Banner extends React.Component {
  /* ... */

  componentDidMount() {
    this.props.getBanners();
  }

  render() {
    const settings = {
      /* ... */
    };

    return (
      <div>
        <Slider { ...settings }>
          { this.props.banners.map((b, i) => {
            return (
              <img key={ i } src={ b.img_url } data-url={ b.link_url }/>
            );
          })}
        </Slider>
      </div>
    );
  }
}
```
- componentDidMount 에서 AJAX 로 데이터를 가져오고, 가져온 데이터만큼 반복하면서 `<img>` 태그 를 렌더링해주는 코드였다.
- `Cannot read property 'getBoundingClientRect' of null` 에러가 발생했는데, 알고보니, `<Slider>` 컴퍼넌트는 반드시 하위 컴퍼넌트가 있어야했다.
  - `react-slick/src/mixins/helpers.js` 의 `getHeight` 메소드 부분때문이이었다. 인자로 `elem (DOM Element)`를 받으며, 메소드의 몸체에서 `elem.getBoundingClientRect().height` 를 통해 DOM Element 의 높이를 구하는 코드인데, elem 이 없어서 `getBoundingClientRect` 메소드를 사용할 수 없기 때문에 `Cannot read property 'getBoundingClientRect' of null` 이런 에러가 발생했던 것이다.
- 이 문제를 알게 되고, 수정한 코드는 다음과 같다.
```js
class Banner extends React.Component {
  /* ... */

  render() {
    const settings = {
      /* ... */
    };

    return (
      <div>
        <Slider { ...settings }>
          { !this.props.banners.length ? <div /> : null }
          { this.props.banners.map((b, i) => {
            return (
              <img key={ i } src={ b.img_url } data-url={ b.link_url }/>
            );
          })}
        </Slider>
      </div>
    );
  }
}
```

