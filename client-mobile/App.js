import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import FavoriteScreen from './screens/FavoriteScreen';
import AcountScreen from './screens/AcountScreen';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import MainStack from './stack-screens/MainStack';
const Tab = createBottomTabNavigator();


const client = new ApolloClient({
  uri: 'https://1ef1-103-144-170-130.ngrok-free.app',
  cache: new InMemoryCache(),
  introspection: true
});


export default function App() {
  return (
    <ApolloProvider client={client}>
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              tabBarIcon: () => (
                <FontAwesome name="home" size={24} color="#B71313" />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Menu"
            component={MainStack}
            options={{
              title: 'Menu',
              tabBarIcon: () => (
                <FontAwesome5 name="hamburger" size={24} color="#B71313" />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Favorite"
            component={FavoriteScreen}
            options={{
              title: 'Favorite',
              tabBarIcon: () => (
                <MaterialIcons name="favorite" size={24} color="#B71313" />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="About"
            component={AboutScreen}
            options={{
              title: 'About',
              tabBarIcon: () => (
                <Entypo name="book" size={24} color="#B71313" />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Account"
            component={AcountScreen}
            options={{
              title: 'Account',
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color="#B71313"
                />
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: '',
  },
});
