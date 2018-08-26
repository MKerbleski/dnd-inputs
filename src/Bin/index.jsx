import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const BinDiv = styled.div`
  border: 1px solid red;
  background: white;
  height: 500px;
  #mydiv {
    position: absolute;
    z-index: 9;
    display: flex;
    flex-direction: row;
    .thing {
      border: 1px solid green;
      background: purple;
      height: 100px;
      width: 100px;
      margin: 5px
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      cursor: move;

    }
    #mydivheader {
      z-index: 10;
    }
  }
`;


class Bin extends Component {
  render(){
    return (
      <BinDiv>
        <h2>Bin Container</h2>
        <div id="mydiv" >
          <div draggable="true" className="thing">Thing 1</div>
          <div className="thing">Thing 2</div>
          <div className="thing">Thing 3</div>
          <div className="thing">Thing 4</div>
          <div draggable id="mydivheader" className="thing">Thing 5 - with id</div>
        </div>
      </BinDiv>
    )
  }
}


export default DragDropContext(HTML5Backend)(Bin);
