import React from 'react';
import { Player } from 'video-react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import { ReactMic } from 'react-mic';
import { Circle } from 'react-shapes';
import Particles from 'react-particles-js';
import ReactTooltip from 'react-tooltip'
import Sketch from './Sketch'
import * as sketch2 from './sketch2';

// import "node_modules/video-react/dist/video-react.css"; 
//import logo from './logo.svg';

import './App.scss';






function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Intro} />
        <Route exact path="/Choose" component={Choose} />
        <Route exact path="/Shout" component={Story} />
        <Route exact path="/FunnyVideo" component={FunnyVideo} />
      </div>
    </Router>
  );



}

// function Timer(props) {
//   useEffect(() => {
//       console.log("HI")
//       const id = setTimeout(props.onCompletion, 5000);
//       return () => clearTimeout(id);
//   }, []);

//   return <div></div>
// }

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
        <p id="intro">If you feel stressful, don't box yourself to the corner : )</p>
        <p id="intro2">Saying it out could help!</p>
      </div>

      <div className="voice">
        <a className="tip" data-tip data-for='btn'><button id="btn" type="button" onClick={toggle}>
          {listening ? 'Stop' : 'Click to say it out'}
        </button></a>
        <ReactTooltip id='btn' type='error'>
          <span>Hint: "I feel so stressful"</span>
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
          {listening ? 'Stop' : 'Listen'}
        </button>
        {/* <textarea
          value={value}
          onChange={event => setValue(event.target.value)}
        /> */}
        {/* <Link to="/Choose">{stress}</Link> */}


        {listening && <div className="lis">Go ahead I'm listening</div>}
      </div>

    </div>
    // </div>

  );
}

function Story() {
  const [radius, setRadius] = useState('');
  // const [num,setNum] = useState(0);
  // const [record, setRecord] = useState(false);
  // function start() {
  //   setRecord(true);
  // }

  // function stop() {
  //   setRecord(false);
  // }

  // function onData(recordedBlob) {
  //   let r = 100;
  //   console.log('real-time data: ', recordedBlob.size);
  //   if (recordedBlob.size - 900 > 0) {
  //     setRadius(r);
  //     r += 2;
  //   }
  //   else {
  //     setRadius(100);
  //   }

  // }
//  let count = 0;
  let timePrev = 0;
  let timeCurr = 0;
  let interval = 0;
  let r;
  function countKeyPressed(){ 
    //count += 1;
    timeCurr = Date.now();
    interval = timeCurr - timePrev;


    console.log( interval );

    timePrev = timeCurr;
    if(interval<100){
      setRadius(200);
    }
    else if(interval<300){
      setRadius(150);
    }
    else if(interval<500){
      setRadius(80);
    }
    else if(interval < 700){
      setRadius(40);
    }
    else if(interval < 1000){
      setRadius(20);
    }
    else if(interval < 1300){
      setRadius(30);
    }
    else if(interval < 1600){
      setRadius(20);
    }
    else if(interval < 10000000){
      setRadius(30);
    }
    //return freq;
  }



  // countKeyPressed();


  return (
    <div className="shoutwhole">
      <div id="shoutbtn">
        {/* <textarea onKeyDown={countKeyPressed} >Start</textarea> */}
        {/* <button type="button">Stop</button> */}
      </div>
      {/* <ReactMic
        record={record}
        className="sound-wave"
        onData={onData}
      /> */}

      <div className="circle">
      <Sketch sketch={sketch2} width={window.innerWidth} height={window.innerHeight} />
      {/* <Sketch  /> */}

      <Circle id="cirrr" r={radius} fill={{ color: 'black' }} stroke={{ color: '#E65243' }} strokeWidth={3} />
      </div>
      

    </div>
  );
}

function getRV() {
  let t = Math.floor(Math.random() * 17);
  let n = "./" + t + ".mp4";
  return n;
}

function FunnyVideo() {
  const [v, setV] = useState(getRV);


  function handleButtonClicked() {
    return setV(getRV());
  }
  return (
    <div>
      <div className="player">
        <MyPlayer vn={v}
        // playsInline
        // poster="/assets/poster.png"
        // src= {v}
        />
      </div>
      <div className="storybutton">
        <button onClick={handleButtonClicked}>Switch</button>
        <Link to="/"><p>Back</p></Link>
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
