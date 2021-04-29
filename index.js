const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;
const { User } = require('./models/User');

const config = require('./config/key');

// application/x-www-form-urlencoded 데이터 가져옴
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 데이터 가져옴
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected..'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!~하이루');
});

app.post('/api/users/register', (req, res) => {
  // 회원가입에 필요한 정보를 클라에서 가져와서 DB에 넣음
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post('/api/users/login', (req, res) => {
  // 클라가 요청한 이메일을 DB에서 검색
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '아이디가 일치하지 않습니다',
      });
    } else {
      // 이메일이 DB에 있으면 비밀번호 대조
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            loginSuccess: false,
            message: '비밀번호가 일치하지 않습니다',
          });

        // 비밀번호 맞으면 Token 생성
        user.genToken((err, user) => {
          if (err) return res.status(400).send(err);

          // Token을 쿠키에 저장
          res
            .cookie('x_auth', user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port : ${port}`);
});
