import React from 'react';
import { Player } from 'video-react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import Particles from 'react-particles-js';
import ReactTooltip from 'react-tooltip'
import Sketch from './Sketch'
import * as sketch2 from './sketch2';
import './App.scss';
//source: video-react: https://video-react.js.org/
//source: react-speech-kit: https://github.com/MikeyParton/react-speech-kit
//source: react-particles-js: https://www.npmjs.com/package/react-particles-js?activeTab=readme
//source: react-tooltip: https://www.npmjs.com/package/react-tooltip






function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Intro} />
        <Route exact path="/Choose" component={Choose} />
        <Route exact path="/Shout" component={Explode} />
        <Route exact path="/FunnyVideo" component={FunnyVideo} />
      </div>
    </Router>
  );

}


function Intro() {
  const lang = "en-AU";
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({

    onResult: result => {
      console.log(result);
      setValue(result);
      if (result.includes("stressful") || result.includes("stress")) {
        setStress(true);
      }
    }
  });
  const [stress, setStress] = useState(false);
  if (stress) {

    if (listening) {
      stop();
    }
    return <Redirect to='/Choose' />
  }
  const toggle = listening
    ? stop
    : () => listen({ lang });
  // const [route, setRoute] = useState(false)
  //   if (route) {
  //       return <Redirect path={route} />
  //   }



  return (
    <div className="entry">
      <div className="text">
        <p id="intro">If you feel stressed, don't box yourself into a corner : )</p>
        <p id="intro2">Saying it out could help!</p>
      </div>

      <div className="voice">
        <a className="tip" data-tip data-for='btn'><button id="btn" type="button" onClick={toggle}>
          {listening ? 'Stop' : 'Click to say it out'}
        </button></a>
        <ReactTooltip id='btn' type='error'>
          <span>Hint: "I feel so stressed"</span>
        </ReactTooltip>

        {listening && <div className='lis'>Go ahead I'm listening</div>}

      </div>
    </div>
  );
}


function Choose() {
  const lang = "en-AU";
  const [value, setValue] = useState("");
  const [video, setVideo] = useState(false);
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: result => {
      console.log(result);
      setValue(result);
      if (result.includes("game")) {
        setWorry(true);
      }
      if (result.includes("video")) {
        setVideo(true);
      }
    }
  });
  const [worry, setWorry] = useState(false);
  if (worry) {
    if (listening) {
      stop();
    }
    return <Redirect to='/Shout' />
  }

  if (video) {
    if (listening) {
      stop();
    }
    return <Redirect to='/FunnyVideo' />
  }

  // const toggle = listening
  //   ? stop
  //   : () => listen({ lang });

  const toggle = () => {
    if (listening) {
      stop();
    } else {
      listen({ lang });
    }
  }


  return (

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
        <p id="ccintro">Do you wanna : </p>
        {/* particle system   the higher the volume the bigger the ball, finally explodes and disappear*/}
        <br></br>
        <p id="choice2">Play a game</p>
        <p id="choice1">Watch a relaxing video</p>

      </div>

      <div className="voice2">
        <button type="button" onClick={toggle}>
          {listening ? 'Stop' : 'Click to speak out your choice : )'}
        </button>



        {listening && <div className="lis">Go ahead I'm listening</div>}
      </div>

    </div>
    // </div>

  );
}




function Explode() {
  const [explodeText,setEx] = useState(false);
  // const [radius, setRadius] = useState('');
  function restart(){
    window.location.reload(true);
  }
  //this function just changes your text state 
  function explodeT() {
    setEx(true);
    return <p>hihihihihihihi</p>
  }

  return (
    <div className="shoutwhole">
      <div id="shoutbtn">
        {/* <textarea onKeyDown={countKeyPressed} >Start</textarea> */}
        {/* <button type="button">Stop</button> */}
      </div>
      <div className="circle">
        <Sketch style={{ position:'absolute'}} changeText={explodeT} sketch={sketch2} width={window.innerWidth} height={window.innerHeight-52} />      
      </div>
      <div id="vbt">
        <button id="home1" onClick={restart}>restart</button>
        <Link to="/"><button id="home1">Home</button></Link>
        <Link to="/FunnyVideo"><button id="video">Switch to Videos</button></Link>
      </div> 
      

    </div>
  );
}

function getRV() {
  let t = Math.floor(Math.random() * 12);
  let n = "./" + t + ".mp4";
  return n;
}

function FunnyVideo() {
  const [v, setV] = useState(getRV);


  function handleButtonClicked() {
    return setV(getRV());
  }

  return (
    <div className="vvv">
      <div className="player">
        <MyPlayer vn={v}/>
      </div>
      <div className="storybutton">
        <button id = "switch" onClick={handleButtonClicked}>Switch Videos</button>
        <Link to="/"><button id="home">Home</button></Link>
        <Link to="/Shout"><button id="game">Switch to the Game</button></Link>
      </div>


    </div>
  );

}

function MyPlayer(props) {
  console.log(props);
  return <Player
    playsInline
    poster="/assets/poster.png"
    src={props.vn}
  />

}

export default App;
