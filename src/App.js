import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import List from './List';
import Bin from './Bin';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Board /> */}
        <List />
        <Bin />
      </div>
    );
  }
}

export default App;
