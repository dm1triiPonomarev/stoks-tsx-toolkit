
import React from 'react';
import { useAppSelector, useAppDispatch } from './stateHooks';
import { useState } from 'react';
import { setCurrentPrice } from '../store/reducers/BoughtLogicSlice';

const MoexAPI = require("moex-api");
const moexApi = new MoexAPI();

const CheckCurrentPrice = (props: { item: { id: number | undefined; boughtPrice: string | number | undefined; title: string | undefined; } }) => {
	const dispatch = useAppDispatch()



	async function func(ticker: any) {

		const response = await (moexApi.securityMarketData(ticker.toUpperCase()))
		const currentObject = {
			id: props.item.id,
			currentPrice: response.node.last
		}


		dispatch(setCurrentPrice(currentObject))

		await new Promise(resolve => setTimeout(resolve, 3000));
		await func(ticker)

	}
	func(props.item.title)
};

export default CheckCurrentPrice;