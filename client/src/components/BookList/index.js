import React, { useEffect } from "react";
import BookItem from "../BookItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_BOOKS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_BOOKS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function BookList() {
  const [state, dispatch] = useStoreContext();

  const { currentFilter } = state;

  const { loading, data } = useQuery(QUERY_BOOKS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_BOOKS,
        books: data.books,
      });
      data.books.forEach((book) => {
        idbPromise("books", "put", book);
      });
    } else if (!loading) {
      idbPromise("books", "get").then((books) => {
        dispatch({
          type: UPDATE_BOOKS,
          books: books,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterBooks() {
    if (!currentFilter) {
      return state.books;
    }

    return state.books.filter((book) => book.filter_id === currentFilter);
  }

  return (
    <div className="px-3 col-8 ">
      {state.books.length ? (
        <div className="book-list d-flex flex-row justify-content-around align-items-start flex-wrap p-5">
          {filterBooks().map((book) => (
            <BookItem
              key={book._id}
              _id={book._id}
              author={book.author}
              year={book.year}
              image={book.image}
              name={book.name}
              price={book.price}
              description={book.description}
              quantity={book.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>Looks like we are out of stock. Try again later !</h3>
      )}
      {loading ? <p>working on it !</p> : null}
    </div>
  );
}

export default BookList;