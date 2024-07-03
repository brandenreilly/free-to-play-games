import React from "react";
import { Link } from "react-router-dom";
import "../Navbar/navbar.css";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light">
			<div className="container">
				<Link to="/" style={{textDecoration: "none"}}>
					<span className="navbar-brand text-light mb-0 h1">F2PF</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-light">Login</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
