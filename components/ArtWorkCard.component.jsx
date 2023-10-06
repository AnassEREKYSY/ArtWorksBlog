import { Text , View, Image , StyleSheet } from "react-native"
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const ArtWorkCard = (props) => {
  return (
    <View style={{...style.card , backgroundColor:props.cardColor}} >
        <View style={style.zoneGauche}>
            <View style={style.zoneGaucheTop}>
                <Image source={{ uri : "http://via.placeholder.com/50x50" , width:50, height: 50 }}  style={style.img}/>
                <View style={style.zoneGaucheNom}>
                    <Text style={[style.h2, style.textWhite]}>Name :{props.name||"Name"}</Text>
                    <Text style={[style.h3, style.textWhite]}>Author :{props.auteur||"Author"}</Text>
                    <Text style={[style.h3, style.textWhite]}>Date :{props.dt_creation||"Date"}</Text>
                </View>
            </View>
        </View>
        <View style={style.zoneDroite}>
            <Icon name="angle-up" size={25} color="#F0F8FF" />
            <Icon name="pencil" size={25} color="#F0F8FF" />
            <Icon name="trash" size={25} color="#F0F8FF"/>
        </View>
    </View>
  )
}

export default ArtWorkCard

const style = StyleSheet.create({
    mb30: {
        marginBottom : 30
    },
    textWhite : {
        color : "white"
    },
    center : {
        textAlign : "center"
    },
    card : {
        marginHorizontal: 10,
        marginVertical:5,
        padding: 10, 
        height:115,
        flexDirection : "row", 
        borderRadius: 28,
        color:"white",
        fontFamily: "sans-serif",
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3, 
        shadowRadius: 2, 
        elevation: 5,
    },
    zoneGauche :{
        flex: 3,
        marginRight : 20
    },
    zoneDroite :{
        width:35,
        justifyContent:"space-between",
        marginLeft:20,
    },
    zoneGaucheTop :{
        alignItems: "center",
        flexDirection : "row"
    },
    img :{
        marginVertical: 15,
        borderRadius: 100,
        height:70,
        width:70,
    },
    h2 :{
        fontSize: 18,
        marginLeft: 15,
    },
    h3 :{
        fontSize: 15,
        marginLeft: 15,
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

})