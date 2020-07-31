import React from 'react'
import './EditButton.css'

const EditButton = (props) => {
	return(
		<div className='edit-btn' onClick={props.handleClick}>
		</div>
	);
}

export default EditButton;