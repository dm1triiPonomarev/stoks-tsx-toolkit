import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface InitialState {
	boughtList: [{
		id: number,
		boughtPrice: number,
		title: string
		currentPrice: number
	}]
}
const initialState: InitialState = {
	boughtList: [{
		id: 0,
		boughtPrice: 0,
		title: 'test',
		currentPrice: 0
	},]
}

const boughtLogicSlice = createSlice({
	name: 'buy',
	initialState,
	reducers: {
		buy: (state, action: PayloadAction<any>) => {
			state.boughtList.push(action.payload)
		},
		cancelBuy: (state, action: PayloadAction<number>) => {
			state.boughtList.filter(item => item.id !== action.payload)
		},
		setCurrentPrice: (state, action: PayloadAction<any>) => {
			state.boughtList.forEach(item => {
				if (item.id === action.payload.id) {
					item.currentPrice = action.payload.currentPrice
				}
			})
		},

	}
})


export default boughtLogicSlice.reducer
export const { buy, cancelBuy, setCurrentPrice } = boughtLogicSlice.actions