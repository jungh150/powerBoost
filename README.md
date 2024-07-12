# powerBoost Study
## 이화여대 파워부스트 스터디
### 게시판 api

##### 글 작성
POST request를 통해 글을 작성할 수 있습니다.
```
POST http://localhost:3000/posts
Content-Type: application/json

{
    "title": "힘들지만...",
    "content": "거친세상에뛰어든건나니까암오케"
}
```

##### 글 수정
PATCH request를 통해 글을 수정할 수 있습니다.
```
PATCH http://localhost:3000/posts/5
Content-Type: application/json

{
    "content": "거친세상에뛰어든건나니까암오케..사실안괜찮음"
}
```

##### 글 삭제
DELETE request를 통해 글을 삭제할 수 있습니다.
```
DELETE http://localhost:3000/posts/5
```

##### 특정 글 조회
GET request를 통해 특정 id의 글을 조회할 수 있습니다.
```
GET http://localhost:3000/posts/1
```

##### 전체 글 조회
GET request를 통해 전체 글을 조회할 수 있습니다.
```
GET http://localhost:3000/posts
```

##### 글에 좋아요 달기
PATCH request를 통해 글에 좋아요를 달 수 있습니다.
```
PATCH http://localhost:3000/posts/5
Content-Type: application/json

{
    "isliked": true
}
```

##### 글에 댓글 달기
PATCH request를 통해 글에 댓글을 달 수 있습니다.
```
PATCH http://localhost:3000/comments/1
Content-Type: application/json

{
    "comment": "마라탕"
}
```