import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { array } from "prop-types";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center d-flex justify-content-center mt-5 row mx-0" style={{ height: '80vh' }}>
			<div className="col-6">
				<div className="row h-50">
					<div className="d-flex justify-content-center align-items-end mb-5">
						<h1 style={{ color: "white" }}>Welcome</h1>
					</div>
				</div>
				<div className="row h-50 d-flex justify-content-center align-items-start mt-5">
					<div className="col-3"></div>
					<div className="col-6 d-flex justify-content-center">
						<Link to={'/signup'}>
							<button className="btn btn-light me-2">Create Account</button>
						</Link>
						<button className="btn btn-light ms-2">Login</button>
					</div>
					<div className="col-3"></div>
				</div>
			</div>
			<div className="col-6 d-flex align-items-center">
				<img className="rounded-pill" src="https://t4.ftcdn.net/jpg/05/64/31/67/360_F_564316725_zE8llusnCk3Sfr9rdfKya6fV7BQbjfyV.jpg" />
			</div>
		</div>
	);
};
