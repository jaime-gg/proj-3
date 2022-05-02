import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Cart from "../components/Cart";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, ADD_TO_CART, UPDATE_BOOKS , UPDATE_CART_QUANTITY} from "../utils/actions";
import { QUERY_BOOKS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentBook, setCurrentBook] = useState({});

  const { loading, data } = useQuery(QUERY_BOOKS);

  const { books, cart } = state;

  useEffect(() => {
    // already in global store
    if (books.length) {
      setCurrentBook(books.find((book) => book._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_BOOKS,
        books: data.books,
      });

      data.books.forEach((book) => {
        idbPromise("books", "put", book);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("books", "get").then((indexedBooks) => {
        dispatch({
          type: UPDATE_BOOKS,
          books: indexedBooks,
        });
      });
    }
  }, [books, data, loading, dispatch, id]);

  const addToCart = () => {
     const itemInCart = cart.find((cartItem) => cartItem._id === id);
      if (itemInCart) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
        idbPromise('cart', 'put', {
          ...itemInCart,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
      } else {
    dispatch({
      type: ADD_TO_CART,
      book: { ...currentBook, purchaseQuantity: 1 },
    });
    idbPromise("cart", "put", { ...currentBook, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentBook._id,
    });

    idbPromise("cart", "delete", { ...currentBook });
  };

  return (
    <>
      {currentBook && cart ? (
        <div className="px-3 col-8  ">
          <Link to="/">← Back to Books</Link>
          <div
            className="d-flex justify-content-center align-items-center singleBook
          "
          >
            <div className="p-3 singleBorder">
              <img
                className="coverImg"
                src={`/images/${currentBook.image}`}
                alt={currentBook.name}
              />
            </div>
            <div className="p-3 text-center">
              <h2 className="">{currentBook.name}</h2>
              <h3>${currentBook.price}</h3>
              <div className="single">
              <p>{currentBook.description}</p>
</div>
              <button className="button" onClick={addToCart}>Add to Cart</button>
             
            </div>
          </div>
        </div>
      ) : null}
      {loading ? <p>One second !</p> : null}
      <div className="singleCart">
      <Cart /></div>
      <div className="about row h-25">
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis velit diam, malesuada nec luctus non, lobortis id mi. Mauris eget vulputate velit. Praesent sit amet neque ac elit mollis tristique. Pellentesque vulputate, mi ut ornare rutrum, nulla leo aliquet dolor, ac maximus nisl erat eget tellus. Aliquam bibendum mauris eget suscipit fringilla.  </p>
      </div>
    </>
  );
}

export default Detail;
