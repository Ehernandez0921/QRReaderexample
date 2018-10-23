import React, { Component } from 'react';
import Quagga from 'quagga';

export default class BarcodeScanner extends Component {
    constructor(props) {
        super(props);
        this._onDetected = this._onDetected.bind(this);
    }
    render() {
        return (
            <div id="interactive" className="viewport"/>
        );
    }

    componentDidMount() {
        Quagga.init({
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: 640,
                    height: 480,
                    facing: "environment" // or user
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 0,
            decoder: {
                readers : [ "upc_reader"]
            },
            locate: true
        }, function(err) {
            if (err) {
                return console.log(err);
            }
            Quagga.start();
        });
        Quagga.onDetected(this._onDetected);
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
    }

    _onDetected(result) {
        console.log(this.props);
        this.props.onDetected(result);
    }
};