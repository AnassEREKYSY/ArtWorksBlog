import { StyleSheet, Text, View,TouchableHighlight, TouchableOpacity,TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import db from '../config';

const UserProfil = ({navigation}) => {
    const route = useRoute();
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [userAddUpdate, setUserAddUpdate] = useState(0)
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const data=route.params;

    const validatePassword = (text) => {
        setIsValidPassword(text.length >= 4);
        setPassword(text);
      };
    const validateEmail = (text) => {
        setEmail(text);
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        setIsValidEmail(emailRegex.test(text));
      };
    useEffect(() => {
        if ( data.identifiants) {
            setEmail(data.identifiants.email);
            setPassword(data.identifiants.password);
        }
    }, []);

    const handelPress=async()=>{
        console.log("hbsdjhklfbge");
        const userData={
            email: email,
            password: password,
            role:"redacteur",
        };
        const q = query(
            collection(db, 'users'),
            where('email', '==', userData.email),
          );
          
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                return 'User introuvable';
            }
            else if(!isValidPassword || !isValidEmail){
                setUserAddUpdate(-1)
            }else{
                const userDoc = querySnapshot.docs[0];
                const userRef = doc(db, 'users', userDoc.id);

                try {
                    await updateDoc(userRef,userData);
                    setUserAddUpdate(1);
                    setEmail(email)
                    setPassword(password)
                } catch (error) {
                    setUserAddUpdate(-1);
                }
            }
    }
  return (
    <>
        <TouchableOpacity style={styles.homeIcon} onPress={
            () =>{
                data.identifiants.role !== "admin"?
                navigation.navigate("home",{ identifiants : {email:data.identifiants.email,password:data.identifiants.password, reload:1}}):
                navigation.navigate("homeManagement",{ identifiants : {email:data.identifiants.emailAdmin,password:data.identifiants.passwordAdmin, reload:1}})
            } 
            
            }>
            <Icon name="home" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.main}> 
                    <Text  style={styles.text}>User Profil</Text>
                    <TextInput placeholder="Email..." onChangeText={(text) => validateEmail(text)}  style={styles.input} keyboardType="email-address" value={email || null}/>
                    <TextInput placeholder="Password..." onChangeText={(text) => validatePassword(text)} secureTextEntry={true} style={styles.input} value={password || null} />
                    <View style={styles.btnBox}>
                        <TouchableHighlight underlayColor="#A9A9A9" onPress={handelPress} style={styles.btnUpdate}>
                                <Text style={styles.btnTxt}>Update</Text>
                        </TouchableHighlight>
                    </View>
                    {   
                        userAddUpdate===1 && <Text style={styles.succ}>User updated successfully</Text>              
                    }
                    {
                        userAddUpdate===-1 &&<Text style={styles.fail}>Error ! Please check the email/password</Text>
                    }
        </View>
    </>

  )
}

export default UserProfil

const styles = StyleSheet.create({
    succ:{
        color:"green",
    },  
    fail:{
        color:"red",
    },
    main:{
        position:"relative",
        top:295,
        right:-0,
        justifyContent:"center",
        alignContent:"center",
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
        position:"absolute",
        right:105,
        top :-50,
        fontWeight:"700",
    },
    btnUpdate:{
        marginVertical : 15,
        width:130,
        height:50,
        backgroundColor:"#008BAA",
        textAlign:"center",
        padding:10,
        borderRadius:25,
    },
    btnDelete:{
        marginVertical : 15,
        width:130,
        height:50,
        backgroundColor:"white",
        borderColor:"#FF4500",
        borderWidth:1,
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
    btnTxtDelete:{
        fontSize:19,
        textAlign:"center",
        color:"#FF4500",
        fontWeight:"500",
    },
    btnBox:{
        alignItems: 'center',
        flexDirection: 'column',
    },
    homeIcon:{
        position:"relative",
        top:70,
        right:-30,
    },
})