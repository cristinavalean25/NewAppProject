import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableHighlight,
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
import Modal from 'react-native-modal';

export type UserProfileProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const UserProfile = ({navigation}: UserProfileProps) => {
  const {userCart, handleRemoveItem} = useShoppingCart();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

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

  const toggleModal = () => {
    setModalVisible(!modalVisible);
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
                <View style={styles.container}>
                  <TouchableHighlight
                    onPress={toggleModal}
                    style={styles.placeOrderButton}>
                    <Typography mode="small" color="#fff">
                      Plaseaza comanda
                    </Typography>
                  </TouchableHighlight>

                  <Modal isVisible={modalVisible}>
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <TextInput
                          style={styles.inputField}
                          placeholder="Nume"
                        />
                        <TextInput
                          style={styles.inputField}
                          placeholder="Prenume"
                        />
                        <TextInput
                          style={styles.inputField}
                          placeholder="Adresă"
                        />
                        <TextInput
                          style={styles.inputField}
                          placeholder="Oraș"
                        />
                        <TouchableHighlight
                          onPress={toggleModal}
                          style={styles.placeOrderButton}>
                          <Typography mode="small" align="center" color="#fff">
                            Salveaza datele
                          </Typography>
                        </TouchableHighlight>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={styles.emptyContainer}></View>
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  placeOrderButton: {
    backgroundColor: '#E839F6',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  inputField: {
    borderColor: '#E839F6',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },

  emptyContainer: {
    height: 50,
    backgroundColor: '#fff',
  },
});

export default UserProfile;
