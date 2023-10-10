import React from 'react';
import { Link } from 'react-router-dom';

const Missing = () => {
	return (
		<div className="Missing">
			<h1>This page does not exists</h1>
			<Link className='redirect' to="/">Visit our Home page</Link>
		</div>
	)
}

export default Missing;