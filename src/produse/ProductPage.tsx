import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import Navbar from '../components/Navbar';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/RootStackParamList';
import {useShoppingCart} from '../ShoppingCart';

type ProductPageRouteProp = RouteProp<RootStackParamList, 'ProductPage'>;

export type ProductPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductPage'
>;

type ProductPageProps = {
  route: ProductPageRouteProp;
  navigation: ProductPageNavigationProp;
};

const ProductPage = ({route, navigation}: ProductPageProps) => {
  const {product} = route.params;
  const {addProduct} = useShoppingCart();

  // const [quantity, setQuantity] = React.useState(0);

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
            <Image
              source={{uri: product.image || ''}}
              style={styles.productImage}
              resizeMode="contain"
            />

            <View style={styles.productDetailsContainer}>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productPrice}>{product.price} RON</Text>
              <Text style={styles.productDetail}>
                Category: {product.category}
              </Text>
              <Text style={styles.productDetail}>
                Description: {product.description}
              </Text>
              <Text style={styles.productDetail}>Brand: {product.brand}</Text>
              {/* <View style={styles.inputContainer}>
                <Text>Quantity:</Text>
                <TextInput
                  style={styles.input}
                  value={quantity.toString()}
                  onChangeText={text => setQuantity(parseInt(text) || 1)}
                  keyboardType="numeric"
                />
              </View> */}

              <TouchableOpacity
                onPress={() => {
                  addProduct(product);
                }}>
                <Text style={styles.addToCartButton}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  productDetailsContainer: {
    padding: 16,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#E72E35',
    marginBottom: 8,
  },
  productDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  addToCartButton: {
    backgroundColor: '#E839F6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff',
  },
});

export default ProductPage;
