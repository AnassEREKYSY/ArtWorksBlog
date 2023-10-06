import { StyleSheet, Text, View,TextInput,Button, TouchableHighlight } from 'react-native'
import React ,{useState,useEffect}from 'react'
import { collection,getDoc, getDocs,doc, where, query } from 'firebase/firestore';
import db from '../config';
const FromConnexion = ({setUser , navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    const handleLogin = async () => {
        const q = query(collection(db, "users"), where("email","==",email));
        const querySnapshot = await getDocs(q) 
        const user = querySnapshot.docs[0].data()
        console.log(user)

        if(!user){
           return  setError("Utilisateur introuvable")
        }
        
        else if(user.password !== password || user.email !== email ){
            return   setError("Utilisateur introuvable")
        }

        setUser(user)
        navigation.navigate("home" , { identifiants : {email , password} })   
      };
  return (
    <View style={styles.main}> 
      <Text  style={styles.text}>Connexion</Text>
      <TextInput placeholder="Email..."  onChangeText={(text) => setEmail(text)}  style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Password..." onChangeText={(text) => setPassword(text)} secureTextEntry={true} style={styles.input}  />
      {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.btnBox}>
            <TouchableHighlight underlayColor="#A9A9A9" onPress={handleLogin} style={styles.btn1}>
                    <Text style={styles.btnTxt1}>Connexion</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#A9A9A9" onPress={function(){}} style={styles.btn2}>
                    <Text style={styles.btnTxt2}>Sing Up</Text>
            </TouchableHighlight>
        </View>
      
    </View>
  )
}

export default FromConnexion

const styles = StyleSheet.create({
    main:{
        position:"relative",
        top:85,
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
        right:70,
        top :-50,
        fontWeight:"700",
    },
    btn1:{
        marginVertical : 15,
        width:130,
        height:50,
        backgroundColor:"#008B8B",
        textAlign:"center",
        padding:10,
        borderRadius:25,
    },
    btn2:{
        marginVertical : 15,
        width:130,
        height:50,
        backgroundColor:"white",
        textAlign:"center",
        padding:10,
        borderRadius:25,
        borderWidth:1,
        borderColor:"#008B8B",
    },
    btnTxt1:{
        fontSize:19,
        textAlign:"center",
        color:"white",
        fontWeight:"500",
    },
    btnTxt2:{
        fontSize:19,
        textAlign:"center",
        color:"#008B8B",
        fontWeight:"500",
    },
    btnBox:{
        alignItems: 'center',
        flexDirection: 'column',
    },
})