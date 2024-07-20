import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Navbar/navbar.css";
import f2pf_img from "../../../img/f2pf_Logo.png"
import { Context } from "../../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context)

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
					{store.user !== null && <Link to={'/profile'} style={{ marginLeft: 'auto' }}>
						<button className="btn text-light"><i className="fas fa-user-circle me-1"></i>Profile</button>
					</Link>}
					<Link to={'/games'} style={{ marginLeft: store.user ? '2%' : 'auto' }}>
						<button className="btn text-light"><i className="fas fa-book-open me-1"></i>Games</button>
					</Link>
					<Link to={'/login'} style={{ marginLeft: '2%' }}>
						<button className="btn text-light"><i className="fas fa-sign-in-alt me-1"></i>Login</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
