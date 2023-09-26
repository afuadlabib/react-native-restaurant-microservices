import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import BaseCard from './BaseCard';

const { width } = Dimensions.get('window');

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad5093abb28ba',
    title: 'Big Mac',
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/foods/September2023/ECyVRi92DwGqD00enfl7.png',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fb90d91aa97f63',
    title: 'PaNas 1',
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/foods/September2019/QhZI0YBTJ3VLWbAqcdIK.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14558971e29d72',
    title: 'PaNas Special',
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/foods/September2019/QhZI0YBTJ3VLWbAqcdIK.png',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd96aa97f63',
    title: 'McChicken',
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/foods/September2023/Xsc5nAZ25VGigkkVb7vj.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-149871e29d72',
    title: 'McNugget',
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/foods/September2019/qFoLKbSe1R3OJ75zAm4B.png',
  },
];

export default function BaseCardList() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {DATA?.map((e) => (
          <BaseCard data={e} key={e.id} />
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
