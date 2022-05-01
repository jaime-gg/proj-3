import React from "react";
import { Link } from "react-router-dom";
//import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function BookItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, description, price, name, quantity, filter, author, year,_id } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });

      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        book: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <article className="col-md-6 col-lg-3 text-center bookItem">
      <Link to={`/books/${_id}`}>
        <div className="bookBorder">
          <img alt={name} src={`../../images/${image}`} /> 
          <div className="info">
          <h2 className="price">${price}</h2>
        </div>
        </div>
       
      </Link>
      <button onClick={addToCart}>+ cart</button>
    </article>
  );
}

export default BookItem;
