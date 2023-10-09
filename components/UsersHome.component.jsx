import { StyleSheet, Text, View, TouchableHighlight,TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import UserCard from './UserCard.component';
import {collection, getDoc, getDocs, query, where} from "firebase/firestore" 
import db from "../config"
import { useRoute } from '@react-navigation/native';
const UsersHome = ({navigation}) => {
    const [users, setUers] = useState([]);
    const colors=["#7788AA","#708090","#7788BB"];
    const route = useRoute();
    const data=route.params;

    const fetchData = async () => {
        try {

            const q = query(collection(db, "users"), where("role", "!=", "admin"));
            const querySnapshot = await getDocs(q);
            const users_snap = querySnapshot.docs.map((doc) => doc.data());
            setUers(users_snap);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
    };
    useEffect(() => {
      const fetchData = async () => {
        try {

            const q = query(collection(db, "users"), where("role", "!=", "admin"));
            const querySnapshot = await getDocs(q);
            const users_snap = querySnapshot.docs.map((doc) => doc.data());
            setUers(users_snap);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData();
    }, []);
    
    if(data.identifiants.reload && data.identifiants.reload ===1 ){
        fetchData();
        data.identifiants.reload=0;
  
    }
  return (
    <View style={styles.home}>
        <View>
            <View style={styles.bar}>
                <Text style={styles.text}>Blog Wave</Text>
                <TouchableOpacity style={styles.signIn} onPress={() => navigation.navigate("homeManagement" , { identifiants : {email:data.identifiants.email , password:data.identifiants.email} })}>
                    <Icon name="home" size={30} color="#708090" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.add} onPress={() => navigation.navigate("CrMdUser")}>
                    <Icon name="plus" size={20} color="white" />
            </TouchableOpacity>
            <ScrollView  style={styles.Box}>
                <View >
                {users.map((user, index) => {
                
                    const cardColor = colors[Math.ceil(Math.random() * colors.length)]
                        return(
                    <UserCard key={index} {...user} cardColor={cardColor} navigation={navigation} /> 
                )})}
                </View>
            </ScrollView>  
        </View>
    </View>
  )
}

export default UsersHome

const styles = StyleSheet.create({
    home:{
        flexDirection :"column",
        justifyContent:"space-between",
    },
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
        fontWeight:"700",
        textAlign:"center",  
        letterSpacing:0,
        color:"#708090",
    },
    btn:{
        marginVertical : 15,
        width:290,
        height:110,
        backgroundColor:"#5F9EA0",
        textAlign:"center",
        padding:10,
        borderRadius:25,
        justifyContent:"center",
    },
    btnTxt:{
        fontSize:31,
        textAlign:"center",
        color:"white",
        fontWeight:"500",
    },
    Box:{
        fex:1,
        flexDirection: 'column',
        top:94,
        padding:5,
    },
    signIn:{
        position:"relative",
        top:13,
    },
    add:{
        position:"relative",
        top:85,
        right:-368,
        backgroundColor:"#708090",
        height:30,
        width:30,
        borderRadius:100,
        alignItems:"center",
        justifyContent:"center",

    },
    bar:{
        justifyContent:"space-between",
        marginHorizontal:20,
        paddingHorizontal:5,
        flexDirection: 'row',
        width:380,
        position:"fixed",
        top:70,
    },
})