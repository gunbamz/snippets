import React from 'react'
import React, { useState, useEffect } from "react";

class AudioPlayer extends React.Component {
  render() {
    return (
      <div>
        <audio ref="audio_tag" src="./static/music/foo.mp3" controls autoPlay/>
      </div>
    );
  }
}

export default AudioPlayer;
const Sound = () => {
    return (
        <div>
          <audio ref="audio_tag" src="./audio/pristine-609.mp3" />
        </div>
      );   
}

<audio ref="audio_tag" src="./audio/deduction-588.mp3" type='audio/mpeg' controls autoPlay/>