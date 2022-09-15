import React, { useEffect, useState } from 'react'
import useInterval from '../useInterval'
import '../styles/style.css'

function Player(props) {
    //Player coordinates is a two value array. First value is margin top and second value is margin left 
    //Hence changing any of these 2 values changes the position of the player
    const [playerCoordinates, setPlayerCoordinates] = useState([[50,20]])

    //Read up down left and right keys and map to state and once mapped to state it will update player coordinates
    document.onkeydown = (e) => {
      e = e || window.event;
      var tempPlayerCoordinates = Array.from(playerCoordinates)
        //Up
      if (e.keyCode === 38) {
        for (let i = 0; i < tempPlayerCoordinates.length; i++) {
          tempPlayerCoordinates[i][0] = tempPlayerCoordinates[i][0]-10 
        }
        //Down
      } else if (e.keyCode === 40) {
        for (let i = 0; i < tempPlayerCoordinates.length; i++) {
          tempPlayerCoordinates[i][0] = tempPlayerCoordinates[i][0]+10 
        }
        //Left
      } else if (e.keyCode === 37) {
        for (let i = 0; i < tempPlayerCoordinates.length; i++) {
          tempPlayerCoordinates[i][1] = tempPlayerCoordinates[i][1]-5 
        }
        //Right
      } else if (e.keyCode === 39) {
        for (let i = 0; i < tempPlayerCoordinates.length; i++) {
          tempPlayerCoordinates[i][1] = tempPlayerCoordinates[i][1]+5 
        }
      }  
      setPlayerCoordinates(tempPlayerCoordinates)
    }
    
    //Passing player coordinates from Child to Parent i.e from Player to App
    props.onPlayerMove(playerCoordinates)
   
    //Updates top and left properties according to new values in playerCoordinates  
    const playerView = playerCoordinates.map((item,key)=>{
      const playerStyle = {
        top: `${item[0]}%`,
        left: `${item[1]}%` 
      }
      return(<div key={key} className="player" style={playerStyle}></div>)
    })
  
    return (
    <div>{playerView}</div>
  )
}

export default Player