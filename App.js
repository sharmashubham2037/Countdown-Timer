import './App.css';
import { useEffect, useRef, useState } from 'react';


function App() {
  const[time,setTime]=useState(0)
  const[isActive,setIsActive]=useState(false)
  const[isPause,setIsPause]=useState(false)
  const intervalRef=useRef(null)
  const handleInput=(event)=>{
    setTime(parseInt(event.target.value*60))
  }
  const formatTime=()=>{
    const min=String(Math.floor(time/60)).padStart(2.0)
    const sec=String(time%60).padStart(2,0)
    return `${min} :${sec}`
  }
  const handleStart=()=>{
    setIsActive(true);
    setIsPause(false)
  }
  useEffect(()=>{
    if(isActive&&!isPause&&time>0){
      intervalRef.current=setInterval(()=>{
        setTime((prev)=>prev-1)
      },1000)
    }
      else if(time===0){
        clearInterval(intervalRef.current);
        setIsActive(false);
        alert('time is up')
      
    }
    return()=>clearInterval(intervalRef.current)
  },[isActive,isPause,time])

  const handleStop=()=>{
    setIsPause(!isPause)
  }
const handleReset=()=>{
 clearInterval(intervalRef.current)
 setIsActive(false)
 setIsActive(false)
 setTime(0);
}
  
  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <div className="input-timer">
        {/* <label htmlFor="timeInput">Enter Seconds:</label> */}
        <input type="number"  onChange={handleInput}placeholder="Enter time in sec" /><br/><br/>
        <div>{formatTime()}</div>
        <div className='btn-input'>
        <button onClick={handleStart} disabled={isActive&&!isPause}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Restart</button>
        </div>
      </div>
    </div>
  );
}

export default App;
