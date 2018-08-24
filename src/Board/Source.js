import React from 'react';
import { DragSource } from 'react-dnd';
import { PropTypes } from 'prop-types';
import { ITEM } from './itemTypes';


//also needs to be a stateless functional component
const Source = (props) => (
// const Source = ({ color, connectDragSource, isDragging }) => (
  props.connectDragSource(
    <div
     className="startObject"
     style={{
       backgroundColor: props.color,
       opacity: props.isDragging ? 0.25 : 1,
      }}
    />
  )
);

Source.propTypes = {
  color: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
}

const sourceObj = {
  beginDrag(props) {
    console.log("beginDrag", props)
    const { color } = props; //this return just 'green'
    console.log(color);
    console.log(props.color); //same thing but props cant be in a return statement?
    return ({
      color
    });
  },
  //endDrag is called when dropped on a target
  endDrag(props, monitor) {
    console.log("endDrag", "props", props, "monitor", monitor.getDropResult())
    if (!monitor.didDrop()) {
      return;
    }
    // const { onDrop } = props;
    const  {color}  = monitor.getItem(); //returns just 'blue'
    // console.log(props.color) // also returns just 'blue'

    const { shape } = monitor.getDropResult();//gets props from the target// shape
    props.onDrop( color, shape );//onDrop supplied by parent which attaches the color and shape to the props
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default DragSource(ITEM, sourceObj, collect)(Source);//HOC that ties the Source together
// export default DragSource(type, spec, collect)(MyComponent);
