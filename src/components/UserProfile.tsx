import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from './Navbar';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/RootStackParamList';
import Typography from '../Typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {logout} from '../redux/AuthSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useShoppingCart} from '../ShoppingCart';

import {SafeAreaView} from 'react-native-safe-area-context';
import {RootState} from '../redux/store';
import {ProductProps} from '../types/ProductProps';

export type UserProfileProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const UserProfile = ({navigation}: UserProfileProps) => {
  const {userCart, handleRemoveItem} = useShoppingCart();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  const backgroundStyle = {
    backgroundColor: '#fff',
  };

  console.log('userCart:', userCart);
  console.log('isLoggedIn:', loggedIn);

  const userDetails = {
    // name: 'Naila Stefenson ',
    profession: 'Web Developer',
    avatar: require('../Images/screen-0.webp'),
  };
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      dispatch(logout());
      console.log('Log out Success');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleGoProductPage = (product: ProductProps) => {
    navigation.navigate('ProductPage', {product});
  };

  const handlePlaceOrder = () => {
    navigation.navigate('Register');
  };

  return (
    <>
      <Navbar
        navigation={
          navigation as StackNavigationProp<RootStackParamList, 'Home'>
        }
      />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View style={styles.container}>
            <View style={styles.userInfoContainer}>
              <Image source={userDetails.avatar} style={styles.avatar} />
              {/* <Typography>{userDetails.name}</Typography> */}
              <Typography mode="extrasmall">
                {userDetails.profession}
              </Typography>
            </View>
            <View style={styles.line}>
              <Image
                source={require('../Images/pngwing.png')}
                style={styles.imageLine}
              />
            </View>

            {loggedIn && userCart.length > 0 && (
              <View style={styles.cartContainer}>
                <Text style={styles.cartTitle}>Shopping Cart</Text>
                {userCart.map(item => (
                  <TouchableOpacity
                    key={item.product.id}
                    style={styles.cartItem}
                    onPress={() => handleGoProductPage(item.product)}>
                    <View style={styles.itemContainer}>
                      <Image
                        source={{uri: item.product.image}}
                        style={styles.imageContainer}
                        resizeMode="contain"
                      />
                      <View style={styles.itemDetails}>
                        <Text style={styles.textDetails}>
                          {item.product.title}
                        </Text>
                        <Text>Ron {item.product.price}</Text>
                      </View>
                      <View style={styles.quantityAndRemove}>
                        <TouchableOpacity
                          onPress={() => handleRemoveItem(item.product.id)}>
                          <Text style={styles.removeButton}>X</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <View style={styles.iconContainer}>
                  <Icon name="user" size={30} color="#E839F6" />
                </View>
                <Typography>My Profile</Typography>
              </View>
              <View style={styles.detailItem}>
                <View style={styles.iconContainer}>
                  <Icon name="comments" size={30} color="#E839F6" />
                </View>
                <Typography styles={styles.detailText}>Messages</Typography>
              </View>
              <View style={styles.detailItem}>
                <View style={styles.iconContainer}>
                  <Icon name="heart" size={30} color="#E839F6" />
                </View>
                <Typography styles={styles.detailText}>Favorites</Typography>
              </View>
              <View style={styles.detailItem}>
                <View style={styles.iconContainer}>
                  <Icon name="map-marker" size={30} color="#E839F6" />
                </View>
                <Typography styles={styles.detailText}>Location</Typography>
              </View>
              <View style={styles.detailItem}>
                <View style={styles.iconContainer}>
                  <Icon name="cog" size={30} color="#E839F6" />
                </View>
                <Typography styles={styles.detailText}>Settings</Typography>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.logoutContainer}>
        <View style={styles.lineBottom}>
          <TouchableOpacity onPress={handleLogout}>
            <Typography>Log out</Typography>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  userInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  line: {
    width: '100%',
    marginTop: 10,
  },
  imageLine: {
    width: '100%',
    height: 100,
  },
  detailsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 150,
    marginTop: 50,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 15,
  },
  iconContainer: {
    marginRight: 50,
  },
  detailText: {
    fontFamily: 'OpenSans-Regular',
    marginRight: 20,
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  lineBottom: {
    width: '100%',
    borderTopWidth: 1,
    alignItems: 'center',
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
    color: '#E839F6',
    padding: 10,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  textDetails: {
    fontSize: 18,
  },
  quantityAndRemove: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  quantityInput: {
    width: 10,
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
    width: 20,
    color: '#FF0000',
    alignItems: 'center',
    marginTop: 5,
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

export default UserProfile;
