import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import axios from 'axios';
import Product from './Product';
import {ProductProps} from '../types/ProductProps';

function Products() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    axios
      // .get('http://192.168.2.120:3000/products')
      .get('http://192.168.1.10:4000/products')
      .then(res => {
        if (Array.isArray(res.data)) {
          console.log('Received products:', res.data);
          setProducts(res.data);
        } else {
          console.error('Received invalid data:', res.data);
        }
      })

      .catch(err => {
        console.error('Error fetching data:', err);
        if (err.response) {
          console.error('Response data:', err.response.data);
        }
      });
  }, []);

  return (
    <View style={styles.bigContainer}>
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    width: '100%',
  },
});
export default Products;
