import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Backdrop from '../../UI/Backdrop/Backdrop';
import axios from '../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 2.25,
  bacon: 3.5,
  meat: 3
}


class BurgerBuilder extends Component {

  //constructor(props) {
  //  super(props);
  //  this.state = {
  //    
  //  }
  //}

 state = {
    ingredients: null,
    totalPrice: 8,
    purchasable: false,
    OrderShow: false,
    loading: false,
    error: false,
  }

  componentDidMount () {
    axios.get('https://burgerbuilder-db.firebaseio.com/ingredients.json')
      .then(response => {
        console.log(response)
        this.setState({ingredients: response.data})
      })
      .catch(error => {
        this.setState({error : true})
      })
  }


  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount +1;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchasableState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0 ) {
      return;
    } 

    const updatedIngredients = {
      ...this.state.ingredients
    }
    const updatedCount = oldCount - 1;
    updatedIngredients[type] = updatedCount;
  
    const oldPrice = this.state.totalPrice;
    const priceDeduction = INGREDIENT_PRICES[type];
    const updatedPrice = oldPrice - priceDeduction;
    
    this.setState({
      ingredients:updatedIngredients,
      totalPrice:updatedPrice
    });
    this.updatePurchasableState(updatedIngredients);
  }

  updatePurchasableState = (ingredients) => {

    const addedIngredients = Object.keys(ingredients)
                          .map(ingKey => {
                            return ingredients[ingKey];
                          })
                          .reduce((sum, el) => {
                            return sum+el;
                          });
    this.setState({ purchasable: addedIngredients > 0 });
  }

  purchaseOrderHandler = () => {
    this.setState({OrderShow: true });
  }

  purchaseCancel = () =>{
    this.setState({OrderShow: false});
  }

  purchaseContinue = () => {
    //alert('Redirecting to payments...')
    this.setState({loading: true})
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Ja',
        addres: {
          street: 'gdzies tam',
          zipCode: '12341',
          country: 'daleko'
        },
        email: 'aaaa@t3st.com',
        deliveryMethod: 'fastest'
      }
    }
    
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, OrderShow: false })
      })
      .catch(error => {
        this.setState({loading: false, OrderShow: false })
      });
  }


  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;

    if(this.state.loading ) {
      orderSummary =  <Spinner /> 
    }

    let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p> : <Spinner />;

    if(this.state.ingredients) {
      burger = (
        <Auxiliary>
           <Burger ingredients={this.state.ingredients} />
            <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            totalPirce={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordering={this.purchaseOrderHandler}
          />
        </Auxiliary>
      )
      orderSummary = (
            <OrderSummary 
             ingredients={this.state.ingredients}
             hideOrder={this.purchaseCancel} 
             cancelPurchase={this.purchaseCancel}
             continuePurchase={this.purchaseContinue}
             totalPrice={this.state.totalPrice}
            /> 
      )
          
    }
   
 
    return (
      <Auxiliary>
      <Backdrop show={this.state.OrderShow} clicked={this.purchaseCancel}/>
        <Modal 
        show={this.state.OrderShow} 
        clicked={this.purchaseCancel}>
          { orderSummary }
        </Modal>
        { burger }
      </Auxiliary>
    )
  } 
}

export default withErrorHandler(BurgerBuilder, axios);