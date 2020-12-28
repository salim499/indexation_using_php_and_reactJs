import React from 'react'
import logo from './logo.svg';
import './Searchbar.css'
function App(props){
  return(
<React.Fragment>
        <div className="logo">
          <img src={logo} className="App-logo" alt="logo" />
          <img alt="Google" src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"></img>
        </div>
        <div className="bar">
          <input class="searchbar" type="text" title="Search"></input>
          <a href="#"> <img className="voice" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Google_mic.svg/716px-Google_mic.svg.png" title="Search by Voice"></img></a>
        </div>
        <div className="buttons">
          <button className="button" type="button">Recherche</button>
         </div>
    </React.Fragment>
  )
}
export default App