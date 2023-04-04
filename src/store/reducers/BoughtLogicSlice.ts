import { useEffect } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface InitialState {
	boughtList: {
		id: number,
		boughtPrice: number,
		title: string
		currentPrice: number,
		count: number
	}[],
	initialBalance: number,
	notEnoughCash: boolean,
	currentBalance: number
}
const initialState: InitialState = {
	boughtList: [{
		id: 0,
		boughtPrice: 0,
		title: 'test',
		currentPrice: 0,
		count: 1
	}],
	initialBalance: 100000,
	notEnoughCash: false,
	currentBalance: 100000,
}

const boughtLogicSlice = createSlice({
	name: 'buy',
	initialState,
	reducers: {
		buy: (state, action: PayloadAction<any>) => {
			if (state.initialBalance < action.payload.boughtPrice) {
				state.notEnoughCash = true
			} else {
				state.initialBalance -= Number(action.payload.boughtPrice * action.payload.count)
				state.boughtList.push(action.payload)
			}
		},
		cancelBuy: (state, action: PayloadAction<any>) => {
			state.boughtList = state.boughtList.filter(item => (item.id) !== (action.payload.id))
			state.initialBalance += Number(action.payload.currentPrice * action.payload.count)

		},
		setCurrentPrice: (state, action: PayloadAction<any>) => {
			state.boughtList.forEach(item => {
				if (item.id === action.payload.id) {
					item.currentPrice = action.payload.currentPrice
				}
			})
		},
		setCurrentPortfolioPrice: (state, action: PayloadAction<any>) => {
			if (!isNaN(action.payload.total)) {
				state.currentBalance += action.payload.total
			}

		}
	}
})


export default boughtLogicSlice.reducer
export const { buy, cancelBuy, setCurrentPrice, setCurrentPortfolioPrice } = boughtLogicSlice.actions