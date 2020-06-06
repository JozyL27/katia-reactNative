import TokenService from '../services/token-service'
import config from '../config'

const AuthApiService = {
  postLogin({ email, password }) {
    return fetch(`${config.API_ENDPOINT}/auth/token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e=> Promise.reject(e))
          : res.json()
      )
  },
  registerUser(user) {
    return fetch(`${config.API_ENDPOINT}/user`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...user
      })
    })
      .then(res => (
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      ))
  },
}

export default AuthApiService;