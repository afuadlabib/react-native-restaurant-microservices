import React from 'react';
import { Text } from 'react-native';
import BaseLists from '../components/BaseLists';
import { useQuery, gql } from '@apollo/client';

const GET_ITEMS = gql`

query Products {
  getItems {
    id
    imgUrl
    name
    price
    description
  }
}

`


export default function MenuScreen({navigation}) {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;
  const products = data.getItems
  return (
      <BaseLists data={products} navigation={navigation}/>

  );
}
