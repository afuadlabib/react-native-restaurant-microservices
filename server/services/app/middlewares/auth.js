const { decodedToken } = require('../helpers/jwt');
const { User } = require('../models');
module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw { name: 'JsonWebTokenError' };
    } else {
      const [bearer, token] = authorization.split(' ');
      const { id } = decodedToken(token);
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: 'JsonWebTokenError' };
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};
