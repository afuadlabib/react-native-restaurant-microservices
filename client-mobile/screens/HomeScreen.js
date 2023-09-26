import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BaseCardList from '../components/BaseCardList';
import BaseCarousel from '../components/BaseCarousel';
import BaseCardListItem from '../components/BaseCardListItem';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DonalDuck</Text>
      </View>
      <View style={styles.carouselContainer}>
        <BaseCarousel />
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.text}>Menu Favorite</Text>
        <BaseCardList />
      </View>
      <View style={styles.menuContainer}>
        <Text style={styles.text}>Paket Keluarga</Text>
        <BaseCardListItem />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-center',
    backgroundColor: 'white',
  },
  header: {
    padding: 5,
    backgroundColor: '#B71313',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'orange',
    textAlign: 'center',
  },
  carouselContainer: {
    flex: 0.8,
    justifyContent: 'space-center',
    backgroundColor: '#B71313',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    paddingBottom: 30,
  },
  categoryContainer: {
    flex: 1,
    justifyContent: 'space-center',
    backgroundColor: 'white',
  },
  menuContainer: {
    flex: 1.2,
    justifyContent: 'space-center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'left',
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 20,
  },
});
