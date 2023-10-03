import React from 'react';
import classes from './Select.module.css';

const Select = ({ options, defaulValue, value, onChange }) => {
	return (
		<select 
			value={value}
			onChange={(event) => onChange(event.target.value)} 
		>
			<option disabled={true}>{defaulValue}</option>
			{options.map(option => 
				<option key={option.value} value={option.value}>
					{option.name}
				</option>
			)}
		</select>
	);
};

export default Select;