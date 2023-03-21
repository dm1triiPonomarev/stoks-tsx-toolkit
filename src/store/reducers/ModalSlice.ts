

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';


interface InitialState {
	isModal: boolean,
	arrForModal: [{
		ticker: string,
		currentPrice: number | string
	}]
}

const initialState: InitialState = {
	isModal: false,
	arrForModal: [{
		ticker: 'none',
		currentPrice: 'none'
	}]

}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setModal: (state) => {
			state.isModal = true

		},
		removeModal: (state) => {
			state.isModal = false
		},
	}
})

export default modalSlice.reducer
// export const selectModal = (state: RootState) => state.modal.isModal
export const { setModal, removeModal, } = modalSlice.actions