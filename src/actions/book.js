import api from "../utils/api";
import {
  GET_BOOKS,
  BOOK_ERROR,
  MORE_LOADED,
  BOOK_CONTENT,
  AUTH_SEARCH,
  BOOK_LOADING,
  MORE_SEARCH,
} from "./types";

export const loadBook = () => async (dispatch) => {
  try {
    const res = await api.get("/submissions");
    dispatch({
      type: GET_BOOKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: BOOK_ERROR });
  }
};

export const moreBook = (pageNumber) => async (dispatch) => {
  dispatch({
    type: BOOK_LOADING,
    payload: [],
  });
  try {
    const res = await api.get(`/submissions/more?page=${pageNumber}`);
    dispatch({
      type: MORE_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: BOOK_ERROR });
  }
};

export const getContent = (bookId) => async (dispatch) => {
  dispatch({
    type: BOOK_LOADING,
    payload: [],
  });
  try {
    const res = await api.get(`/submissions/book?lid=${bookId}`);
    dispatch({
      type: BOOK_CONTENT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: BOOK_ERROR });
  }
};

export const authGet = (word) => async (dispatch) => {
  dispatch({
    type: BOOK_LOADING,
    payload: [],
  });
  try {
    const res = await api.get(`/submissions/search?word=${word}`);
    console.log(res);
    dispatch({
      type: AUTH_SEARCH,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: BOOK_ERROR });
  }
};

export const moreSearch = (pageNumber, word) => async (dispatch) => {
  dispatch({
    type: BOOK_LOADING,
    payload: [],
  });
  try {
    const res = await api.get(`/submissions/moreSearch?page=${pageNumber}&word=${word}`);
    dispatch({
      type: MORE_SEARCH,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: BOOK_ERROR });
  }
};
