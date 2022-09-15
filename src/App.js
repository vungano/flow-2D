import React, { useEffect, useState } from 'react'
import './styles/style.css'
import LowerObstacles from './components/LowerObstacles'
import UpperObstacles from './components/UpperObstacles'
import Player from './components/Player'
import Score from './components/Score'
import useInterval from './useInterval'
import gameOverSad  from './images/sad.png'
import {ImSad} from 'react-icons/im'

    
function App() {

    var highScore = JSON.parse(localStorage.getItem('highScore'))
  
    //States declaration
    const [playerCoordinates,setPlayerCoordinates] = useState() 
    const [gameOver,setGameOver] = useState(false)
    const[score, setScore] = useState(0)
    
    //Only update score if gameOver is fasle
    function updateScore(){
      if(gameOver==false){
         setScore((item)=> item+10)
      }
    }
   
    //Update the score every 5 seconds by 10 points
    useInterval(updateScore,3000)
    
    
    const getPlayerCoordinates =(coordinates)=>{
      setPlayerCoordinates(coordinates)
    }

    /*Function to get all lowerobstacle coordinates and check whether the obstacles are colliding with the player or 
      not.  If any one of the coordinates is equal to the player's coordinates then a collision would have occured 
      hence set gameOver is equal to true
    */
      const getLowerObstaclesCoordinates =(coordinates)=>{
      for(let i=0; i<coordinates.length; i++){
        if(playerCoordinates[0]== undefined){}
        else{
          if(playerCoordinates[0][1]== coordinates[i][1] && (100-playerCoordinates[0][0])<=coordinates[i][0]){
           setGameOver(true)
            if(score>highScore){
              localStorage.setItem('highScore',JSON.stringify(score))    
            }
          }
        }
      } 
    }

    /*Function to get all upperobstacle coordinates and check whether the obstacles are colliding with the player or 
      not.  If any one of the coordinates is equal to the player's coordinates then a collision would have occured 
      hence set gameOver is equal to true
    */
    const getUpperObstaclesCoordinates =(coordinates)=>{
      for(let i=0; i<coordinates.length; i++){
        if(playerCoordinates[0]== undefined){}
        else{
          if(playerCoordinates[0][1]== coordinates[i][1] && playerCoordinates[0][0]<coordinates[i][0]){
            setGameOver(true)
            if(score>highScore){
              localStorage.setItem('highScore',JSON.stringify(score))    
            }
          }
        }
      }
    }

    //if player goes out of bounds set gameOver as true
/*    if(playerCoordinates[0]>90 || playerCoordinates[1]<0){
      
    }
*/

    //if player gets out of bounds then game is over
    if(playerCoordinates){
        console.log(playerCoordinates[0][1]) 
      if((playerCoordinates[0][0]>90 || playerCoordinates[0][0]<0 || playerCoordinates[0][1]<0 || playerCoordinates[0][1]>95) && gameOver != true){
          setGameOver(true)
        }
    }
    //Reset the game after it has gone into gameOver state
    function resetGame(){
      setPlayerCoordinates([50,50])
      setGameOver(false)
      setScore(0)
    }

  
    /* 
      The normal game view where the player is able to play the game consisting of the Upper Obstacles, Lower 
      Obstacles and the Player. This view is only visible when gameOver is false
    */
    const gameView = 
     (<div className="canvas">
        <UpperObstacles onUpdate={getUpperObstaclesCoordinates} score={score}/>
        <LowerObstacles onUpdate={getLowerObstaclesCoordinates} score={score}/>
        <Player onPlayerMove={getPlayerCoordinates}/>
      </div>
     )
    
    /*
      When gameOver becomes true the gameView is replaced by this gameOver view
     */
    const gameOverView =(
        <div className="gameOver">
          <h1>Game Over</h1>
          <ImSad size={50}/>
          <h2>Score {score}</h2>
          <button onClick={resetGame}>New Game</button>
        </div>)
    
    return (
   <div>
   <div className="main">
      {gameOver? gameOverView : gameView}
      <Score score={score} 
             highScore={highScore}
      />
    </div>
    <div className="mobileView">
        <h1>This game is not yet available on mobile :|</h1>
    </div>
    </div>
  )
}

export default App