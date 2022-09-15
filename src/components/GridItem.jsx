import React from 'react'

//Template obstacle view
function GridItem(props) {    
    var count = props.count/10
    var countArray = []

    for(let i=0; i<count; i++){
        countArray[i] = i
    }
    
    const x = (
        (<div className='item' style={props.style}></div>)
    )

    return (
        <div>
            {x}
            {x}
            {x}
            {x}
            {x}
            {x}
        </div>
        
        
  )
}

export default GridItem