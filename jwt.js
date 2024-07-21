import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET_KEY;

const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: '10m' });
    return token;
};

const refreshToken = (token) => {
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

function loginRequired(req, res, next) {
    const userToken = req.headers["authorization"]?.split(" ")[1];
    if (!userToken || userToken === "null") {
        console.log("Authorization 토큰: 없음");
        res.status(401).json({
            result: "forbidden-approach",
            message: "로그인한 유저만 사용할 수 있는 서비스입니다.",
        });
        return;
    }

    try {
        const jwtDecoded = jwt.verify(userToken, secretKey);
        const userId = jwtDecoded.userId;
        req.currentUserId = userId;
        next();
    } catch (error) {
        res.status(401).json({
            result: "forbidden-approach",
            message: "정상적인 토큰이 아닙니다.",
        });
        return;
    }
}

const refreshJwtMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
      const newToken = refreshToken(token);
      if (newToken) {
        res.cookie('token', newToken, { httpOnly: true, maxAge: 3600000 });
      }
    }
    next();
};

module.exports = { generateToken, refreshToken, loginRequired, refreshJwtMiddleware };