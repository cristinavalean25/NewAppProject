import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Typography from '../Typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/RootStackParamList';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from '../redux/AuthSlice';
import {useShoppingCart} from '../ShoppingCart';

type NavbarProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

function Navbar({navigation}: NavbarProps) {
  const authState = useSelector((state: RootState) => state.auth);
  const [shouldShowLogin, setShouldShowLogin] = useState(!authState.loggedIn);
  const {cart} = useShoppingCart();

  useEffect(() => {
    setShouldShowLogin(!authState.loggedIn);
  }, [authState.loggedIn]);

  const {user, loggedIn} = authState;

  const goHome = () => {
    navigation.navigate('Home');
  };

  const goLogin = () => {
    navigation.navigate('Login');
  };

  const goRegister = () => {
    navigation.navigate('Register');
  };

  const goUserProfile = () => {
    navigation.navigate('UserProfile');
  };

  const goToCart = () => {
    navigation.navigate('Cart');
  };

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await AsyncStorage.removeItem('user');
      dispatch(logout());
      console.log('Logged out successfully.');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#737BE6', '#E839F6']}
      style={styles.linearGradient}>
      <View style={styles.container}>
        <TouchableOpacity onPress={goHome}>
          <Typography mode="medium" align="center" fontWeight="800" margin={10}>
            ABOUT YOU
          </Typography>
        </TouchableOpacity>

        <View style={styles.menuItems}>
          {loggedIn && user ? (
            <View style={styles.menuText}>
              <TouchableOpacity onPress={goUserProfile}>
                <Typography align="center" mode="small" color="#000">
                  {user.username}
                </Typography>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.menuText}>
              <TouchableOpacity
                onPress={shouldShowLogin ? goLogin : handleLogout}>
                <Typography align="center" mode="small" color="#000">
                  {loggedIn ? 'Logout' : 'Login'}
                </Typography>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.menuText}>
            <TouchableOpacity onPress={goRegister}>
              <Typography align="center" mode="small" color="#000">
                Register
              </Typography>
            </TouchableOpacity>
          </View>
          <View style={styles.menuText}>
            <TouchableOpacity onPress={goToCart}>
              <Icon
                name="shopping-cart"
                size={25}
                color="#000"
                style={styles.icon}
              />
            </TouchableOpacity>
            <Typography mode="extrasmall" margin={5} fontWeight="600">
              {cart.length}
            </Typography>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 10,
  },
  menuItems: {
    flexDirection: 'row',
  },
  menuText: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
});

export default Navbar;
function dispatch(arg0: {payload: undefined; type: 'auth/logout'}) {
  throw new Error('Function not implemented.');
}
