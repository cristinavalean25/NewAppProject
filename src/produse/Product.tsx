import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import {ProductProps} from '../types/ProductProps';
import {SafeAreaView} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {ProductPageNavigationProp} from './ProductPage';

interface ProductComponentProps {
  product: ProductProps;
}

const Product = ({product}: ProductComponentProps) => {
  const navigation = useNavigation<ProductPageNavigationProp>();

  const handleViewDetails = () => {
    navigation.navigate('ProductPage', {product: product});
  };

  // const handleDeleteProduct = async (productId: any) => {
  //   try {
  //     const response = await axios.delete(
  //       `http://192.168.2.120:4000/products/${productId}`,
  //     );
  //     console.log('Product deleted:', response.data);
  //   } catch (error) {
  //     console.error('Error deleting product:', error);
  //   }
  // };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.productContainer}>
          <TouchableOpacity onPress={handleViewDetails}>
            <Image
              source={{uri: product.image || ''}}
              style={styles.productImage}
              resizeMode="contain"
            />
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productPrice}>{product.price} RON</Text>
            <Text style={styles.productDetail}>
              Category: {product.category}
            </Text>
            <Text style={styles.productDetail}>Brand: {product.brand}</Text>
            {/* <Button
              title="Delete"
              onPress={() => handleDeleteProduct(product.id)}
            /> */}

            <Text style={styles.viewDetailsButton}>View Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: 'white',
    marginBottom: 16,
    width: '100%',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  productImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#E72E35',
  },
  productDetail: {
    fontSize: 14,
    color: '#555',
  },
  viewDetailsButton: {
    width: '100%',
    height: 30,
    backgroundColor: '#737BE6',
    borderRadius: 5,
    paddingVertical: 3,
    textAlign: 'center',
    fontWeight: '800',
    color: '#fff',
  },
});

export default Product;
