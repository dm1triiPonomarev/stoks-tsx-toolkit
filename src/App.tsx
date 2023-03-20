import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom'
import MainPage from './Pages/MainPage/MainPage';
import Portfolio from './Pages/Porfolio/Portfolio';
import MainModal from './Pages/MainPage/MainModal/MainModal';


function App() {







	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/portfolio' element={<Portfolio />} />
			</Routes>


		</>
	);
}

export default App;
