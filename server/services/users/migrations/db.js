import { dbConfig } from '../config/config.js';
import { MongoClient } from 'mongodb';
export const client = new MongoClient(dbConfig.url);
export const db = client.db(dbConfig.name);

const userSchema = async () => {
  await db.createCollection('Users', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'User Object Validation',
        required: ['username', 'email', 'password', 'role'],
        properties: {
          _id: {},
          username: {
            bsonType: 'string',
            description: "'username' must be a string and is required",
          },
          email: {
            bsonType: 'string',
            description: "'email' must be a string and is required",
          },
          password: {
            bsonType: 'string',
            description: "'password' must be a string and is required",
          },
          role: {
            bsonType: 'string',
            description: "'role' must be a string and is required",
          },
        },
      },
    },
  });
};

export async function generateSchema() {
  try {
    await userSchema();
    console.log('Schema migration success');
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}


