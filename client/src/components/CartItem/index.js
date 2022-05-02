import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    // <div className="d-flex">

    //   <div>
    //     <div className="flex"></div>
    //     <div>
    //       <span>Qty:</span>
    //       <input
    //         type="number"
    //         placeholder="1"
    //         value={item.purchaseQuantity}
    //         onChange={onChange}
    //       />
    //       <span
    //         role="img"
    //         aria-label="trash"
    //         onClick={() => removeFromCart(item)}
    //       >
    //         🗑️
    //       </span>
    //     </div>
    //   </div>
    // </div>

    <div className="cartItem d-flex justify-content-around">

      <div className="itemImg">
        <img className="cartImg" src={`/images/${item.image}`} alt="" />
      </div>

      <div className="itemInfo">
        <div>
         <strong>{item.name}</strong> , ${item.price}
        </div>
        <div className="d-flex justify-content-end align-items-center">
        <span>X</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            {" "}
           remove{" "}
          </span>
        </div>
      </div>
      
    </div>
  );
};

export default CartItem;
