import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const UserCard = (props) => {
  return (
    <View style={{...style.card , backgroundColor:props.cardColor}} >
        <View style={style.zoneGauche}>
            <View style={style.zoneGaucheTop}>
                <Icon name="user" size={40} color="#F0F8FF" style={style.img}/>
                <View style={style.zoneGaucheNom}>
                    <Text style={[style.h3, style.textWhite]}>{props.role||"redacteur"}</Text>
                    <Text style={[style.h2, style.textWhite]}>{props.email||"useremail@email.com"}</Text>   
                </View>
            </View>
        </View>
        <View style={style.zoneDroite}>
            <View style={style.zoneDroiteTop}>
                <Icon name="trash" size={28} color="#F0F8FF" style={[style.text , style.center , style.mb30]}/>
            </View>
            <View style={style.zoneDroiteMiddle}>
                <Icon name="pencil" size={28} color="#F0F8FF" style={[style.number , style.center]}/>
            </View>
        </View>
    </View>
  )
}

export default UserCard


const style = StyleSheet.create({
    mb30: {
        marginBottom : 10
    },
    textWhite : {
        color : "white"
    },
    center : {
        textAlign : "center"
    },
    card : {
        marginHorizontal: 10,
        marginVertical:7,
        padding: 10, 
        flexDirection : "row", 
        borderRadius: 15,
        color:"white",
        fontFamily: "sans-serif",
        shadowColor: 'black',
        shadowOffset: { width: 15, height: 17 }, 
        shadowOpacity: 1,
        shadowRadius: 8, 
        elevation: 5,
    },
    zoneGauche :{
        flex: 3,
        marginRight : 20
    },
    zoneDroite :{
        flex: 1,
        marginLeft:60,
        marginTop:8,
    },
    zoneGaucheTop :{
        alignItems: "center",
        flexDirection : "row"
    },
    img :{
        marginRight: 15,
        borderRadius: 200,
        backgroundColor:"#C0C0C0",
        width:70,
        height:70,
        textAlign:"center",
        verticalAlign: "middle",
        alignItems:"center",
        justifyContent:"center",
    },
    h2 :{
        fontSize: 15,
    },
    h3 :{
        fontSize: 20,
        marginBottom: 0,
    },
    zoneGaucheBottom :{
        flexDirection : "row", 
        justifyContent: "flex-end",
    },
    zoneGaucheSocial :{
        marginLeft: 10,
        textAlign: "center",
        justifyContent : "center"
    },
    zoneDroiteTop :{
        fontSize: 40,
        lineHeight: 10,
    },
    zoneDroiteMiddle :{
        textAlign:"center"
    },
    zoneDroiteMiddle : {
        fontSize: 24,
    }

})