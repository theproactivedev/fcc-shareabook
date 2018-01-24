export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";
export const SAVE_USER_PROFILE = "SAVE_USER_PROFILE";

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
  console.log(data.state);
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
