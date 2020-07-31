import React, { useContext } from 'react'
import { TableContext } from '../../Table.js'
import './TablePagination.css'

const TablePagination = (props) => {
	const { nextPage, previousPage, cp, mp } = useContext(TableContext)
	return(
		<div className='table-pagination'>
			<div className='buttons' onClick={previousPage}>-</div>
			<div className='current-total'>{cp} - {mp}</div>
			<div className='buttons' onClick={nextPage}>+</div>
		</div>
	);
}

export default TablePagination;