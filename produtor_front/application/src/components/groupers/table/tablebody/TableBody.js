import React , { Children, cloneElement }from 'react';
import DeleteButton from '../../../layout/delete_button/DeleteButton'
import PropTypes from 'prop-types'

const TableBody = (props) => {

	function addPropToChildren(children, item) {
		return Children.map(children,
			(child) => {
				return cloneElement(child, {
					element: item
				})
			})
	}

	return(
		<tbody>
			{
				props.items.map( (item, index) => 
					<tr key={index}>
						{
							props.features.map(feature => 
								<td key={feature}>{item[feature]}</td>
							)
						}
						{props.deleteItem ? 
							<td style={{"width":0+'em'}}><DeleteButton handleClick={() => props.deleteItem(item.id)}/></td> : null }
						{props.editItem ? 
							<td style={{"width":0+'em'}}>{addPropToChildren(props.editItem, item)}</td>: null}
					</tr>
				)
			}
		</tbody>
	);
}

TableBody.defaultProps = {
	items: [{'a':'nenhum item da tabela definido'}],
	features:['a']
}

TableBody.propTypes = {
	items: PropTypes.array.isRequired,
	features: PropTypes.array.isRequired
}

export default TableBody;