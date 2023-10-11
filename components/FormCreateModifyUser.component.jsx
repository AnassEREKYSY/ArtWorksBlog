import { StyleSheet, Text, View ,TextInput, TouchableHighlight,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection,getDoc, getDocs,doc, where, query, addDoc } from 'firebase/firestore';
import db from '../config';
import { useRoute } from '@react-navigation/native';
const FormCreateModifyUser = ({navigation}) => {
    const route = useRoute();
    const data=route.params;
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [role,setRole]=useState('')
    const [userAddUpdate, setUserAddUpdate] = useState(0);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const validatePassword = (text) => {
        setPassword(text);
        setIsValidPassword(text.length >= 4);
      };
    const validateEmail = (text) => {
        setEmail(text);
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        setIsValidEmail(emailRegex.test(text));
      };
    useEffect(() => {
        if (data.identifiants.btn === "Update" && data.identifiants) {
            setEmail(data.identifiants.email);
            setPassword(data.identifiants.password);
            setRole(data.identifiants.role);
        }
    }, []);
    const handelPress=async()=>{
        const userData={
            email: email,
            password: password,
            role: role,
          };
        if(data.identifiants.title === "Add"){
            console.log('add')
            const collectionRef = collection(db, 'users');
            const docRef = await addDoc(collectionRef, userData);
            if(!docRef || !isValidPassword || !isValidEmail){
                setUserAddUpdate(-1);
             }
            else{
                setUserAddUpdate(1);
                    setEmail('');
                    setPassword('');
                    setRole('');
            }
        }else{
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
                        setEmail('');
                        setPassword('');
                        setRole('');
                    } catch (error) {
                        setUserAddUpdate(-1);
                    }
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
                <TextInput placeholder="Role..." onChangeText={(role)=>setRole(role)}  style={styles.input} value={role || null} />          
                <TextInput placeholder="Email..." onChangeText={(text) => validateEmail(text)}  style={styles.input} value={email || null} keyboardType="email-address" />
                <TextInput placeholder="Password..." onChangeText={(text) => validatePassword(text)} value={password || null} secureTextEntry={true} style={styles.input}  />
                <View style={styles.btnBox}>
                    <TouchableHighlight underlayColor="#A9A9A9" onPress={handelPress} style={styles.btn}>
                                <Text style={styles.btnTxt}>{data.identifiants.btn||"Create"}</Text>
                    </TouchableHighlight>
                {   
                    userAddUpdate===1 && <Text style={styles.succ}>User {data.identifiants.title}ed successfully</Text>              
                }
                {
                    userAddUpdate===-1 &&<Text style={styles.fail}>Error ! Please check the email/password</Text>
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