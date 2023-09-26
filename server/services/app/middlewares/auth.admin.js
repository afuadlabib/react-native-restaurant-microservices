const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (!role) {
      throw { name: 'error' };
    } else {
      if (role !== 'admin') {
        throw { name: 'forbidden' };
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};
