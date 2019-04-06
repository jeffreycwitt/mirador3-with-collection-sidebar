import React, { Component } from 'react';
import Axios from 'axios';
import * as actions from 'mirador/dist/es/src/state/actions';
import ClearAll from '@material-ui/icons/ClearAll';
import SelectAll from '@material-ui/icons/SelectAll';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';


class CollectionListItem extends Component {
  constructor(props){
    super(props)
    this.handleSelectCollection = this.handleSelectCollection.bind(this)
    this.handleOnFilterChange = this.handleOnFilterChange.bind(this)
    this.handleClearAll = this.handleClearAll.bind(this)
    this.handleSelectAll = this.handleSelectAll.bind(this)
    this.state = {
      collections: [],
      label: "",
      open: false,
      filter: "",
      manifests: false
    }
  }
  handleClearAll(){
  this.state.collections.forEach((m) => {
    this.props.store.dispatch(actions.removeManifest(m["@id"]))
    });
  }
  handleSelectAll(){
     this.state.collections.forEach((m) => {
       this.props.store.dispatch(actions.fetchManifest(m["@id"]))
    });
    this.props.store.dispatch(actions.setWorkspaceAddVisibility(true))
  }
  handleOnFilterChange(e){
    console.log("change value" + e.target.value)
    this.setState({filter: e.target.value})
  }
  handleSelectCollection(){
    if (!this.state.open){
      Axios.get(this.props.id).then((res) => {
        console.log("res", res)
        if (res.data.collections){
          console.log(res.data)
          this.setState({collections: res.data.collections, label: res.data.label, open: true});
        }
        else if (res.data.manifests){
          this.setState((prevState) => {
            return(
              {
                collections: res.data.manifests,
                label: res.data.label,
                open: true,
                manifests: true

              }
            )
          });
        }
        else if (res.data["@type"] === "sc:Manifest"){
          this.props.store.dispatch(actions.fetchManifest(this.props.id))
        }
      })
      .catch(error => console.log(error));
      this.props.store.dispatch(actions.setWorkspaceAddVisibility(true))
    }
    else{
      this.setState({
        collections: [],
        label: "",
        open: false
      })
    }
  }
  render() {
    const displayCollections = () => {
      const displayArray = this.state.collections.map((c) => {
        if (this.state.filter){
          if (c.label.includes(this.state.filter)){
            return <CollectionListItem key={c["@id"]} label={c.label} id={c["@id"]} store={this.props.store} level={this.props.level + 1} filter={this.state.filter}/>
          }
        }
        else{
          return <CollectionListItem key={c["@id"]} label={c.label} id={c["@id"]} store={this.props.store} level={this.props.level + 1} filter={this.state.filter}/>
        }

      });
      return displayArray
    }
    const indent = this.props.level * 10;
    const displayManifestsButton = () =>  {
      if (this.state.manifests){
        return(
          <p style={{"margin-left": indent + "px"}}>
          <Button onClick={this.handleSelectAll} color="primary" alt="select all"><SelectAll/></Button>
          <Button onClick={this.handleClearAll} color="primary" alt="clear all"><ClearAll/></Button>
          </p>
        )
      }
    }


    return (
      <div>

        <p onClick={this.handleSelectCollection} className="collection-list-item" style={{"padding-left": indent + "px"}}>{this.props.label} </p>

        {this.state.open && <Input placeholder="filter" onChange={this.handleOnFilterChange} style={{"margin-left": indent + "px"}}/> }
        {this.state.open && displayManifestsButton()}



        {displayCollections()}
      </div>
    );
  }
}

export default CollectionListItem;
