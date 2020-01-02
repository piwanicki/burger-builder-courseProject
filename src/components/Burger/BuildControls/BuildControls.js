import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad' },
  {label: 'Meat', type: 'meat' },
  {label: 'Bacon', type: 'bacon' },
  {label: 'Cheese', type: 'cheese' }
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Total Price : <strong>{props.totalPirce.toFixed(2)} PLN</strong></p>
      {controls.map(control => (
        <BuildControl 
          label={control.label} 
          key={control.label}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.disabled[control.type]}
          />))}

      <button disabled={!props.purchasable} 
        className={classes.OrderButton} 
        onClick={props.ordering}>ORDER NOW</button>
    </div>
  );
}

export default BuildControls;