import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Hello} from './components/Hello';
import {MainStack} from './navigation/MainStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AuthStack from './navigation/AuthStack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1F1D2C'}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Auth"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="Main" component={MainStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
