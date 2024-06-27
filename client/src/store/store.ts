import { combineReducers } from "redux";
import itemReducer from "./reducers/reducerItem";
import cartReducer from "./reducers/listCarts";

const rootReducer = combineReducers({
  item: itemReducer,
  carts: cartReducer,
});

export default rootReducer;
