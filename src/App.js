import React, { Component } from 'react';
import Container from "./pages/body/container";
import './stylesheets/App.css';
import Error from "./pages/error"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
          <BrowserRouter>
              <div>
                  <Switch>
                      <Route path="/" component={ Container } exact/>
                      <Route path="/callback" component={ Container } exact/>
                      <Route component={ Error } />
                  </Switch>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
