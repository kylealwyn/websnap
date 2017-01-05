import Parse from 'parse';

export function signIn(username, password) {
  return new Promise((resolve, reject) => {
    Parse.User.logIn(username, password, {
      success: resolve,
      error: (_, error) => reject(error),
    });
  });
}

export function signUp(username, password) {
  return new Promise((resolve, reject) => {
    const user = new Parse.User();

    user.set('username', username);
    user.set('password', password);

    user.signUp(null, {
      success: resolve,
      error: (_, error) => reject(error),
    });
  });
}

export function fetchUsers() {
  return new Promise((resolve, reject) => {
    const query = new Parse.Query(Parse.User);
    query.notEqualTo('objectId', Parse.User.current().id);
    query.find({
      success: resolve,
      error: reject,
    });
  });
}


export default {
  signIn,
  signUp,
  fetchUsers,
};
