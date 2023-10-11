import { StyleSheet, Text, View ,TextInput, TouchableHighlight,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { collection,getDoc, getDocs,doc, where, query, addDoc, updateDoc } from 'firebase/firestore';
import db from '../config';

const FormCreateModifyArtWork = ({navigation}) => {
    const route = useRoute();
    const data=route.params;
    const [artAddUpdate, setArtAddUpdate] = useState(0);
    const [name,setName]=useState('')
    const [image,setImage]=useState('')
    const [dt_creation,setDt_creation]=useState('')
    const [description,setDescription]=useState('')
    const [isValidDate, setIsValidDate] = useState(true);
    useEffect(() => {
        if (data.identifiants.btn === "Update" && data.identifiants) {
          setName(data.identifiants.name);
          setImage(data.identifiants.image);
          setDt_creation(data.identifiants.dt_creation);
          setDescription(data.identifiants.description);
        }
    }, []);
    const handelPress=async()=>{

        const validateDate = (text) => {
          setDate(text);
          const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // Match date in MM/DD/YYYY format
          setIsValidDate(dateRegex.test(text));
        };
        const artData={
            name: name,
            image: image,
            dt_creation: dt_creation,
            description:description,
            auteur:data.identifiants.email,
          };
        if(data.identifiants.btn === "Update" && data.identifiants){
            console.log(data.identifiants.btn);
            // setDescription(data.identifiants.props.description)
            // setName(data.identifiants.props.name)
            // setDt(data.identifiants.props.dt_creation)
            // setImage(data.identifiants.props.image)
            const q = query(
                collection(db, 'work_arts'),
                where('name', '==', data.identifiants.name),
                where('auteur', '==', data.identifiants.email),
                where('dt_creation', '==', data.identifiants.dt_creation)
              );
              
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty ) {
                    setArtAddUpdate(-1);
                }else if (!isValidDate){
                    setArtAddUpdate(-1);
                }else{

                    const artDoc = querySnapshot.docs[0];
                    const artRef = doc(db, 'work_arts', artDoc.id);
    
                    try {
                        await updateDoc(artRef,artData);
                        setArtAddUpdate(1);
                        setName('');
                        setImage('');
                        setDt_creation('');
                        setDescription('');
                    } catch (error) {
                        setArtAddUpdate(-1);
                    }
                }

        }else{
            const collectionRef = collection(db, 'work_arts');
            const docRef = await addDoc(collectionRef, artData);
            if(!docRef || !isValidDate){
                setArtAddUpdate(-1);
             }
            else{
                setArtAddUpdate(1);
                setName('');
                setImage('');
                setDt_creation('');
                setDescription('');
            }
        }
    }
  return (
        <>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate("home" , { "identifiants":{email:data.identifiants.email,password:data.identifiants.password, reload:1} })}>
                <Icon name="arrow-left" size={25} color="black" />
            </TouchableOpacity>
            
            <View style={styles.main}>
                <Text  style={styles.text}>{data.identifiants.title ||"Add"} artWork</Text>
                <TextInput placeholder="Name..." onChangeText={(text)=>setName(text)}  style={styles.input} value={name || null} />          
                <TextInput placeholder="Image url..." onChangeText={(text)=>setImage(text)}  style={styles.input} value={image || null} keyboardType="email-address" />
                <TextInput placeholder="Date MM/DD/YYYY..." onChangeText={(text) => validateDate(text)} value={dt_creation || null} style={styles.input}  />
                <TextInput placeholder="" onChangeText={(text)=>setDescription(text)} value={description || null}  style={styles.input} multiline={true} numberOfLines={5} />
                <View style={styles.btnBox}>
                    <TouchableHighlight underlayColor="#A9A9A9" onPress={handelPress} style={styles.btn}>
                                <Text style={styles.btnTxt}>{data.identifiants.btn||"Create"}</Text>
                    </TouchableHighlight>
                </View>
                {   
                    artAddUpdate===1 && <Text style={styles.succ}>ArtWork {data.identifiants.title}ed successfully</Text>              
                }
                {
                    artAddUpdate===-1 &&<Text style={styles.fail}>Error ! Please try again or check the inputs value</Text>
                }
            </View>
        </>
  )
}

export default FormCreateModifyArtWork

const styles = StyleSheet.create({
    succ:{
        color:"green",
    },  
    fail:{
        color:"red",
    },
    main:{
        position:"relative",
        top:240,
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
        position:"fixed",
        top:70,
        right:-30,
    },
})