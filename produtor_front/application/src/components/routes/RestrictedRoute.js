import React from 'react'
import { Route, useHistory } from 'react-router-dom'
import {isLoggedIn} from '../../utils/authenticationUtils'

const RestrictedRoute = ({component: Component, ...rest}) => {
	let history = useHistory()
	return(
		<Route {...rest} render={props => (
			isLoggedIn() ? history.goBack() : <Component {...props}/>
			)}/>
	);
}

export default RestrictedRoute;