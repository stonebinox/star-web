import React, { Component } from 'react';
import './Star.css';

export class Star extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 2,
            transcript: ""
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
                transcript: finalResult[finalResult.length-1].transcript
            });
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

    render() {
        return (
            <div className="star">
                <div className="view">
                    <div className="plane main">
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