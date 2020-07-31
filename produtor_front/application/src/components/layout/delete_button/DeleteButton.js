import React from 'react'
import './DeleteButton.css'

const DeleteButton = (props) => {
	return(
		<div className='delete-btn' onClick={props.handleClick}>
  			<div className='bar'></div>
		</div>
	);
}

export default DeleteButton;