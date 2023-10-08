import { StyleSheet, Text, View,TouchableHighlight, TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';

const UserProfil = ({navigation}) => {
    const route = useRoute();
    const data=route.params;
  return (
    <>
        <TouchableOpacity style={styles.homeIcon} onPress={
            () =>{
                data.identifiants.role !== "admin"?
                navigation.navigate("home",{ identifiants : {email:data.identifiants.email, reload:1}}):
                navigation.navigate("homeManagement",{ identifiants : {email:data.identifiants.email, reload:1}})
            } 
            
            }>
            <Icon name="home" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.main}> 
            <Text  style={styles.text}>User Profil</Text>
            <TextInput placeholder="Email..." onChangeText={function(){}}  style={styles.input} keyboardType="email-address" value={ data.identifiants.email}/>
            <TextInput placeholder="Password..." onChangeText={function(){}} secureTextEntry={true} style={styles.input} value={data.identifiants.password} />
            <View style={styles.btnBox}>
                <TouchableHighlight underlayColor="#A9A9A9" onPress={function(){}} style={styles.btnUpdate}>
                        <Text style={styles.btnTxt}>Update</Text>
                </TouchableHighlight>
                {
                   data.identifiants.role !== "admin"  && 
                <TouchableHighlight underlayColor="#A9A9A9" onPress={function(){}} style={styles.btnDelete}>
                   <Text style={styles.btnTxtDelete}>Delete</Text>
                </TouchableHighlight>
                }
            </View>
        </View>
    </>

  )
}

export default UserProfil

const styles = StyleSheet.create({
    main:{
        position:"relative",
        top:295,
        right:-0,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
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
        fontSize:40,
        marginVertical:-30,
        position:"absolute",
        right:105,
        top :-50,
        fontWeight:"700",
    },
    btnUpdate:{
        marginVertical : 15,
        width:130,
        height:50,
        backgroundColor:"#008BAA",
        textAlign:"center",
        padding:10,
        borderRadius:25,
    },
    btnDelete:{
        marginVertical : 15,
        width:130,
        height:50,
        backgroundColor:"white",
        borderColor:"#FF4500",
        borderWidth:1,
        textAlign:"center",
        padding:10,
        borderRadius:25,
    },
    btnTxt:{
        fontSize:19,
        textAlign:"center",
        color:"white",
        fontWeight:"500",
    },
    btnTxtDelete:{
        fontSize:19,
        textAlign:"center",
        color:"#FF4500",
        fontWeight:"500",
    },
    btnBox:{
        alignItems: 'center',
        flexDirection: 'column',
    },
    homeIcon:{
        position:"relative",
        top:70,
        right:-30,
    },
})