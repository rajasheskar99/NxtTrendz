import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const productItem = cartList.find(eachItem => eachItem.id === product.id)
    if (productItem) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === product.id) {
            return {...each, quantity: each.quantity + product.quantity}
          }
          return each
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = cartId => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.id !== cartId)
    this.setState({cartList: filteredList})
  }

  getIncrease = itemId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachEle => {
        if (eachEle.id === itemId) {
          return {...eachEle, quantity: eachEle.quantity + 1}
        }
        return eachEle
      }),
    }))
  }

  getDecrease = cardId => {
    const {cartList} = this.state
    const productCard = cartList.find(eachCard => eachCard.id === cardId)
    if (productCard.quantity > 1) {
      this.setState(prevSate => ({
        cartList: prevSate.cartList.map(eachCardEle => {
          if (eachCardEle.id === cardId) {
            return {...eachCardEle, quantity: eachCardEle.quantity - 1}
          }
          return eachCardEle
        }),
      }))
    } else {
      this.removeCartItem(cardId)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.getIncrease,
          decrementCartItemQuantity: this.getDecrease,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
