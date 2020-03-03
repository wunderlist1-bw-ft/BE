const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const secret = "the blood sings to me";

  if (authorization) {
    jwt.verify(authorization, secret, (err, decode) => {
      if (err) {
        res.status(401).json({ Message: "Not Authorized" });
      } else {
        req.decodedToken = decode;
        console.log(decode);
        next();
      }
    });
  } else {
    res.status(400).json({ Error: "Need authorization" });
  }
};
