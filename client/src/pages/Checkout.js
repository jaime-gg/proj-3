import React, { useEffect, useState } from "react";

import CartItem from "../components/CartItem";
import { useStoreContext } from "../utils/GlobalState";
import { ADD_MULTIPLE_TO_CART } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import { Link } from "react-router-dom";

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

    const [errorMessage, setErrorMessage] = useState('');
    const [formState, setFormState] = useState({ cc1: '', cc2: '', cc3: '', cc4: '', firstname: '', surname: '', month: '', year: '', csv: '' });
    const { cc1, cc2, cc3, cc4, firstname, surname, month, year, csv } = formState;

    function handleInputChange(e) {
        if (!e.target.value.length) {
            setErrorMessage(`Please enter the appropriate information.`);
        } else {
            setErrorMessage('');
        }

        if (!errorMessage) {
            setFormState({ ...formState, [e.target.name]: e.target.value });
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
                                <input onBlur={handleInputChange} defaultValue={cc1} name="cc1" type="text" id="first" className="input col-xs-2" maxLength="4" placeholder="&#9679;&#9679;&#9679;&#9679;"   />
                                <input onBlur={handleInputChange} defaultValue={cc2} name="cc2" type="text" id="second" className="input col-xs-2" maxLength="4" placeholder="&#9679;&#9679;&#9679;&#9679;"   />
                                <input onBlur={handleInputChange} defaultValue={cc3} name="cc3" type="text" id="third" className="input col-xs-2" maxLength="4" placeholder="&#9679;&#9679;&#9679;&#9679;"   />
                                <input onBlur={handleInputChange} defaultValue={cc4} name="cc4" type="text" id="fourth" className="input col-xs-2" maxLength="4" placeholder="&#9679;&#9679;&#9679;&#9679;"   />
                            </div>
                        </div>

                        <div className="form-group mb-3 row">
                            <label htmlFor="name">Name On Card</label>
                            <div className="col-sm-12">
                                <input onBlur={handleInputChange} defaultValue={firstname} type="text" id="name" className="input col-5" maxLength="20" placeholder="First Name" />
                                <input onBlur={handleInputChange} defaultValue={surname} type="text" id="name" className="input col-5" maxLength="20" placeholder="Surname" />
                            </div>
                        </div>

                        <div className="form-group mb-3 row">
                            <div className="input-item mb-3 col row">
                                <label htmlFor="expiry">Exp. Date</label>
                                <div className="col-sm-10">
                                    <input onBlur={handleInputChange} defaultValue={month} type="text" className="input col-3" maxLength="2" id="month" placeholder="02" />
                                    <input onBlur={handleInputChange} defaultValue={year} type="text" className="input col-5" maxLength="4" id="year" placeholder="2017" />
                                </div>
                            </div>
                            <div className="input-item mb-3 col row" >
                                <label htmlFor="csv" >CSV No.</label>
                                <div className="col-sm-10 ">
                                    <input onBlur={handleInputChange} defaultValue={csv} type="text " maxLength="3" className="input col-6" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                        </div>

                        <div className="justify-content-center align-items-center">
                            <Link to="/success">
                                <button className="justify-content-center align-items-center button" type="submit">PURCHASE</button>
                            </Link>

                        </div>
                    </form>
                    {errorMessage && (
                        <div>
                            <p className="error-text">{errorMessage}</p>
                        </div>
                    )}
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