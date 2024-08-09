import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';

const getState = ({ getStore, getActions, setStore }) => {
	const [cookies, setCookie, removeCookie] = useCookies()
	return {
		store: {
			message: null,
			user: null,
			error: null,
			games: [],
			watchList: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			handleAddToWatch: (item) => {
				const token = sessionStorage.getItem('token')
				const backend = process.env.BACKEND_URL
				const url = 'api/addfavorite'
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify({
						'game_id': item.id,
						'title': item.title,
						'pic': item.thumbnail,
						'url': item.game_url,
						'genre': item.genre,
						'platform': item.platform,
						'developer': item.developer,
						'publisher': item.publisher,
						'description': item.short_description,
						'release_date': item.release_date
					})
				}
				fetch(backend + url, opts)
					.then(resp => resp.json())
					.then(data => {
						if (data.msg) {
							setStore({ message: data.msg })
						}
						else {
							setStore({ error: data.error })
						}
					})

			},

			handleGetGames: () => {
				const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
				const options = {
					method: 'GET',
					headers: {
						'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
						'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
					}
				};
				fetch(url, options)
					.then(resp => resp.json())
					.then(data => setStore({ games: data }))
			},

			handleSortGames: (keyword) => {
				if (keyword == "placeholder") {
				}
				else {
					let url = `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${keyword}`;
					let options = {
						method: 'GET',
						headers: {
							'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
							'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
						}
					};
					fetch(url, options)
						.then(resp => resp.json())
						.then(data => setStore({ games: data }))
				}
			},

			handleSortByGenre: (keyword) => {
				if (keyword == "placeholder") {
				}
				else if (keyword == "All") {
					let url = `https://free-to-play-games-database.p.rapidapi.com/api/games`
					let options = {
						method: 'GET',
						headers: {
							'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
							'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
						}
					}
					fetch(url, options)
						.then(resp => resp.json())
						.then(data => setStore({ games: data }))
				}
				else {
					let url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${keyword}`
					let options = {
						method: 'GET',
						headers: {
							'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
							'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
						}
					}
					fetch(url, options)
						.then(resp => resp.json())
						.then(data => setStore({ games: data }))
				}
			},

			handleSortByPlatform: (keyword) => {
				if (keyword == "placeholder") {
				}
				else {
					let url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${keyword}`
					let options = {
						method: 'GET',
						headers: {
							'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
							'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
						}
					};
					fetch(url, options)
						.then(resp => resp.json())
						.then(data => setStore({ games: data }))
				}
			},

			handleGetUserFromToken: () => {
				let token = sessionStorage.getItem('token')
				const opts = {
					method: 'GET',
					headers: {
						"Authorization": `Bearer ${token}`
					}
				}
				if (token) {
					fetch(process.env.BACKEND_URL + 'api/token', opts)
						.then(resp => {
							if (resp.ok) {
								setStore({ error: '' })
								return resp.json()
							}
							else {
								setStore({ error: 'Invalid Token' })
								sessionStorage.removeItem('token')
								throw new Error('Invalid Token, Please Refresh')
							}
						})
						.then(data => setStore({ user: data }))
						.catch(e => console.log(e))
				}
				else { }
			},

			handleRefreshToken: () => {
				let token = sessionStorage.getItem('token')
				let rfshTok = cookies.rfshTok
				if (!token) {
					if (rfshTok) {
						fetch(process.env.BACKEND_URL + 'api/refresh', { methods: 'GET', headers: { 'Authorization': `Bearer ${rfshTok}` } })
							.then(resp => {
								if (resp.ok) {
									return resp.json()
								} else {
									throw new Error('Refresh Token Expired, Please Re-Login')
								}
							})
							.then(data => {
								sessionStorage.setItem('token', data.access_token)
								setCookie('token', data.access_token)
							})
							.catch(e => console.log(e))
					}
				}
			},

			handleLogin: (usernameInput, passwordInput) => {
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: usernameInput,
						password: passwordInput
					})
				}

				fetch(process.env.BACKEND_URL + 'api/login', opts)
					.then(resp => {
						if (resp.ok) {
							return resp.json()
						}
						else {
							throw new Error('Username or Password Incorrect')
						}
					})
					.then(data => {
						setStore({ user: data })
						sessionStorage.setItem("token", data.access_token);
						if (cookies.token) {
							if (cookies.rfshTok) {
								removeCookie('token')
								removeCookie('rfshTok')
								setCookie('token', data.access_token)
								setCookie('rfshTok', data.refresh_token)
							}
							else {
								removeCookie('token');
								setCookie('token', data.access_token)
								setCookie('rfshTok', data.refresh_token)
							}
						}
						else {
							setCookie('token', data.access_token)
							setCookie('rfshTok', data.refresh_token)
						}
					})
					.catch(e => alert(e))
			},

			checkIfTokenExp: () => {
				let token = sessionStorage.getItem('token')
				if (!token) return true;
				try {
					const decodedToken = jwtDecode(token);
					const currentTime = Date.now() / 1000;
					return decodedToken.exp < currentTime;
				} catch (error) {
					console.error('Error decoding token:', error);
					return true;
				}
			},

			handleLogOut: () => {
				setStore({ user: undefined })
				sessionStorage.removeItem('token')
				removeCookie('token')
				removeCookie('rfshTok')
			},

			getUserData: () => {
				let token = sessionStorage.getItem("token")
				const url = 'api/token'
				const opts = {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
				fetch(process.env.BACKEND_URL + url, opts)
					.then(resp => resp.json())
					.then(data => console.log(data))
			},

			setMessage: (msg) => {
				setStore({ message: msg })
			},
			setError: (err) => {
				setStore({ error: err })
			},
		}
	};
};

export default getState;
