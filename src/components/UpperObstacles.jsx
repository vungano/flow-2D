import React, { useEffect, useState } from 'react'
import '../styles/style.css'
import useInterval from '../useInterval'
import GridItem from './GridItem'


function UpperObstacles(props) {
     /*Obstacle count is maximum number of obtsacles that can be visible on the screen at any given time
      Current speed is current speed of the Obstacles
      Obstacles keeps track of all the obstacles visible on the screen at a given time
    */
    let obstacleCount = 5
    const [currentSpeed, setCurrentSpeed] = useState(500)
    const [obstacle, setObstacle] = useState([])
    
    //Move obstacles function
    function moveObstacles(){
        let tempStore = Array.from(obstacle)
        for (let i = 0; i<tempStore.length; i++){
          tempStore[i][1] = tempStore[i][1]-(obstacleCount)
        }
        setObstacle(tempStore)
      }
      
    //Generate obstacles function   
    function generateObstacles(){
      //This is speed update in sync with generate obstacles
      currentSpeed>250 ?   setCurrentSpeed((item)=> item-5) : setCurrentSpeed((item)=> item-2)
      let tempStore = Array.from(obstacle)
      const random = Math.random()*50
      let height = (Math.floor(random/10)*10)+20
  
      if(tempStore.length<=obstacleCount){      
        tempStore.push([height,95])
       
      }
      else{
        tempStore.push([height,(100-(obstacleCount))])
        tempStore.shift()
      }
      setObstacle(tempStore)
    }

    //Obstacles are generated at the speed currentSpeed*4 to ensure that max obstacles on screen is 5
    useInterval(moveObstacles,currentSpeed)
    useInterval(generateObstacles,currentSpeed*4)

    //Pushing obstacle coordinates to App i.e from Child to Parent
    props.onUpdate(obstacle)

     /*
      Since these are upper obstacles the margin bottom is 100 - height to ensure that they are on the roof
      at all times.
      The height determines the color of the obstacle
    */
   
    const obstacleView = obstacle.map((item,key)=>{
      let color
      let bottom = 100 -item[0]
      const obstacleStyle = {
        height: `${item[0]}%`,
        bottom: `${bottom}%`,
        left: `${item[1]}%`
      }

      switch(item[0]){
        case 20:
            color= "#87FF3C"
            break;
        case 30:
          color = "#FF55EE"
          break;
        case 40:
          color= "#4332FF"
          break;
        case 50:
          color = "#00FF91"
          break;
        case 60:
          color = "#FF002F"
          break;
           
      }

      const gridStyle = {
        backgroundColor: color 
      }

      return( <div key={key} className="obstacle" style={obstacleStyle}><GridItem style={gridStyle}/></div>)
    })
  
     // console.log("Up: ",obstacle)
    return (
    <div>
        {obstacleView}
    </div>
  )
}

export default UpperObstacles