import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function BaseCard({ data }) {
  return (
    <View style={style.container}>
      <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: data.image,
        }}
      />
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
  },
  text: {
    textAlign: 'center',
  },
  item: {},
});
