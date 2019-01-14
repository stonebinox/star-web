import React, { Component } from 'react';
import './Star.css';

export class Star extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 2
        };
    }

    createCircles() {
        let circles = [];
        for (let i = 0; i < this.state.age; i++) {
            circles.push(<div class="circle"></div>);
        }

        return circles;
    }

    render() {
        return (
            <div class="star">
                <div class="view">
                    <div class="plane main">
                        {
                            this.createCircles()
                        }
                    </div>
                </div>
            </div>
        );
    }
}