import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
import { Link } from "react-router-dom";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const books = cart.map((item) => item._id);

      if (books.length) {
        const { data } = await addOrder({ variables: { books } });
        const bookData = data.addOrder.books;

        bookData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
      }

      // setTimeout(() => {
      //   window.location.assign('/');
      // }, 5000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <>
      <div className="h-100 text-center position-relative">
        <Link className="back" to="/">
          ← Back to Books
        </Link>

        <div
          className=" succ d-flex
      flex-column justify-content-center "
        >
          <Link to="/orderHistory">
            <img
              className="svg p-3"
              src="./images/packages.svg"
              alt="package icon"
            />
          </Link>
          <h2 className="text-center ">Thank you for your order !</h2>

          <p>
            Your order details will be available under Order History.<br></br>If
            you enjoyed your experience shopping with us, recommend us to a
            friend !
          </p>
        </div>
      </div>

      <div className="about row h-25 ">
        <p className="py-4 px-4 ">
          Textos Antiguos has been in the vintage book business since before it
          was cool, and we are proud to say that we’ve got the books to prove
          it! If you’re looking for an old book about Relativity and the Fourth
          Dimension, or if you need some help tracking down that rare first
          edition cover art, then you’ve come to the right place. Browse our
          online catalog to find some of the best deals on books that hold rich
          cultural and design significance !{" "}
        </p>
      </div>
    </>
  );
}

export default Success;
