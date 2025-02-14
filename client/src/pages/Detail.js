import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Cart from "../components/Cart";
import { useStoreContext } from "../utils/GlobalState";
import {
  ADD_TO_CART,
  UPDATE_BOOKS,
  UPDATE_CART_QUANTITY,
} from "../utils/actions";
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
        displayBooks: data.books,
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
    const stock = currentBook.quantity;
    if (itemInCart && itemInCart.purchaseQuantity < stock) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else if (!itemInCart) {
      dispatch({
        type: ADD_TO_CART,
        book: { ...currentBook, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...currentBook, purchaseQuantity: 1 });
    }
  };

  return (
    <>
      {currentBook && cart ? (
        <div className="px-3 col-8 position-relative ">
          <Link className="back" to="/">
            ← Back to Books
          </Link>
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

              <p className="description ">{currentBook.description}</p>

              <button className="button" onClick={addToCart}>
                Add to Cart
              </button>
              <div></div>
              {currentBook.quantity > 0 ? (
                <p className=" quantity">{currentBook.quantity} left !</p>
              ) : (
                <p className="quantity">sold out !</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {loading ? <p>One second !</p> : null}
      <div className="singleCart">
        <Cart />
      </div>
      <div className="about row h-25">
        <p className="py-4 px-4">
          Textos Antiguos has been in the vintage book business since before it
          was cool, and we are proud to say that we’ve got the books to prove
          it! If you’re looking for an old book about Relativity and the Fourth
          Dimension, or if you need some help tracking down that rare first
          edition cover art, then you’ve come to the right place. Browse our
          online catalog to find some of the best deals on books that hold rich
          cultural and design significance !
        </p>
      </div>
    </>
  );
}

export default Detail;
