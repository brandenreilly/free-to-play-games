import React, { useContext, useEffect, useState } from "react";
import "../SingleDisplay/singledisplay.css"
import { Context } from "../../../store/appContext";
import { useLocation } from "react-router-dom";

export const SingleDisplay = () => {
    let location = useLocation()
    const { store, actions } = useContext(Context)
    const [gameDetails, setGameDetails] = useState({})
    const data = location.state

    useEffect(() => {     // Happens once on page load.
        getGameById(data.id)
    }, [])

    const getGameById = (id) => {
        let url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}}`
        let options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        }
        fetch(url, options)
            .then(resp => resp.json())
            .then(data => setGameDetails(data))
    }
    var date = new Date(gameDetails.release_date)
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: 'America/New_York',
    };

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-4">
                    <div className="sticky-top" style={{ top: '80px' }}>
                        <div className="row d-flex justify-content-center">
                            <img src={gameDetails.thumbnail} alt={gameDetails.title} className="" />
                        </div>
                        <div className="row mt-2">
                            <div className="col-2 d-flex justify-content-start align-items-center">
                                <span className="badge rounded-pill bg-secondary text-light">FREE</span>
                            </div>
                            <div className="col-10 d-flex justify-content-end">
                                <a className="btn btn-secondary text-light w-100 h-100" href={gameDetails.game_url} target="_blank">Play Game</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-7 px-3">
                    <div className="row">
                        <div className="col-12">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="/" style={{ textDecoration: 'none', color: 'white' }}>Home</a></li>
                                <li class="breadcrumb-item"><a href="/games" style={{ textDecoration: 'none', color: 'white' }}>Games List</a></li>
                                <li class="breadcrumb-item active" aria-current="page">{gameDetails.title}</li>
                            </ol>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-light">{gameDetails.title}</h1>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>Publisher</p>
                            <p className="text-light my-auto">{gameDetails.publisher}</p>
                        </div>
                        <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>Developer</p>
                            <p className="text-light my-auto">{gameDetails.developer}</p>
                        </div>
                        <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>Release Date</p>
                            <p className="text-light my-auto">{date.toLocaleString('en-US', options)}</p>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>Genre</p>
                            <p className="text-light my-auto">{gameDetails.genre}</p>
                        </div>
                        <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>Platform</p>
                            {(gameDetails.platform == 'Windows') ? <div className="d-flex"><i className="fa-brands fa-windows text-light my-auto"></i><p className="text-light ms-1 my-auto"> Windows (Client)</p></div> : <div className="d-flex"><i className="fa-regular fa-window-maximize text-light my-auto"></i><p className="text-light ms-1 my-auto">Browser</p></div>}
                        </div>
                        {/* <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>Release Date</p>
                            <p className="text-light my-auto">{date.toLocaleString('en-US', options)}</p>
                        </div>  */}
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-secondary my-2"><strong>About {gameDetails.title}</strong></h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p className="text-light">{gameDetails.description}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-secondary my-2"><strong>{gameDetails.title} Screenshots</strong></h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p className="text-light">{gameDetails.description}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-secondary my-2"><strong>Minimum System Requirements</strong></h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p className="text-light">{gameDetails.description}</p>
                        </div>
                    </div>

                    {/* <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6> */}
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    )
}