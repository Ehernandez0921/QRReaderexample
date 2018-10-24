import React,{Component} from 'react'
import { fetchBarcodeData } from '../../Utils/utils';
export default class DisplayProductSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: [],

        }
    }
    componentDidMount () {
        this.searchProduct(this.props.match.params.barcode);
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.barcode && prevProps.match.params.barcode !== this.props.match.params.barcode) {
            this.searchProduct(this.props.match.params.barcode);
        }
    }
    searchProduct = async (barcode) => {
        const data = await fetchBarcodeData(barcode);
        this.setState({
            searchData: data
        })
        console.log(data);
    }
    render() {
        return (
            <div id="interactive" className="viewport">
            {this.state.searchData && this.state.searchData.length}
            </div>
        );
    }
}