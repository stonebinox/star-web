import React, { Component } from 'react';
import './Star.css';

export class Star extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 2,
            transcript: "",
            speed: 5
        };

        let that = this;
        this.props.ear.onresult = function (e) {
            that.updateTranscript(e.results);
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
            console.log(results, finalResult);
            this.setState({
                transcript: finalResult[finalResult.length-1].transcript.trim()
            });

            this.understandSpeech();
        }
    }

    understandSpeech() {
        var speech = this.state.transcript;

        if (speech === "go faster") {
            this.starExcited();
        }
        else if (speech === "go slower") {
            this.starSad();
        }
        else if (speech === "sleep") {
            this.starSleep();
        }
        else {
            this.starNormal();
        }
    }

    componentWillReceiveProps(nextProps) {
        let that = this;
        nextProps.ear.onresult = function (e) {
            that.updateTranscript(e.results);
        };
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
    }

    starExcited() {
        document.getElementById("star-main").style.webkitAnimation = "rotate 1s infinite linear";
        document.getElementById("star-main").style.animation = "rotate 1s infinite linear";
    }

    starSad() {
        document.getElementById("star-main").style.webkitAnimation = "rotate 20s infinite linear";
        document.getElementById("star-main").style.animation = "rotate 20s infinite linear";
    }

    starNormal() {
        document.getElementById("star-main").style.webkitAnimation = "rotate 5s infinite linear";
        document.getElementById("star-main").style.animation = "rotate 5s infinite linear";
    }

    render() {
        return (
            <div className="star">
                <div className="view">
                    <div className="plane main" id="star-main">
                        {
                            this.createCircles()
                        }
                    </div>
                </div>
                <div className="ear">{this.state.transcript}</div>
            </div>
        );
    }
}