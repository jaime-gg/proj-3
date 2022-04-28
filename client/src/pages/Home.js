import React from "react";

import BookList from "../components/BookList";
import CategoryMenu from "../components/FilterMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="">
      <BookList />
      <Cart />
      <div className="about">
        <P> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis velit diam, malesuada nec luctus non, lobortis id mi. Mauris eget vulputate velit. Praesent sit amet neque ac elit mollis tristique. Pellentesque vulputate, mi ut ornare rutrum, nulla leo aliquet dolor, ac maximus nisl erat eget tellus. Aliquam bibendum mauris eget suscipit fringilla.  </P>
      </div>
    </div>
  );
};

export default Home;
