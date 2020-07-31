import React from 'react'
import ReactDOM from 'react-dom'
import ModalHeader from './ModalHeader/ModalHeader'
import ModalBody from './ModalBody/ModalBody'
import './ModalContent.css'

const ModalContent = (props) => {
	const { hideModal } = props
	return ReactDOM.createPortal(
		<div className='modal-content-wrapper'>
			<div className='modal-cover' onClick={hideModal}></div>
			<div className='modal-content'>
				<ModalHeader id='modal-header' handleClick={hideModal}/>
				<ModalBody handleSubmit={props.handleSubmit} hideModal={hideModal}>
					{props.children}
				</ModalBody>
			</div>
		</div>
		,
		document.body)
}

export default ModalContent