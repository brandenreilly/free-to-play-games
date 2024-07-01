import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 row">
			<div className="col-6">
				<div className="row">
					<div className="d-flex justify-content-center">
						<h1 style={{color: "white"}}>Welcome</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<button className="btn btn-light">Test1</button>
					</div>
					<div className="col-6">
						<button className="btn btn-light">Test2</button>
					</div>
				</div>
			</div>
			<div className="col-6">

			</div>
		</div>
	);
};
