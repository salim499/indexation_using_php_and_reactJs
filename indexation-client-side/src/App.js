import React from 'react'
import {useState} from 'react'
import './App.css'

import * as Fonctions from './fonctions'
import Searchbar from './Searchbar'
import Result from './Result'

function splitTable(table){
  let compt=[]
  let count=0
  for(let i=0;i<table.length;i=i+5){
    count++
    compt.push(count)
  }
    return compt
}

let table2=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
const tablec=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
function App() {

  function paginationNumber(e){
     let limit=e.target.dataset["val"]*5
     setTable(table2.slice(limit-5,limit))
     table2=[]
     table2=[...tablec]

  }

  const [table, setTable]=useState([1,2,3,4,5])

  let requete="balise"

  return (
    <div className="App">
      <header className="App-header">
            <Searchbar></Searchbar>
        <div className="results">
        {
          table.map((val,key)=>(
            <React.Fragment>
  
            <Result key={val+Math.random()}></Result>
            </React.Fragment>
  ))
        }
        </div>
        <div className="Footer">
        {splitTable(table2).map((val,key)=>(
        <p>
         <a onClick={paginationNumber}
         data-val={val}
         className="App-link"
         href="#"
         rel="noopener noreferrer"
       >
       {val}
       </a>
       &ensp;
       &nbsp;
       </p> 
        ))}
        </div>
      </header>
    </div>
  );
}

export default App;
