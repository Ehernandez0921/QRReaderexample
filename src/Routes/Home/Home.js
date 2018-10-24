import React, { Component } from 'react';
import Scanner from '../../Components/Scanner/Scanner';

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
            const regexp = RegExp("^(http|https|ftp|www)://.*$");
            if (regexp.test(this.state.result)) {
                window.open(this.state.result, '_blank')
            } else {
                console.log(this.state.result);
                this.props.goTo(`/maggieScreen/${this.state.result}`)
            }
        }
    }

    handleScan(result) {
        this.setState(() => ({ result }));
    }

    handleError(err) {
        console.error(err);
    }
    render() {
        return (
            <Scanner onScan={this.handleScan} />
        );
    }
}
export default Home;