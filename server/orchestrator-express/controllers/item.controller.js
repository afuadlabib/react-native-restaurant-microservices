import axios from 'axios';
import { redis, setTime } from '../utils/redis.js';

export default class ItemController {
  async create(req, res, next) {
    try {
      const dataInputItem = { ...req.body };
      const response = await axios({
        method: 'post',
        url: `${process.env.BASE_URL_ITEMS}/items`,
        data: dataInputItem,
      });
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
      let chace = await redis.set('items', result);
      res.status(201).json(response.data);
    } catch (error) {
      if (error.response) {
        error = error.response.data;
      }
      next(error);
    } finally {
      setTime('items');
    }
  }
  async findAll(req, res, next) {
    try {
      let itemsCache = await redis.get('items');
      itemsCache = JSON.parse(itemsCache);
      let tempResult = null;

      if (!itemsCache) {
        tempResult = null;
      } else if (itemsCache.length < 1) {
        tempResult = null;
      } else {
        tempResult = true;
      }
      let result = [];
      if (!tempResult) {
        const { data } = await axios({
          url: `${process.env.BASE_URL_ITEMS}/items`,
        });
        const temp = data;
        for (let el of temp) {
          try {
            const { data } = await axios({
              url: `${process.env.BASE_URL_USERS}/${el.authorId}`,
            });
            try {
              const { data: category } = await axios({
                url: `${process.env.BASE_URL_ITEMS}/categories/${el.categoryId}`,
              });
              el.category = category;
              el.user = data;
              result.push(el);
            } catch (error) {
              console.log(error?.response?.data);
            }
          } catch (error) {
            console.log(error?.response?.data);
          }
        }

        result = JSON.stringify(result);
        await redis.set('items', result);
        itemsCache = await redis.get('items');
        itemsCache = JSON.parse(itemsCache);
      }
      res.status(200).json(itemsCache);
    } catch (error) {
      if (error.response) {
        error = error.response.data;
      }
      next(error);
    } finally {
      setTime('items');
    }
  }
  async findOne(req, res, next) {
    try {
      let item = {};
      let itemsCache = JSON.parse(await redis.get('items'));
      if (!itemsCache) {
        const { data } = await axios({
          url: `${process.env.BASE_URL_ITEMS}/items`,
        });

        await redis.set('items', JSON.stringify(data));
        itemsCache = JSON.parse(await redis.get('items'));
      }
      item = itemsCache?.find((e) => {
        return e.id === req.params.itemId;
      });
      if (!item) {
        throw { name: 'not_found' };
      }
      res.status(200).json(item);
    } catch (error) {
      if (error.response) {
        error = error.response.data;
      }
      next(error);
    } finally {
      setTime('items');
    }
  }
  async updateOne(req, res, next) {
    try {
      const { data } = await axios({
        method: 'put',
        url: `${process.env.BASE_URL_ITEMS}/items/${req.params.itemId}`,
        data: { ...req.body },
      });

      const dataUpdate = data;
      let result = [];
      if (dataUpdate) {
        const { data } = await axios({
          url: `${process.env.BASE_URL_ITEMS}/items`,
        });
        for (let el of data) {
          try {
            const { data } = await axios({
              url: `${process.env.BASE_URL_USERS}/${el.authorId}`,
            });
            el.User = data;
            result.push(el);
          } catch (error) {
            console.log(error?.response.data);
          }
        }
        const findItem = data.find((el) => el.id === dataUpdate.data.id);
        await redis.set('items', JSON.stringify(result));
        res.status(200).json(dataUpdate);
      }
    } catch (error) {
      if (error.response) {
        error = error.response.data;
      }
      next(error);
    } finally {
      setTime('items');
    }
  }
  async delete(req, res, next) {
    try {
      const { data } = await axios({
        method: 'delete',
        url: `${process.env.BASE_URL_ITEMS}/items/${req.params.itemId}`,
      });

      res.status(200).json(data);
    } catch (error) {
      if (error.response) {
        error = error.response.data;
      }
      next(error);
    } finally {
      setTime('items');
    }
  }
}
