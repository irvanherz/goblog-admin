const initialState = {
  articles: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
}

const article = (state = initialState, action) => {
  switch (action.type) {
    case 'articles/fetch/pending':
      return {
        ...state,
        status: "loading",
      }
    case 'articles/fetch/fulfilled': {
      const articles = {}
      action.payload.map(article => articles[article.id] = ({...article, state: {status: "idle", error: null}}))
      return {
        ...state,
        status: "succeeded",
        articles,
      }
    }
    case 'articles/fetch/rejected':
      return {
        ...state,
        status: "failed",
        error: action.error,
      }
    case 'articles/delete/pending': {
      const articles = state.articles
      articles[action.id].state.status = "loading"
      return {
        ...state,
        articles,
      }
    }
    case 'articles/delete/fulfilled': {
      const articles = state.articles
      delete articles[action.id]
      return {
        ...state,
        articles,
      }
    }
    case 'articles/delete/rejected':{
      const articles = state.articles
      articles[action.id].state.status = "loading"
      articles[action.id].state.error = action.error

      return {
        ...state,
        articles,
      }
    }
    default:
      return state
  }
}

export default article