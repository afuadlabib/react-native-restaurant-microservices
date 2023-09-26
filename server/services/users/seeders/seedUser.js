import { hashPassword } from '../helpers/bcrypt.js';
import { client } from '../migrations/db.js';
import Query from '../models/query.model.js';
const query = new Query();

let data = [
  {
    username: 'user1',
    email: 'user1@mail.com',
    password: 'user1',
    role: 'user',
    phoneNumber: '08xxxxx',
    address: '08xxxxx',
  },
  {
    username: 'admin1',
    email: 'admin1@mail.com',
    password: 'admin1',
    role: 'admin',
    phoneNumber: '08xxxxx',
    address: '08xxxxx',
  },
];

data = data.map((e) => {
  delete e.id;
  e.password = hashPassword(e.password);
  return e;
});

export async function user(data) {
  try {
    data = await query.insertMany('Users', data);
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close()
  }
}

user(data);
