import React from 'react'
import './ModalLauncherButton.css'
import plusIcon from '../assets/plus_icon.png'

const ModalLauncherButton = (props) => {
	return (
		<div className='add-btn'>
			<img src={plusIcon} alt='plusIcon'/>
		</div>
	)
}

export default ModalLauncherButton;