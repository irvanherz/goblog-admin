import axios from "axios"

export const loginPending = () => {
  return {
    type: 'auth/login/pending',
  }
}

export const loginFulfilled = payload => {
  return {
    type: 'auth/login/fulfilled',
    payload
  }
}

export const loginRejected = error => {
  return {
    type: 'auth/login/rejected',
    error
  }
}


export const login = (user, password) => {
  return dispatch => {
    dispatch(loginPending())
    return axios.post(`${process.env.REACT_APP_API_BASE}/v1/auth/login`, {
      email: user,
      password
    })
      .then(response => {
        dispatch(loginFulfilled(response.data.data))
      })
      .catch(err => {
        dispatch(loginRejected(err?.response?.data?.error?.message || "Server error occured"))
      })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: 'auth/logout/fulfilled',
    })
  }
}

