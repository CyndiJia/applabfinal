import React from 'react';
import Speech from 'react-speech';
import { Player } from 'video-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

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
  {/* < div id="button">
      <Link to="/Choose"><p>Click to say it out</p></Link>
    </div> */}
    <div className="voice">
    <button onMouseDown={listen} onMouseUp={stop}>
       Click to say it out
      </button>
      <textarea
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <Link to="/Choose">{stress}</Link>
      
      {listening && <div>Go ahead I'm listening</div>}
    </div>
    
  </div>
  );
}


function Choose(){
  return (
    <Dictaphone></Dictaphone>
  );
}

function Story(){
  return (
    <div>

    </div>
  );
}

function FunnyVideo(){
  return <Player
          playsInline
          poster="/assets/poster.png"
          src="https://www.youtube.com/watch?v=SVY8I46dkb0"
    />
}

export default App;
