import React from 'react';
import Speech from 'react-speech';
import { Player } from 'video-react';

// import "node_modules/video-react/dist/video-react.css"; 
//import logo from './logo.svg';

import './App.scss';
import Dictaphone from './dictaphone.js'






function App() {
  return (
    
    <div className="App">
      <Dictaphone></Dictaphone>
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
