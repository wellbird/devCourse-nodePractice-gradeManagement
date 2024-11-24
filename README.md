# devCourse-nodePractice-gradeManagement
## 데브코스 node, express 연습용
- 강의에서 배운 express와 get, post, put, delete를 이용한 간단한 프로젝트로 과제를 수행해보았습니다.
- 시작 방법
  - npm install
  - node ./server.js

### 성적 관리 시스템 구현
- 성적 관리 시스템을 node와 express를 이용하여 구현해보기
- post : 성적 등록
- get : 성적 조회
- put : 성적 수정
- delete : 성적 삭제

### url
- /
  - 홈화면
  - 추가 버튼
  - 데이터가 없을 때 없다고 표시
  - 데이터가 있을 때 각 데이터별로 수정, 삭제 버튼
- /add
  - 이름, 국어, 영어, 수학 성적 입력 필드
  - 추가 버튼
- /edit/:id
  - (put) 학생 성적 수정
- /:id
  - (delete) id가 숫자가 아니라 "all"이면 전체 성적 삭제

### 문제 및 해결
- html의 form은 get과 post만을 지원함
  - get 또는 post를 이용해서 삭제 및 수정을 처리할 수 있지만 실습의 의미가 없어지는 것 같음
  - 해결방안 : js의 ajax 코드를 만들어 직접 delete와 put 메소드를 던짐