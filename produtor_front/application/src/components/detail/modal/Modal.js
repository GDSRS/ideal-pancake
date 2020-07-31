import React, { useState } from 'react'
import ModalLauncher from './ModalLauncher/ModalLauncher'
import ModalContent from './ModalContent/ModalContent'
import ModalLauncherButton from '../../layout/modal_launcher_button/ModalLauncherButton'

export const ModalContext = React.createContext(true)

const Modal = (props) =>{
	const [showModal, setShowModal] = useState(false)
	const hideModal = () => {
		setShowModal(false)
		if(props.hideModalTrigger){
			props.hideModalTrigger()
		}
	}
	return(
		<ModalContext.Provider value={props}>
			<ModalLauncher
			handleClick={() => {
				setShowModal(true)
				if(props.trigger) {
					props.trigger()
				}
			}}>
				{props.launcherIcon ? props.launcherIcon : <ModalLauncherButton/>}
			</ModalLauncher>
			{showModal ? 
				<ModalContent hideModal={() => hideModal()}>
					{props.children}
				</ModalContent>: null}
		</ModalContext.Provider>
		)
}

export default Modal;