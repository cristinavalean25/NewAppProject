import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Typography from '../Typography';
import axios from 'axios';
import {Product} from '../types/Product';

const NewArivals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    axios
      .get('http://192.168.2.120:4000/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex, products]);

  return (
    <View style={styles.container}>
      <Typography mode="large" margin={20} color="#E839F6" fontWeight="700">
        New Arivals
      </Typography>
      {products.length > 0 && (
        <Image
          source={{uri: products[currentImageIndex].image}}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
});

export default NewArivals;
