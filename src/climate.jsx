import React, { useEffect } from 'react'
import { useState } from 'react';
import "./climate.css"


const Climate = () => {
    const [temp,setTemp]=useState(32)
    const [name,setName]=useState("Chennai");
    const [lat,setLat]=useState(78.2333);
    const [lon,setLon]=useState(12.5333);
    const [des,setDes]=useState("overcast clouds");
    const [speed,setSpeed]=useState(7.28);
    const [hum,setHum]=useState(66);
    const [cont,setCont]=useState("IN");
    const [bg,setBg]=useState("sunny.mp4")
   
    const [loading,setLoading]=useState(false)
    const [city,setCity]=useState(false)
    const micon={
      "01d":"sunny.mp4",
      "02d":"sunny.mp4",
      "03d":"sunny.mp4",
      "01n":"moon.mp4",
      "02n":"moon.mp4",
      "03n":"moon.mp4",
      "09d":"rain.mp4",
      "10d":"rain.mp4",
      "11d":"rain.mp4",
      "09n":"rain.mp4",
      "11n":"rain.mp4",
      "10n":"rain.mp4",
      "13d":"snow.mp4",
      "50d":"snow.mp4",
      "13n":"snow.mp4",
      "50n":"snow.mp4",

     
    }
    async function search(){
        try{
          setLoading(true)
          const data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=6f6dd73c1ec5e9b2ce8bee4efb0ce44b&units=Metric`)
          const res= await data.json()
          if (res.cod=="404"){
            setCity(true)
          }
        
          setTemp(Math.floor(res.main.temp))
          setCont(res.sys.country)
          setName(res.name)
          setDes(res.weather[0].description)
          setLat(res.coord.lat)
          setLon(res.coord.lon)
          setSpeed(res.wind.speed)
          setHum(res.main.humidity)  
          setBg(micon[res.weather[0].icon])      
          
        }catch{
             console.error(error);
        }finally{
          setLoading(false)
        }
    }
    function changehandler(e){
      setName(e.target.value)

    }
    function keydownhandler(e){
         if (e.key=="Enter"){
           search();
         }

    }

     useEffect(function () {
      search()
     },[]);
    
     
    
      return (
        <>
       <div className='m-container'>
    
         <div className='v-container'>
         <video className='bgvid' autoPlay muted loop src={bg}></video>
           
          
           <div className='content'>
             {loading&& <div  className='loading'>
            Loading.....
           </div>}
           {city&&<div  className='loading'>
            City not found
           </div>
           }
               
             
           
            
            { !city&&!loading&& 
             <div className='_content'>
              <div className="e_city">
                 <div className="search">
                   <input placeholder="City name" type="text" onKeyDown={keydownhandler}  onChange={changehandler} ></input>
                   <button onClick={search} type='submit'>Go</button>
                 </div> 
                 </div>
                 <div className="temp">
                {temp} C
              </div>
              
              <div className='container_1'>
                  <div className="n_city" >{name}</div>
                  <div className="n_cont">{cont}</div>
                  <div className='des'>{des}</div>
              </div>
             <div className='container_2'>
                  <div>
                      <label className="l_lat">Lat</label>
                      <div className='speed'>{lat}</div>
                  </div>
                  <div>
                      <label className="l_lat">Lon</label>
                      <div className='speed'>{lon}</div> 
                  </div>  
             </div>
             <div className='container_3'>
                  <div className='s_con'>
                      <img className='imgs' src='wind.jpeg'></img>
                      <label className="l_speed">speed</label>
                      <div className='speed'>{speed}</div>
                  </div>
                 <div  className='s_con'>
                    <img className='imgs' src='humidity.jpeg'></img> 
                     <label className="l_hum">humidity</label>
                      <div className='hum'>{hum}</div>
                 </div>
             </div>
          
            
               
           </div>
            }
           
           
           
      
            
         
         
           </div>
            
         
           </div>
            
           
               

       
         
         </div>

        </>
      )
}

export default  Climate