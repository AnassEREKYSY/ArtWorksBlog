import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FromConnexion from './components/FromConnexion.component';
import FormCreateModifyUser from './components/FormCreateModifyUser.component';
import HomeManagement from './components/HomeManagement.component';
import UserProfil from './components/UserProfil.component';
import ArtWorkDetails from './components/ArtWorkDetails.component';
import Home from './components/Home.component';
import UsersHome from './components/UsersHome.component';
import FormCreateModifyArtWork from './components/FormCreateModifyArtWork.component';
import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const Stack =createNativeStackNavigator();
export default function App() {

  const [user, setUser] = useState({})
  return (

    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen component={Home} name="home"  options={{ headerShown: false , headerLeft: null,}}/>
            <Stack.Screen component={FromConnexion} name="connexion"  options={{ headerShown: false,  headerLeft: null,}}/>
            <Stack.Screen component={HomeManagement} name="homeManagement" options={{ headerShown: false, headerLeft: null, }}/>
            <Stack.Screen component={ArtWorkDetails} name="details"  options={{ headerShown: false , headerLeft: null,}} />
            <Stack.Screen component={FormCreateModifyArtWork} name="CrMdArt"  options={{ headerShown: false , headerLeft: null,}}/>
            <Stack.Screen component={FormCreateModifyUser} name="CrMdUser"  options={{ headerShown: false , headerLeft: null,}}/>
            <Stack.Screen component={UsersHome} name="usersHome"  options={{ headerShown: false, headerLeft: null, }}/>
            <Stack.Screen component={UserProfil} name="userProfil"  options={{ headerShown: false , headerLeft: null,}}/>
        </Stack.Navigator> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
