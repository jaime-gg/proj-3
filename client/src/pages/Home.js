import React from "react";

import BookList from "../components/BookList";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="h-100">
      <div className="content row h-75 ">
        <BookList />
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
          cultural and design significance !{" "}
        </p>
      </div>
    </div>
  );
};

export default Home;
