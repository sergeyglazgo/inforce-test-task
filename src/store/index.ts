import { AnyAction, createStore } from 'redux';
import { LOAD_PRODUCT, LOAD_GOODS } from './actions';

const initialState: State = {
  goods: [],
  product: null,
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_GOODS:
      return {
        ...state,
        goods: action.payload,
      };

    case LOAD_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
