import React from "react";
import { Link } from "react-router-dom";
import "../Navbar/navbar.css";
import f2pf_img from "../../../img/f2pf_Logo.png"

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg py-1 px-1 fixed-top">
			<div className="container-fluid">
				<img src={f2pf_img} style={{ height: '45px' }} />
				<button className="navbar-toggler navbar-dark navbar-styling" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation" style={{ color: 'white' }}>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						{/* Items to put in Navbar goes here. */}
					</ul>
					<Link to={'/games'}>
						<button className="btn btn-outline-light">Games</button>
					</Link>
					<Link to={'/login'}>
						<button className="btn btn-outline-light">Login</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
