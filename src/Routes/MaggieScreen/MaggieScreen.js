import React, { Component } from 'react'
import { fetchBarcodeData } from '../../Utils/utils';
import { List, Icon, Card, Row, Col, Button } from 'antd';
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
    }
    render() {
        return (
            <List id="interactive" className="viewport"
                itemLayout="vertical"
                size="large"
                header={<Row>
                    <Col span={18}>
                        <h3>Item Information</h3>
                    </Col>
                    <Col span={6}>
                        <Button onClick={()=>this.props.goTo('/')}>Scan Again</Button>
                    </Col>
                </Row>}
                dataSource={this.state.searchData.items}
                renderItem={item => {
                    const convertedLongtext = item.longDescription.length > 10 ? item.longDescription : item.shortDescription
                    return (<Card>

                        <List.Item
                            key={item.title}
                            actions={[<IconText type="star-o" text={item.customerRating ? (Math.round(parseInt(item.customerRating, 10) * 2) / 2).toFixed(1) : 'No Reviews'} />]}
                            // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                            extra={<img width={272} alt="logo" src={`${item.mediumImage}`} />}
                        >
                            <List.Item.Meta
                                title={<a>{item.name}</a>}

                                description={<div dangerouslySetInnerHTML={{ __html: convertedLongtext }} />}
                            />
                        </List.Item>
                    </Card>
                    )
                }}
            />
        );
    }
}