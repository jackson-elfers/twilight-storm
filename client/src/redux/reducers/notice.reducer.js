import { types } from "../actions";

const initialState = { message: null };

export default function(state = initialState, action) {
  switch (action.type) {
    case types.NOTICE:
      return { ...state, message: action.data };
    case types.CLEAR_NOTICE:
      return { ...state, message: action.data };
    default:
      return state;
  }
}
