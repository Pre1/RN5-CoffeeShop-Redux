import { combineReducers } from "redux";

import coffeeReducer from "./coffeeReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";

export default combineReducers({
  coffeeReducer: coffeeReducer,
  cartReducer: cartReducer,
  authReducer: authReducer,
  errorsReducer: errorsReducer
});
