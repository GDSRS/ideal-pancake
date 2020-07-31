import React, { useState }from 'react'
import PropTypes from 'prop-types'
import SidebarContent from './sidebar_content/SidebarContent'
import SidebarHeader from './sidebar_title/SidebarHeader'
import './Sidebar.css'

export const SidebarContext = React.createContext(true)

const Sidebar = (props) => {
	const [isSidebarShowing, setIsSidebarShowing] = useState(false)
	return(
		<SidebarContext.Provider value={{isSidebarShowing, setIsSidebarShowing}}>
			<div>
			<div
			className={`overlay overlay--${isSidebarShowing ? 'show' : 'hide'}`}
			onClick={() => setIsSidebarShowing(!isSidebarShowing)}
			></div>
			<div className={`Sidebar Sidebar--${isSidebarShowing ? 'show': 'hide'}`}>
				<SidebarHeader/>
				<SidebarContent items={props.items} />
			</div>
			</div>
		</SidebarContext.Provider>
	)
}

Sidebar.defaultProps = {
	items: [{itemLabel:'Label', url:'/'}]
}

Sidebar.propTypes = {
	items: PropTypes.array.isRequired
}

export default Sidebar