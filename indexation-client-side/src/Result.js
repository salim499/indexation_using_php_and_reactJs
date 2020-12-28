import React from 'react'
import {useState} from 'react'
import WordCloud from './WordCloud'
import StarRatingComponent from "react-star-rating-component";
import './Result.css'
const words = [
    {
      text: 'told',
      value: 64,
    },
    {
      text: 'mistake',
      value: 11,
    },
    {
      text: 'thought',
      value: 16,
    },
    {
      text: 'bad',
      value: 17,
    },
    {
      text: 'told',
      value: 64,
    },
    {
      text: 'mistake',
      value: 11,
    },
    {
      text: 'thought',
      value: 16,
    },
    {
      text: 'bad',
      value: 17,
    },
    {
      text: 'told',
      value: 64,
    },
    {
      text: 'mistake',
      value: 11,
    },
    {
      text: 'thought',
      value: 16,
    },
    {
      text: 'bad',
      value: 17,
    },
    {
      text: 'told',
      value: 64,
    },
    {
      text: 'mistake',
      value: 11,
    },
    {
      text: 'thought',
      value: 16,
    },
    {
      text: 'bad',
      value: 17,
    },
    {
      text: 'told',
      value: 64,
    },
    {
      text: 'mistake',
      value: 11,
    },
    {
      text: 'thought',
      value: 16,
    },
    {
      text: 'bad',
      value: 17,
    },
    {
      text: 'told',
      value: 64,
    },
    {
      text: 'mistake',
      value: 801,
    },
    {
      text: 'thought',
      value: 16,
    },
    {
      text: 'bad',
      value: 47,
    },
    {
      text: 'told',
      value: 64,
    },
    {
      text: 'mistake',
      value: 11,
    },
    {
      text: 'thought',
      value: 16,
    },
    {
      text: 'bad',
      value: 17,
    },
  ]

function App(props){

    function showWordCloudF(e){
        if(showWordCloud===false){
            setShowWordCloud(true)
            setTextShowCloud("fermer-")
        } else {
            setShowWordCloud(false)
            setTextShowCloud("nuage+")
        }
    }

    const [showWordCloud, setShowWordCloud]=useState(false)
    const [textShowCloud, setTextShowCloud]=useState("nuage+")
    return(
     <div className="global">
         <div className="firstPart">
         <p>texte texte texte texte texte <button onClick={showWordCloudF}>{textShowCloud}</button></p>
         <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        lien lien lien lien lien lien
        </a>
         <p>texte texte texte texte texte texte texte texte texte texte texte texte texte texte texte
         texte texte texte texte texte texte texte texte te texte texte texte texte texte texte texte texte te texte texte texte texte texte texte texte texte texte texte texte texte texte texte texte
         </p>
         <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={3}
                          />
            nombres cliques : {50}
         </div>
        {
            showWordCloud?
            <div className="secondPart">
            <div className="WordCloud">
            <WordCloud words={words}></WordCloud>
            </div>
            </div>
            :
            null
        }
     </div>      
    )
}
export default App