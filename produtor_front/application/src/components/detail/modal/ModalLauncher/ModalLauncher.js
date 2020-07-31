import React from 'react'

const ModalLauncher = (props) => {
	const { handleClick } = props
	return (
		<div onClick={handleClick}>{props.children}</div>
		);
}

export default ModalLauncher;