import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import cl from './Navbar.module.css';
import Button from '../button/Button';
import { AuthContext } from '../../../context';

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

	const {isAuth, setIsAuth} = useContext(AuthContext);
	const navigate = useNavigate();

	function exitSession() {
		setIsAuth(false);
		navigate('/login');
	}

	return (
		<nav className={cl.navbar}>
			<Button onClick={exitSession}>
				Exit
			</Button>
			<div>
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
			</div>
		</nav>
	);
};

export default Navbar;
