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
            <div className="row">
                <div className="col-4">
                    <div className="row">
                        <img src={gameDetails.thumbnail} alt={gameDetails.title}/>
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-start">
                            <button className="btn btn-secondary text-light" disabled>FREE</button>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <a className="btn btn-secondary text-light" href={gameDetails.game_url} target="_blank">Play Game</a>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <h6 className="text-light">{gameDetails.description}</h6>
                </div>
            </div>
        </div>
    )
}