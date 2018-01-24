export const loadState = () => {
  try {
    // save it to the state
    const serializedState = localStorage.getItem("$k00b");
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined
  }
};

export const saveState = (state) => {
  try {
    // save it in localStorage
    var serializedState = JSON.stringify(state);
    localStorage.setItem("$k00b", serializedState);
  } catch (err) {
    console.log("Sorry. There is a technical error.");
  }
};
