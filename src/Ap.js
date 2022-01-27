
import React, { useState, useEffect, useRef } from "react";
import song from "./audio/deduction-588.mp3";
import Counter from "./Counter";
import './App.css';

function App() {
   // eslint-disable-next-line
   const [audio, setAudio] = useState(new Audio(song));
   //const [isPlay, setIsPlay] = useState(false);
   const audioRef = useRef(null);
   // eslint-disable-next-line
  const playHandler = () => {
    if (audio == null) {
      setAudio(new Audio(song));
      audio.play();
    } else {
      audio.play();
    }
    // setAudio(new Audio(song))
    //audioRef.current.play();
    audio.play();
  }

  useEffect(() => {
    console.log(song);
    return (() => console.log('unmounts'));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>audio</h1>
      </header>
      <button className="buttonClass" onClick={playHandler}>play</button>
      <audio ref={audioRef} src={song} type='audio/mpeg' />
      <Counter />
    </div>
  );
}

export default App;
