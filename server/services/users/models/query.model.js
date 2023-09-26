import { db } from '../migrations/db.js';
import { ObjectId } from 'mongodb';

export default class Query {
  async findAll(collectionName, option) {
    try {
      const collection = db.collection(collectionName);

      const data = await collection.find({}, { ...option }).toArray();
      return data;
    } catch (error) {
      throw { error };
    }
  }
  async findByPk(collectionName, id, option) {
    try {
      const collection = db.collection(collectionName);
      const data = await collection.findOne(
        { _id: new ObjectId(id) },
        { ...option }
      );
      return data;
    } catch (error) {
      throw { error };
    }
  }
  async findOne(collectionName, data, option) {
    try {
      const collection = db.collection(collectionName);
      const user = await collection.findOne({ ...data }, { ...option });
      return user;
    } catch (error) {
      throw { error };
    }
  }
  async updateOne(collectionName, id, updateField, option) {
    try {
      const collection = db.collection(collectionName);
      const data = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...updateField } },
        { ...option }
      );
      return data;
    } catch (error) {
      throw { error };
    }
  }
  async delete(collectionName, id, option) {
    try {
      const collection = db.collection(collectionName);
      const data = await collection.deleteOne(
        { _id: new ObjectId(id) },
        option
      );
      return data;
    } catch (error) {
      throw { error };
    }
  }
  async create(collectionName, objField, option) {
    try {
      const collection = db.collection(collectionName);

      const data = await collection.insertOne({ ...objField }, { ...option });
      return data;
    } catch (error) {
      throw { name: error.message };
    }
  }
  async insertMany(collectionName, data, option) {
    try {
      const collection = db.collection(collectionName);
      const users = await collection.insertMany(data, { ...option });
      return users;
    } catch (error) {
      throw { name: error.message };
    }
  }
}
