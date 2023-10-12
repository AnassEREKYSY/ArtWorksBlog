import { Text , View, Image , StyleSheet, TouchableHighlight } from "react-native"
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection,getDoc, getDocs,doc, where, query, deleteDoc } from 'firebase/firestore';
import db from '../config';
import { useRoute } from "@react-navigation/native";
const ArtWorkCard = (props) => {
    const route = useRoute();
    const data=route.params;
    const [error, setError] = useState(null);
     const handelPress=async()=>{
        if (props.name && props.auteur && props.dt_creation) {
            const q = query(collection(db, "work_arts"), where("name","==",props.name)
                                                        ,where("auteur","==",props.auteur)
                                                        ,where("dt_creation","==",props.dt_creation));
            const querySnapshot = await getDocs(q) 
            const art = querySnapshot.docs[0].data()
            if(!art){
                return  setError("Artwork introuvable")
            }
            else{
                props.navigation.navigate("details" , { identifiants : {...art},email:props.auteur })   
            }
        }else{
            console.log('error')
        }
    }
    const DeleteItem=async()=>{
        const q = query(collection(db, "work_arts"), where("name","==",props.name)
                                                    ,where("auteur","==",props.auteur)
                                                    ,where("dt_creation","==",props.dt_creation));
        const querySnapshot = await getDocs(q) 
        if (!querySnapshot.empty) {
            const artDoc = querySnapshot.docs[0];
            const artRef = doc(db, 'work_arts', artDoc.id);

            try {
                await deleteDoc(artRef);
                props.navigation.navigate("home" , { identifiants : {email:props.auteur , reload:1}})   
            } catch (error) {
                console.error('Error deleting artwork:', error);
            }
        } else {
            console.error('Artwork not found');
        }
    }
  return (
    <TouchableHighlight onPress={ handelPress}>          
        <View style={{...style.card}}  >
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
                {
                    
                    ( props.auteur ===data.identifiants.email|| props.email==="admin@gmail.com") &&
                <>
                    <TouchableHighlight onPress={()=> props.navigation.navigate("CrMdArt",{"identifiants":{...props, title:"Update" , btn:"Update"} })} >
                        <Icon name="pencil" size={25} color="#F0F8FF" />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={DeleteItem}>
                        <Icon name="trash" size={25} color="#F0F8FF"/>
                    </TouchableHighlight>
                </>
                }
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
        backgroundColor:"#7788AA",
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