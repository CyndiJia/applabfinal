import React from 'react';
import Speech from 'react-speech';
import { Player } from 'video-react';
//import logo from './logo.svg';
// import '~video-react/dist/video-react.css'; 
import './App.css';


function App() {
  return (
    
    <div className="App">
      <Speech
          text="Pat pat, Yiqi"
          pitch="0.8"
          rate="1"
          volume="1"
          lang="en-GB"
          voice="Google UK English Female"
        />
      <Player
          playsInline
          poster="/assets/poster.png"
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />
    </div>
  );
}

export default App;
