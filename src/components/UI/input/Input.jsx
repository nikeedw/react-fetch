import React from 'react'
import classes from './Input.module.css';

const Input = (props) => {
	return (
		<input className={classes.customInput} {...props} />
	)
}

export default Input;