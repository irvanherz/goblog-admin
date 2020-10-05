import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import authReducer from "./reducers/auth";
import articleReducer from "./reducers/article";
import articleDetailReducer from "./reducers/article-detail";
import thunkMiddleware from "redux-thunk";

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth']
}

const reducers = combineReducers({
	auth: authReducer,
	article: articleReducer,
	articleDetail: articleDetailReducer,
})

const persistedReducers = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducers, applyMiddleware(logger, thunkMiddleware))
const persistor = persistStore(store)

export { store, persistor }