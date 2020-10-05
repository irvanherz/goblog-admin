import axios from "axios"

export const createArticleDetailPending = () => {
  return {
    type: 'article-detail/create/pending',
  }
}

export const createArticleDetailFulfilled = payload => {
  return {
    type: 'article-detail/create/fulfilled',
    payload
  }
}

export const createArticleDetailRejected = error => {
  return {
    type: 'article-detail/create/rejected',
    error
  }
}


export const fetchArticleDetailPending = () => {
  return {
    type: 'article-detail/fetch/pending',
  }
}

export const fetchArticleDetailFulfilled = payload => {
  return {
    type: 'article-detail/fetch/fulfilled',
    payload
  }
}

export const fetchArticleDetailRejected = error => {
  return {
    type: 'article-detail/fetch/rejected',
    error
  }
}

export const updateArticleDetailPending = () => {
  return {
    type: 'article-detail/update/pending',
  }
}

export const updateArticleDetailFulfilled = payload => {
  return {
    type: 'article-detail/update/fulfilled',
    payload
  }
}

export const resetArticleDetailState = () => {
  return {
    type: 'article-detail/reset-state',
  }
}

export const updateArticleDetailRejected = error => {
  return {
    type: 'article-detail/update/rejected',
    error
  }
}


export const fetchArticleDetail = id => {
  return dispatch => {
    dispatch(fetchArticleDetailPending())
    return axios.get(`${process.env.REACT_APP_API_BASE}/v1/articles/${id}`)
      .then(response => {
        dispatch(fetchArticleDetailFulfilled(response.data.data))
      })
      .catch(err => {
        dispatch(fetchArticleDetailRejected(err?.response?.data?.error?.message || "Server error occured"))
      })
  }
}

export const updateArticleDetail = (id, data) => {
  return dispatch => {
    dispatch(updateArticleDetailPending())
    return axios.put(`${process.env.REACT_APP_API_BASE}/v1/articles/${id}`, data)
      .then(response => {
        dispatch(updateArticleDetailFulfilled(response.data.data))
      })
      .catch(err => {
        dispatch(updateArticleDetailRejected(err?.response?.data?.error?.message || "Server error occured"))
      })
  }
}

export const createArticleDetail = (data) => {
  return dispatch => {
    dispatch(createArticleDetailPending())
    return axios.post(`${process.env.REACT_APP_API_BASE}/v1/articles`, data)
      .then(response => {
        dispatch(createArticleDetailFulfilled(response.data.data))
      })
      .catch(err => {
        dispatch(createArticleDetailRejected(err?.response?.data?.error?.message || "Server error occured"))
      })
  }
}