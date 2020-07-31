import React from 'react';
import SidebarItem from '../sidebar_item/SidebarItem'
import './SidebarContent.css'

const SidebarContent = (props) => {
	return (
		<ul className='SidebarContent'>
			{
				props.items.map((item, index) => 
					<SidebarItem item={item} key={index} id={index}/>
				)
			}
		</ul>
	)
}

export default SidebarContent;