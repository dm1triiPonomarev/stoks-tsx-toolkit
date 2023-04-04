import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';


interface initialState {
	isLoading: boolean
}

const initialState: initialState = {
	isLoading: false
}


const loadingSlice = createSlice({
	name: 'lodaing',
	initialState,
	reducers: {
		setIsLoading: (state) => {
			state.isLoading = true
		},
		removeIsLoading: (state) => {
			state.isLoading = false
		}
	}
})

export default loadingSlice.reducer
export const { setIsLoading, removeIsLoading } = loadingSlice.actions
