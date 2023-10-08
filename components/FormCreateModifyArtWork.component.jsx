import { StyleSheet, Text, View ,TextInput, TouchableHighlight,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { collection,getDoc, getDocs,doc, where, query, addDoc, updateDoc } from 'firebase/firestore';
import db from '../config';

const FormCreateModifyArtWork = ({navigation}) => {
    const route = useRoute();
    const data=route.params;
    const [artAddUpdate, setArtAddUpdate] = useState(0);
    const [name,setName]=useState(data.identifiants.name || '')
    const [image,setImage]=useState(data.identifiants.image || '')
    const [dt_creation,setDt_creation]=useState(data.identifiants.dt_creation || '')
    const [description,setDescription]=useState(data.identifiants.description || '')
    const handelPress=async()=>{
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
                where('dt_creation', 'like', data.identifiants.dt_creation)
              );
              
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setArtAddUpdate(-1);
                }

                const artDoc = querySnapshot.docs[0];
                const artRef = doc(db, 'work_arts', artDoc.id);

                try {
                    await updateDoc(artRef,artData);
                    setArtAddUpdate(1);
                } catch (error) {
                    setArtAddUpdate(-1);
                }
        }else{

            const collectionRef = collection(db, 'work_arts');
            const docRef = await addDoc(collectionRef, artData);
            if(!docRef){
                setArtAddUpdate(-1);
             }
            else{
                setArtAddUpdate(1);
                setDescription(null)
                setName(null)
                setDt_creation(null)
                setImage(null)
            }
        }
    }
  return (
        <>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate("home" , { "identifiants":{email:data.identifiants.email, reload:1} })}>
                <Icon name="arrow-left" size={25} color="black" />
            </TouchableOpacity>
            
            <View style={styles.main}>
                <Text  style={styles.text}>{data.identifiants.title ||"Add"} artWork</Text>
                <TextInput placeholder="Name..." onChangeText={(text)=>setName(text)}  style={styles.input} value={data.identifiants.name || null} />          
                <TextInput placeholder="Image url..." onChangeText={(text)=>setImage(text)}  style={styles.input} value={data.identifiants.image || null} keyboardType="email-address" />
                <TextInput placeholder="Date..." onChangeText={(text)=>setDt_creation(text)} value={data.identifiants.dt_creation || null} style={styles.input}  />
                <TextInput placeholder="" onChangeText={(text)=>setDescription(text)} value={data.identifiants.description || null}  style={styles.input} multiline={true} numberOfLines={5} />
                <View style={styles.btnBox}>
                    <TouchableHighlight underlayColor="#A9A9A9" onPress={handelPress} style={styles.btn}>
                                <Text style={styles.btnTxt}>{data.identifiants.btn||"Create"}</Text>
                    </TouchableHighlight>
                </View>
                {   
                    artAddUpdate===1 && <Text style={styles.succ}>ArtWork {data.identifiants.title}ed successfully</Text>              
                }
                {
                    artAddUpdate===-1 &&<Text style={styles.fail}>Error ! Please try again</Text>
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