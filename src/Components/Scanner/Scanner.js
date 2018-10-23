import React, { Component } from 'react';
import { Button, Row, Col, Switch } from 'antd';
import QrReader from "react-qr-reader";
import BarcodeScanner from './BarcodeScanner';
class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: "No result",
            scanning: false,
            scanned: false,
            scannerType: 'qr',
            barcodeScans: []
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
        console.log(data);
        this.props.onScan && data && this.props.onScan(data);
    }
    onSwithChange = (checked) => {
        this.setState(() => ({ scannerType: checked ? 'barcode' : 'qr' }));
        console.log(checked, 'Scanner.js Line-29')
    }
    onBarcodeScan = (result) => {
        const matched = this.state.barcodeScans.filter(item => item === result.codeResult.code);
        if (matched.length > 2) {
            this.handleScan(result.codeResult.code);
        } else {
            this.setState({
                barcodeScans: [...this.state.barcodeScans, result.codeResult.code]
            });
        }
    }
    render() {
        const { scannerType, scanning } = this.state;
        return (<div>
            {!scanning &&
                <Button type='default' onClick={this.startScanning}>Start Scanning</Button>
            }
            {scanning &&
                <Row>
                    <Col span={12}>
                        <Button type='default' onClick={this.stopScanning}>Stop Scanning</Button>
                    </Col>
                    <Col span={12}>
                        QR    <Switch onChange={this.onSwithChange} />    Bar Code
                        </Col>
                </Row>}
            {scanning && scannerType == 'qr' &&
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
            }
            {scanning && scannerType == 'barcode' &&
                <Row>
                    <Col span={24}>
                        <BarcodeScanner
                            onDetected={this.onBarcodeScan}
                            facingMode='environment'
                        />
                    </Col>
                </Row>
            }
        </div>)
    }
}
Scanner.defaultProps = {
    delay: 500
}
export default Scanner;
