import { types } from "../actions";

const initialState = { info: null };

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, info: action.data };
    case types.CLEAR_USER:
      return { ...state, info: action.data };
    default:
      return state;
  }
}
