import React from "react";
import BookList from "../components/BookList";
import CategoryMenu from "../components/FilterMenu";
import Cart from "../components/Cart";

const Home = () => {
    return (
      <div className="">
        <FilterMenu />
        <BookList />
        <Cart />
      </div>
    );
  };
  
  export default Home;
  