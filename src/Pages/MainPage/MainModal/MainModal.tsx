import React from 'react';
import './MainModal.scss'
import img from './imgs/nabibulina.jpg'
import { useAppDispatch, useAppSelector } from '../../../hooks/stateHooks';
import { removeModal } from '../../../store/reducers/ModalSlice';
import { buy } from '../../../store/reducers/BoughtLogicSlice';
import { useState } from 'react';




const MainModal = (props: { recomendItem: string[]; tickerTitle: string, boughtPrice: number, notEnoughtCash: any }) => {


	const dispatch = useAppDispatch()
	const isLoading = useAppSelector((state) => state.loading.isLoading)
	const currentBlance = useAppSelector((state) => state.buy.currentBalance)
	const stocksList = useAppSelector((state) => state.buy.boughtList)
	const lastStocksIndex = stocksList.length
	const [count, setCount] = useState(1)


	return (
		<>


			<div key={props.recomendItem[0]} onClick={() => dispatch(removeModal())} className={'modal'}>

				{isLoading ?
					<div className='modal-content' onClick={e => e.stopPropagation()}>
						<h1>Loading</h1>
					</div>
					:
					<div className='modal-content' onClick={e => e.stopPropagation()}>
						<div className="modal-inner">
							<span>
								{props.recomendItem[0]}
							</span>
							<span>
								{props.tickerTitle}
							</span>
							<span>
								{props.boughtPrice}₽
							</span>
						</div>


						<img src={img} alt="nabibulina" className='modal-img' />
						<p style={{ marginBottom: 0 }}>лого нет,стори  мем с Набибулиной</p>

						<button style={{ margin: '15px', height: '5vh', width: '10vw', alignItems: 'center', display: 'inline-grid', justifyContent: 'center', textAlign: 'center' }} className='modal-btn' onClick={() => setCount(prev => prev + 1)}>+</button>

						<h2 style={{ marginTop: 0 }}>total: {(Number(props.boughtPrice) * count).toFixed(2)} ₽({count}X)</h2>
						{currentBlance >= props.boughtPrice ?
							<button onClick={() => { dispatch(removeModal()); dispatch(buy({ id: lastStocksIndex, boughtPrice: props.boughtPrice, title: props.recomendItem[0], count: count })) }} className='modal-btn'>BUY</button>
							:
							<div style={{ opacity: 0.8, color: 'red' }}>Нехватает денег</div>
						}
					</div>

				}

			</div>

		</>
	);
};

export default MainModal;