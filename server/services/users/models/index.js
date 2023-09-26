import { client } from '../migrations/db.js';
export async function conn() {
  try {
    await client.connect({
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log('=================================');
    console.log('Connected successfully to database');
    console.log('=================================');
  } catch (error) {
    throw { ...error };
  }
}
