import React from "react";

export default function Header(){
    return(
       <header className="header">
          <img src={require(`../images/Troll-Face.png`)} alt="troll-face" className="header--img"/>
          <h2 className="header--title">Meme Generator</h2>
          <h5 className="header--text">Drag and drop text to change position</h5>
          
       </header> 
    )
}