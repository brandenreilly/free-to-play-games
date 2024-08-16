import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Navbar/navbar.css";
import f2pf_img from "../../../img/f2pf_Logo.png"
import { Context } from "../../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const [filteredGames, setFilteredGames] = useState(null)
	const [searchInput, setSearchInput] = useState('')
	const [expanded, setExpanded] = useState(false)

	useEffect(() => {
		if (searchInput !== '' && searchInput !== ' ') {
			handleSearchGames(searchInput)
			setExpanded(true)
		} else if (searchInput === '') {
			setFilteredGames(null)
			setExpanded(false)
		}
	}, [searchInput])

	function handleSearchGames(filter) {
		if (store.games) {
			setFilteredGames(store.games.filter((game) => {
				if (game.title.toLowerCase().includes(filter.toLowerCase())) {
					return game
				}
			}))
		}
	}

	return (
		<nav className="navbar navbar-expand-lg py-1 px-1 fixed-top">
			<div className="container-fluid">
				<Link to={'/'}>
					<img src={f2pf_img} style={{ height: '45px' }} />
				</Link>
				<button className="navbar-toggler navbar-dark navbar-styling" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation" style={{ color: 'white' }}>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
					<ul className="navbar-nav mb-2 mb-lg-0">
						{/* Items to put in Navbar goes here. */}
					</ul>
					{store.user !== null && store.user !== undefined && <Link to={'/profile'} style={{ marginLeft: 'auto' }}>
						<button className="btn text-light"><i className="fas fa-user-circle me-1"></i>Profile</button>
					</Link>}
					<Link to={'/games'} style={{ marginLeft: store.user ? '2%' : 'auto' }}>
						<button className="btn text-light"><i className="fas fa-book-open me-1"></i>Games</button>
					</Link>
					{/* 					<form className="d-flex">
						<input className="form-control me-2 bg-dark text-white" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
					</form>
					<ul>
						{filteredGames !== null && filteredGames.map((item) => {
							return <li key={item.id}>{item.title}</li>
						})}
					</ul> */}

					<Link to={'/search'} style={{ marginLeft: '2%' }}>
						<button className="btn text-light"><i className="fas fa-search me-1"></i>Search</button>
					</Link>
					{!store.user
						?
						<Link to={'/login'} style={{ marginLeft: '2%' }}>
							<button className="btn text-light"><i className="fas fa-sign-in-alt me-1"></i>Login</button>
						</Link>
						:
						<Link to={'/'} style={{ marginLeft: '2%' }}>
							<button className="btn text-light" onClick={actions.handleLogOut}><i className="fas fa-sign-out-alt me-1"></i>Logout</button>
						</Link>
					}
				</div>
			</div>
		</nav>
	);
};
