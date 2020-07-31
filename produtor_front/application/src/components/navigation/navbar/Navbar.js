import React from 'react'
import './Navbar.css'
const Navbar = (props) => {
	return(
		<div className='navbar'>
			<div className= 'left'>
				{props.left}
			</div>
			<div className='center'>
				{props.middle}
			</div>
			<div className='right'>
				{props.right}
			</div>
		</div>  
	);
}

export default Navbar;