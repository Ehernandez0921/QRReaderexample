import React, { Component } from 'react';
import { connect } from 'react-redux';
import DowDetails from "../../Components/DowDetails/DowDetails";
import detailsProps, {
  mapTableStateToProps,
  mapTableDispatchToProps
} from '../settingFiles/detailsSettings';

class ConnectedForm extends Component {
  render() {
    return <DowDetails {...detailsProps} {...this.props.formActions} validateOnInit={true}></DowDetails>
  }
}

export default connect(mapTableStateToProps, mapTableDispatchToProps)(ConnectedForm);