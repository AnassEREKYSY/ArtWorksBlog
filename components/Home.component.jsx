import { StyleSheet, Text, View, TouchableHighlight,TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {collection, getDoc, getDocs, query} from "firebase/firestore" 
import db from "../config"
import ArtWorkCard from './ArtWorkCard.component';
import { useRoute } from '@react-navigation/native';
const Home = ({navigation}) => {
  
    const route = useRoute();
    let profil=0;
    let emptyHome=0
    const data=route.params;
    const [art_works, set_art_works] = useState([]);
    const colors=["#7788AA","#708090","#7788BB"];

    const navigationFunction=(route)=>{
      if(data.identifiants.emailAdmin && data.identifiants.emailAdmin==="admin@gmail.com"){
        navigation.navigate(route , { "identifiants":{email:data.identifiants.emailAdmin, password:data.identifiants.passwordAdmin} })
      }else{
        navigation.navigate(route , { "identifiants":{email:data.identifiants.email, password:data.identifiants.password} })
      }
    }

    if(route.params){
      profil=1;
    }
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "work_arts"));
        const art_works_snap = querySnapshot.docs.map((doc) => doc.data());
        if(art_works_snap.length<0){
          emptyHome=1;
        }else{
          emptyHome=0
        }
        set_art_works(art_works_snap);


      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if(data.identifiants.reload ===1 ){
      fetchData();
      data.identifiants.reload=0;

    }
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "work_arts"));
          const art_works_snap = querySnapshot.docs.map((doc) => doc.data());
          set_art_works(art_works_snap);
          if(art_works_snap.length<0){
            emptyHome=1;
          }else{
            emptyHome=0
          }

        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData();
    }, []);

    const backHome=()=>{
      if(data.identifiants.role === "admin"){
        navigationFunction("homeManagement")
      }else{
        navigationFunction("home" ,{ identifiants : {email:email , password:password} })
      }
    }
    const profilNavigation = () => {
      if (
        !data.identifiants.role || 
        data.identifiants.role !== "admin" ||
        data.identifiants.role === null
      ) {
        navigationFunction("userProfil");
      }
    };
    console.log(emptyHome);
    return (
      <View style={styles.home}>
        <View>
          <View style={styles.bar}>
            
            <TouchableOpacity style={styles.text} onPress={backHome }>
                <Text style={styles.text}>Blog Wave</Text>
            </TouchableOpacity>

            {
                 profil===1? 
                 <TouchableOpacity style={styles.signIn} onPress={profilNavigation}>
                 {
                     <Icon name="user" size={30} color="#708090" />
                 }
               </TouchableOpacity>:
               <TouchableOpacity style={styles.signIn} onPress={()=>navigation.navigate("connexion") }>
               {
                   <Icon name="sign-in" size={30} color="#708090" />
               }
              </TouchableOpacity>
            }
          </View>
          <TouchableOpacity style={styles.add} onPress={() => navigation.navigate("CrMdArt",{"identifiants":{email:data.identifiants.email ,password:data.identifiants.password, title:"Add"}})}>
            <Icon name="plus" size={20} color="white" />
          </TouchableOpacity>
          {
              emptyHome===1 ? 
              <Text style={styles.emptyText}>The blog is empty yet !!</Text>
              :
              <ScrollView style={styles.Box}>
              {art_works.map((artWork, index) => {
                  
                  const cardColor = colors[Math.ceil(Math.random() * colors.length)]
                  return(
                <ArtWorkCard key={index} {...artWork} cardColor={cardColor} email={data.identifiants.email} navigation={navigation}/> 
              )})}
            </ScrollView>
          }
        </View>
      </View>
    );
  };

export default Home

const styles = StyleSheet.create({
  emptyText:{
    position:"relative",
    top:15,
    right:68,
    color:"black",
    fontSize:100,
    zIndex:1,
  },
    home:{
        flexDirection :"column",
        justifyContent:"space-between",
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