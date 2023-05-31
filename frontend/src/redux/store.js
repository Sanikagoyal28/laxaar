import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import NoteSlice from "./noteSlice";
import thunk from 'redux-thunk';
import persistStore from "redux-persist/es/persistStore";
import localStorage from "redux-persist/es/storage/session";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const persistConfig = {
    key: 'root',
   storage:localStorage
}

const persistreducer = persistReducer(persistConfig, NoteSlice.reducer)

const store = configureStore({
    reducer: persistreducer,
    composeEnhancers,
    middleware: [thunk]
})

const persistor = persistStore(store)
export default store
export { persistor }