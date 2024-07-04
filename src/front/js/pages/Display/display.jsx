import React, { useContext , useState , useEffect } from "react";
import { Context } from "../../store/appContext";
import { GameCard } from "../../component/GameCard/gamecard.jsx";
import "../Display/display.css"

export const Display = () => {
    const { store , actions } = useContext(Context)
    const [ games , setGames ] = useState(null)
    
    useEffect(()=>{    // Happens once on page load.
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
        <div className="row mx-auto mt-5 d-flex justify-content-center">
            <div className="col-2">
               <div className="row d-flex justify-content-center text-center align-items-center">
                    <p className="text-white">Categories</p>
               </div>
               <div className="row d-flex justify-content-center text-center">
                    <form className="d-flex justify-content-center">
                        <select className="form-control w-50">
                            <option value={"placeholder"}>Sort by...</option>
                            <option>Release Date</option>
                            <option>Popularity</option>
                            <option>Alphabetical</option>
                            <option>Relevance</option>
                        </select>
                    </form>
               </div>
            </div>
            <div className="col-10">
                <div className="row mx-auto mt-3 d-flex justify-content-center">
                    {games ? games.slice(0, 8).map((data, ind)=>{
                        {console.log(data)}
                        return (
                            <div className="col-3 d-flex justify-content-center mx-0 mb-3 p-0 overflow-auto">
                                <div className="card" style={{width: "18rem"}} key={ind}>
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
            </div>
        </div>
    )
}