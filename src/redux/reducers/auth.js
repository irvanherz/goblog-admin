const initialState = {
  token: null,
  userData: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'auth/login/pending':
      return {
        ...state,
        status: "loading",
      }
    case 'auth/login/fulfilled': {
      return {
        ...state,
        status: "succeeded",
        token: action.payload.token,
        userData: action.payload.userData,
      }
    }
    case 'auth/login/rejected':
      return {
        ...state,
        status: "failed",
        error: action.error,
      }
    case 'auth/logout/fulfilled': {
      return {
        ...state,
        status: "succeeded",
        token: null,
        userData: {},
      }
    }
    default:
      return state
  }
}

export default auth