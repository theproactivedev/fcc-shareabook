import {
  ADD_USER, REMOVE_USER, SAVE_USER_PROFILE, SAVE_SEARCHED_BOOKS, FETCH_BOOKS_PENDING,
  ADD_BOOK, REMOVE_BOOK, FETCH_BOOKS_RECEIVED, SAVE_ADDED_BOOKS, ADD_ALL_BOOKS
} from './actions.js';

export const initialState = {
  isFetching: false,
  isUserAuthenticated: false,
  user: {
    userName: "",
    userId: "",
    userToken: "",
    name: "",
    city: "",
    state: ""
  },
  allBooks: [],
  addedBooks: [],
  books: [],
  error: ""
};

const rootReducer = (state=initialState, action) => {
  switch(action.type) {
    case ADD_USER:
      return {
        ...state,
        isUserAuthenticated: true,
        user: {
          ...state.user,
          userName: action.user.userName,
          userId: action.user.userId,
          userToken: action.user.userToken
        }
      };
    case REMOVE_USER:
      return {
        ...state,
        isUserAuthenticated: false,
        user: {
          ...state.user,
          userName: "",
          userId: "",
          userToken: ""
        }
      };
    case SAVE_USER_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.user.name || "",
          city: action.user.city || "",
          state: action.user.state || ""
        }
      };
    case SAVE_SEARCHED_BOOKS:
      return {
        ...state,
        books: action.books
      };
    case SAVE_ADDED_BOOKS:
      return {
        ...state,
        addedBooks: action.books
      }
    case ADD_BOOK:
      return {
        ...state,
        addedBooks: [
          ...state.addedBooks,
          action.book
        ]
      };
    case REMOVE_BOOK:
      return {
        ...state,
        addedBooks: state.addedBooks.filter(book => {
          return book.googleBookId !== action.id
        })
      };
    case ADD_ALL_BOOKS:
      return {
        ...state,
        allBooks: action.books
      }
    case FETCH_BOOKS_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_BOOKS_RECEIVED:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state;
  }
};

export default rootReducer;
