import React, { useContext } from 'react';
import { SidebarContext } from '../Sidebar.js'
import './BurgerButton.css';

function BurgerButton() {
	const {isSidebarShowing, setIsSidebarShowing} = useContext(SidebarContext)
	return (
		<div 
		className={`BurgerButton BurgerButton--${isSidebarShowing? 'origin':'foward'}`}
		role='button'
		onClick={() => setIsSidebarShowing(!isSidebarShowing)}
		>
			<i></i>
			<i></i>
			<i></i>
		</div>
	)
}

export default BurgerButton;