import './App.css';
import Timer from '../components/Timer'
import React from 'react';


function App() {


  return (
    <div className="App bg-dark-gray pa4 vh-100 flex flex-column items-center ">
      <h2 className="f2 white mb2">Pomodoro Timer</h2>   
     
       <Timer  />
    </div> 
  );
}



export default App;
