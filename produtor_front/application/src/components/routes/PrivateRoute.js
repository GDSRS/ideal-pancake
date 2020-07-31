import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isLoggedIn} from '../../utils/authenticationUtils'

const PrivateRoute = ({component: Component, requiredRole: role, ...rest}) => {
	function getRole() {
		let jwt = sessionStorage.getItem('userToken').replace('JWT ','')
		return JSON.parse(atob(jwt.split('.')[0])).role
	}
	return (
		<Route {...rest} render={ props => (
			( isLoggedIn() && getRole() === role) ? 
				<Component {...props} /> : <Redirect to='/login'/>
		)} />
	);

};

export default PrivateRoute;