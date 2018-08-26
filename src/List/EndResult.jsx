import React from 'react';
import { PropTypes } from 'prop-types';

console.log(this)

const EndResult = ({ index, color, shape }) => (
  <div className="resultsDiv">
    <div>{index}</div>
    <div
      style={{ backgroundColor: color }}
      className="resultColor"
    />
    <div className={`resultShape result--${shape}`} />
  </div>
);

EndResult.propTypes = {
  key: PropTypes.number,
  color: PropTypes.string.isRequired,
  shape: PropTypes.string.isRequired,
};

export default EndResult;
