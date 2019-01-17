import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { Star } from './Star.js';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

class App extends Component {  
  render() {
    const { recognition, browserSupportsSpeechRecognition } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <div className="App">
        <Star ear={recognition}/>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default SpeechRecognition(App);
