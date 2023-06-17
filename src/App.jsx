import { useEffect, useState } from 'react'

import './App.css'

import './app.css'



let order = 0;
let isAllClicked = false

const App=() => {

  const [boxesArray,setBoxesArry]  = useState(getBoxes("initial"))


  useEffect(()=>{

    
      if(boxesArray.some((item)=>!item.isClicked)){
        isAllClicked =false
      }
      else{
        isAllClicked = true
      }

      if(isAllClicked){
        boxesArray.forEach((box,index)=>{
          return setTimeout(()=>{
           let temp =[...boxesArray]
           temp[index].isClicked = false;
           setBoxesArry(temp)

          },(1000*(index+1)))
        })
       
      }

  },[boxesArray])


  function getBoxes(type){
    let boxesData = []

    let boxes = [0,1,2].map((i)=>{
      return [0,1,2].map((j)=>{
        if(!(i==1 && j>0)){

          if(type==='initial'){
            return boxesData.push({i,j,isClicked:false,order:null})
          }

          return ( <div key={`${i}-${j}`}
          className='box-item'
          onClick={()=>colorChange(i,j)}
          style={{
            backgroundColor: boxesArray?.find(
              (item) => item.i === i && item.j === j
            )?.isClicked
              ? "green"
              : "",
          }}
          >
          </div>
          )
        }
        else{return <div></div>}
      })
    })

    if(type === 'initial'){
      return boxesData
    }
   

    return boxes;

  }


  const colorChange = (i,j) =>{

    let temp = [...boxesArray];
    let item = temp.find(item=>item.i === i && item.j ===j)
    item.isClicked = true
    item.order = ++order
    temp.sort((a, b) => (a.order > b.order ? 1 : -1));
    // console.log(item)
    setBoxesArry(temp)

  }

  return (
   <div className='parent'>
     <div>
      <div className='box-container'>
      {getBoxes("init")}
      </div>
      </div>
   </div>
  )
}

export default App
