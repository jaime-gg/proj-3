import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import "./style.css";

import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";

import { QUERY_CHECKOUT, QUERY_USER } from "../../utils/queries";

import { useQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  const { userData } = useQuery(QUERY_USER);
  let user;

  if (userData) {
    user = userData.user;
  }

  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, books: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        if (data.checkout) {
          res.redirectToCheckout({ sessionId: data.checkout.session });
        }
      });
    }
  }, [data]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const bookIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        bookIds.push(item._id);
        user.orders.push({ books: { _id: item._id }, purchaseDate: Date.now });
      }
    });

    getCheckout({
      variables: { books: bookIds },
    });
  }

  return (
    <div className="cart p-3 col set-width">
      {/* // only for mobile */}
      {/* <div className="close" onClick={toggleCart}>
        [close]
      </div> */}

      <h2>Cart</h2>
      {state.cart.length ? (
        <div className="">
          {/* ///////////////////////////////////////////////////////////////////// */}
          <div className="books ">
            {state.cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
          {/* //////////////////////////////////////////////////////////////// */}
          <div className="cartInfo p-3 ">
            <strong>Total: ${calculateTotal()} USD</strong>

            {Auth.loggedIn() ? (
              <button className="button" onClick={submitCheckout}>
                Checkout
              </button>
            ) : (
              <p>(log in to check out)</p>
            )}
          </div>
        </div>
      ) : (
        <p>Haven't found anything you like yet ?</p>
      )}
    </div>
  );
};

export default Cart;
