import React from 'react';
import star from './imgs/star.svg'
import './Portfolio.scss'
import { useAppSelector } from '../../hooks/stateHooks';
import CheckCurrentPrice from '../../hooks/CheckCurrentPrice';
const Portfolio = () => {

	const stocksList = useAppSelector((state) => state.buy.boughtList)

	return (
		<div >
			<div className="container">

				<h1>Мои активы</h1>
				<div className='staredList'>
					<a href="https://ru.tradingview.com/watchlists/92255597/" rel="noreferrer" target={'_blank'}>
						<img width={'35px'} height={'35px'} src={star} alt="star" />
					</a>
				</div>
				<br />
			</div>
			<div className="stocks-header">
				<h1>Цена покупки</h1>
				<h1>Тикер</h1>
				<h1>Текущая Цена</h1>
			</div>
			<div className="myStocks">
				{stocksList.map((item) => {
					console.log(item);


					if (item.id <= 0) {
						return;
					} else {

						CheckCurrentPrice({ item })

						return (
							<div className="stock-card">
								<p>

									{item.boughtPrice}({

										((1 - item.boughtPrice / item.currentPrice) * 100).toFixed(2)})%
								</p>
								<p>{item.title}</p>
								<p>{item.currentPrice}</p>
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