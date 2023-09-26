const jwt = require('jsonwebtoken');

exports.signToken = (payload) => {
  return jwt.sign(payload, 'fmesifjseifnisefeitheiht');
};

exports.decodedToken = (token) => {
  return jwt.verify(token, 'fmesifjseifnisefeitheiht');
};
