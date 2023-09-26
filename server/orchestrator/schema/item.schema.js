import axios from 'axios';
import { APP_API_URL, USERS_API_URL } from './variable.js';


export const itemTypeDefs = `#graphql

  type Item {
    id: ID!
    name: String!
    description: String!
    price: Int!
    imgUrl: String!,
    authorId: String!,
    categoryId: String!
    user: User,
    category: Category
  }

  type Category {
    id: ID!
    name: String!
  }
  type Query {
    getItems: [Item]
    getItem(id: ID!): Item
  }

  type Mutation {
    addItem(name: String, description: String, price: Int, imgUrl: String, authorId: String, categoryId: String): Item
    updateItem(id: ID,name: String, description: String, price: Int, imgUrl: String, authorId: String, categoryId: String) :Item
    deleteItem(id: ID) : Item
  }
`;

export const itemResolvers = {
  Query: {
    getItems: async () => {
      try {
        let { data } = await axios({ url: `${APP_API_URL}/items` });
        let result = [];
        for (let e of data) {
          try {
            const user = await axios({
              url: `${USERS_API_URL}/users/${e.authorId}`,
            });

            const {data: category} = await axios({
              url: `${APP_API_URL}/categories/${e.categoryId}`
            })
            user.data.id = user.data._id;
            delete user.data._id;
            delete user.data.password;
            e.category = category
            e.user = user.data;
            result.push(e);
          } catch (error) {
            console.log(error?.response?.data);
          }
        }
        return result;
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
    getItem: async (parent, args, contextValue, info) => {
      try {
        const { data } = await axios({
          url: `${APP_API_URL}/items/${args.id}`,
        });
        const user = await axios({
          url: `${USERS_API_URL}/users/${data.authorId}`,
        });
        const {data: category} = await axios({
          url: `${APP_API_URL}/categories/${data.categoryId}`
        })
        return { ...data, user: user.data, category };
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
  },
  Mutation: {
    addItem: async (parent, args, contextValue, info) => {
      try {
        let { data } = await axios({
          method: 'post',
          url: `${APP_API_URL}/items`,
          data: args,
        });

        let response = await axios({
          url: `${USERS_API_URL}/users/${data.authorId}`,
        });
        return { ...data, user: response.data };
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
    updateItem: async (parent, args, contextValue, info) => {
      try {
        let { data } = await axios({
          method: 'put',
          url: `${APP_API_URL}/items/${args.id}`,
          data: args,
        });
        let response = await axios({
          url: `${USERS_API_URL}/users/${data.data.authorId}`,
        });
        return { ...data.data, user: response.data };
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
    deleteItem: async (parent, args, contextValue, info) => {
      try {
        const { data } = await axios({
          method: 'delete',
          url: `${APP_API_URL}/items/${args.id}`,
        });
        return { ...data.data };
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
  },
};
