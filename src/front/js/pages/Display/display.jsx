import React, { useContext , useState , useEffect } from "react";
import { Context } from "../../store/appContext";
import { GameCard } from "../../component/GameCard/gamecard.jsx";
import "../Display/display.css"

export const Display = () => {
    const { store , actions } = useContext(Context)
    const [ games , setGames ] = useState(null)
    
    useEffect(()=>{         // Happens once on page load.
        getGames()
    },[])

    const getGames = () => {
        const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
        const options = {
	        method: 'GET',
	        headers: {
		        'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
		        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	        }
        };
        fetch(url, options)
        .then(resp => resp.json())
        .then(data => setGames(data))
    }

    return (
        <div className="row mx-auto mt-3 d-flex justify-content-center">
            {games ? games.slice(0, 10).map((data, ind)=>{
                return (
                    <div className="col-2 d-flex justify-content-center mx-3 mb-3">
                        <div className="card" style={{width: "18rem"}} key={ind}>
                            {console.log(data)}
                            <img src={data.thumbnail} className="card-img-top" alt={data.title}/>
                            <div className="card-body">
                                <h5 className="card-title">{data.title}</h5>
                                <p className="card-text scroll">{data.short_description}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-end">
                                <a href="#" className="btn btn-primary">Check it out!</a>
                            </div>
                        </div>
                    </div>
                )
            }) : <div className="d-flex justify-content-center text-center"><h5 className="text-white">LOADING</h5></div>}
        </div>
    )
}