import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';

import BaseCardItem from './BaseCardItem';

const { width } = Dimensions.get('window');

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad5093abb28ba',
    title: 'Paket Keluarga Seru Tanpa Mainan',
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/foods/May2023/ujqBWB3DhGhfeYaZ42pd.png',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fb90d91aa97f63',
    title:
      'Paket Keluarga Seru Breakfast Happy dan Mainan Meal Egg & Cheese Mufin dan Mainan',
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/foods/July2023/OrlYAdMm09TvRit56tck.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14558971e29d72',
    title: 'Paket Keluarga Seru Happy Meal Beaf Burger dan Mainan',
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/foods/July2023/zzsDfH7JaT37antVwZAf.png',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd96aa97f63',
    title: 'Paket Keluarga Seru Happy Meal Ayam McD dan Mainan',
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/foods/July2023/35CUjZayRPV3oDL06bbe.png',
  },
];

export default function BaseCardListItem() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {DATA?.map((e) => (
          <BaseCardItem data={e} key={e.id} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'row',
    gap: 16,
    padding: 10,
  },
});
