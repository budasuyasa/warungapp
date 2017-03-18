export const types = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
};

export const actionCreators = {
  login: (item) => {
    return {
      type: types.LOGIN,
      payload: item,
    }
  },
  logout: (item) => {
    return {
      type: types.LOGOUT,
      payload: item
    }
  }
};

const initialState = {
  userData: {
    name: null,
    email: null,
    accessToken: null,
    isUserLogedIn: '0'
  }
}

export const reducer = (state = initialState, action) =>{
  const { userData } = state;
  const { type, payload } = action;


  switch (type) {
    case types.LOGIN:
    console.log(payload.name);
      return {
        ...state,
        userData: {
          name: payload.name,
          email: payload.email,
          accessToken: payload.accessToken,
          isUserLogedIn: '1',
        }
      }
      case types.LOGOUT:
      return {
        ...state,
        userData: {
          name: null,
          email: null,
          accessToken: null,
          isUserLogedIn: '0',
        }
      }
  }
  return state;
}
