import React, { Component } from 'react';
import { Button, Row, Col, Switch } from 'antd';
import QrReader from "react-qr-reader";
class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: "No result",
            scanning: false,
            scanned: false
        };
        this.handleScan = this.handleScan.bind(this);
    }
    toggleScanning = (scan) => {
        this.setState({
            scanning: scan
        });
    }
    startScanning = () => this.toggleScanning(true);
    stopScanning = () => {
        this.toggleScanning(false);
        this.setState(() => ({ scanned: false }))
    }
    handleScan = (data) => {
<<<<<<< HEAD
=======
        console.log('Scanner.js Line-25')
>>>>>>> cb05230449831592d4779ecaf5706fd74f4debbb
        this.props.onScan && data && this.props.onScan(data);
    }
    onSwithChange = (checked) => {
        console.log(checked, 'Scanner.js Line-29')
    }
    render() {
        return (<div>
            {!this.state.scanning &&
                <Button type='default' onClick={this.startScanning}>Start Scanning</Button>
            }
            {this.state.scanning &&
                <div>
                    <Row>
                        <Col span={12}>
                            <Button type='default' onClick={this.stopScanning}>Stop Scanning</Button>
                        </Col>
                        <Col span={12}>
                            QR    <Switch  onChange={this.onSwithChange} />    Bar Code
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <QrReader
                                delay={this.props.delay}
                                onError={this.handleError}
                                onScan={this.handleScan}
                                facingMode='environment'
                            />
                        </Col>
                    </Row>
                </div>
            }
        </div>)
    }
}
Scanner.defaultProps = {
    delay: 500
}
export default Scanner;
