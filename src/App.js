import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import MiradorApp from 'mirador/dist/es/src/containers/App';
import settings from 'mirador/dist/es/src/config/settings';
import * as actions from 'mirador/dist/es/src/state/actions';
import createStore from 'mirador/dist/es/src/state/createStore';
import { CanvasThumbnail } from 'mirador/dist/es/src/components/CanvasThumbnail'
import SidePanel from './SidePanel'

class App extends Component {
  constructor(props){
    super(props)
    this.handleToggleMinimize = this.handleToggleMinimize.bind(this)
    this.state = {
      sideBarMinimized: false,

    }
  }
  componentWillMount(){
      const store = createStore();
      settings.id = "yolo";
      store.dispatch(actions.setConfig(settings));
      store.dispatch(actions.setWorkspaceAddVisibility(true))
      this.setState({store: store})
  }
  handleToggleMinimize(){
    this.setState({sideBarMinimized: !this.state.sideBarMinimized})
  }

  render() {

    const classes = this.state.sideBarMinimized ? "miradorSideBarMinimized mirador" : "mirador"
    return (
      <div id="App">
      <SidePanel store={this.state.store} sideBarMinimized={this.state.sideBarMinimized} handleToggleMinimize={this.handleToggleMinimize}/>
        <div className={classes}>
          <Provider store={this.state.store}>
            <MiradorApp />
          </Provider>
        </div>


      </div>
    );
  }
}

export default App;
