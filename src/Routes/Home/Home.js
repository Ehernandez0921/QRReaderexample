import React, { Component } from 'react';
import { Button } from 'antd';
import QrReader from "react-qr-reader";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            result: "No result",
            scanning: false
        };
        this.handleScan = this.handleScan.bind(this);
    }
    toggleScanning = (scan) => {
        this.setState({
            scanning: scan
        });
    }
    startScanning = () => this.toggleScanning(true);
    stopScanning = () => this.toggleScanning(false);

    handleScan(data) {
        console.log(data, 'Home.js Line-13')
        if (data) {
            this.setState({
                result: data
                
            });
            console.log(data);
            Object.assign(document.createElement('a'), {target: '_blank', href: data }).click();
            // window.open(data, '_blank');
        }
    }
    handleError(err) {
        console.error(err);
    }
    render() {
        return (
            <div>
                {!this.state.scanning &&
                    <Button onClick={this.startScanning}>Start Scanning</Button>
                }
                {this.state.scanning &&
                    <div>
                    <Button onClick={this.stopScanning}>Stop Scanning</Button>
                    <QrReader
                        delay={this.state.delay}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ width: "100%" }}
                    />
                    </div>
                }
                <p>{this.state.result}</p>
            </div>
        );
    }
}
export default Home;