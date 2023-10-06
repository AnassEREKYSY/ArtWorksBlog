import { Text , View, Image , StyleSheet,TouchableOpacity } from "react-native"
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const ArtWorkDetails = (props) => {
  return (
    <>
        <TouchableOpacity style={style.backIcon} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
        <View style={style.card} >
            <View style={style.zoneGauche}>
                <View style={style.zoneGaucheTop}>
                    <Image source={{ uri : "http://via.placeholder.com/50x50" , width:50, height: 50 }}  style={style.img}/>
                    <View style={style.zoneGaucheNom}>
                        <Text style={[style.h2, style.textWhite]}>{props.nom||"Name"}</Text>
                        <Text style={[style.h3, style.textWhite]}>Author :{props.auteur||"Author"}</Text>
                        <Text style={[style.text, style.textWhite]}>
                            {props.description||
                            "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum"}
                        </Text>
                        <Text style={[style.date, style.textWhite]}>{props.date||"Date"}</Text>
                    </View>
                </View>
            </View>
            <View style={style.zoneDroite}>
                <Icon name="plus" size={25} color="#F0F8FF" />
                <Icon name="pencil" size={25} color="#F0F8FF" />
                <Icon name="trash" size={25} color="#F0F8FF"/>
            </View>
        </View>
    </>

  )
}

export default ArtWorkDetails

const style = StyleSheet.create({
    
    backIcon:{
        position:"relative",
        top:-50,
        marginVertical:35,
        right:170,
    },
    mb30: {
        marginBottom : 30
    },
    textWhite : {
        color : "white"
    },
    text:{
        textAlign:"center",
        fontSize: 15,
        marginLeft: 15,
        marginVertical:17,
        lineHeight:25,
    },
    center : {
        textAlign : "center"
    },
    card : {
        alignItems:"center",
        backgroundColor: "#778899",
        margin: 10,
        padding: 10, 
        height:585,
        width:395,
        flexDirection : "column", 
        borderRadius: 88,
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
        marginRight : 20,
    },
    zoneDroite :{
        width:205,
        justifyContent:"space-between",
        marginLeft:20,
        flexDirection:"row"
    },
    zoneGaucheTop :{
        alignItems: "center",
        flexDirection : "column"
    },
    img :{
        marginVertical: 15,
        borderRadius: 100,
        height:180,
        width:180, 
    },
    h2 :{
        fontSize: 18,
        marginLeft: 15,
        lineHeight:25,
        textAlign:"center",
    },
    h3 :{
        fontSize: 15,
        marginLeft: 15,
        lineHeight:25,
        textAlign:"center",
    },
    date :{
        fontSize: 15,
        marginVertical: 20,
        lineHeight:25,
        textAlign:"right",
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