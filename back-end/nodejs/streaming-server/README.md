# Streaming server with Node.js
> vid-streamer 를 통한 스트리밍 서버 구축

## Installation
- [vid-streamer](https://github.com/rm-hull/vid-streamer)
```sh
$ yarn add vid-streamer
# or
$ npm i -S vid-streamer
```

## Settings
- 모듈 설치 후, `/node_modules/vid-streamer` 경로가 생긴 것을 확인할 수 있다. 해당 디렉토리를 살펴보면 `config/` 안에 `vidStreamer-sample.json` 라는 JSON 파일이 보일 것이다. 이 파일을 클립보드에 복사한 뒤, 본인 프로젝트의 config 파일에 다음과 같이 `key`, `value` 들을 붙여넣는다.

```js
{
  /* ... */
  "videos": {
    "mode": "development",
    "forceDownload": false,
    "random": false,
    "rootFolder": "public/videos/",
    "rootPath": "",
    "server": "VidStreamer.js/0.1.4",
    "maxAge": "3600",
    "throttle": false
  }
  /* ... */
}
```

- 본인은 Express JS 를 사용하고 있는데, server.js 파일을 다음과 같이 설정한다.
  - `vidStreamer`의 `settings`메소드에 `config.videos`를 인자로 하여 호출한 뒤, 이를 `app.use`의 인자로 넘긴다.

```js
// Import modules
import express from 'express';
import vidStreamer from 'vid-streamer';
/* ... */

// Import config file
import config from '../config/config.json';

const app = express();

// Routes
app.use('/videos', vidStreamer.settings(config.videos));
/* ... */
```

## Execution
- `rootFolder`에 있는 비디오/오디오 파일들을 재생할 수 있게 되었다. 위 설정에서는 `public/videos/` 에 저장된 파일들을 재생할 수 있다. 서버를 실행한 뒤, `http://localhost:XXXX/videos/FILENAME`에 접속하면, 파일을 스트리밍할 수 있다는 것을 확인할 수 있다.

<div align="center"><img src="https://raw.githubusercontent.com/wonism/TIL/master/back-end/nodejs/streaming-server/images/streaming-server.png" /></div>

