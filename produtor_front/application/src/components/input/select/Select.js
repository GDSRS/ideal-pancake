import React from 'react'
import PropTypes from 'prop-types'

const Select = (props) => {
	console.log('SELECT props', props)
	return (
		<select name={props.name} defaultValue={props.defaultValue}>
			{
				props.items.map( (item, index) => 	
					<option value={item.id} key={index} id={item.id}>{item.name}</option>
				)
			}
		</select>
	)
}

Select.propTypes = {
	name: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired,
	defaultValue: PropTypes.number.isRequired
}

Select.defaultProps = {
	name: 'name',
	items: [{id:1, name:'name'}],
	defaultValue: 0
};

export default Select;