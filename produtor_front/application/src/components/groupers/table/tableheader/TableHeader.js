import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = (props) => {
	return (
		<thead>
			<tr>
				{
					props.headers.map( (header, index) => 
							<th key={index}>{ header }</th>
					)
				}
			</tr>
		</thead>
	);
}

TableHeader.defaultProps = {
	items: ['header não definido']
}

TableHeader.propTypes = {
	items: PropTypes.array.isRequired
}

export default TableHeader;