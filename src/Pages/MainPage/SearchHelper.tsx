import React, { Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import { removeIsLoading, setIsLoading } from '../../store/reducers/LoadingSlice';
import { setModal, } from '../../store/reducers/ModalSlice';
import MainModal from './MainModal/MainModal';
// import checkLastPrice from './checkLastPrice';

const SearchHelper = (props: { handleFilter: any, setInputText: any, recomendArr: string[][], setRecomendItem: Dispatch<SetStateAction<string[]>>, tickerTitleCheck: (ticker: string) => Promise<void>, tickerTitle: string, recomendItem: any }) => {
	const dispatch = useAppDispatch()
	const isModal = useAppSelector((state) => state.modal.isModal)
	const MoexAPI = require("moex-api");
	const moexApi = new MoexAPI();





	const SearchItem = (item: any) => {

		const [currentPrice, setCurrentPrice] = useState(item.item[12])

		async function func(ticker: any) {
			const response = await (moexApi.securityMarketData(ticker.toUpperCase()))

			setCurrentPrice(response.node.last)

			await new Promise(resolve => setTimeout(resolve, 3000));
			await func(ticker)

		}
		func(item.item[0])


		return (

			<div>

				{item.item.length < 1 ?
					<div></div>
					:

					<span onClick={() => { props.setRecomendItem(item.item); props.tickerTitleCheck(item.item[0]); dispatch(setIsLoading()); }}  >
						<div onClick={() => { dispatch(setModal()); }} className='search-helper' >{item.item[0]}  {currentPrice}  ₽</div>
					</span>

				}
				{isModal &&
					<MainModal key={item.item[0]} recomendItem={props.recomendItem} tickerTitle={props.tickerTitle} boughtPrice={String(currentPrice)} />
				}

			</div>
		)
	}

	return (
		<div>
			{props.recomendArr.map(item => {

				if (!item[0]) {
					return;
				}
				return (
					<div>
						<SearchItem key={item[0]} item={item} />

					</div>
				)
			})}

		</div>
	);
};

export default SearchHelper;

