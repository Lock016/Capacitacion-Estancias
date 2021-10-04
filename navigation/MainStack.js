import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import GameDetail from '../screens/GameDetail';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="GameDetail" component={GameDetail} />
    </Stack.Navigator>
  );
};
