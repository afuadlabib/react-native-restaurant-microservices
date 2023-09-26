import { hashPassword } from '../../../orchestrator-express/utils/bcrypt.js';
import { dbConfig } from '../config/config.js';
import { APP_API_URL } from '../global.variable.js';
import Query from '../models/query.model.js';
import axios from 'axios';

const query = new Query();
const userCollection = dbConfig.collections.users;

export default class UserController {
  static async findAll(req, res, next) {
    try {
      const users = await query.findAll(userCollection, {
        projection: { password: 0 },
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  static async findByPk(req, res, next) {
    try {
      const users = await query.findByPk(userCollection, req.params.userId);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  static async findOne(req, res, next) {
    try {
      const users = await query.findOne(userCollection, {
        email: req.body.email,
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const findUser = await query.findOne(userCollection, {
        email: req.body.email,
      });
      if (findUser) {
        return res
          .status(400)
          .json({ name: 'validation_error', message: 'email must be unique' });
      }
      req.body.password = hashPassword(req.body.password);
      const users = await query.create(userCollection, {
        ...req.body,
        role: 'user',
      });
      res.status(201).json(users);
    } catch (error) {
      next(error);
    }
  }
  static async createAdmin(req, res, next) {
    try {
      const findUser = await query.findOne(userCollection, {
        email: req.body.email,
      });
      if (findUser) {
        return res
          .status(400)
          .json({ name: 'validation_error', message: 'email must be unique' });
      }
      req.body.password = hashPassword(req.body.password);
      const users = await query.create(userCollection, {
        ...req.body,
        role: 'admin',
      });
      res.status(201).json(users);
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const users = await query.updateOne(userCollection, req.params.userId, {
        ...req.body,
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const users = await query.delete(userCollection, req.params.userId);
      if (users.deletedCount) {
        const { data } = await axios({
          url: `${APP_API_URL}/items`,
        });

        for (let el of data) {
          if (el.authorId === req.params.userId) {
            const response = await axios({
              method: 'delete',
              url: `${APP_API_URL}/items/${el.id}`,
            });
          }
        }
      }
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}
