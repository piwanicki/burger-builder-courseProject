import React, {Component} from 'react';
import classes from './OrderSummary.module.css';
import AuxiliaryWithClass from '../../../hoc/AuxiliaryWithClass';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Button from '../../../UI/Button/Button'

class OrderSummary extends Component {

    // This could be again function component, becouse i don't need anymore class lifecycle method. Modal component controls updating OrderSumamry
    componentDidUpdate() {
      console.log(`OrderSummary DidUpdate()`)
    }

  render () {

    const ingredientsList = Object.keys(this.props.ingredients).map(ingKey => {
      return <li key={ingKey}>{ingKey} : {this.props.ingredients[ingKey]} </li>
    })

    return (
      <AuxiliaryWithClass className={classes.OrderSummary} >
        <Backdrop hideOrder={this.props.hideOrder}/>
        <div className={classes.Text}>
        <h3>Order Summary : </h3>
              <p>You added :</p>
              <ul>
                {ingredientsList}
              </ul>
        <h4>Your total price : <strong>{this.props.totalPrice.toFixed(2)}</strong> PLN</h4>
        </div>
        <Button btnType='Danger' click={this.props.cancelPurchase}>CANCEL</Button>
        <Button btnType='Success' click={this.props.continuePurchase}>CONTINUE</Button>
      </AuxiliaryWithClass>
    )
  }
}


export default OrderSummary;
