import React from 'react';

const AuxiliaryWithClass = (props) => {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  )
}

export default AuxiliaryWithClass;