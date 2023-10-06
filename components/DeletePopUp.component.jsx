import { Text , View, TouchableHighlight , StyleSheet } from "react-native"
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const DeletePopUp = (props) => {
  return (
    <View style={style.card } >
        <View style={style.zoneGauche}>
            <Text style={style.txt}>This {props.txt||"item"} will be deleted definitely</Text>
            <View style={style.zoneDroite}>
                <TouchableHighlight underlayColor="#CD5C5C" onPress={function(){}} style={style.delete}>
                    <Text style={style.btnTxtDelete}>Delete</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#FFFAFA" onPress={function(){}} style={style.cancel}>
                    <Text style={style.btnTxtCancel}>Cancel</Text>
                </TouchableHighlight>
            </View>
        </View>
        
    </View>
  )
}

export default DeletePopUp

const style = StyleSheet.create({
    card : {
        backgroundColor:"white",
        borderColor:"#FF4500",
        borderWidth:1,
        marginHorizontal: 10,
        marginVertical:5,
        padding: 10, 
        height:155,
        width:320,
        borderRadius: 28,
        fontFamily: "sans-serif",
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3, 
        shadowRadius: 2, 
        elevation: 5,
    },
    txt:{
        fontSize:20,
        fontWeight:"600",
        textAlign:"center",
        marginVertical:20,
    },
    zoneGauche :{
        flex: 1,
        marginRight : 10,
    },
    zoneDroite :{
        width:200,
        height:20,
        justifyContent:"space-between",
        marginLeft:20,
        flexDirection:"row",
    },
    delete :{
        backgroundColor:"#FF4500",
        borderRadius: 100,
        height:35,
        width:110,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3, 
        shadowRadius: 2, 
        elevation: 5,
    },
    cancel:{
        backgroundColor:"white",
        borderRadius: 100,
        height:35,
        width:110,
        borderColor:"#FF4500",
        borderWidth:1,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3, 
        shadowRadius: 2, 
        elevation: 5,
    },
    btnTxtDelete:{
        color:"white",
        fontSize:20,
        fontWeight:"700",
    },
    btnTxtCancel:{
        color:"#FF4500",
        fontSize:20,
        fontWeight:"700",
    },
})