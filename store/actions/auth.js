import AsyncStorage from '@react-native-async-storage/async-storage';
import ENV from '../../env';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (
  token,
  userId,
  expireDate
) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expireDate));
    dispatch({
      type: AUTHENTICATE,
      token: token,
      userId: userId,
    });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ENV.userApi}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      const errMsg = errData.error.message;
      let message =
        'Something went wrong!! while login';
      if (errMsg === 'EMAIL_EXISTS') {
        message = 'This email already exist!';
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expireDate = new Date(
      new Date().getTime() +
        parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(
      resData.idToken,
      resData.localId,
      expireDate
    );
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ENV.userApi}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      const errMsg = errData.error.message;
      let message =
        'Something went wrong!! while login';
      if (errMsg === 'EMAIL_NOT_FOUND') {
        message =
          'This email is not found! enter correct email.';
      } else if (errMsg === 'INVALID_PASSWORD') {
        message =
          'This password is not valid! enter correct password.';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    // console.log(resData);
    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expireDate = new Date(
      new Date().getTime() +
        parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(
      resData.idToken,
      resData.localId,
      expireDate
    );
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expireDate) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expireDate);
  };
};

const saveDataToStorage = (
  token,
  userId,
  expireDate
) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expireDate: expireDate.toISOString(),
    })
  );
};
