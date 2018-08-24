import React from 'react';
import { DropTarget } from 'react-dnd'; //The HOC that brings everything together
import { PropTypes } from 'prop-types'; //Checks the proptypes
import { ITEM } from './itemTypes'; //just a string that says 'item'


//Target needs to be a stateless functional component
const Target = (props) => (
// const Target = ({ connectDropTarget, highlighted, shape }) => (
  //these are all props  -- I dont know where the come form
    //connectDropTarget - (magic)function that sets up DOM node
    //highlighted - what happens when source is dragged
    // props on target - in this case it is the type of shape props.shape
  props.connectDropTarget(
    <div
      className={`middleObject middleObject--${props.shape}`}
      style={{ backgroundColor: props.highlighted ? 'black' : 'gray' }}
    >{props.catagory}</div>
  )
);

Target.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  highlighted: PropTypes.bool.isRequired,
  shape: PropTypes.string.isRequired,
}



const specObj = {
  //this object is for defining how different targets react to sources

  //in this example the target's shape is (attached? combined?)

  //this is a good place to call redux(flux) actions
  drop(props) {
    console.log('target props', props)//target props //square or circle
    const { shape } = props;
    return ({
      shape,
      //drop() must return undefined or an object that represents drop result
    });
  }
  //other actions can be defined here as well
  //such as
      //hover(props,monitor, component)
      //canDrop(props,monitor) --- used to specify if item is not allowed
}

const collect = (connect,  monitor) => ({
  connectDropTarget: connect.dropTarget(),
  highlighted: monitor.canDrop(),
});

export default DropTarget(ITEM, specObj, collect)(Target);//HOC that combines Target


// export default DropTarget(types('string'), spec('object'), collect("object"))(MyComponent);

//types - string, array or function that return a string or array.
//spec - object with methods on it defining what happens when the target and the source meet.
//collect - a function that recieves connect(magic) and monitor(also magic)
