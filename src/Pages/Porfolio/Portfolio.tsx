import React from 'react';
import star from './imgs/star.svg'
import './Portfolio.scss'
import { useAppSelector, useAppDispatch } from '../../hooks/stateHooks';
import CheckCurrentPrice from '../../hooks/CheckCurrentPrice';
import { cancelBuy, setCurrentPortfolioPrice } from '../../store/reducers/BoughtLogicSlice';
import { useState, useEffect } from 'react';
const Portfolio = () => {

	const stocksList = useAppSelector((state) => state.buy.boughtList)
	const dispatch = useAppDispatch()
	const initialBalance = useAppSelector((state) => state.buy.initialBalance)
	const currentBalance = useAppSelector((state) => state.buy.currentBalance)
	// const count = useAppSelector((state) => state.buy.boughtList)

	async function CheckCurrentPortfolioPrice() {

		if (Number(stocksList.length) > 1) {
			// let currentDifference = 100000 - Number(currentBalance)
			// let result = stocksList.reduce((acc, cur) => acc + Number(Number(cur.currentPrice) - Number(cur.boughtPrice)) * cur.count, 0)
			let totalResult = stocksList.reduce((acc, cur) => acc + Number(cur.currentPrice), 0)
			dispatch(setCurrentPortfolioPrice({ total: (Number(totalResult.toFixed(2)) + Number(initialBalance)) }))
		}
	}

	useEffect(() => {
		CheckCurrentPortfolioPrice()
	},)


	return (
		<div style={{ paddingBottom: '80px' }} >
			<div className="container">

				<h1>Мои активы</h1>
				<div className='staredList'>
					<a href="https://ru.tradingview.com/watchlists/92255597/" rel="noreferrer" target={'_blank'}>
						<img width={'35px'} height={'35px'} src={star} alt="star" />
					</a>
				</div>
				<br />
			</div>
			<div className="currentBalance">
				<div className="">

					<h1 style={{ marginRight: '20px' }}>Общая капитализация портфеля
						<br />
						<p>
							{String(Number(currentBalance).toFixed(2))}руб.

							({((1 - 100000 / currentBalance) * 100).toFixed(2)})%
						</p>
					</h1>
					<h1>
						КЕШ
						<br />
						<p>{(String(initialBalance.toFixed(2)))}руб.</p>
					</h1>
				</div>
			</div>
			<div className="stocks-header">

				<h1>Цена покупки </h1>
				<h1>Тикер</h1>
				<h1>Текущая Цена</h1>
			</div>
			<div className="myStocks">
				{stocksList.map((item) => {


					if (item.id <= 0) {
						return;
					}

					else {

						CheckCurrentPrice({ item })

						return (
							<div className="stock-card">
								<span>

									{(item.boughtPrice * item.count).toFixed(2)}
									({((1 - item.boughtPrice / item.currentPrice) * 100).toFixed(2)})%
									<p style={{ margin: 0, opacity: .8 }}>[{item.boughtPrice}] X{item.count}</p>
								</span>
								<p>{item.title}</p>
								<p style={{ display: 'flex', gap: '15px' }}>
									{item.currentPrice}
									<button onClick={() => dispatch(cancelBuy({ id: item.id, currentPrice: item.currentPrice, count: item.count }))} >SELL</button>
								</p>
							</div>
						)
					}
				})
				}
				<div className="total">

				</div>
			</div>


		</div>
	);
};

export default Portfolio;