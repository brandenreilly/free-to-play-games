import React, { useContext , useState , useEffect } from "react";
import { Context } from "../../store/appContext";
import "../Display/display.css"
import { useNavigate } from "react-router-dom";

export const Display = () => {
    const { store , actions } = useContext(Context)
    const [ games , setGames ] = useState([])
    const [ selectValue,setSelectValue ] = useState("placeholder")
    const [ categoryValue, setCategoryValue ] = useState("Relevance")
    const [ selectPlatValue, setSelectPlatValue ] = useState("placeholder")
    const [ platformValue, setPlatformValue ] = useState("All")
    const [ genreValue, setGenreValue ] = useState("All")
    const navigate = useNavigate()
    const genre = ["All", "mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel", "zombie", "turn-based", "first-person", "third-Person", "top-down", "tank", "space", "sailing", "side-scroller", "superhero", "permadeath", "card", "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"]

    useEffect(()=>{    // Happens once on page load.
        getGames();
    },[])

    useEffect(()=>{
        sortGames(selectValue)
    },[selectValue])

    useEffect(()=>{
        filterByPlatformGames(selectPlatValue)
    },[platformValue])

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

    const sortGames = (keyword) => {
        if(keyword == "placeholder"){
        }
        else {
            let url = `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${keyword}`;
            let options = {
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
    }

    const filterByPlatformGames = (keyword) => {
        if(keyword == "placeholder"){
        }
        else {
            let url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${keyword}`
            let options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };
            fetch(url,options)
            .then(resp => resp.json())
            .then(data => setGames(data))
        }
    }

    return (
        <>
        <div className="row mx-auto mt-3 d-flex justify-content-center">
            <div className="col-9">
                <div className="row">
                    <div className="col-4 text-center align-items-center">
                        <button class="btn btn-dark text-light dropdown-toggle" style={{cursor: "pointer", textDecoration: "none"}} data-bs-toggle="dropdown" aria-expanded="false">
                            Sort By: {selectValue != "relevance" ? categoryValue : "Relevance"}
                        </button>
                        <ul class="dropdown-menu" style={{backgroundColor: "rgba(35, 37, 46, 0.9)"}}>
                            <li><h6 className="dropdown-header">Sort By Category</h6></li>
                            <li><button class="dropdown-item text-light" onClick={()=>{setSelectValue("relevance");setCategoryValue("Relevance")}}>Relevance</button></li>
                            <li><button class="dropdown-item text-light" onClick={()=>{setSelectValue("alphabetical");setCategoryValue("Alphabetical")}}>Alphabetical</button></li>
                            <li><button class="dropdown-item text-light" onClick={()=>{setSelectValue("popularity");setCategoryValue("Popularity")}}>Popularity</button></li>
                            <li><button class="dropdown-item text-light" onClick={()=>{setSelectValue("release-date");setCategoryValue("Release Date")}}>Release Date</button></li>
                        </ul>
                    </div>
                    <div className="col-4 text-center align-items-center">
                        <button class="btn btn-dark text-light dropdown-toggle" style={{cursor: "pointer", textDecoration: "none"}} data-bs-toggle="dropdown" aria-expanded="false">
                            Platform: {selectPlatValue != "all" ? platformValue : "All"}
                        </button>
                        <ul class="dropdown-menu" style={{backgroundColor: "rgba(35, 37, 46, 0.9)"}}>
                            <li><h6 className="dropdown-header">Browse By Platform</h6></li>
                            <li><button class="dropdown-item text-light" onClick={()=>{setSelectPlatValue("all");setPlatformValue("All")}}>All</button></li>
                            <li><button class="dropdown-item text-light" onClick={()=>{setSelectPlatValue("browser");setPlatformValue("Browser")}}>Browser</button></li>
                            <li><button class="dropdown-item text-light" onClick={()=>{setSelectPlatValue("pc");setPlatformValue("PC")}}>PC</button></li>
                        </ul>
                    </div>
                    <div className="col-4 text-center align-items-center">
                        <button class="btn btn-dark text-light dropdown-toggle" style={{cursor: "pointer", textDecoration: "none"}} data-bs-toggle="dropdown" aria-expanded="false">
                            Genre/Tag: {genreValue}
                        </button>
                        <ul class="dropdown-menu overflow-auto" style={{backgroundColor: "rgba(35, 37, 46, 0.9)", height: "200px"}}>
                            <li><h6 className="dropdown-header">Browse By Genre/Tag</h6></li>
                            {genre.map((genre, ind)=>{
                                return <li key={ind}><button className="dropdown-item text-light" onClick={()=>{setGenreValue(genre)}}>{genre}</button></li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mx-auto mt-3 d-flex justify-content-center">
            <div className="col-9">
                <div className="row mx-auto d-flex justify-content-center">
                    {games ? games.slice(0, 16).map((data, ind)=>{
                        return (
                            <div className="col-lg-3 col-md-6 col-xs-1 d-flex justify-content-center mx-0 mb-3 p-0 overflow-auto" key={ind}>
                                <div className="card card-styling" style={{width: "17rem"}}>
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
        </>
    )
}