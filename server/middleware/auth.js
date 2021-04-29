const { User } = require('../models/User');

let auth = (req, res, next) => {
  // 인증 처리

  // 클라의 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth;

  // 토큰을 복호화 후 유저를 찾음
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    // 유저가 없으면 인증 no
    if (!user) return res.json({ isAuth: false, error: true });

    // 유저가 있으면 인증 ok
    // requst에 토큰과 유저를 담아서 index에서 사용
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
