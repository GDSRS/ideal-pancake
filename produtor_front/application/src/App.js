import React, {useEffect, useState} from 'react'
import { BrowserRouter, Link} from 'react-router-dom'
import Admin from './components/roles/admin/Admin'
import { CLogin } from './components/login/Login'
import PrivateRoute from './components/routes/PrivateRoute'
import RestrictedRoute from './components/routes/RestrictedRoute'
import Navbar from './components/navigation/navbar/Navbar'
import { store } from './app/store'
import { logOut } from './app/actions'
import { isLoggedIn } from './utils/authenticationUtils'
import logoIcon from './components/login/assets/login_logo.png'
import './App.css'


const App = (props) => {
	const [, update] = useState();
	const forceUpdate = React.useCallback(() => update({}), [])
	useEffect(() => {
		
		if(isLoggedIn()) {
			console.log("Logado")
		}
		else {
			console.log('n logado')
		}
	})

	function logout() {
		store.dispatch(logOut())
		sessionStorage.removeItem('userToken')
		forceUpdate()
	}


	return (
		<BrowserRouter>
		<div className='app-container'>
			<div className='app-header'>
				<Navbar
				left= { <img src={logoIcon} alt='logo' className='navbar-logo'/> }
				middle= { 'Produtor Verduras' }
				right= {
						<React.Fragment> 
							<div id='signin-btn'>Cadastrar</div>
							{ isLoggedIn() ? <Link id='login-btn' to='/' onClick={() => logout()} >Logout</Link>:

								<Link id='login-btn' to='/login'>Login</Link>
						}
							
						</React.Fragment>
				}/>
			</div>
			<div className='app-body'>
				<RestrictedRoute exact path='/login' component={CLogin}/>
				<PrivateRoute component={Admin} requiredRole='admin' path='/admin/:detail?'/>
			</div>
		</div>
		</BrowserRouter>
	);
}

export default App;