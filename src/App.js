import React from 'react';
import Speech from 'react-speech';
import { Player } from 'video-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import { ReactMic } from 'react-mic';
import {Circle} from 'react-shapes';
import ParticleAnimation from 'react-particle-animation'

// import "node_modules/video-react/dist/video-react.css"; 
//import logo from './logo.svg';

import './App.scss';
import Dictaphone from './dictaphone.js'






function App() {
  return (
    <Router>
      <div className="App">
      <Route exact path="/" component={Intro} />
      <Route exact path="/Choose" component={Choose} />
      <Route exact path="/Story" component={Story} />
      <Route exact path="/FunnyVideo" component={FunnyVideo} />
      </div>
    </Router>
    );
       
     
  
}

function Intro(){
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: result => {
      setValue(result);
      if (result.includes("stressful") || result.includes("stress") ){
        setStress(true);
      }
    }
  });
  const [stress,setStress] = useState(false);

  return(
  <div className="entry">  
    <div className="text">
      <p id="intro">If you feel stressful, don't box yourself to the corner : )</p>
      <p id="intro2">Saying it out could help!</p>
      {/* <Speech
          text="If you feel stressful, don't box yourself to the corner.Saying it out could help!"
          pitch="0.8"
          rate="1"
          volume="1"
          lang="en-GB"
          voice="Google UK English Female"
        /> */}
    </div>
   
    <div className="voice">
    <button onMouseDown={listen} onMouseUp={stop}>
       Click to say it out
      </button>
      <textarea
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      {/* <Link to="/Choose">{stress}</Link> */}
      < div id="button">
      <Link to="/Choose"><p>next</p></Link>
    </div>
      
      {listening && <div className='lis'>Go ahead I'm listening</div>}
    </div>
    <ParticleAnimation />  
  </div>
  );
}


function Choose(){
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: result => {
      setValue(result);
      if (result.includes("stressful") || result.includes("stress") ){
        setStress(true);
      }
    }
  });
  const [stress,setStress] = useState(false);

  return(
  <div className="choose">
    <div className="choosetext">
      <p id="ccintro">Do you wanna</p>
      {/* particle system   the higher the volume the bigger the ball, finally explodes and disappear*/}
      <p id="choice2">Shout out worries</p> 
      <p id="choice1">Watch a relaxing video</p>
      
      {/* <Speech
          text="If you feel stressful, don't box yourself to the corner.Saying it out could help!"
          pitch="0.8"
          rate="1"
          volume="1"
          lang="en-GB"
          voice="Google UK English Female"
        /> */}
    </div>
  
    <div className="voice2">
    <button onMouseDown={listen} onMouseUp={stop}>
       Click to say it out
      </button>
      <textarea
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      {/* <Link to="/Choose">{stress}</Link> */}
      < div id="button2">
      <Link to="/Story"><p>Shout</p></Link>
      <Link to="/FunnyVideo"><p>Video</p></Link>
    </div>
      
      {listening && <div className="lis">Go ahead I'm listening</div>}
    </div>
    
  </div>
  );
}

function Story(){
  const [record,setRecord] = useState(false);
  const [radius,setRadius] = useState('');
  function start(){
    setRecord(true);
  }

  function stop(){
    setRecord(false);
  }

  function onData(recordedBlob){
    console.log('real-time data: ', recordedBlob.size/20);
    setRadius(recordedBlob.size/10);
  }
  return (
    <div>
      <ReactMic
          record={record}
          className="sound-wave"
          onData={onData}
         />
      <Circle r={radius} fill={{color:'black'}} stroke={{color:'#E65243'}} strokeWidth={3} />
        <button onClick={start} type="button">Start</button>
        <button onClick={stop} type="button">Stop</button>
    </div>
  );
}

function FunnyVideo(){
  return ( 
  <div>
    <div className="player">
      <Player
        playsInline
        poster="/assets/poster.png"
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      />
    </div>
    <div className="storybutton">
    <Link to="/"><p>Back</p></Link>
    </div>
   
  </div>
);
 
}

export default App;
