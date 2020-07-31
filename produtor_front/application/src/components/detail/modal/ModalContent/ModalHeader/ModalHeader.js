import React, { useContext }from 'react'
import { ModalContext } from '../../Modal'
import './ModalHeader.css'

const ModalHeader = (props) => {
	const { handleClick } = props
	const { title} = useContext(ModalContext)
	return (
		<div id='modal-header-container'>
			<h3 className='title'>{title}</h3>
			<div id='image-div' onClick={handleClick}></div>
		</div>
		)
}

export default ModalHeader