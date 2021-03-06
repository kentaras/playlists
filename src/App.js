import React, { Component } from 'react';
import './stylesheets/App.css';
import Container from "./pages/homepage/container";
import Error from "./pages/error"
import GetKey from "./services/getkey"
import Create from "./pages/create/create";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Homepage from "./pages/homepage/homepage";
import PlaylistInfo from "./pages/viewplaylists/viewplaylist/playlistinfo";
import Listen from "./pages/listen/listen";

class App extends Component {
  render() {
    return (
      <div className="App">
          <BrowserRouter>
              <div>
                  <Switch>
                      <Route path="/" component={ Container } exact/>
                      <Route path="/playlists" component={ Homepage } exact/>
                      <Route path="/playlists/:page" component={ Homepage } exact/>
                      <Route path="/playlist/:id" component={ PlaylistInfo } exact/>
                      <Route path="/callback" component={ GetKey } exact/>
                      <Route path="/createplaylist" component={ Create } exact/>
                      <Route path="/listen" component={ Listen } exact/>
                      <Route path="/listen/:playlistId" component={ Listen } exact/>
                      <Route component={ Error } />
                  </Switch>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
