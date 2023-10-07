import { StyleSheet, Text, View ,TextInput, TouchableHighlight,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const FormCreateModifyArtWork = (props) => {
  return (
        <>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={25} color="black" />
                </TouchableOpacity>
            
            <View style={styles.main}>
                <Text  style={styles.text}>{props.title ||"Add"} artWork</Text>
                <TextInput placeholder="Name..." onChangeText={function(){}}  style={styles.input} value={props.role || null} />          
                <TextInput placeholder="Image url..." onChangeText={function(){}}  style={styles.input} value={props.email || null} keyboardType="email-address" />
                <TextInput placeholder="Date..." onChangeText={function(){}} value={props.mdp || null} secureTextEntry={true} style={styles.input}  />
                <TextInput placeholder="" onChangeText={function(){}} value={props.description || null}  style={styles.input} multiline={true} numberOfLines={5} />
                <View style={styles.btnBox}>
                    <TouchableHighlight underlayColor="#A9A9A9" onPress={function(){}} style={styles.btn}>
                                <Text style={styles.btnTxt}>{props.btn||"Create"}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </>
  )
}

export default FormCreateModifyArtWork

const styles = StyleSheet.create({
    main:{
        position:"relative",
        top:240,
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
        position:"fixed",
        top:70,
        right:-30,
    },
})