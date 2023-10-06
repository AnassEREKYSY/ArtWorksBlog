import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FromConnexion from './components/FromConnexion.component';
import FormCreateModifyUser from './components/FormCreateModifyUser.component';
import HomeManagement from './components/HomeManagement.component';
import UserProfil from './components/UserProfil.component';
import UserCard from './components/UserCard.component';
import ArtWorkCard from './components/ArtWorkCard.component';
import ArtWorkDetails from './components/ArtWorkDetails.component';
import Home from './components/Home.component';
import UsersHome from './components/UsersHome.component';
import FormCreateModifyArtWork from './components/FormCreateModifyArtWork.component';
import DeletePopUp from './components/DeletePopUp.component';
import { useState } from 'react';

export default function App() {

  const [user, setUser] = useState({})
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}
      <FromConnexion setUser={setUser} />
      {/* <FormCreateModifyArtWork title="Add" btn="Create"/> */}
      {/* <HomeManagement/> */}
      {/* <UserProfil /> */}
      {/* <UserCard /> */}
      {/* <ArtWorkCard /> */}
      {/* <ArtWorkDetails /> */}
      {/* <UsersHome />  */}
      {/* <Home />  */}
      {/* <DeletePopUp/> */}
    </View>
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
