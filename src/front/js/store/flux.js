const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: null,
			games: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			fakeLogin: () => {
				setStore({ user: { user: 'admin', id: '1' } })
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
								return resp.json()
							}
							else {
								return alert("Invalid token. Please log in again.")
							}
						})
						.then(data => setStore({ user: data }))
				}
				else { }
			},
			handleLogIn: (usernameInput, passwordInput) => {
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
							alert("Incorrect Username or Password.")
						}
					})
					.then(data => {
						setStore({ user: data })
						sessionStorage.setItem("token", data.access_token)
					})
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
