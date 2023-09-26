import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import BaseList from './BaseList';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad5093abb28ba',
    title: 'First Item',
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/promos/August2020/hADAZwPm8AlWe5in0gGX.jpg',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fb90d91aa97f63',
    title: 'Second Item',
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/promos/August2020/hADAZwPm8AlWe5in0gGX.jpg',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14558971e29d72',
    title: 'Third Item',
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/promos/August2020/hADAZwPm8AlWe5in0gGX.jpg',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd96aa97f63',
    title: 'Second Item',
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/promos/August2020/hADAZwPm8AlWe5in0gGX.jpg',
  },
  {
    id: '58694a0f-3da1-471f-bd96-149871e29d72',
    title: 'Third Item',
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/promos/August2020/hADAZwPm8AlWe5in0gGX.jpg',
  },
];

export default function BaseLists({data, navigation}) {

  return (
    <View>
      <FlatList
        style={styles.container}
        data={data}
        renderItem={({ item }) => {
          return <BaseList item={item} navigation={navigation} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // backgroundColor: 'red',
    gap: 5,
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
  },
});
