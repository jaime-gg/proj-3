import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const books = cart.map((item) => item._id);

      if (books.length) {
        const { data } = await addOrder({ variables: { books } });
        const bookData = data.addOrder.books;

        bookData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div className='h-100 row align-items-center'>
      {/* // fun swirling text and animations that state order was successful */}
      <div className='success'>
        <h1> YOUR ORDER HAS BEEN PLACED! </h1>
        <h3> THANK YOU FOR SHOPPING WITH US! </h3>
        <p>For more information, please check your order history.</p>
      </div>

    </div>
  );
}

export default Success;