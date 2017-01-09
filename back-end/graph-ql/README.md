# Graph QL
> Graph QL 은 페이스북에서 오픈 소스로 제공하는 쿼리 언어로 새로운 데이터 교환 패러다임을 제시한다. ([Ruby](https://github.com/rmosolgo/graphql-ruby), [Java](https://github.com/graphql-java/graphql-java), [Python](https://github.com/graphql-python/graphene) 등에서 사용가능하다.)

## 기존의 접근 방식들
1. 서버에서 HTML 을 미리 렌더링하고, 클라이언트에서 이 HTML 을 내보내는 방식
  - 실시간 인터랙션이 필요 없는 모든 웹 사이트에서 잘 동작한다.
2. 사용자 인터랙션에 따라 특정한 Restful API 의 endpoint 에 접근하고, 응답 받은 요소들을 렌더링한다.
  - 이 방식은 각 엔드 포인트의 관심사를 분리할 수 있다는 장점이 있다.
  - 데이터의 하위 객체를 요청할 수 있는 기능이 제한적이거나 없다는 단점이 있다.
  - 렌더링할 데이터가 많으면, 필요한 데이터들을 모두 요청하기 위해 여러 엔드 포인트에 요청을 해야한다는 단점이 있다.

## GraphQL 접근 방식
- 단지 하나의 엔드포인트에만 접근함으로써 수많은 데이터 모델을 가져오거나 변경할 수 있다.
- 클라이언트는 원하는 데이터를 설명하는 쿼리 문자열을 서버에 전송함으로써 데이터 집합을 요청할 수 있다.
  - REST API 는 URL 을 통해 리소스에 접근하지만, GraphQL API 는 하나의 엔드포인트를 사용한다. (하나의 엔드포인트를 사용하는 것이 강제되지는 않는다.)
- 다음은 사용자의 정보와 그가 작성한 포스트들에 대한 데이터셋을 가져오기 위한 쿼리와 그 응답에 대한 예다.

```
{
 user(userId: "123"){
  firstName
  lastName
  posts {
    _id
    title
  }
 }
}
```

```
{
  "user": {
    "firstName": "Jaewon",
    "lastName": "Kim",
    "posts": [
      {
        "_id": "1",
        "title": "GraphQL Example"
      }
    ]
  }
}
```

- 만약, 여기에 포스트의 내용을 추가하고 싶다면, `posts` 안에 `body` 를 추가하기만 하면 된다.

```
{
 user(userId: "123"){
  firstName
  lastName
  posts {
    _id
    title
    body
  }
 }
}
```

```
{
  "user": {
    "firstName": "Jaewon",
    "lastName": "Kim",
    "posts": [
      {
        "_id": "1",
        "title": "GraphQL Example",
        "body": "GraphQL is blah blah..."
      }
    ]
  }
}
```

## GraphQL 의 이점
<p>GraphQL 은 전통적인 REST 엔드포인트보다 간결하며, 확장 및 축소에도 용이하다. 그 근거를 Restful 한 API 를 설계하면서 발생할 수 있는 일을 예시로 듦으로써 설명하겠다.</p>
<p>데이터베이스에서 `users` 와 `posts` 를 가져온다고 가정한다.(유저와 게시글에 대한 엔드포인트는 다음과 같다.)</p>
__Restful API__
```
/* GET posts/1 */
{
  "posts": {
    "id": 1,
    "title": "Hello GraphQL",
    "authorId": 5,
    "viewCount": 42
  }
}

/* GET users/5 */
{
  "users": {
    "id": 5,
    "firstName": "Jaewon",
    "lastName": "Kim"
  }
}
```

<p>일반적이고 간단한 API 의 모습이지만, 다음과 같은 이슈가 얼마든지 발생할 수 있다.</p>

```
프론트엔드 개발자 입장에서는 화면에 띄울 데이터를 가져오기 위해 2 번의 HTTP 요청을 하게 되는데, 요청횟수를 줄이고 싶어한다. 이 요청에 대한 두 가지 결과는 다음과 같다.
  1. 백엔드 개발자가 요청을 받아들여 API 를 수정한다. (더 많은 커스텀 API 엔드포인트가 생기게 되고, 백엔드에서 관리해야 하는 엔드포인트는 겉잡을 수 없이 많아진다.)
  2. API 를 Restful 하게 유지하기 요청을 거절한다. (프론트 엔드 개발자는 어떤 화면을 그리기 위해 n 번의 HTTP 요청을 해야한다.)
```

<p>위 경우에서 볼 수 있듯이, 어느 한 쪽이 편해지기 위해선 다른 한 쪽이 불편해져야 한다. 하지만, GraphQL 을 사용한다면 이러한 문제를 해결할 수 있다.</p>
<p>프론트엔드 개발자가 [GraphQL 스펙](http://facebook.github.io/graphql/)에 맞춰 다음과 같은 방식으로 단 한번의 POST 요청을 하면 된다.</p>

__GraphQL__
```
{
  posts {
    id,
    title,
    authorId,
    viewCount
  },
  user {
    id,
    firstName,
    lastName
  }
}
```

```
어떠한 기능이 추가되어 데이터 모델이 변경되는 경우는 생각보다 많다. 예를 들어, 다음과 같은 일들이 발생한다고 가정한다.
1. 좋아요 기능이 추가되어 좋아요 개수를 보여줘야한다. 백엔드 개발자는 버저닝을 하여, /v1/posts/:id 에 likeCount 가 추가되도록 개발한다.
2. 좋아요 기능만으로는 부족하여 나빠요 기능을 추가한다. 백엔드 개발자는 또 다시 버저닝을 하여, /v2/posts/:id 에 badCount 가 추가되도록 개발한다.
3. 하지만, 나빠요 기능의 반응이 좋지않아, 기능을 제거하기로 한다. 백엔드 개발자는 또 다시 버저닝을 하여, /v3/posts/:id 에 badCount 를 제거하고 개발한다. (/v2/posts/:id 를 다시 사용하자니 데이터를 overfetch 하기 때문이다.)
```

<p>Restful 한 방식을 사용한다면, 기능이 추가될 때마다 새로운 endpoint 를 개발하고 사용해야 한다. 이는, 백엔드 개발자와 프론트엔드 개발자 모두에게 고통스러운 일이다. 하지만, 이 역시도 GraphQL 을 사용한다면 해결 가능하다. 다음과 같이 말이다.</p>

```
/* instead of using v1 API */
{
  posts {
    id,
    title,
    authorId,
    viewCount,
    likeCount
  }
}

/* instead of using v2 API */
{
  posts {
    id,
    title,
    authorId,
    viewCount,
    likeCount,
    badCount
  }
}
/* instead of using v1 API */
{
  posts {
    id,
    title,
    authorId,
    viewCount,
    likeCount
  }
}
```

<p>GraphQL 은 이처럼 클라이언트 측에서 쿼리를 만들고 서버로 보냄으로써, 원하는 결과를 얻는다.<br />원하는 데이터를 미리 정의하기 때문에 overfetch 나 underfetch 에 대해 걱정할 필요도 없다.</p>

## Basic Usage
주요 문법을 몇 가지 알아보고자 한다. 자세한 문법은 이 [링크](https://facebook.github.io/graphql/) 를 참고하면 된다.

### whitespace, new line, comma
` `, `\n`, `,` 는 코드의 가독성 및 유지 관리성에 도움을 준다.<br />하지만, 구문상으로도 의미상으로도 중요하지 않기 때문에 생략 가능하다.

### 주석
`#` 를 사용함으로써 한 줄 주석을 작성할 수 있다.
```
# This is a comment in GraphQL source.
```

### Selection Sets
필요한 정보 집합을 선택하고, 그 정보를 정확하게 받음으로써, `overfetch` 와 `underfetch` 를 피한다.

__Expression__
```
SelectionSet:
  { Selection (list) }
Selection:
  Field
  FragmentSpread
  InlineFragment
```

__Example__
```
{
  id
  firstName
  lastName
}
```

`id`, `firstName`, `lastName` 필드는 `selection set` 를 형성하며, `selection sets` 에는 `fragment` 참조가 포함될 수 있다.

### Fragments
`fragments` 는 공통적으로 반복되는 필드를 재사용할 수 있게 한다.

__Expression__
```
FragmentSpread:
  ... FragmentName Directives (option)
FragmentDefinition:
  fragment FragmentName TypeCondition Directives (option) SelectionSet
FragmentName:
  Name but not on
```

__Example__
```
# before using fragments..
query noFragments {
  user(id: 4) {
    friends(first: 10) {
      id
      name
      profilePic(size: 50)
    }
    mutualFriends(first: 10) {
      id
      name
      profilePic(size: 50)
    }
  }
}

# after using fragments..
query withFragments {
  user(id: 4) {
    friends(first: 10) {
      ...friendFields
    }
    mutualFriends(first: 10) {
      ...friendFields
    }
  }
}

fragment friendFields on User {
  id
  name
  profilePic(size: 50)
}
```

반복되는 필드들을 `fragment` 로 추출하여, 부모 프래그먼트 또는 쿼리로 구성할 수 있다.

### Mutaion
`query` 와 거의 비슷한 문법을 가지며, 데이터를 변경할 때 사용한다. 이때, `query` 와는 달리 필드를 순차적으로 실행한다. (`query` 는 읽기전용인 반면, `mutation` 은 쓰기가 가능하다.)

__Example__
```
mutation {
  createAuthor(
    _id: "john",
    name: "John Carter",
    twitterHandle: "@john"
  ) {
    _id
    name
  }
}
```

`_id` 와 `name`, `twitterHandle` 값을 입력하며, `_id` 와 `name` 이 반환된다.<br />이 때, 필수값을 입력하지 않으면 에러가 발생하며, 값의 필수 여부를 지정할 때엔 `!` 를 사용한다.

```
TYPE
Author
=====================
ARGUMENTS
_id: String!
name: String!
twitterHandle: String
```

## 참고
- [Facebook GraphQL Docs](https://facebook.github.io/graphql)
- [Learn GraphQL](https://learngraphql.com/)
- [graphql.org](http://graphql.org)
- [Slide Share : Introduction to GraphQL (or How I Learned to Stop Worrying about REST APIs)](http://www.slideshare.net/AhmadHafizIsmail/introduction-to-graphql-or-how-i-learned-to-stop-worrying-about-rest-apis)

