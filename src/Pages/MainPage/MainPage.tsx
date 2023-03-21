import React, { useState } from 'react';
import './MainPage.scss'
import { useAppSelector, useAppDispatch } from '../../hooks/stateHooks';
import { setIsLoading, removeIsLoading } from '../../store/reducers/LoadingSlice';
import SearchHelper from './SearchHelper';

const MainPage = () => {

	const [currentTicker, setCurrentTicker] = useState('')

	const [inputText, setInputText] = useState('')

	const [recomendArr, setRecomendArr] = useState([['']])
	const [tickerTitle, setTickerTitle] = useState('')
	const [recomendItem, setRecomendItem] = useState([''])



	const isLoading = useAppSelector((state) => state.loading.isLoading)

	const dispatch = useAppDispatch()

	const MoexAPI = require("moex-api");
	const moexApi = new MoexAPI();

	async function handlefilter(ticker: string) {
		if (ticker.length >= 2) {
			dispatch(setIsLoading())

			await moexApi.securitiesDataRaw('stock', 'shares', "TQBR").then((response: any) => {
				let initialMass: [string[]] = response.marketdata.data
				setRecomendArr(initialMass?.filter(item => item[0].includes(ticker.toUpperCase()) && item[1] === "TQBR"))

				moexApi.securityMarketData(ticker.toUpperCase()).then((response: any) => {
					setTickerTitle(response.node.friendlyTitle)
				})

			})
			dispatch(removeIsLoading())

			await (moexApi.securityMarketData(ticker.toUpperCase()).then((response: any) => {
				setTickerTitle(response.node.friendlyTitle)
			}))


		} else {
			setRecomendArr([['']])
			setTickerTitle('')
		}

	}

	async function tickerTitleCheck(ticker: string) {
		dispatch(setIsLoading())
		await (moexApi.securityMarketData(ticker.toUpperCase()).then((response: any) => {

			setTickerTitle(response.node.friendlyTitle)
		}))
		dispatch(removeIsLoading())
	}


	return (
		<div className='wrapper'>
			<div style={{ margin: '0 auto' }} className="inner">


				<h1>Вбей в поиске тикер актива</h1>
				<div className="search">
					<input className='input-search' type="text" value={inputText} onChange={(e) => { setCurrentTicker(e.target.value.toUpperCase()); setInputText(e.target.value.toUpperCase()); handlefilter(e.target.value.toUpperCase()) }} />


					<div className="search-helper-wrapper">
						{isLoading ?
							<div>Loading...</div>
							:
							<SearchHelper handleFilter={handlefilter} setInputText={setInputText} recomendArr={recomendArr} setRecomendItem={setRecomendItem} tickerTitleCheck={tickerTitleCheck} tickerTitle={tickerTitle} recomendItem={recomendItem} />
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainPage;