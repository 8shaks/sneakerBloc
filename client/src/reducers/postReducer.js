import {
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  GET_POST_IMAGE
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    // case GET_POST_IMAGE:
    //   return {
    //     ...state,
    //     posts: [action.payload, ...state.posts]
    // };
    default:
      return state;
  }
}
