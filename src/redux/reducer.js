import { CartActions } from "./actions"

const initialState = {
    cartList: [],
}

const CartReducer = (state = initialState, action) => {

    switch (action.type) {
        case CartActions.ADD_ITEM:
            return {
                ...state,
                cartList: action.payload,
            }
        default:
            return state;
    }

}

export default CartReducer;