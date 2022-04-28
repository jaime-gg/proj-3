import React from "react";

import BookList from "../components/BookList";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div>
      <div className="content row h-75">
        <BookList />
        <Cart />
      </div>
      <div className="about h-25">
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis velit diam, malesuada nec luctus non, lobortis id mi. Mauris eget vulputate velit. Praesent sit amet neque ac elit mollis tristique. Pellentesque vulputate, mi ut ornare rutrum, nulla leo aliquet dolor, ac maximus nisl erat eget tellus. Aliquam bibendum mauris eget suscipit fringilla.  </p>
      </div>
    </div>
  );
};

export default Home;
