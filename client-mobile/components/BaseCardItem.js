import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function BaseCardItem({ data }) {
  return (
    <View style={style.container}>
      <View style={style.item}>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: data.image,
          }}
        />
      </View>
      <View style={style.item}>
        <Text style={style.text}>{data.title}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    opacity: 100,
    borderRadius: 10,
    overflow: 'hidden',
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 5,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  item: {
    overflow: 'hidden',
  },
});
