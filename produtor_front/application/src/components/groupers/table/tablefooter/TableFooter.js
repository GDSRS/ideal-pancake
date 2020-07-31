import React from 'react'
import TablePagination from './tablepagination/TablePagination'
import './TableFooter.css'

const TableFooter = (props) => {
	return (
		<tfoot>
			<tr>
				<td colSpan={props.numberCols}>
					<div className='flex--footer'>
						<div className='left--footer'></div>
						<div className='center--footer'>{props.middleButton}</div>
						<div className='right--footer'><TablePagination /></div>
					</div>
				</td>
			</tr>
		</tfoot>
	);
}

export default TableFooter;