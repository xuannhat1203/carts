import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../store/reducers/reducerItem";
import {
  deleteItem,
  getItem2,
  addItemToCart,
  updateCartItemQuantity,
} from "../store/reducers/listCarts";
import "../CSS/bootstrap.min.css";
import "../CSS/style.css";

export default function Carts() {
  const listItem = useSelector((state: any) => state.item.item);
  const listCart = useSelector((state: any) => state.carts.carts);
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItem());
    dispatch(getItem2());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteItem(id));
  };

  const handleAddToCart = (item: any) => {
    const quantity = parseInt(inputValues[item.id] || "1", 10);
    const existingItem = listCart.find(
      (cartItem: any) => cartItem.id === item.id
    );

    if (existingItem) {
      dispatch(
        updateCartItemQuantity({
          item: existingItem,
          quantity: existingItem.quantity + quantity,
        })
      );
    } else {
      dispatch(addItemToCart({ ...item, quantity }));
    }
    setInputValues({ ...inputValues, [item.id]: "1" });
  };

  const handleUpdateQuantity = (item: any, quantity: number) => {
    setInputValues({ ...inputValues, [item.id]: quantity.toString() });
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h1 className="panel-title">List Products</h1>
            </div>
            <div className="panel-body" id="list-product">
              {listItem.map((item: any) => (
                <div key={item.id} className="media product">
                  <div className="media-left">
                    <a href="#">
                      <img
                        style={{ width: "180px", height: "150px" }}
                        className="media-object"
                        src={item.image}
                        alt={item.name}
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">{item.name}</h4>
                    <p>{item.description}</p>
                    <input
                      type="number"
                      value={inputValues[item.id] || "1"}
                      onChange={(e) =>
                        handleUpdateQuantity(item, +e.target.value)
                      }
                      defaultValue={1}
                    />
                    <button onClick={() => handleAddToCart(item)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h1 className="panel-title">Your Cart</h1>
            </div>
            <div className="panel-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="my-cart-body">
                  {listCart.map((cartItem: any, index: number) => (
                    <tr key={cartItem.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{cartItem.name}</td>
                      <td>{cartItem.price} USD</td>
                      <td>
                        <input
                          name={`cart-item-quantity-${cartItem.id}`}
                          type="number"
                          value={cartItem.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(cartItem, +e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <button
                          className="label label-danger delete-cart-item"
                          onClick={() => handleDelete(cartItem.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot id="my-cart-footer">
                  <tr>
                    <td colSpan={4}>
                      There are <b>{listCart.length}</b> items in your shopping
                      cart.
                    </td>
                    <td colSpan={2} className="total-price text-left">
                      {listCart.reduce(
                        (total: number, item: any) =>
                          total + item.price * item.quantity,
                        0
                      )}{" "}
                      USD
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="alert alert-success" role="alert" id="mnotification">
            Add to cart successfully
          </div>
        </div>
      </div>
    </div>
  );
}
