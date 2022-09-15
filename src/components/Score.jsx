import React from 'react'
import '../styles/style.css'
import joystick from '../images/joystick.png'

function Score(props) {
  //Get score from App and display it
  return (
    <div className="score-container">
        <h1 className="score">BEST: {props.highScore}</h1>
        <br/>
        <h1 className="score">SCORE: {props.score}</h1>         
        <img src={joystick} className="logoImg" alt="" />
    </div>
  )
}

export default Score