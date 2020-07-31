import React, {useContext} from 'react'
import {ModalContext} from '../../Modal'

import './ModalBody.css'

const ModalBody = (props) => {
	const { handleSubmit } = useContext(ModalContext)
	const { hideModal } = props
	const submit = (event) => {
		handleSubmit(event);
		hideModal();
	}
	return(
		<form id='modal-body' onSubmit={submit}>
			{props.children}
		</form>
		)
}

export default ModalBody;