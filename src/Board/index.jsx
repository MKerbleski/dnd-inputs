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
      todos: [],
      completed: []
    };
  }

  handleDrop(color, shape , text, catagory) {
    console.log("onDrop via handleDrop", color, shape, text, catagory)
    let drops2 = this.state.results.slice();
    let todos2 = this.state.todos.slice();
    let newResult = {color, shape};
    todos2.push({text})
    drops2.push({newResult})
    this.setState({
      results: drops2,
      todos: todos2,
    });
    console.log(this.state)
  }

  render() {
    console.log(this.state)
    const { results } = this.state;
    return (
      <div id="board">
        <div id="start">
          <Source color="red" id="1" text="text 1" onDrop={this.handleDrop} />
          <Source color="green" id="2" text="text 2" onDrop={this.handleDrop} />
          <Source color="blue" id="3" text="text 3" onDrop={this.handleDrop} />
          <Source color="yellow" id="yellow" text="text 4" onDrop={this.handleDrop} />
        </div>
        <div id="middle" style={{border: "1px solid red"}}>
          <Target catagory="todo" shape="circle" todos={this.state.todos}/>
          <Target catagory="completed" shape="square" />
        </div>
        {console.log(results)}
        <div id="results">
          {results.map((result, index) => {
            return (
              <EndResult
                color={result.newResult.color}
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
