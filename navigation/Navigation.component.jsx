import FromConnexion from '../components/FromConnexion.component';
import FormCreateModifyUser from '../components/FormCreateModifyUser.component';
import HomeManagement from '../components/HomeManagement.component';
import UserProfil from '../components/UserProfil.component';
import ArtWorkDetails from '../components/ArtWorkDetails.component';
import Home from '../components/Home.component';
import UsersHome from '../components/UsersHome.component';
import FormCreateModifyArtWork from '../components/FormCreateModifyArtWork.component';
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

function NavigationAccueil() {
    return ( 
        <Stack.Navigator>
            <Stack.Screen component={ArtWorkDetails} name="accueil" />
            <Stack.Screen component={FormCreateModifyArtWork} name="CrMdArt"/>
            <Stack.Screen component={FormCreateModifyUser} name="CrMdUser"/>
            <Stack.Screen component={FromConnexion} name="connexion"/>
            <Stack.Screen component={Home} name="home"/>
            <Stack.Screen component={UsersHome} name="usersHome"/>
            <Stack.Screen component={UserProfil} name="userProfil"/>
            <Stack.Screen component={HomeManagement} name="homeManagement"/>
        </Stack.Navigator> 
    );
}

export default NavigationAccueil;