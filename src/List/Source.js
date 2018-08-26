import React from 'react';
import { DragSource } from 'react-dnd';
import { PropTypes } from 'prop-types';
import { ITEM } from './itemTypes';


//also needs to be a stateless functional component
const Source = (props) => (
// const Source = ({ color, connectDragSource, isDragging }) => (
  props.connectDragSource(
    <div
      text={props.text}
     className="startObject"
     style={{
       backgroundColor: props.color,
       opacity: props.isDragging ? 0.25 : 1,
      }}
    ><h4>{props.text}</h4>
    <p>{props.todos ? (props.todos.map(todo => {
      return (
        <div>{todo.text}</div>
      )
    })) : null}</p>
    </div>
  )
);

Source.propTypes = {
  color: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
}

const sourceObj = {
  beginDrag(props) { // this mounts any props onto the object
    console.log("beginDrag", props)
    const { color, text } = props; //this return just 'green'
    console.log(color);
    console.log(props.color); //same thing but props cant be in a return statement?
    return ({
      color, text
    });
  },
  //endDrag is called when dropped on a target
  endDrag(props, monitor) {// this takes props mounted on beginDrag
    console.log("endDrag", "props", props, "monitor", monitor.getDropResult())
    if (!monitor.didDrop()) {
      return;
    }
    // const { onDrop } = props;
    const  {color, text}  = monitor.getItem(); //returns just 'blue'
    // console.log(props.color) // also returns just 'blue'

    const { shape, catagory } = monitor.getDropResult();//gets props from the target// shape
    props.onDrop( color, shape, text, catagory);//onDrop supplied by parent which attaches the color and shape to the props
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default DragSource(ITEM, sourceObj, collect)(Source);//HOC that ties the Source together
// export default DragSource(type, spec, collect)(MyComponent);
