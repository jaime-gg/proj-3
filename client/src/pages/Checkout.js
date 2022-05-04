import React, { useEffect } from "react";

import CartItem from "../components/CartItem";
import { useStoreContext } from "../utils/GlobalState";
import { ADD_MULTIPLE_TO_CART } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

const Checkout = () => {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise("cart", "get");
            dispatch({ type: ADD_MULTIPLE_TO_CART, books: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach((item) => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    const numOfFields = 4;

    const handleChange = e => {
        const { maxLength, value, name } = e.target;
        const [fieldName, fieldIndex] = name.split("-");

        // Check if they hit the max character length
        if (value.length >= maxLength) {
            // Check if it's not the last input field
            if (parseInt(fieldIndex, 10) < 4) {
                // Get the next input field
                const nextSibling = document.querySelector(
                    `input[name=cc-${parseInt(fieldIndex, 10) + 1}]`
                );

                // If found, focus the next field
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            }
        }
    }

    return (

        <div className="wrapper row">
            <div className="container col">
                <article className=" p-5 d-flex align-items-center flex-column m-auto">
                    <h1>
                        Credit Card Details
                    </h1>
                    <form className="userForm" if="cc-form" autoComplete="off">
                        <div className="cc-form form-group mb-3 row">
                            <label htmlFor="first" >Card Number</label>
                            <div className="col-sm-10">
                                <input name="cc-1" type="text" id="first" className="input col-xs-2" maxLength="4" placeholder="&#9679;&#9679;&#9679;&#9679;" onChange={handleChange} />
                                <input name="cc-2" type="text" id="second" className="input col-xs-2" maxLength="4" placeholder="&#9679;&#9679;&#9679;&#9679;" onChange={handleChange} />
                                <input name="cc-3" type="text" id="third" className="input col-xs-2" maxLength="4" placeholder="&#9679;&#9679;&#9679;&#9679;" onChange={handleChange} />
                                <input name="cc-4" type="text" id="fourth" className="input col-xs-2" maxLength="4" placeholder="&#9679;&#9679;&#9679;&#9679;" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-group mb-3 row">
                            <label htmlFor="name">Name On Card</label>
                            <div className="col-sm-12">
                                <input type="text" id="name" className="input col-5" maxLength="20" placeholder="First Name" />
                                <input type="text" id="name" className="input col-5" maxLength="20" placeholder="Surname" />
                            </div>
                        </div>

                        <div className="form-group mb-3 row">
                            <div className="input-item mb-3 col row">
                                <label htmlFor="expiry">Exp. Date</label>
                                <div className="col-sm-10">
                                    <input type="text" className="input col-3" id="expiry" placeholder="02" />
                                    <input type="text" className="input col-5" id="" placeholder="2017" />
                                </div>
                            </div>
                            <div className="input-item mb-3 col row" >
                                <label htmlFor="csv" >CSV No.</label>
                                <div className="col-sm-10 ">
                                    <input type="text " className="input col-6" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                        </div>

                        <div className="justify-content-center align-items-center">
                            <p>Total:</p>
                            <button className="justify-content-center align-items-center button" type="submit">PURCHASE</button>
                        </div>
                    </form>
                </article>
                <div className="part bg"></div>
            </div>
            <div className=" container checkout-cart p-5 col">
                <h2>Currently in Your Cart</h2>
                <div className="" >
                    <div className="checkout-books">
                        {state.cart.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </div>

                    <div className="cartInfo p-3 ">
                        <strong>Total: ${calculateTotal()} USD</strong>
                    </div>

                </div>
            </div>
        </div>
    );
};


export default Checkout;