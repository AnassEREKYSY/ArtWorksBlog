import { StyleSheet, Text, View ,TextInput, TouchableHighlight,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection,getDoc, getDocs,doc, where, query, addDoc } from 'firebase/firestore';
import db from '../config';
import { useRoute } from '@react-navigation/native';
const FormCreateModifyUser = ({navigation}) => {
    let userAddUpdate=0;
    const route = useRoute();
    const data=route.params;
    const [email,setEmail]=useState([])
    const [password,setPassword]=useState([])
    const [role,setRole]=useState([])
    const handelPress=async()=>{
        const userData={
            email: email,
            password: password,
            role: role,
          };
        if(data.identifiants.btn === "Add" && data.identifiants){
            const collectionRef = collection(db, 'users');
            const docRef = await addDoc(collectionRef, userData);
            if(!docRef){
                userAddUpdate=-1;
             }
            else{
                userAddUpdate=1;
            }
        }else{
            const q = query(
                collection(db, 'users'),
                where('email', '==', data.identifiants.email),
                where('password', '==', data.identifiants.password)
              );
              
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    return 'User introuvable';
                }

                const userDoc = querySnapshot.docs[0];
                const userRef = doc(db, 'users', userDoc.id);

                try {
                    await updateDoc(userRef,userData);
                    userAddUpdate=1;
                } catch (error) {
                    userAddUpdate=-1;
                }
        }

    }
    return (
        <>
            <View style={styles.icons}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate("usersHome" ,{"identifiants":{email:data.identifiants.email , password:data.identifiants.password , reload:1 }})}>
                    <Icon name="arrow-left" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.homeIcon} onPress={() =>navigation.navigate("homeManagement",{"identifiants":{email:data.identifiants.email , password:data.identifiants.password, reload:1 }} )}>
                    <Icon name="home" size={30} color="black" />
                </TouchableOpacity>
            </View>
            
            <View style={styles.main}>
                <Text  style={styles.text}>{data.identifiants.title ||"Add"} User</Text>
                <TextInput placeholder="Role..." onChangeText={(role)=>setRole(role)}  style={styles.input} value={"" || null} />          
                <TextInput placeholder="Email..." onChangeText={(email)=>setEmail(email)}  style={styles.input} value={"" || null} keyboardType="email-address" />
                <TextInput placeholder="Password..." onChangeText={(password)=>setPassword(password)} value={"" || null} secureTextEntry={true} style={styles.input}  />
                <View style={styles.btnBox}>
                    <TouchableHighlight underlayColor="#A9A9A9" onPress={handelPress} style={styles.btn}>
                                <Text style={styles.btnTxt}>{data.identifiants.btn||"Create"}</Text>
                    </TouchableHighlight>
                {   
                    userAddUpdate===1 && <Text style={styles.succ}>User {data.identifiants.title}ed successfully</Text>              
                }
                {
                    userAddUpdate===-1 &&<Text style={styles.fail}>Error ! Please try again</Text>
                }
                </View>
            </View>
        </>
      )
    }
    
export default FormCreateModifyUser
    
    const styles = StyleSheet.create({
        succ:{
            color:"green",
        },  
        fail:{
            color:"red",
        },
        main:{
            position:"relative",
            top:290,
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
            position:"relative",
            top:80,
            right:-20,
        },
        homeIcon:{
            position:"relative",
            top:85,
            right:-330,
        },
        icons:{
            flexDirection: 'row',
         
        },
    })