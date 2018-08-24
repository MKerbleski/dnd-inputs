import './Board.css';
import React, { Component } from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import EndResult from './EndResult';
import Source from './Source';
import Target from './Target';

class Board extends Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.state = {
      results: [],
    };
  }

  handleDrop(color, shape) {
    console.log("onDrop via handleDrop", color, shape)
    let drops2 = this.state.results.slice();
    let newResult = {color, shape}
    drops2.push({newResult})
    this.setState({
      results: drops2,
    });
  }

  render() {
    console.log(this.state)
    const { results } = this.state;
    return (
      <div id="board">
        <div id="start">
          <Source color="red" id="1" onDrop={this.handleDrop} />
          <Source color="green" id="2" onDrop={this.handleDrop} />
          <Source color="blue" id="3" onDrop={this.handleDrop} />
          <Source color="yellow" id="yellow" onDrop={this.handleDrop} />
        </div>
        <div id="middle" style={{border: "1px solid red"}}>
          <Target shape="circle" />
          <Target shape="square" />
        </div>
        {console.log(results)}
        <div id="results">
          {results.map((result, index) => {
            return (
              <EndResult
                color={result.newResult.color}
                key={index}
                index={index}
                shape={result.newResult.shape}
              />
            )
          })}
        </div>
      </div>
    );
  }
}
export default DragDropContext(HTML5Backend)(Board);
