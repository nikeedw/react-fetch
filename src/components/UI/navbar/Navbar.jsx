import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import cl from './Navbar.module.css';

const Navbar = () => {
	const location = useLocation();
	const [activeLink, setActiveLink] = useState(null);

	const handleLinkClick = (link) => {
		setActiveLink(link);
	};

	const isLinkActive = (link) => location.pathname === link;

	const getLinkClassName = (link) => {
		const classes = [cl.link];
		if (isLinkActive(link) || activeLink === link) {
			classes.push(cl.active);
		}
		return classes.join(' ');
	};

	return (
		<nav className={cl.navbar}>
			<NavLink
				className={getLinkClassName('/posts')}
				to="/posts"
				onClick={() => handleLinkClick('/posts')}
			>
				Posts
			</NavLink>
			<NavLink
				className={getLinkClassName('/about')}
				to="/about"
				onClick={() => handleLinkClick('/about')}
			>
				About
			</NavLink>
		</nav>
	);
};

export default Navbar;
