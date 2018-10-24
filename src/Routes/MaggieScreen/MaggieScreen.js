import React, { Component } from 'react'
import { fetchBarcodeData } from '../../Utils/utils';
import { List, Avatar,Icon   } from 'antd';
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
export default class DisplayProductSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: {},

        }
    }
    componentDidMount() {
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
            <List id="interactive" className="viewport"
                itemLayout="vertical"
                size="large"
                dataSource={this.state.searchData.items}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[<IconText type="star-o" text={item.customerRating} />]}
                        // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                        extra={<img width={272} alt="logo" src={`${item.mediumImage}`} />}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.mediumImage} />}
                            title={<a>{item.name}</a>}
                            description={item.longDescription}
                        />
                    </List.Item>
                )}
            />
        );
    }
}