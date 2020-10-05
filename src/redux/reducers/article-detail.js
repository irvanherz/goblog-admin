const initialState = {
  article: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
}

const article = (state = initialState, action) => {
  switch (action.type) {
    case 'article-detail/fetch/pending':
      return {
        ...state,
        status: "loading",
      }
    case 'article-detail/fetch/fulfilled': {
      return {
        ...state,
        status: "succeeded",
        article: action.payload,
      }
    }
    case 'article-detail/fetch/rejected':
      return {
        ...state,
        status: "failed",
        error: action.error,
      }
    case 'article-detail/update/pending': {
      return {
        ...state,
        status: "updating",
      }
    }
    case 'article-detail/update/fulfilled': {
      return {
        ...state,
        status: "updated",
        article: {
          ...state.article,
          ...action.payload
        },
      }
    }
    case 'article-detail/update/rejected':{
      return {
        ...state,
        status: "failed",
        error: action.error,
      }
    }
    case 'article-detail/create/pending': {
      return {
        ...state,
        status: "creating",
      }
    }
    case 'article-detail/create/fulfilled': {
      return {
        ...state,
        status: "created",
        article: {
          ...state.article,
          ...action.payload
        },
      }
    }
    case 'article-detail/create/rejected':{
      return {
        ...state,
        status: "failed",
        error: action.error,
      }
    }
    case 'article-detail/reset-state':{
      return initialState
    }
    default:
      return state
  }
}

export default article