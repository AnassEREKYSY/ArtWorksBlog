import { StyleSheet, Text, View,TouchableHighlight, TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const UserProfil = (props) => {
  return (
    <>
        <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.goBack()}>
            <Icon name="home" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.main}> 
            <Text  style={styles.text}>User Profil</Text>
            <TextInput placeholder="Email..." onChangeText={function(){}}  style={styles.input} keyboardType="email-address" value={props.email || null}/>
            <TextInput placeholder="Password..." onChangeText={function(){}} secureTextEntry={true} style={styles.input} value={props.mdp || null} />
            <View style={styles.btnBox}>
                <TouchableHighlight underlayColor="#A9A9A9" onPress={function(){}} style={styles.btnUpdate}>
                        <Text style={styles.btnTxt}>Update</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#A9A9A9" onPress={function(){}} style={styles.btnDelete}>
                        <Text style={styles.btnTxt}>Delete</Text>
                </TouchableHighlight>
            </View>
        </View>
    </>

  )
}

export default UserProfil

const styles = StyleSheet.create({
    main:{
        position:"relative",
        top:85,
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
        right:70,
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
        backgroundColor:"#FF4500",
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
    btnBox:{
        alignItems: 'center',
        flexDirection: 'column',
    },
    homeIcon:{
        position:"relative",
        top:-200,
        right:-150,
    },
})