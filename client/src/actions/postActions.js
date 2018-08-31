import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST
  // GET_POST_IMAGE
} from "./types";

//add post
export const addPost = (postData, history) => dispatch => {
  axios
    .post("/api/listings", postData)

    .then(res => {
      history.push("/created-post");
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/listings")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/listings/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// export const getPostImage = postImage => dispatch => {
//   dispatch(setPostLoading());
//   axios.get(`${postImage}`).then(res =>
//     dispatch({
//       type: GET_POST_IMAGE,
//       payload: res.data
//     })
//   );
// };

// set loading state

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

export const deletePost = id => dispatch => {
  axios
    .delete(`/api/listings/${id}`)

    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
