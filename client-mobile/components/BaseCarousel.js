import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const data = [
  {
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/promos/August2020/hADAZwPm8AlWe5in0gGX.jpg',
  },
  {
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/promos/September2023/NFdoVl3BND6XHUkWfrr3.png',
  },
  {
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/promos/September2023/HmBkvJQX9HtYmSo3sLXb.png',
  },
  {
    image:
      'https://nos.jkt-1.neo.id/mcdonalds/promos/August2023/W79G6rLpFe4ce96GGmzb.png',
  },
];

const { width } = Dimensions.get('window');

export default function BaseCarousel() {
  return (
    <Carousel
      data={data}
      renderItem={({ item, index }) => {
        return (
          <Image
            key={index}
            style={styles.image}
            source={{ uri: item.image }}
          />
        );
      }}
      sliderWidth={width}
      itemWidth={300}
      autoplay={true}
      loop={true}
      autoplayDelay={500}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
