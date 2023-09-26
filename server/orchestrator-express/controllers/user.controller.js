import axios from 'axios';
import validationUser from '../utils/validation.user.js';
import { comparePassword } from '../utils/bcrypt.js';
import { signToken } from '../utils/jwt.js';
import { redis } from '../utils/redis.js';
export default class UserController {
  async create(req, res, next) {
    try {
      req.body = validationUser(req.body);
      const { data } = await axios({
        method: 'post',
        url: process.env.BASE_URL_USERS,
        data: req.body,
      });
      if (data.acknowledged) {
        return res.status(201).json({ message: 'success register user' });
      }
    } catch (error) {
      if (error.response) {
        error = error.response.data;
      }
      next(error);
    }
  }
  async createAdmin(req, res, next) {
    try {
      req.body = validationUser(req.body);
      const { data } = await axios({
        method: 'post',
        url: `${process.env.BASE_URL_USERS}`,
        data: req.body,
      });
      if (data.acknowledged) {
        return res.status(201).json({ message: 'success register admin' });
      }
    } catch (error) {
      if (error.response) {
        error = error.response.data;
      }
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ message: 'email is required' });
      }
      if (!password) {
        return res.status(400).json({ message: 'password is required' });
      }
      const { data } = await axios({
        method: 'post',
        url: `${process.env.BASE_URL_USERS}/details`,
        data: { email },
      });
      if (!data) {
        return res.status(401).json({ message: 'invalid email or password' });
      } else {
        const decoded = comparePassword(password, data.password);
        if (decoded) {
          const access_token = signToken({ id: data._id });
          return res.status(200).json({ access_token, id: data._id });
        } else {
          return res.status(401).json({ message: 'invalid email or password' });
        }
      }
    } catch (error) {
      if (error.response) {
        error = error.response.data;
      }
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { userId } = req.params;
      const { data } = await axios({
        method: 'delete',
        url: `${process.env.BASE_URL_USERS}/${userId}`,
      });
      // test
      if (data.deletedCount) {
        let result = [];
        const { data } = await axios({
          url: `${process.env.BASE_URL_ITEMS}/items`,
        });
        const temp = data;
        for (let el of temp) {
          try {
            const { data } = await axios({
              url: `${process.env.BASE_URL_USERS}/${el.authorId}`,
            });

            el.user = data;
            result.push(el);
          } catch (error) {
            console.log(error?.response?.data);
          }
        }
        result = JSON.stringify(result);
        await redis.set('items', result);
        return res.status(200).json({ messaga: 'success delete user' });
      } else {
        throw { name: 'not_found' };
      }
    } catch (error) {
      if (error.response) {
        error = error.response.data;
      }
      next(error);
    }
  }
}
