export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";
export const SAVE_USER_PROFILE = "SAVE_USER_PROFILE";
export const SAVE_SEARCHED_BOOKS = "SAVE_SEARCHED_BOOKS";
export const SAVE_ADDED_BOOKS = "SAVE_ADDED_BOOKS";
export const ADD_BOOK = "ADD_BOOK";
export const REMOVE_BOOK = "REMOVE_BOOK";
export const FETCH_BOOKS_PENDING = "FETCH_BOOKS_PENDING";
export const FETCH_BOOKS_RECEIVED = "FETCH_BOOKS_RECEIVED";
export const ADD_ALL_BOOKS = "ADD_ALL_BOOKS";

export function addUser(user) {
  return {
    type: ADD_USER,
    user
  };
}

export function removeUser() {
  return {
    type: REMOVE_USER
  };
}

function saveToState(userProfile) {
  console.log(JSON.stringify(userProfile));
  return {
    type: SAVE_USER_PROFILE,
    user: userProfile
  };
}

export function getUserProfile(token) {
  return (dispatch) => {
    return fetch("/userProfile", {
        method: "GET",
        headers: new Headers({
          'Content-type' : 'application/json',
          'x-auth-token' : token
        })
      })
      .then(response => response.json(),
      error => console.log(error))
      .then(json => dispatch(saveToState(json.user)));
  };
}

export function saveUserProfile(data) {
  return (dispatch) => {
    dispatch(saveToState(data));
    return fetch("/userProfile", {
        method: "POST",
        headers: new Headers({
          'Content-type' : 'application/json',
          'x-auth-token' : data.token
        }),
        body: JSON.stringify(data)
      })
      .then(response => response.json(),
      error => console.log(error));
  };
}

function requestBooks() {
  return {
    type: FETCH_BOOKS_PENDING
  };
}

function receiveBooks() {
  return {
    type: FETCH_BOOKS_RECEIVED
  };
}

function saveSearchedBooksToState(books) {
  return {
    type: SAVE_SEARCHED_BOOKS,
    books
  };
}

function saveAddedBooksToState(books) {
  return {
    type: SAVE_ADDED_BOOKS,
    books
  };
}

function saveAllBooksToState(books) {
  return {
    type: ADD_ALL_BOOKS,
    books
  };
}

function addBookToState(book) {
  return {
    type: ADD_BOOK,
    book
  };
}

function removeBookFromState(id) {
  return {
    type: REMOVE_BOOK,
    id
  };
}

export function searchBook(link) {
  return (dispatch) => {
    dispatch(requestBooks());
    return fetch(link, {
        method: "GET",
        headers: new Headers({
          'Content-type' : 'application/json'
        })
      })
      .then(response => response.json(),
      error => console.log(error))
      .then(books => dispatch(saveSearchedBooksToState(books)))
      .then(books => dispatch(receiveBooks()));
  };
}

export function addBook(data, token) {
  return (dispatch) => {
    dispatch(addBookToState(data));
    return fetch("/addBook", {
        method: "POST",
        headers: new Headers({
          'Content-type' : 'application/json',
          'x-auth-token' : token
        }),
        body: JSON.stringify(data)
      })
      .then(response => response.json(),
      error => console.log(error));
  };
}

export function removeBook(id, token) {
  return (dispatch) => {
    dispatch(removeBookFromState(id));
    return fetch("/removeBook", {
        method: "POST",
        headers: new Headers({
          'Content-type' : 'application/json',
          'x-auth-token' : token
        }),
        body: JSON.stringify({bookId: id})
      })
      .then(response => response.json(),
      error => console.log(error));
  };
}

export function getAddedBooks(token) {
  return (dispatch) => {
    dispatch(requestBooks());
    return fetch("/addedBooks", {
        method: "GET",
        headers: new Headers({
          'Content-type' : 'application/json',
          'x-auth-token' : token
        })
      })
      .then(response => response.json(),
      error => console.log(error))
      .then(books => dispatch(saveAddedBooksToState(books)))
      .then(books => dispatch(receiveBooks()));
  };
}

export function getAllBooks() {
  return (dispatch) => {
    dispatch(requestBooks());
    return fetch("/allBooks", {
        method: "GET",
        headers: new Headers({
          'Content-type' : 'application/json'
        })
      })
      .then(response => response.json(),
      error => console.log(error))
      .then(books => dispatch(saveAllBooksToState(books)))
      .then(books => dispatch(receiveBooks()));
  };
}
