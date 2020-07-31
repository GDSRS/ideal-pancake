import React from 'react'
import { connect } from 'react-redux'
import './Login.css'
import {logIn, logOut} from '../../app/actions'

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: ''
		}

		this.handleUsernameInput = this.handleUsernameInput.bind(this)
		this.handlePasswordInput = this.handlePasswordInput.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	handleUsernameInput(event) {
		this.setState({
			username: event.target.value
		})
	}

	handlePasswordInput(event) {
		this.setState({
			password: event.target.value
		})
	}

	onSubmit() {
		fetch(`${process.env.REACT_APP_BASE_API_URL}/auth`,{
			method:'POST',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
				'password':this.state.password,
				'username':this.state.username
			})
		}).then(response => response.json())
		  .then(data => {
		  	if(data.access_token) {
		  		this.props.logIn()
		  		sessionStorage.setItem('userToken', 'JWT '+data.access_token)
		  		this.redirect_to_page(data.access_token)
		  		this.refreshPage()
		  	}
		  	else {
		  		alert(`${data.error}:${data.status_code}. ${data.description}`)
		  	}
		  })
		  .catch((error) => {
		  	console.log('Erro ',error)
		  })
	}

	refreshPage() {
		window.location.reload(false);
	}

	redirect_to_page(token) {
		let role = JSON.parse(atob(token.split('.')[0])).role

		if(role === 'admin') {
			this.props.history.push('/admin')
		} else {
			this.props.history.goBack()
		}
	}

	render() {
		return(
			<div className='outer'>
			  <div className='login-container'>
			    <div id='logo-image'></div>
			    <label>Usuário </label>
			    <input
			    type='text'
			    name='username'
			    onChange={this.handleUsernameInput}/>
			    <label>Senha </label>
			    <input
			    type='password'
			    name='password'
			    onChange={this.handlePasswordInput}/>
			    <div>
			      <button
			      id='btn-cadastrar'
			      onClick={() => this.props.history.push('/admin')}>
			      Cadastrar</button>
			      <button
			      id='btn-entrar'
			      onClick={this.onSubmit}>
			      	Entrar
			      </button>
			    </div>
			  </div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		token: state.token,
		logged: state.logged
	}
}

function mapDispatchToProps(dispatch) {
	return {
		logIn: (token) => {
			dispatch(logIn(token))
		},
		logOut: () => {
			dispatch(logOut())
		}
	}
}

export const CLogin = connect(mapStateToProps, mapDispatchToProps)(Login);