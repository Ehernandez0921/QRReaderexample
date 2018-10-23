import React, { Component } from 'react';
import Scanner from '../../Components/Scanner/Scanner';
import { Button } from 'antd';
import QrReader from "react-qr-reader";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: "No result"
        };
        this.handleScan = this.handleScan.bind(this);
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.result !== prevState.result) {
            window.open(this.state.result,'_blank')
        }
    }
    handleScan(result) {
        console.log(result, 'Home.js Line-26')
        // if (data && !this.state.scanned  ) {
        //     console.log(data, 'Home.js Line-28')
        //     this.setState({
        //         result: data,
        //         scanned: true
        //     });
        //     // var redirectWindow = window.open(data, '_blank');
        //     // redirectWindow.location;
        //     //Object.assign(document.createElement('a'), { target: '_blank', href: data }).click();
        //     window.open(data, '_blank');
        // }
    }
    handleError(err) {
        console.error(err);
    }
    render() {
        return (
            <div>
                <Scanner onScan={this.handleScan} />
                <p>{this.state.result}</p>
            </div>
        );
    }
}
export default Home;