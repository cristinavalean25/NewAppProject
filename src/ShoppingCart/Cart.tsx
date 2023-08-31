import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useShoppingCart} from '../ShoppingCart';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/RootStackParamList';
import Navbar from '../components/Navbar';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

type CartProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Cart'>;
};

function Cart({navigation}: CartProps) {
  const {cart, total, handleRemoveItem, updateTotal} = useShoppingCart();
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const [quantities, setQuantities] = useState<{[id: number]: number}>(
    cart.reduce((acc, item) => {
      acc[item.product.id] = item.qty;
      return acc;
    }, {} as {[id: number]: number}),
  );

  const handleQuantityChange = (productId: number, value: string) => {
    const intValue = parseInt(value);
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: isNaN(intValue) ? 0 : intValue,
    }));

    const newTotal = cart.reduce((acc, item) => {
      return (
        acc +
        item.product.price *
          (item.product.id === productId ? intValue : item.qty)
      );
    }, 0);
    updateTotal(newTotal);
  };

  const handlePlaceOrder = () => {
    if (isLoggedIn) {
      navigation.navigate('UserProfile');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Navbar
            navigation={
              navigation as StackNavigationProp<RootStackParamList, 'Home'>
            }
          />
          <View style={styles.cartContainer}>
            <Text style={styles.cartTitle}>Shopping Cart</Text>
            {cart.map(item => (
              <View key={item.product.id} style={styles.cartItem}>
                <Image
                  source={{uri: item.product.image}}
                  style={styles.imageContainer}
                  resizeMode="contain"
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.textDetails}>{item.product.title}</Text>
                  <View style={styles.quantityContainer}>
                    <Text style={styles.textDetails}>Quantity:</Text>
                    <TextInput
                      style={styles.quantityInput}
                      value={quantities[item.product.id].toString()}
                      onChangeText={value =>
                        handleQuantityChange(item.product.id, value)
                      }
                    />
                  </View>
                  <Text style={styles.textDetails}>
                    Price: RON{' '}
                    {item.product.price * quantities[item.product.id]}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item.product.id)}>
                    <Text style={styles.removeButton}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View>
              <Text style={styles.totalCart}>Total cart: RON {total}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.continueButton}>
                  Continuă cumpărăturile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePlaceOrder}>
                <Text style={styles.placeOrderButton}>Plasează comanda</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartContainer: {
    width: '100%',
    height: undefined,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: 10,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  cartTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#000',
    padding: 10,
    textAlign: 'center',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  textDetails: {
    fontSize: 18,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityInput: {
    width: 50,
    height: 30,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingVertical: 0,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  removeButton: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  totalCart: {
    fontSize: 20,
    color: '#E72E35',
    textAlign: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },

  continueButton: {
    backgroundColor: '#337ab7',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    margin: 5,
    alignSelf: 'center',
  },
  placeOrderButton: {
    backgroundColor: '#5cb85c',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    margin: 5,
    alignSelf: 'center',
  },
});

export default Cart;
