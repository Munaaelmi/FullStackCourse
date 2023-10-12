import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  
  const defaultUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=f4bb096473d59d0aa15ff2d5a5037400&units=metric`

  const [newData, setNewData] = useState(fetchData)

  function fetchData(inputValue){
    if(inputValue){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=f4bb096473d59d0aa15ff2d5a5037400&units=metric`).then((response) => {
        setNewData(response.data)
      }).catch((err)=>{
        if(err.response.status === 400){
          alert("Invalid City")
        }
      })
    }else{
      axios.get(defaultUrl).then((response) => {
        setNewData(response.data)
      })
    }
  }

  useEffect(() =>{
    fetchData()
  }, [])

  function handleInput(e){
    if(e.key === 'Enter'){
      //setInputValue(e.target.value)
      fetchData(e.target.value)
    }
  }

  return (
    <div>
      <input 
        placeholder = 'Enter City'
        onKeyDown={handleInput}
      />
      { newData ? <h1>{newData.name}</h1> : <h1></h1>}
      { newData.main ? <h1>Temp: {newData.main.temp} °C</h1> : <h1></h1>}

    </div>
  )
}

export default App