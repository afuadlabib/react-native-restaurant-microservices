import axios from 'axios';
import { decodedToken } from '../utils/jwt.js';
export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw { name: 'JsonWebTokenError' };
    } else {
      const [bearer, token] = authorization.split(' ');
      const { id } = decodedToken(token);
      const { data } = await axios({
        url: `${process.env.BASE_URL_USERS}/${id}`,
      });
      if (!data) {
        throw { name: 'JsonWebTokenError' };
      } else {
        req.user = data;
        next();
      }
    }
  } catch (error) {
    if (error.response) {
      error = error.response.data.message;
    }
    next(error);
  }
};
