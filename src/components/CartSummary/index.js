import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const countCart = cartList.length
      const result = cartList.map(Item => {
        const {price, quantity} = Item
        const sum = price * quantity
        return sum
      })
      const total = result.reduce((sum, ele) => sum + ele)

      return (
        <div className="carty-summary">
          <h1 className="summary-head">
            Order Total: <span className="total">Rs{total}/-</span>{' '}
          </h1>
          <p className="summary-desc">{countCart} items in cart</p>
          <button type="button" className="cart-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
