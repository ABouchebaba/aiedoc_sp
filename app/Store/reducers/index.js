import { combineReducers } from "redux";
import InitReducer from "./InitReducer";
import UserReducer from "./UserReducer";
import SpsReducer from "./SpsReducer";
import ServiceReducer from "./ServiceReducer";
import StoreReducer from "./StoreReducer";
import HistoryReducer from "./HistoryReducer";
import CartReducer from "./CartReducer";

const rootReducer = combineReducers({
  init: InitReducer,
  user: UserReducer,
  sps: SpsReducer,
  services: ServiceReducer,
  store: StoreReducer,
  history: HistoryReducer,
  cart: CartReducer
});

export default rootReducer;
