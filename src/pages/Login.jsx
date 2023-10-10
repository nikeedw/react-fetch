import React, { useContext } from 'react'
import Input from '../components/UI/input/Input';
import Button from '../components/UI/button/Button';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const {isAuth, setIsAuth} = useContext(AuthContext);
	const navigate = useNavigate();

	const login = (event) => {
		event.preventDefault();
		setIsAuth(true);
		navigate('/posts');
	}

	return (
		<div>
			<h1 style={{marginBlock: "10px", textAlign: "center"}}>Page for Login</h1>
			<form onSubmit={login}>
				<Input type="text" placeholder="Enter login"/>
				<Input type="password" placeholder="Enter password"/>
				<Button>Login</Button>
			</form>
		</div>
	)
}

export default Login;