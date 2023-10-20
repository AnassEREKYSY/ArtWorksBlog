import { StyleSheet, Text, View,TextInput,Button, TouchableHighlight } from 'react-native'
import React ,{useState,useEffect}from 'react'
import { collection,getDoc, getDocs,doc, where, query } from 'firebase/firestore';
import db from '../config';
const FromConnexion = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(0);
    
    const handleLogin = async () => {
        const q = query(collection(db, "users"), where("email","==",email));
        const querySnapshot = await getDocs(q) 
        //const user = querySnapshot.docs[0].data()
        const users = querySnapshot.docs.map(doc => doc.data());

        if(users.length === 0){
           return  setError(-1)
        }
        else{
            const user = users[0];
            if (user.password === password) { 
                setEmail(email);
                setPassword(password);
                console.log(email+password);
                if (user.role === "admin" || user.email==="admin@yahoo.fr") {
                  navigation.navigate("homeManagement", { identifiants: { emailAdmin: email, passwordAdmin: password } });
                } else {
                  navigation.navigate("home", { identifiants: { email: email, password: password } });
                }
                setError(1)
            } else {
                setError(-1);
            }
        }
      };
  return (
    <View style={styles.main}> 
      <Text  style={styles.text}>Connexion</Text>
      <TextInput placeholder="Email..."  onChangeText={(text) => setEmail(text)}  style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Password..." onChangeText={(text) => setPassword(text)} secureTextEntry={true} style={styles.input}  />
        <View style={styles.btnBox}>
            <TouchableHighlight underlayColor="#A9A9A9" onPress={handleLogin} style={styles.btn1}>
                    <Text style={styles.btnTxt1}>Connexion</Text>
            </TouchableHighlight>
            {
            error===-1 && 
                <Text style={styles.fail}>Email or password is incorrect</Text>
            }
        </View> 
    </View>
  )
}

export default FromConnexion

const styles = StyleSheet.create({
    fail:{
        color:"red",
    },    
    main:{
        alignContent:"center",
        justifyContent:"center",
        alignItems:"center",
        position:"relative",
        top:320,
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