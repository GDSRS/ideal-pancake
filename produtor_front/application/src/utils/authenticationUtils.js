import { store } from '../app/store'

export function isLoggedIn() {
	return store.getState().logged && sessionStorage.getItem('userToken')
}