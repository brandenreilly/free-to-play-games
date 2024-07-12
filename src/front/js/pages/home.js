import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { array } from "prop-types";

export const Home = () => {
	const { store, actions } = useContext(Context);


	return (
		<div className="text-center d-flex justify-content-center mt-5 row mx-0">
			<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
				<div class="carousel-inner">
					<div class="cards-wrapper">
						<div class="card d-none d-md-block">
							<img src={store.games.length != 0 && store.games[0].thumbnail} class="card-img-top" alt="..." />
							<div class="card-body">
								<h5 class="card-title">Card title</h5>
								<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<a href="#" class="btn btn-primary">Go somewhere</a>
							</div>
						</div>
						<div class="card d-none d-md-block">
							<img src={store.games.length != 0 && store.games[1].thumbnail} class="card-img-top" alt="..." />
							<div class="card-body">
								<h5 class="card-title">Card title</h5>
								<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<a href="#" class="btn btn-primary">Go somewhere</a>
							</div>
						</div>
						<div class="card d-none d-md-block">
							<img src={store.games.length != 0 && store.games[2].thumbnail} class="card-img-top" alt="..." />
							<div class="card-body">
								<h5 class="card-title">Card title</h5>
								<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<a href="#" class="btn btn-primary">Go somewhere</a>
							</div>
						</div>
					</div>
				</div>
				<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="sr-only">Previous</span>
				</a>
				<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="sr-only">Next</span>
				</a>
			</div>
			{/* <div className="col-6">
				<div className="row h-50">
					<div className="d-flex justify-content-center align-items-end mb-5">
						<h1 style={{ color: "white" }}>Welcome</h1>
					</div>
				</div>
				<div className="row h-50 d-flex justify-content-center align-items-start mt-5">
					<div className="col-3"></div>
					<div className="col-6 d-flex justify-content-center">
						<button className="btn btn-light me-2">Create Account</button>
						<button className="btn btn-light ms-2">Login</button>
					</div>
					<div className="col-3"></div>
				</div>
			</div>
			<div className="col-6 d-flex align-items-center">
				<img className="rounded-pill" src="https://t4.ftcdn.net/jpg/05/64/31/67/360_F_564316725_zE8llusnCk3Sfr9rdfKya6fV7BQbjfyV.jpg" />
			</div> */}
		</div>
	);
};
