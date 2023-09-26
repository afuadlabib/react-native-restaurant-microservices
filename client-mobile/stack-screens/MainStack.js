import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BaseCardDetail from '../components/BaseCardDetail';
import MenuScreen from '../screens/MenuScreen';


const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator >
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Detail" component={BaseCardDetail}  />
    </Stack.Navigator>
  )
}
