import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET_KEY;

// 새로운 토큰을 생성하는 함수
export const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: '10m' });
    return token;
};

// 기존 토큰을 사용하여 새로운 토큰을 생성하는 함수
export const refreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    const payload = {
      userId: decoded.userId,
      isAdmin: decoded.isAdmin,
    };
    const newToken = generateToken(payload);
    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

// 로그인이 필요한 api 요청 시
export function loginRequired(req, res, next) {
  // 헤더에서 토큰 가져오기
  const headerToken = req.headers['authorization']?.split(' ')[1];
  // 쿠키에서 토큰 가져오기
  const cookieToken = req.cookies.token;
  
  const token = headerToken || cookieToken;
  // 토큰이 없을 경우
  if (!token || token === "null") {
      console.log("Authorization 토큰: 없음");
      res.status(401).json({
          result: "forbidden-approach",
          message: "로그인한 유저만 사용할 수 있는 서비스입니다.",
      });
      return;
  }
  // 해당 토큰이 정상적인 토큰인지 확인
  try {
      const jwtDecoded = jwt.verify(token, secretKey);
      const userId = jwtDecoded.userId;
      req.currentUserId = userId;
      // 토큰 갱신
      const newToken = refreshToken(token);
      if (newToken) {
        res.cookie('token', newToken, { httpOnly: true, maxAge: 3600000 });
      }
      next();
  } catch (error) {
      res.status(401).json({
          result: "forbidden-approach",
          message: "정상적인 토큰이 아닙니다.",
      });
      return;
  }
}