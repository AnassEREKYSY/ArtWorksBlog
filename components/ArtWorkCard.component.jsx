import { Text , View, Image , StyleSheet, TouchableHighlight } from "react-native"
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection,getDoc, getDocs,doc, where, query } from 'firebase/firestore';
import db from '../config';
const ArtWorkCard = (props,{navigation}) => {
    const [error, setError] = useState(null);
     const handelPress=async()=>{
        const q = query(collection(db, "work_arts"), where("name","==",props.name)
                                                    ,where("auteur","==",props.auteur)
                                                    ,where("dt_creation","==",props.dt_creation));
        const querySnapshot = await getDocs(q) 
        const art = querySnapshot.docs[0].data()
        if(!art){
            return  setError("Artwork introuvable")
         }
        else{
            navigation.navigate("details" , { identifiants : {art} })   
        }
    }
  return (
    <TouchableHighlight onPress={ handelPress}>          
        <View style={{...style.card , backgroundColor:props.cardColor}}  >
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
                <TouchableHighlight onPress={()=> navigation.navigate("CrMdArt",{...props})} >
                    <Icon name="pencil" size={25} color="#F0F8FF" />
                </TouchableHighlight>
                <TouchableHighlight >
                    <Icon name="trash" size={25} color="#F0F8FF"/>
                </TouchableHighlight>
            </View>
        </View>
    </TouchableHighlight>
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
        justifyContent:"space-around",
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