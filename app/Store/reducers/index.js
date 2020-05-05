import {combineReducers} from 'redux';
import InitReducer from './InitReducer';
import UserReducer from './UserReducer';
import SpsReducer from './SpsReducer';
import ServiceReducer from './ServiceReducer';
import StoreReducer from './StoreReducer';
import HistoryReducer from './HistoryReducer';
import CartReducer from './CartReducer';
import CurrentReducer from './CurrentReducer';

const rootReducer = combineReducers({
  init: InitReducer,
  user: UserReducer,
  sps: SpsReducer,
  services: ServiceReducer,
  store: StoreReducer,
  history: HistoryReducer,
  cart: CartReducer,
  current: CurrentReducer,
});

export default rootReducer;
