import data from './data.js';
import express from 'express';

// express는 함수이기 때문에, 반환값을 변수에 저장한다.
const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

// PORT 값이 설정돼 있지 않다면, 5000번을 사용
const port = process.env.PORT || 5000;

// port의 포트로 서버 오픈
app.listen(port, () => console.log(`Listening on port ${port}`));
