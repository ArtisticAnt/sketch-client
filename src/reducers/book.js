import {
  AUTH_SEARCH,
  BOOK_CONTENT,
  GET_BOOKS,
  MORE_LOADED,
  BOOK_LOADING,
  MORE_SEARCH,
} from "../actions/types";

const initalState = {
  books: [],
  searchBooks: [],
  bookContent: [],
  authSearch: [],
  page: 0,
  searchPage: 0,
  loading: true,
  word: null,
  error: {},
};

const bookReducer = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BOOKS:
      return {
        ...state,
        loading: false,
        books: payload,
        page: 1,
      };
    case MORE_LOADED:
      return {
        ...state,
        loading: false,
        books: [...state.books, ...payload],
        page: state.page + 1,
      };
    case MORE_SEARCH:
      return {
        ...state,
        loading: false,
        authSearch: [...state.authSearch, ...payload],
        searchPage: state.searchPage + 1,
      };
    case BOOK_CONTENT:
      return {
        ...state,
        loading: false,
        bookContent: payload,
      };
    case AUTH_SEARCH:
      return {
        ...state,
        loading: false,
        authSearch: payload,
        searchPage: 1
      };
    case BOOK_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default bookReducer;
