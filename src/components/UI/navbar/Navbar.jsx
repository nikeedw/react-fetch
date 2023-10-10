import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import cl from './Navbar.module.css';

const Navbar = () => {
	const location = useLocation();

	const isLinkActive = (link) => { 
		return location.pathname === link;
	};

	const getLinkClassName = (link) => {
		const classes = [cl.link];
		if (isLinkActive(link) || (location.pathname.startsWith('/posts') && link === '/posts')) {
			classes.push(cl.active);
		}
		return classes.join(' ');
	};

	return (
		<nav className={cl.navbar}>
			<NavLink
				className={getLinkClassName('/posts')}
				to="/posts"
			>
				Posts
			</NavLink>
			<NavLink
				className={getLinkClassName('/about')}
				to="/about"
			>
				About
			</NavLink>
		</nav>
	);
};

export default Navbar;
