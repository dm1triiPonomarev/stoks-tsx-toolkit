import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'
import modalSlice from "./reducers/ModalSlice";
import LoadingSlice from "./reducers/LoadingSlice";
import BoughtLogicSlice from "./reducers/BoughtLogicSlice";



const rootReducer = combineReducers({
	modal: modalSlice,
	loading: LoadingSlice,
	buy: BoughtLogicSlice
})


export const store = configureStore({
	reducer: rootReducer,

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

