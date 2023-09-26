import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export default function BaseList( {item, navigation} ) {

  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: item?.imgUrl }} />
        <View style={styles.item}>
          <Text ellipsizeMode='clip' numberOfLines={2} style={styles.title}>{item.name}</Text>
          <Text>{item.description}</Text>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('Detail', {name:'Detail', itemId: item.id})}>
              Detail
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    margin: 7,
    gap: 5,
    overflow: 'hidden',
    backgroundColor: '#B71313',
  },
  image: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 10,
  },
  item: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    paddingHorizontal: 2   
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
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
