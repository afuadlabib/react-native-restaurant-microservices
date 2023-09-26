import axios from 'axios';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== `production`) {
  dotenv.config();
}

const migration = async () => {
  try {
    let { data } = await axios({ url: process.env.BASE_URL_ITEMS });
    const admin = await axios({
      method: 'post',
      url: `${process.env.BASE_URL_USERS}/details`,
      data: { email: 'admin1@mail.com' },
    });
    data = data.map((e) => {
      e.authorId = admin.data._id;
      return e;
    });
    const updateData = await axios({
      method: 'put',
      url: `${process.env.BASE_URL_ITEMS}`,
      data: data,
    });
    console.log(updateData.data);
  } catch (error) {
    console.log(error?.response?.data);
  }
};

migration();
