import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import './SidebarItem.css';

function SidebarItem(props) {
	return (
		<li className='SidebarItem' id={props.id}>
			<Link className='SidebarItemLink'
			to={props.item.url}
			>
				{props.item.itemLabel}
			</Link>
		</li>
	)
}

SidebarItem.defaultProps = {
	itemLabel: 'Item não definido',
	url:'/'
}

SidebarItem.propTypes = {
	itemLabel: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired
}

export default SidebarItem;