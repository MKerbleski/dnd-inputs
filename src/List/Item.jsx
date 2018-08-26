import React from 'react';
import { DragSource, DropTarget, } from 'react-dnd';
import { PropTypes } from 'prop-types';

import flow from 'lodash/flow'
import { findDOMNode } from 'react-dom'


const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
}

const itemSource  = {
  beginDrag(props) { // this mounts any props onto the object
    console.log("beginDrag", props)
    return ({
      props
    });
  },
  //endDrag is called when dropped on a target
//---------------------

  // endDrag(props, monitor) {// this takes props mounted on beginDrag
  //   console.log("endDrag", "props", props, "monitor", monitor.getDropResult())
  //   if (!monitor.didDrop()) {
  //     return;
  //   }
  //   // const { onDrop } = props;
  //   const  {color, text}  = monitor.getItem(); //returns just 'blue'
  //   // console.log(props.color) // also returns just 'blue'
  //
  //   const { shape, catagory } = monitor.getDropResult();//gets props from the target// shape
  //   props.onDrop( color, shape, text, catagory);//onDrop supplied by parent which attaches the color and shape to the props
  // },

//---------------
};

const itemTarget = {
  hover(props, monitor, component ) {
		if (!component) {
			return null
		}
		const dragIndex = monitor.getItem().props.index
    // console.log(monitor)
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = (findDOMNode(
			component,
		)).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = (clientOffset ).y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%
		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveCard(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().props.index = hoverIndex
	},
}



// const collect = (connect, monitor) => ({
//   connectDragSource: connect.dragSource(),
//   isDragging: monitor.isDragging(),
// });

// export default DragSource(ITEM, ItemObj, collect)(Item);//HOC that ties the Source together
// export default DragSource(type, spec, collect)(MyComponent);

//---

class Item extends React.Component {
 render() {
		const {
			text,
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props

		return (
			connectDragSource &&
			connectDropTarget &&
			connectDragSource(
				connectDropTarget(<div
          className="startObject"
          // style={{
          //  backgroundColor: props.color,
          //  opacity: props.isDragging ? 0.25 : 1,
          // }}
        ><h4>{text}</h4>
        {/* {contains.length > 0 ? (<div>yes</div>) :
          null} */}

        </div>),
			)
		)
	}
}

export default flow(
  DragSource('item', itemSource, (connect, monitor) => ({
  		connectDragSource: connect.dragSource(),
  		isDragging: monitor.isDragging(),
  	}),
  ),
  DropTarget('item', itemTarget, (connect) => ({
  	connectDropTarget: connect.dropTarget(),
  })),
)(Item)
