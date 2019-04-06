import React, { Component } from 'react';
import Axios from 'axios';
import CollectionListItem from './CollectionListItem';
//import BreadCrumbListItem from './BreadCrumbListitem';
import * as actions from 'mirador/dist/es/src/state/actions';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import Close from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';


class SidePanel extends Component {
  constructor(props){
    super(props)
  }
  render() {
    const classes = this.props.sideBarMinimized ? "sideBarMinimized sidepanel" : "sidepanel"
    const displaySideBar = () => {
      if (this.props.sideBarMinimized){
        return(
          <div className={classes} onClick={this.props.handleToggleMinimize}>
          <CollectionListItem key="side-panel" label="SCTA Authors" id="https://scta.info/iiif/authors/collection" store={this.props.store} level={1}/>
          </div>
        )
      }
      else{
        return(
          <div className={classes}>
          <div className="close-button">
          <Button onClick={this.props.handleToggleMinimize} color="primary"><Close/></Button>
          </div>


            <CollectionListItem key="side-panel" label="SCTA Authors" id="https://scta.info/iiif/authors/collection" store={this.props.store} level={1}/>
          </div>
        )
      }
    }
    return (
      displaySideBar()
    );
  }
}

export default SidePanel;
