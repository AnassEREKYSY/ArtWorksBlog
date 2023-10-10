import { StyleSheet, Text, View, TouchableHighlight,TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';

const HomeManagement = ({navigation}) => {
    const route = useRoute();
    const data=route.params;
  return (
    <View style={styles.main}>
      <View style={styles.icons}>
            <TouchableOpacity style={styles.homeIcon} onPress={()=>navigation.navigate("userProfil" , { "identifiants":{email:data.identifiants.email, password:data.identifiants.password,role:"admin"} }) }>
                <Icon name="user" size={30} color="#66CDBB" />
            </TouchableOpacity>
            <Text style={styles.text}>Home</Text>
            <TouchableOpacity style={styles.backIcon} onPress={()=>navigation.navigate("connexion") }>
                <Icon name="sign-out" size={30} color="#66CDBB" />
            </TouchableOpacity>
      </View>
      
      <View style={styles.btnBox}>
            <TouchableHighlight underlayColor="#A9A9A9" onPress={()=> navigation.navigate('usersHome',{identifiants:{email:data.identifiants.email,password:data.identifiants.password, navigation:navigation}})} style={styles.btn}>
                <Text style={styles.btnTxt}>Users Management</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#A9A9A9" onPress={()=> navigation.navigate('home',{identifiants:{email:data.identifiants.email,password:data.identifiants.password , navigation:navigation}})} style={styles.btn}>
                <Text style={styles.btnTxt}>ArtWorks Management</Text>
            </TouchableHighlight>
      </View>
      
    </View>
  )
}

export default HomeManagement

const styles = StyleSheet.create({
    main:{
        position:"relative",
        top:280,
    },
    input : {
        borderColor : "black" ,
        padding : 10 , 
        borderWidth : 1 , 
        marginVertical : 15,
        width:330,
        borderRadius:25,
        fontSize:16,
    },
    text:{
        fontSize:30,
        fontWeight:"700",
        textAlign:"center",  
        letterSpacing:5,
        color:"#66CDBB",
    },
    btn:{
        marginVertical : 15,
        width:290,
        height:110,
        backgroundColor:"#66CDAA",
        textAlign:"center",
        padding:10,
        borderRadius:25,
        justifyContent:"center",
    },
    btnTxt:{
        fontSize:31,
        textAlign:"center",
        color:"white",
        fontWeight:"500",
    },
    btnBox:{
        alignItems: 'center',
        flexDirection: 'column',
    },
    backIcon:{
        // position:"relative",
        // top:-200,
        // right:170,
        
    },
    homeIcon:{
        // position:"relative",
        // top:-200,
        // right:-150,
        marginRight:20
    },
    icons:{
        justifyContent:"space-between",
        marginHorizontal:80,
        paddingHorizontal:20,
        flexDirection: 'row',
        width:380,
        position:"relative",
        top:-215,
        right:70,
    },
})