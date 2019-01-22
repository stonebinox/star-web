import React, { Component } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import "antd/dist/antd.css";
import './responsiveVoice.js';
import './Star.css';

export class Star extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 2,
            transcript: "",
            speed: 5,
            listening: true,
            history: [],
            normalColour: "#00ccff",
            speakingColour: "#ffa500",
            excitedColour: "#fff237",
            sleepColour: "#efefef",
            sadColour: "#666"
        };

        let that = this;
        this.props.ear.onresult = function (e) {
            that.updateTranscript(e.results);
        }

        setTimeout(() => {
            that.stopListening();
        }, 500);

        this.startListening = this.startListening.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let that = this;

        nextProps.ear.onresult = function (e) {
            that.updateTranscript(e.results);
        };
    }

    rememberSpeech() {
        let speech = this.state.transcript;
        let history = this.state.history;

        if (speech !== history[history.length - 1]) {
            history.push(speech);
            this.setState({
                history: history
            });
        }
    }

    updateTranscript(results) {
        let pos = null;
        for (let i = results.length - 1; i >= 0; i--) {
            var result = results[i];
            if (result.isFinal) {
                pos = i;
                break;
            }
        }

        if (pos !== null) {
            let finalResult = results[pos];
        
            this.setState({
                transcript: finalResult[finalResult.length-1].transcript.trim()
            });

            this.understandSpeech();
        }
    }

    startListening() {
        this.setState({
            listening: true,
            transcript: ''
        });

        this.starNormal();
    }

    stopListening() {
        this.setState({
            listening: false
        });

        this.starSleep();
    }

    understandSpeech() {
        var speech = this.state.transcript;
        if (!this.state.listening) {
            if (speech.indexOf("start listening") !== -1) {
                this.startListening();
            }
        }
        else {
            if (speech.indexOf("stop listening") !== -1) {
                this.starSpeak("Sure", "stop");
                this.stopListening();
            }
            else {
                if (speech.indexOf("are you happy") !== -1) {
                    this.starExcited();
                }
                else if (speech.indexOf("are you sad") !== -1) {
                    this.starSad();
                }
                else {
                    this.starNormal();
                    this.starSpeak(speech);
                    //ajax calls
                }
            }
        }
    }

    createCircles() {
        let circles = [];
        for (let i = 0; i < this.state.age; i++) {
            circles.push(<div key={i} className="circle"></div>);
        }

        return circles;
    }

    starSleep() {
        document.getElementById("star-main").style.webkitAnimation = "rotate 100s infinite linear";
        document.getElementById("star-main").style.animation = "rotate 100s infinite linear";
        this.colourCircle(this.state.sleepColour);
    }

    starExcited() {
        document.getElementById("star-main").style.webkitAnimation = "rotate 1s infinite linear";
        document.getElementById("star-main").style.animation = "rotate 1s infinite linear";
        this.colourCircle(this.state.excitedColour);
    }

    starSad() {
        document.getElementById("star-main").style.webkitAnimation = "rotate 20s infinite linear";
        document.getElementById("star-main").style.animation = "rotate 20s infinite linear";
        this.colourCircle(this.state.sadColour);
    }

    starNormal() {
        document.getElementById("star-main").style.webkitAnimation = "rotate 5s infinite linear";
        document.getElementById("star-main").style.animation = "rotate 5s infinite linear";
        this.colourCircle(this.state.normalColour);
    }

    starSpeaking() {
        this.colourCircle(this.state.speakingColour);
    }

    colourCircle(colour) {
        let circles = document.getElementsByClassName("circle");
        for (let i = 0; i < circles.length; i++) {
            let circle = circles[i];
            circle.style.boxShadow = "0 0 60px " + colour + ", inset 0 0 60px " + colour;
        }
    }

    starSpeak(speech, callback) {
        if (speech !== "") {
            if (speech !== this.state.history[this.state.history.length - 1]) {
                this.starSpeaking();
                this.setState({
                    listening: false
                });
                window.responsiveVoice.speak(speech);

                this.rememberSpeech();

                let that = this;
                
                if (typeof callback === 'undefined') {
                    setTimeout(() => {
                        that.setState({
                            listening: true
                        });
                        that.starNormal();
                    }, 2000);
                }
                else {
                    return callback;
                }
            }
        }
    }

    render() {
        let speech = this.state.transcript;
        let startButton = <div className="startbutton"><Button type="primary" style={{display: "none"}} onClick={() => this.startListening}>Start listening</Button></div>;

        if (!this.state.listening) {
            speech = '';    
            startButton = <div className="startbutton"><Button type="primary" onClick={this.startListening}>Start listening</Button></div>;
        }

        return (
            <div className="star">
                <div className="view">
                    <div className="plane main" id="star-main">
                        {
                            this.createCircles()
                        }
                    </div>
                </div>
                <div className="ear">{speech}</div>
                {startButton}
            </div>
        );
    }
}