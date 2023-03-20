import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss'
const Header = () => {
	return (
		<div className='header'>
			<Link className='header-link' to={'/'}>
				<p>

					Search
				</p>
			</Link>
			<Link className='header-link' to={'/portfolio'}>
				<p >
					Portfolio
				</p>

			</Link>
		</div>
	);
};

export default Header;