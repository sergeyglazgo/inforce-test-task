import { AnyAction, createStore } from 'redux';
import { LOAD_GOOD, LOAD_GOODS } from './actions';

const initialState: State = {
  goods: [],
  good: null,
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_GOODS:
      return {
        ...state,
        goods: action.payload,
      };

    case LOAD_GOOD:
      return {
        ...state,
        good: action.payload,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
