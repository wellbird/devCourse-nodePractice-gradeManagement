const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

let db = new Map();
let id = 1;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const studentId = Array.from(db.keys());
  const studentList = studentId
    .map((id) => {
      const studentInfo = db.get(id);
      return `
        <div>
          <p>이름: ${studentInfo.name}, 국어: ${studentInfo.korean}, 영어: ${studentInfo.english}, 수학: ${studentInfo.math}</p>
          <button onclick="location.href='/edit/${id}'">수정</button>
          <button onclick="throwDeleteMethod(${id})">삭제</button>
        </div>
      `;
    })
    .join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="kr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/home.style.css" />
        <script src="/js/throwDeleteMethod.js"></script>
        <title>성적 관리 시스템</title>
      </head>
      <body>
        <h1>성적 관리 시스템</h1>
        <button onclick="location.href='/add'">성적 추가</button>
        <button onclick="throwDeleteMethod('all')">전체 삭제</button>
        <hr/>
        <h3>학생 목록</h3>
        ${db.size > 0 ? studentList : '<p>데이터가 없습니다.</p>'}
      </body>
    </html>
    `);
});

app.get('/add', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="kr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/add.style.css" />
        <script src="/js/checkUserInput.js"></script>
        <title>성적 추가</title>
      </head>
      <body>
        <h1>성적 추가</h1>
        <form action="/add" method="POST" onsubmit="return checkUserInput(event)">
          <input type="text" id="name" name="name" placeholder="이름" required>
          <input type="number" id="korean" name="korean" placeholder="국어" required>
          <input type="number" id="english" name="english" placeholder="영어" required>
          <input type="number" id="math" name="math" placeholder="수학" required>
          <button type="submit">추가</button>
        </form>
      </body>
    </html>
    `);
});

app.post('/add', (req, res) => {
  const { name, korean, english, math } = req.body;
  db.set(id++, { name, korean, english, math });
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = db.get(id);

  if (!student) {
    return res.status(404).send('학생을 찾을 수 없습니다.');
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="kr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/edit.style.css" />
        <script src="/js/checkUserInput.js"></script>
        <script src="/js/throwPutMethod.js"></script>
        <title>성적 수정</title>
      </head>
      <body>
        <h1>성적 수정</h1>
        <form action="/edit/${id}" method="PUT" onsubmit="return throwPutMethod(event, ${id})">
          <input type="text" id="name" name="name" placeholder="이름" value="${student.name}" required>
          <input type="number" id="korean" name="korean" placeholder="국어" value="${student.korean}" required>
          <input type="number" id="english" name="english" placeholder="영어" value="${student.english}" required>
          <input type="number" id="math" name="math" placeholder="수학" value="${student.math}" required>
          <button type="submit">수정</button>
        </form>
      </body>
    </html>
    `);
});

app.put('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, korean, english, math } = req.body;

  if (db.has(id)) {
    db.set(id, { name, korean, english, math });
    return res.status(200).json({ message: '학생 정보가 수정되었습니다.' });
  } else {
    return res.status(404).json({ message: '존재하지 않는 학생 데이터입니다.' });
  }
});

app.delete('/:id', (req, res) => {
  let id = req.params.id;

  if (id === 'all') {
    if (db.size === 0) {
      return res.status(404).json({ message: '삭제할 데이터가 없습니다.' });
    } else {
      db = new Map();
      return res.status(200).json({ message: '전체 데이터 삭제되었습니다.' });
    }
  } else {
    id = parseInt(id);
    if (db.get(id) === undefined) {
      return res.status(404).json({ message: '존재하지 않는 학생 데이터입니다.' });
    } else {
      db.delete(id);
      return res.status(200).json({ message: '삭제되었습니다.' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`서버 열림 : http://localhost:${PORT}`);
});
