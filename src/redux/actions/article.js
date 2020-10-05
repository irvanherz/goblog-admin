import axios from "axios"

export const fetchArticlesPending = () => {
  return {
      type: 'articles/fetch/pending',
  }
}

export const fetchArticlesFulfilled = payload => {
  return {
      type: 'articles/fetch/fulfilled',
      payload
  }
}

export const fetchArticlesRejected = error => {
  return {
      type: 'articles/fetch/rejected',
      error
  }
}

export const deleteArticlePending = id => {
  return {
      type: 'articles/delete/pending',
      id,
  }
}

export const deleteArticleFulfilled = id => {
  return {
      type: 'articles/delete/fulfilled',
      id,
  }
}

export const deleteArticleRejected = (id, error) => {
  return {
      type: 'articles/delete/rejected',
      id,
      error,
  }
}


export const fetchArticles = () => {
  return dispatch => {
    dispatch(fetchArticlesPending())
    return axios.get(`${process.env.REACT_APP_API_BASE}/v1/articles`)
    .then(response => {
      dispatch(fetchArticlesFulfilled(response.data.data))
    })
    .catch(err => {
      dispatch(fetchArticlesRejected(err?.response?.data?.error?.message || "Server error occured"))
    })
  }
}

export const deleteArticle = id => {
  return dispatch => {
    dispatch(deleteArticlePending(id))
    return axios.delete(`${process.env.REACT_APP_API_BASE}/v1/articles/${id}`)
    .then(response => {
      dispatch(deleteArticleFulfilled(id))
    })
    .catch(err => {
      dispatch(deleteArticleRejected(id, err?.response?.data?.error?.message || "Server error occured"))
    })
  }
}