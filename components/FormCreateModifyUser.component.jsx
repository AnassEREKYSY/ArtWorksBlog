import { StyleSheet, Text, View ,TextInput, TouchableHighlight,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const FormCreateModifyUser = (props) => {
    return (
        <>
            <View style={styles.icons}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.goBack()}>
                    <Icon name="home" size={30} color="black" />
                </TouchableOpacity>
            </View>
            
            <View style={styles.main}>
                <Text  style={styles.text}>{props.title ||"Add"} User</Text>
                <TextInput placeholder="Role..." onChangeText={function(){}}  style={styles.input} value={props.role || null} />          
                <TextInput placeholder="Email..." onChangeText={function(){}}  style={styles.input} value={props.email || null} keyboardType="email-address" />
                <TextInput placeholder="Password..." onChangeText={function(){}} value={props.mdp || null} secureTextEntry={true} style={styles.input}  />
                <View style={styles.btnBox}>
                    <TouchableHighlight underlayColor="#A9A9A9" onPress={function(){}} style={styles.btn}>
                                <Text style={styles.btnTxt}>{props.btn||"Create"}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </>
      )
    }
    
export default FormCreateModifyUser
    
    const styles = StyleSheet.create({
        main:{
            position:"relative",
            top:50,
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
            position:"relative",
            top :-40,
            fontWeight:"700",
            textAlign:"center",
            
        },
        btn:{
            marginVertical : 15,
            width:130,
            height:50,
            backgroundColor:"#008B8B",
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
        backIcon:{
            position:"relative",
            top:-200,
            right:170,
        },
        homeIcon:{
            position:"relative",
            top:-200,
            right:-150,
        },
        icons:{
            flexDirection: 'row',
        },
    })