import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import "../pages/Display/display.css"
import { array } from "prop-types";
import { Link } from "react-router-dom";
import HeroImage from "../component/Hero/hero.jsx";
import hero1Image from "../../img/hero_img_1.png"

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [recentGames, setRecentGames] = useState([])
	const hero1 = {
		title: "Browse The Latest Free-To-Play Games with Free2PlayFinder",
		desc: "Browse the most up-to-date list of Free-To-Play games, along with the ability to create an account and set your favorite games.",
		btn1Desc: 'Games List',
		btn1Nav: '/games',
		btn2Desc: 'Signup',
		btn2Nav: '/signup',
		src: hero1Image
	}

	useEffect(() => {
		if (recentGames.length === 0) {
			handleGetRecents()
		}
		else {

		}
	}, [])

	function handleGetRecents() {
		const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date'
		const opts = {
			method: 'GET',
			headers: {
				'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
				'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
			}
		}
		fetch(url, opts)
			.then(resp => resp.json())
			.then(data => setRecentGames(data))
	}


	return (
		<>
			<div className="text-center d-flex justify-content-center mt-3 row mx-0">
				<HeroImage data={hero1} />
			</div>
			<div className="text-center d-flex justify-content-center mt-2 row mx-0">
				<div className="col-10">
					<div className="row mx-auto d-flex justify-content-center">
						<div className="col-6 text-center">
							<h6 className="display-6 fw-bold text-white 1h-1">Most Recent Releases:</h6>
						</div>
					</div>
					<div className="row mx-auto d-flex justify-content-center">
						{recentGames.length !== 0 && recentGames.slice(0, 4).map((data, ind) => {
							return (
								<div className="card-shadow col-xxxl-2 col-xxxxl-2 col-lg-3 col-md-6 col-xs-1 d-flex justify-content-center mx-0 mb-3 p-0 overflow-auto" style={{ position: 'relative' }} key={ind}>
									<div className="card card-styling h-100" style={{ width: "17rem" }}>
										<Link to={`/game/${data.id}`} className="card-styling h-100" state={data.id} style={{ textDecoration: 'none' }}>
											<img src={data.thumbnail} className="card-img-top" alt={data.title} />
											<div className="card-body text-white">
												<h5 className="card-title">{data.title}</h5>
												<p className="card-text scroll">{data.short_description}</p>
											</div>
											<div className="card-footer d-flex justify-content-between align-items-center">
												<span className="text-light m-0">{(data.platform == 'PC (Windows)') ? <i className="fa-brands fa-lg fa-windows"></i> : <i className="fa-regular fa-lg fa-window-maximize"></i>}</span>
												<span className="badge rounded-pill bg-secondary text-light m-0 ms-3">{data.genre}</span>
											</div>
										</Link>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</>
	);
};
