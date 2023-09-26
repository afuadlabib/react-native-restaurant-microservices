import axios from 'axios';
import { USERS_API_URL } from './variable.js';

export const userTypeDefs = `#graphql
  #define method entity
  type User {
    id: ID
    username: String!
    email: String!
    password: String
    role: String
    phoneNumber: String
    address: String
  }
  #define method Query
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    addUser(username: String, email: String, password: String, phoneNumber: String, address: String): User
    deleteUser(id: ID): User
  }
`;

export const userResolvers = {
  Query: {
    getUsers: async () => {
      try {
        let { data } = await axios({ url: `${USERS_API_URL}/users` });
        data = data.map((e) => {
          e.id = e._id;
          delete e._id;
          return e;
        });

        return data;
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
    getUser: async (parent, args, contextValue, info) => {
      try {
        const { data } = await axios({
          url: `${USERS_API_URL}/users/${args.id}`,
        });
        delete data.password;
        data.id = data._id;
        return { ...data };
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
  },
  Mutation: {
    addUser: async (parent, args, contextValue, info) => {
      try {
        let { data } = await axios({
          method: 'post',
          url: `${USERS_API_URL}/users`,
          data: args,
        });
        if (data.acknowledged) {
          const response = await axios({
            url: `${USERS_API_URL}/users/${data.insertedId}`,
          });
          delete response.data.password;
          response.data.id = response.data._id;
          data = response.data;
        }
        return { ...data };
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
    deleteUser: async (parent, args, contextValue, info) => {
      try {
        const response = await axios({
          url: `${USERS_API_URL}/users/${args.id}`,
        });
        const { data } = await axios({
          method: 'delete',
          url: `${USERS_API_URL}/users/${args.id}`,
        });
        if (data.deletedCount) {
          delete response.data.password;
          response.data.id = response.data._id;
          return { ...response.data };
        }
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
  },
};
