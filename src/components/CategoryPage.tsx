import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/RootStackParamList';
import {Product} from '../types/Product';
import Navbar from './Navbar';
import {StackNavigationProp} from '@react-navigation/stack';
import {useShoppingCart} from '../ShoppingCart';
import {TouchableOpacity} from 'react-native-gesture-handler';

type CategoryPageProps = {
  route: RouteProp<RootStackParamList, 'CategoryPage'>;
};

const CategoryPage = ({route}: CategoryPageProps) => {
  const navigation = useNavigation();
  const {category} = route.params;
  const [products, setProducts] = useState<Product[]>([]);
  const {addProduct} = useShoppingCart();

  useEffect(() => {
    console.log('Category selected:', category);
    const categoryUrl = `http://192.168.1.10:4000/products?category=${category}`;

    fetch(categoryUrl)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [category]);

  return (
    <>
      <Navbar
        navigation={
          navigation as unknown as StackNavigationProp<
            RootStackParamList,
            'Home'
          >
        }
      />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
            {products.map(
              product =>
                product.category === category && (
                  <View key={product.id} style={styles.productContainer}>
                    <Image
                      source={{uri: product.image}}
                      style={styles.productImage}
                    />
                    <Text style={styles.productTitle}>{product.title}</Text>
                    <Text style={styles.productPrice}>
                      Price: RON {product.price}
                    </Text>
                    <Text style={styles.productDescription}>
                      {product.description}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        addProduct(product);
                      }}
                      style={styles.addButton}>
                      <Text style={styles.addButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                ),
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f0f0f0',
  },
  categoryTitle: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  productContainer: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#E839F6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoryPage;
