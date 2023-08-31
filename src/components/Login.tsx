import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../types/RootStackParamList';
import Navbar from './Navbar';
import Typography from '../Typography';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch} from 'react-redux';
import {User, authenticate} from '../redux/AuthSlice';

export type LoginProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

export interface LoginData {
  emailOrUsername: string;
  password: string;
}

function Login({navigation}: LoginProps) {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const storedUsersJSON = await AsyncStorage.getItem('users');
      if (storedUsersJSON) {
        const storedUsers = JSON.parse(storedUsersJSON);
        const storedUser = storedUsers.find(
          (user: User) =>
            (user.username === emailOrUsername ||
              user.email === emailOrUsername) &&
            user.password === password,
        );

        if (storedUser) {
          dispatch(authenticate(storedUser));

          console.log('Logged in successfully.');
          navigation.navigate('UserProfile', {
            user: storedUser,
            isLoggedIn: true,
          });
          return;
        } else {
          setLoginError('Invalid username or password.');
        }
      } else {
        setLoginError('No registered user found.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const goRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <>
      <Navbar
        navigation={
          navigation as StackNavigationProp<RootStackParamList, 'Home'>
        }
      />
      <View style={styles.container}>
        <Typography mode="large" margin={20} fontWeight="700" color="#E839F6">
          Login
        </Typography>
        <View style={styles.inputContainer}>
          {loginError ? (
            <Typography mode="extrasmall" align="center" color="red">
              {loginError}
            </Typography>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Email or username"
            value={emailOrUsername}
            onChangeText={setEmailOrUsername}
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
          />
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={25}
            color="#03045e"
            style={styles.showIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        <TouchableOpacity>
          <Typography mode="extrasmall" color="#737BE6" align="right">
            Forgot Password?
          </Typography>
        </TouchableOpacity>
        <LinearGradient
          colors={['#737BE6', '#E839F6']}
          style={styles.loginButton}>
          <TouchableOpacity onPress={handleLogin}>
            <Typography mode="medium" color="#fff" align="center">
              Login
            </Typography>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.lineContainer}>
          <View style={styles.line}></View>
          <Typography mode="extrasmall" color="#E839F6" margin={10}>
            or sign up with
          </Typography>
          <View style={styles.line}></View>
        </View>
        <View style={styles.socialIcon}>
          <Icon
            name="google"
            size={40}
            color="#737BE6"
            style={styles.iconMargin}
          />
          <Icon
            name="facebook-official"
            size={40}
            color="#0F91F3"
            style={styles.iconMargin}
          />
          <Icon
            name="instagram"
            size={40}
            color="#D15451"
            style={styles.iconMargin}
          />
        </View>
        <View style={styles.signUpContainer}>
          <Typography
            mode="extrasmall"
            color="#E839F6"
            align="center"
            margin={10}>
            Or sign up using e-mail
          </Typography>
          <TouchableOpacity onPress={goRegister}>
            <Typography mode="small" color="#E839F6" align="center" margin={10}>
              Sign Up
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E839F6',
    marginBottom: 20,
    width: '80%',
  },
  input: {
    fontSize: 18,
    paddingVertical: 10,
    color: 'black',
  },
  loginButton: {
    width: 300,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  lineContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  line: {
    width: '30%',
    borderBottomWidth: 1,
    borderColor: '#E839F6',
    marginBottom: 16,
  },
  socialIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  iconMargin: {
    marginRight: 20,
  },
  signUpContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 100,
  },
  showIcon: {
    position: 'absolute',
    right: 10,
    color: '#E839F6',
  },
});

export default Login;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
