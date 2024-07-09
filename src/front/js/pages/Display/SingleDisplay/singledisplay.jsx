import React, { useContext, useEffect, useState } from "react";
import "../SingleDisplay/singledisplay.css"
import { Context } from "../../../store/appContext";
import { useLocation } from "react-router-dom";

export const SingleDisplay = () => {
    let location = useLocation()
    const { store , actions } = useContext(Context)
    const [ gameDetails, setGameDetails ] = useState({})
    const data = location.state

    useEffect(()=>{     // Happens once on page load.
        getGameById(data.id)
    },[])

    const getGameById = (id) => {
            let url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}}`
            let options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                }
            }
            fetch(url,options)
            .then(resp => resp.json())
            .then(data => setGameDetails(data))
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-4">
                    <div className="sticky-top" style={{top: '80px'}}>
                        <div className="row d-flex justify-content-end">
                            <img src={gameDetails.thumbnail} alt={gameDetails.title} className="h-75 w-75"/>
                        </div>
                        <div className="row mt-2">
                            <div className="col-6 d-flex justify-content-end">
                                <button className="btn btn-secondary text-light" disabled>FREE</button>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <a className="btn btn-secondary text-light" href={gameDetails.game_url} target="_blank">Play Game</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-7 px-3">
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                    <h6 className="text-light">{gameDetails.description}</h6>
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    )
}