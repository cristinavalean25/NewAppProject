import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../types/RootStackParamList';
import Navbar from './Navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Typography from '../Typography';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RegisterProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
};

function Register({navigation}: RegisterProps) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleRegister = async () => {
    try {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
      if (!password.match(passwordRegex)) {
        setPasswordError(
          'Password must contain min 8 characters, one uppercase letter, one digit, and one special character.',
        );
        return;
      }

      const emailRegex =
        /^[a-z][a-z0-9_]*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      if (!email.match(emailRegex)) {
        setPasswordError('Email is not valid.');
        return;
      }

      const storedUsersJSON = await AsyncStorage.getItem('users');
      const storedUsers = storedUsersJSON ? JSON.parse(storedUsersJSON) : [];

      const userRegister = {email, password, username};
      storedUsers.push(userRegister);

      await AsyncStorage.setItem('users', JSON.stringify(storedUsers));

      console.log('User registered successfully.');
      navigation.navigate('UserProfile', {
        user: {
          email: userRegister.email,
          password: userRegister.password,
          username: userRegister.username,
          id: storedUsers.length - 1,
        },
      });
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const goLogin = () => {
    navigation.navigate('Login');
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
          Register
        </Typography>
        <View style={styles.inputContainer}>
          {passwordError ? (
            <Typography mode="extrasmall" align="center" color="red">
              {passwordError}
            </Typography>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#999"
          />
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={25}
            color="#03045e"
            style={styles.showIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

        <LinearGradient
          colors={['#737BE6', '#E839F6']}
          style={styles.loginButton}>
          <TouchableOpacity onPress={handleRegister}>
            <Typography mode="medium" color="#fff" align="center">
              Register
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
          <TouchableOpacity>
            <Icon
              name="facebook-official"
              size={40}
              color="#0F91F3"
              style={styles.iconMargin}
            />
          </TouchableOpacity>
          <Icon
            name="instagram"
            size={40}
            color="#D15451"
            style={styles.iconMargin}
          />
        </View>
        <View style={styles.loginContainer}>
          <Typography
            mode="extrasmall"
            color="#E839F6"
            align="center"
            margin={10}>
            Already have an account?
          </Typography>
          <TouchableOpacity onPress={goLogin}>
            <Typography mode="small" color="#E839F6" align="center" margin={10}>
              Sign In
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
  loginContainer: {
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

export default Register;
