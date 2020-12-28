import React, {useEffect} from 'react';
import axios from 'axios';
import firebase from "./FireStore";
import * as Fonctions from './fonctions'
const endPoint="http://localhost/indexation_second_version/"
function App() {

  useEffect(()=>{
    // get array of objects from api
    axios.get(endPoint)
    .then(response=>{
      response.data.forEach(file => {
        console.log(file.title)
        // post path of file to bdd
        firebase.firestore().collection("Files")
        .add({file:file.file})
        // if post to bdd succed 
        .then(res=>{
        // add props of each file
        firebase.firestore().collection("Props") 
        .add ({title:file.title,description:file.descriptions,keywords:file.keywords,file:res.id})
        .then(e=>console.log(e))
        .catch(err=>console.log(err))
        // end of ading porops of each file 
        // concat words of body and head
        const object={}
        for (const key in file.head){
          object[key]=file.head[key]
        }
        for (const key2 in file.body){
          if(object[key2]>0){
            console.log(key2+" => "+object[key2])
            object[key2]=object[key2]+file.body[key2]
          }else{
            object[key2]=file.body[key2]
          }
        }  
        ////////////////////////// 
        // post wods with her weight to bdd
        for (const key in object){
          firebase.firestore().collection("WordsWeights")
          .add({word:key, letters:Fonctions.soundex(key), weight:object[key], file:res.id})
          .then(res=>console.log(("le mot avec le poid sont ajoutés avec succès")))
          .catch(err=>console.log("erreur dans le post des mots et leur poids sur la bdd"))
        }
        })
        //////////////////////////
        // if post fail 
        .catch(err=>console.log("erreur dans la demande pour ajouter les fichier dans la base de données"))
        //fin ajout fichier to bdd
      });      
    })
    .catch(err=>{
      console.log("erreur dans la demande au serveur de l'indexation")
    })
  })

  return (
   null
  );
}

export default App;
