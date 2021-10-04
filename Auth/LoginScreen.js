import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {color} from 'react-native-elements/dist/helpers';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    if (email != '' && password != '') {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('Main');
        })
        .catch(e => {
          console.log(e);
          if (e.code === 'auth/invalid-email') {
            alert('The email address is not valid.');
          } else if (e.code === 'auth/user-not-found') {
            alert("The user doesn't exist");
          } else if (e.code === 'auth/wrong-password') {
            alert('The password is incorrect.');
          }
        });
    } else {
      alert('You need to fill all the fields.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1F1D2C', padding: 10}}>
      <ScrollView>
        <View>
          <Text style={{color: '#F9F9F9'}}>Login</Text>
          <Input
            inputStyle={{color: '#F9F9F9'}}
            placeholder="Email"
            textContentType="emailAddress"
            onChangeText={email => setEmail(email)}
          />
          <Input
            inputStyle={{color: '#F9F9F9'}}
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={{color: '#F9F9F9'}}>
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
          <Button title="Login" onPress={() => loginUser()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
