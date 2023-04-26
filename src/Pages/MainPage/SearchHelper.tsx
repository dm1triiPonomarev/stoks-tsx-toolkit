import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import { removeIsLoading, setIsLoading } from '../../store/reducers/LoadingSlice';
import { setModal, } from '../../store/reducers/ModalSlice';
import MainModal from './MainModal/MainModal';
// import checkLastPrice from './checkLastPrice';

const SearchHelper = (props: { current: number, handleFilter: any, setInputText: any, recomendArr: string[][], setRecomendItem: Dispatch<SetStateAction<string[]>>, tickerTitleCheck: (ticker: string) => Promise<void>, tickerTitle: string, recomendItem: any }) => {
	const dispatch = useAppDispatch()
	const isModal = useAppSelector((state) => state.modal.isModal)
	const MoexAPI = require("moex-api");
	const moexApi = new MoexAPI();


	interface Item {
		item: []


	}
	const item = {
		item: []
	}

	const SearchItem = (item: any) => {

		const [currentPrice, setCurrentPrice] = useState(item.item[12])
		// const [AbscurrentPrice, setAbsCurrentPrice] = useState(currentPrice)

		async function func(ticker: string) {
			const response = await (moexApi.securityMarketData(ticker.toUpperCase()))

			setCurrentPrice(response.node.last)

			await new Promise(resolve => setTimeout(resolve, 3000));
			await func(ticker)

		}
		func(item.item[0])


		return (

			<div>
				<div key={item.item[0]} className="">

					{item.item.length < 1 ?
						<div></div>
						:
						<span onClick={() => { props.setRecomendItem(item.item); props.tickerTitleCheck(item.item[0]); dispatch(setIsLoading()); }}  >
							<div onClick={() => { dispatch(setModal()); }} className='search-helper' >{item.item[0]}  {currentPrice}  ₽</div>
						</span>

					}
				</div>

				{isModal &&
					<MainModal recomendItem={props.recomendItem} tickerTitle={props.tickerTitle} boughtPrice={Number(props.current)} notEnoughtCash={false} />
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
						<SearchItem item={item} />

					</div>
				)
			})}

		</div>
	);
};

export default SearchHelper;

