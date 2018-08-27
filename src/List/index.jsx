import './Board.css';
import React, { Component } from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


import EndResult from './EndResult';
import Source from './Source';
import Target from './Target';
import Item from './Item';

const update = require('immutability-helper');

class List extends Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.state = {
      topList:
       [
        {
          id: 54,
          text: "do groceries",
          contains: [],
        },
        {
          id: 34,
          text: "rotate tires",
          contains: [],
        },
        {
          id: 24,
          text: "go on date",
          contains: [],
        },
        {
          id: 67,
          text: "homework",
          contains: [
            {
              id: 31,
              text: "math",
              contains: [],
            },
            {
              text: "science",
              id: 90,
              contains: [
                {
                  id: 321,
                  text: "physics",
                  contains: [],
                },
                {
                  id: 322,
                  text: "astronomy",
                  contains: [],
                },
              ]
            },
          ]
          },
        ],
      results: [],
      todos: [],
      list: [
        "grocery list", "change oil", "task 3", "task4",
      ],
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

    combineItems = (dragIndex, hoverIndex) => {
    console.log(dragIndex)
    console.log(hoverIndex)
    const { topList } = this.state
    const copyTopList = this.state.topList.slice();
    console.log(copyTopList);
    let itemA = copyTopList.find(items => {
       return items.id === dragIndex
    })
    console.log(copyTopList);
    console.log(itemA);

    let indexA = copyTopList.indexOf(itemA);
    console.log(indexA);

    copyTopList.splice(indexA, 1);

    console.log(copyTopList);


    let itemB = copyTopList.find(items => {
      return items.id === hoverIndex
    });

    console.log(itemB);

    let indexB = copyTopList.indexOf(itemB);
    console.log(indexB);

    console.log(copyTopList);

    copyTopList.splice(indexB, 1);

    console.log(copyTopList);

    const newCombo = {
      id: 243224,
      text: "combo",
      contains: [],
    };

    newCombo.contains.push(itemA, itemB);

    console.log(newCombo)

    copyTopList.push(newCombo);

    console.log(copyTopList)


    this.setState({
      topList: copyTopList,
    })

  }//break this down

  render() {
    console.log(this.state)
    const { results } = this.state;
    return (
      <div id="board">
        <div id="start">
          {this.state.list.map(item => {
            return (
              <Source text={item} onDrop={this.handleDrop} />
            )
          })}
        </div>

        <div id="middle" style={{border: "1px solid red"}}>
          <Target catagory="todo" shape="circle" todos={this.state.todos}/>
          {/* <Target catagory="completed" shape="square" /> */}
        </div>
        <div>
          Map of topList
          {this.state.topList.map((item, index) => {
            return (
              <Item
                key={index}
                index={index}
                item={item}
                id={item.id}
                text={item.text}
                combineItems={this.combineItems} />
            )
          })}
        </div>
      </div>
    );
  }
}
export default DragDropContext(HTML5Backend)(List);
