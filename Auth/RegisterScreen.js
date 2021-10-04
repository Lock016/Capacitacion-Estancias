import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import auth from '@react-native-firebase/auth';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = () => {
    if (email != '' && password != '') {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('Main');
        })
        .catch(e => {
          console.log(e);
          if (e.code === 'auth/weak-password') {
            alert('The password must be at least 6 characters!');
          } else if (e.code === 'auth/invalid-email') {
            alert('The email address is not valid.');
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
          <Text style={{color: '#f9f9f9'}}>Register</Text>
          <Input
            inputStyle={{color: '#F9F9F9'}}
            placeholder="email"
            onChangeText={email => setEmail(email)}
          />
          <Input
            inputStyle={{color: '#F9F9F9'}}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={password => {
              setPassword(password);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{color: '#f9f9f9'}}>
              Already have an account? Sign up
            </Text>
          </TouchableOpacity>
          <Button title="Sign up" onPress={() => registerUser()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
