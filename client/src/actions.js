export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";
export const SAVE_USER_PROFILE = "SAVE_USER_PROFILE";
export const SAVE_SEARCHED_BOOKS = "SAVE_SEARCHED_BOOKS";
export const SAVE_ADDED_BOOKS = "SAVE_ADDED_BOOKS";
export const SAVE_BOOK_REQUEST = "SAVE_BOOK_REQUEST";
export const SAVE_USER_REQUEST = "SAVE_USER_REQUEST";
export const ADD_BOOK = "ADD_BOOK";
export const ADD_ALL_BOOKS = "ADD_ALL_BOOKS";
export const REMOVE_BOOK = "REMOVE_BOOK";
export const REMOVE_BOOK_REQUEST = "REMOVE_BOOK_REQUEST";
export const FETCH_BOOKS_PENDING = "FETCH_BOOKS_PENDING";
export const FETCH_BOOKS_RECEIVED = "FETCH_BOOKS_RECEIVED";
export const ACCEPT_REQUEST = "ACCEPT_REQUEST";
export const REJECT_REQUEST = "REJECT_REQUEST";

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
    userProfile
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

function saveBookRequestToState(book) {
  return {
    type: SAVE_BOOK_REQUEST,
    book
  };
}

function saveUserRequestsToState(books) {
  return {
    type: SAVE_USER_REQUEST,
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

function removeBookRequestFromState(id) {
  return {
    type: REMOVE_BOOK_REQUEST,
    id
  };
}

export function acceptRequestInState(id) {
  return {
    type: ACCEPT_REQUEST,
    id
  };
}

export function rejectRequestInState(id) {
  return {
    type: REJECT_REQUEST,
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

export function acceptRequest(item, token) {
  return (dispatch) => {
    dispatch(acceptRequestInState(item.googleBookId));
    return fetch("/acceptRequest", {
        method: "POST",
        headers: new Headers({
          'Content-type' : 'application/json',
          'x-auth-token' : token
        }),
        body: JSON.stringify(item)
      })
      .then(response => response.json(),
      error => console.log(error));
  };
}

export function rejectRequest(item, token) {
  return (dispatch) => {
    dispatch(rejectRequestInState(item.googleBookId));
    return fetch("/rejectRequest", {
        method: "POST",
        headers: new Headers({
          'Content-type' : 'application/json',
          'x-auth-token' : token
        }),
        body: JSON.stringify(item)
      })
      .then(response => response.json(),
      error => console.log(error));
  };
}

export function requestBook(data, token) {
  return (dispatch) => {
    dispatch(saveBookRequestToState(data));
    return fetch("/requestBook", {
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

export function removeBookRequest(item, token) {
  return (dispatch) => {
    dispatch(removeBookRequestFromState(item.googleBookId));
    return fetch("/removeBookRequest", {
        method: "POST",
        headers: new Headers({
          'Content-type' : 'application/json',
          'x-auth-token' : token
        }),
        body: JSON.stringify({bookId: item.googleBookId, owner: item.owner})
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

export function getBookRequests(token) {
  return (dispatch) => {
    dispatch(requestBooks());
    return fetch("/bookRequests", {
        method: "GET",
        headers: new Headers({
          'Content-type' : 'application/json',
          'x-auth-token' : token
        })
      })
      .then(response => response.json(),
      error => console.log(error))
      .then(books => dispatch(saveBookRequestToState(books)))
      .then(books => dispatch(receiveBooks()));
  };
}

export function getUserRequests(token) {
  return (dispatch) => {
    dispatch(requestBooks());
    return fetch("/userRequests", {
        method: "GET",
        headers: new Headers({
          'Content-type' : 'application/json',
          'x-auth-token' : token
        })
      })
      .then(response => response.json(),
      error => console.log(error))
      .then(books => dispatch(saveUserRequestsToState(books)))
      .then(books => dispatch(receiveBooks()));
  };
}
