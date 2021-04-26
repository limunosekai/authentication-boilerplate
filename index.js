const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const { User } = require('./models/User');

// application/x-www-form-urlencoded 데이터 가져옴
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 데이터 가져옴
app.use(bodyParser.json());

mongoose
  .connect(
    'mongodb+srv://Limu:QAZwsx123@ytubecloneproject.rzk32.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log('MongoDB Connected..'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', (req, res) => {
  // 회원가입에 필요한 정보를 클라에서 가져와서 DB에 넣음
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port : ${port}`);
});
