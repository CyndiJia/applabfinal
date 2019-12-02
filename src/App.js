import React from 'react';
import { Player } from 'video-react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import { ReactMic } from 'react-mic';
import { Circle } from 'react-shapes';
import ParticleAnimation from 'react-particle-animation';
import Particles from 'react-particles-js';

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

function Intro() {
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: result => {
      setValue(result);
      if (result.includes("stressful") || result.includes("stress")) {
        setStress(true);
      }
    }
  });
  const [stress, setStress] = useState(false);
  if (stress) {
    return <Redirect to='/Choose' />
  }

  return (
    <div className="entry">
      <div className="text">
        <p id="intro">If you feel stressful, don't box yourself to the corner : )</p>
        <p id="intro2">Saying it out could help!</p>
      </div>

      <div className="voice">
        <button onMouseDown={listen} onMouseUp={stop}>
          Click to say it out
      </button>
        <textarea
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <Link to="/Choose">{stress}</Link>
        < div id="button">
          {/* <Link to="/Choose"><p>next</p></Link> */}
        </div>

        {listening && <div className='lis'>Go ahead I'm listening</div>}
      </div>
    </div>
  );
}


function Choose() {
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: result => {
      setValue(result);
      if (result.includes("stressful") || result.includes("stress")) {
        setStress(true);
      }
    }
  });
  const [stress, setStress] = useState(false);

  return (
    // <div className="choosewhole">

    <div className="choose">
      <Particles className="par" height="800"
        params={{
          "particles": {
            "number": {
              "value": 400,
              "density": {
                "enable": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "speed": 4,
                "size_min": 0.3
              }
            },
            "line_linked": {
              "enable": false
            },
            "move": {
              "random": true,
              "speed": 1,
              "direction": "top",
              "out_mode": "out"
            }
          },
          "interactivity": {
            "events": {
              "onhover": {
                "enable": true,
                "mode": "bubble"
              },
              "onclick": {
                "enable": true,
                "mode": "repulse"
              }
            },
            "modes": {
              "bubble": {
                "distance": 200,
                "duration": 2,
                "size": 0,
                "opacity": 0.2
              },
              "repulse": {
                "distance": 300,
                "duration": 4
              }
            }
          }
        }} />
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
    // </div>

  );
}

function Story() {
  const [record, setRecord] = useState(false);
  const [radius, setRadius] = useState('');
  function start() {
    setRecord(true);
  }

  function stop() {
    setRecord(false);
  }

  function onData(recordedBlob) {
    console.log('real-time data: ', recordedBlob.size / 20);
    setRadius(recordedBlob.size / 10);
  }
  return (
    <div>
      <ReactMic
        record={record}
        className="sound-wave"
        onData={onData}
      />
      <Circle id="cirrr" r={radius} fill={{ color: 'black' }} stroke={{ color: '#E65243' }} strokeWidth={3} />
      <button onClick={start} type="button">Start</button>
      <button onClick={stop} type="button">Stop</button>
    </div>
  );
}

function FunnyVideo() {
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
