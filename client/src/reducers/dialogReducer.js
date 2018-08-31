import { OPEN_DIALOG, CLOSE_DIALOG } from "../actions/types";

const initialState = { open: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        ...state,
        open: true
      };
    case CLOSE_DIALOG:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}
