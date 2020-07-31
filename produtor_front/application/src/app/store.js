import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createStore } from 'redux'
import { loginReducer } from './reducers'

const persistConfig = {
	key:'root',
	storage
}

const persistedReducer = persistReducer(persistConfig, loginReducer)
let store = createStore(persistedReducer)
let persistor = persistStore(store)

export { store, persistor }