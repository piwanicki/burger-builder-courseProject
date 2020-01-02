import BurgerIngredient from './BurgerIngredient/BurgerIngredient' 
import React from 'react';
import classes from './Burger.module.css';

const Burger = (props) => {
  
  let transformedIngredients = Object.keys(props.ingredients)
  
    .map(ingKey => {
      return [...Array(props.ingredients[ingKey])].map( (_,i) => {
        return <BurgerIngredient key={i + ingKey} type={ingKey} />
      })     
    })
    .reduce((arr, curEl) => {
      return arr.concat(curEl);
    },[]);

    if( transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients!</p>;
    }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
        {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
}

export default Burger;