import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { BookmarkedScreen } from '../screens/BookmarkedScreen';
import { THEME } from '../theme';

const screenOptions = {
  headerTintColor: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff',
  headerStyle: {
    backgroundColor: Platform.OS === 'ios' ? '#fff' : THEME.MAIN_COLOR
  }
};

const PostStack = createStackNavigator();
const PostNavigator = () => (
  <PostStack.Navigator screenOptions={screenOptions}>
    <PostStack.Screen name='Main' component={MainScreen} />
    <PostStack.Screen name='Post' component={PostScreen} />
  </PostStack.Navigator>
);

const BookedStack = createStackNavigator();
const BookedNavigator = () => (
  <BookedStack.Navigator
    initialRouteName='Bookmarked'
    screenOptions={screenOptions}
  >
    <BookedStack.Screen name='Bookmarked' component={BookmarkedScreen} />
    <BookedStack.Screen name='Post' component={PostScreen} />
  </BookedStack.Navigator>
);

const BottomTab = createBottomTabNavigator();
const BottomTabNavigator = () => (
  <BottomTab.Navigator
    tabBarOptions={{
      activeTintColor: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff',
      activeBackgroundColor: Platform.OS === 'ios' ? '#fff' : THEME.MAIN_COLOR,
      inactiveBackgroundColor: Platform.OS === 'ios' ? '#fff' : THEME.MAIN_COLOR
    }}
  >
    <BottomTab.Screen
      name='All'
      component={PostNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name='ios-albums' size={25} color={color} />
        )
      }}
    />
    <BottomTab.Screen
      name='Bookmarked'
      component={BookedNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name='ios-star' size={25} color={color} />
        )
      }}
    />
  </BottomTab.Navigator>
);

const About = createStackNavigator();
const AboutNavigator = () => (
  <PostStack.Navigator screenOptions={screenOptions}>
    <PostStack.Screen name='About' component={AboutScreen} />
  </PostStack.Navigator>
);

const Create = createStackNavigator();
const CreateNavigator = () => (
  <PostStack.Navigator screenOptions={screenOptions}>
    <PostStack.Screen name='Create' component={CreateScreen} />
  </PostStack.Navigator>
);

const Drawer = createDrawerNavigator();
export const AppNavigation = () => (
  <NavigationContainer>
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: THEME.MAIN_COLOR,
        labelStyle: { fontFamily: 'open-bold' }
      }}
    >
      <Drawer.Screen name='PostTabs' component={BottomTabNavigator} />
      <Drawer.Screen name='Create' component={CreateNavigator} />
      <Drawer.Screen name='About' component={AboutNavigator} />
    </Drawer.Navigator>
  </NavigationContainer>
);
