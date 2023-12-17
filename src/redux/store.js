import { combineReducers, createStore } from "redux";
import CartReducer from "./reducer";

const rootReducers = combineReducers({
    CartReducer:CartReducer,
})

const store = () => {
    return createStore(rootReducers);
}

export default store;