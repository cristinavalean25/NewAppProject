import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

const images = [
  require('../Images/img1.jpg'),
  require('../Images/img2.jpg'),
  require('../Images/img3.jpg'),
  require('../Images/img4.jpg'),
];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeImageAutomatically = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  useEffect(() => {
    const interval = setInterval(changeImageAutomatically, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={images[currentIndex]} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
});

export default Slider;
