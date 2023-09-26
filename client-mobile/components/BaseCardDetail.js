import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

export default function BaseCardDetail({ route }) {
  const getDetail = gql`
    query GetItem($getItemId: ID!) {
      getItem(id: $getItemId) {
        description
        id
        imgUrl
        name
        price
        user {
          username
        }
        category {
        name
        }
      }
    }
  `;
  const { itemId } = route.params;
  const { loading, error, data } = useQuery(getDetail,{variables: {getItemId: itemId}});
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;
  const item = data.getItem
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: item.imgUrl,
        }}
      />
      <Text style={styles.text}>{item.name} - {item.category?.name}</Text>
      <View style={styles.item}>
      <Text>Harga Rp.{item.price} - author: {item.user.username}</Text>
        <Text>description: {item.description}</Text>
        <Text>
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem{' '}
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            console.log('test');
          }}
        >
          <Text style={styles.buttonText}>Beli</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  image: {
    width: '100%',
    height: '50%',
    backgroundColor: '#B71313',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  text: {
    paddingVertical: 20,
    textAlign: 'left',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    paddingLeft: 20,
    textAlign: 'center',
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 50,
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 100,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#B71313',
    margin: 'auto',
  },
  buttonText: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
