# sequelize-cli 로 DB 마이그레이션 하기

## 모듈 설치
```sh
$ npm install --save sequelize
$ npm install -g sequelize-cli
```

## Sequelize 프로젝트 initialize
```sh
$ sequelize init
```
- 이 명령을 실행하면, config/config.json 파일과 migrations, seeders, models(models/index.js) 폴더가 만들어질 것이다.
```sh
Created "config/config.json"
Successfully created migrations folder at
"/PATH_TO_PROJECT/migrations".
Successfully created seeders folder at
"/PATH_TO_PROJECT/seeders".
Successfully created models folder at
"/PATH_TO_PROJECT/models".
Loaded configuration file "config/config.json".
Using environment "development".
```

## 테이블 생성 예제
- 테이블을 생성하는 명령어는 아래와 같다.
```sh
$ sequelize model:create --name TABLE_NAME --attributes COLUMN1:integer,COLUMN2:string,COLUMN3:text
```

### 1 : 1 관계
- 사람과 개인 정보 테이블이 있으며, 이 둘은 1 : 1 관계이다.
- persons 테이블은 source table 이고, id_cards 테이블은 persons 테이블의 주키를 외래키 (person_id) 로 참조하는 target 테이블이다.
- 다음 명령어를 입력한다.
```sh
$ sequelize model:create --name persons --attributes name:string && sequelize model:create --name id_cards --attributes birth:date,person_id:integer
```
- 이 명령으로 몇 가지 파일이 생성된다.
  - migrations/YYYYMMDDHHMMSS-create-persons.js
  - migrations/YYYYMMDDHHMMSS-create-id_cards.js
  - models/persons.js
  - models/id_cards.js

- migrations/YYYYMMDDHHMMSS-create-persons.js 파일을 열면 다음과 같다.
```js
'use strict';
module.exports = function(sequelize, DataTypes) {
  var persons = sequelize.define('persons', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return persons;
};
```

__migration 파일 수정__
- migrations/YYYYMMDDHHMMSS-create-persons.js 파일을 다음과 같이 수정한다.
  - persons 는 source table 이므로 hasOne 메소드를 수행하도록 한다.
```js
'use strict';
module.exports = function(sequelize, DataTypes) {
  var persons = sequelize.define('persons', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        persons.hasOne(models.id_cards);
      }
    }
  }, {
    timestamp: true,
    underscored: true
  });
  return persons;
};
```

- migrations/YYYYMMDDHHMMSS-create-id_cards.js 파일을 다음과 같이 수정한다.
  - id_cards 는 target table 이므로 belongsTo 메소드를 수행하도록 한다.
```js
'use strict';
module.exports = function(sequelize, DataTypes) {
  var id_cards = sequelize.define('id_cards', {
    birth: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        id_cards.belongsTo(models.persons, {
          foreignKey: 'person_id'
        });
      }
    }
  }, {
    timestamp: true, // timestamp 를 사용한다.
    underscored: true // foreignKey 에 CamelCase 대신 snake_case 를 사용하려면 underscored 를 true 로 지정한다.
  });
  return id_cards;
};
```

__Migration 하기__
```sh
$ sequelize db:migrate
```
- 위 명령어를 수행하면, 테이블이 생성된다.
- 테이블 생성한 것을 취소하려면, 다음 명령어를 실행한다.
  - 아래 명령어는 마지막으로 migrate 했던 것을 되돌린다.
```sh
$ sequelize db:migrate:undo
```
- SequelizeMeta 테이블을 보면, 마지막 column 이 사라진 것을 확인할 수 있다.

