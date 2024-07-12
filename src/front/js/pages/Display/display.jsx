import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../Display/display.css"
import { Link, useNavigate } from "react-router-dom";

export const Display = () => {
    const { store, actions } = useContext(Context)
    const [selectValue, setSelectValue] = useState("placeholder")
    const [categoryValue, setCategoryValue] = useState("Relevance")
    const [selectPlatValue, setSelectPlatValue] = useState("placeholder")
    const [platformValue, setPlatformValue] = useState("All")
    const [selectGenreValue, setSelectGenreValue] = useState("placeholder")
    const [genreValue, setGenreValue] = useState("All")
    const navigate = useNavigate()
    const genre = ["All", "mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel", "zombie", "turn-based", "first-person", "third-Person", "top-down", "tank", "space", "sailing", "side-scroller", "superhero", "permadeath", "card", "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"]

    useEffect(() => {     // Happens when the Variable "selectValue" updates.
        actions.handleSortGames(selectValue)
    }, [selectValue])

    useEffect(() => {     // Happens when the Variable "platformValue" updates.
        actions.handleSortByPlatform(selectPlatValue)
    }, [platformValue])

    useEffect(() => {     // Happens when the Variable "genreValue" updates.
        actions.handleSortByGenre(selectGenreValue)
    }, [genreValue])

    return (
        <div className="">
            <div className="row mx-auto mt-3 d-flex justify-content-center">
                <div className="col-9">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 text-center align-items-center">
                            <button className="btn btn-dark text-light dropdown-toggle" style={{ cursor: "pointer", textDecoration: "none" }} data-bs-toggle="dropdown" aria-expanded="false">
                                Sort By: {selectValue != "relevance" ? categoryValue : "Relevance"}
                            </button>
                            <ul className="dropdown-menu" style={{ backgroundColor: "rgba(35, 37, 46, 0.9)" }}>
                                <li><h6 className="dropdown-header">Sort By Category</h6></li>
                                <li><button className="dropdown-item text-light" onClick={() => { setSelectValue("relevance"); setCategoryValue("Relevance") }}>Relevance</button></li>
                                <li><button className="dropdown-item text-light" onClick={() => { setSelectValue("alphabetical"); setCategoryValue("Alphabetical") }}>Alphabetical</button></li>
                                <li><button className="dropdown-item text-light" onClick={() => { setSelectValue("popularity"); setCategoryValue("Popularity") }}>Popularity</button></li>
                                <li><button className="dropdown-item text-light" onClick={() => { setSelectValue("release-date"); setCategoryValue("Release Date") }}>Release Date</button></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center align-items-center">
                            <button className="btn btn-dark text-light dropdown-toggle" style={{ cursor: "pointer", textDecoration: "none" }} data-bs-toggle="dropdown" aria-expanded="false">
                                Platform: {selectPlatValue != "all" ? platformValue : "All"}
                            </button>
                            <ul className="dropdown-menu" style={{ backgroundColor: "rgba(35, 37, 46, 0.9)" }}>
                                <li><h6 className="dropdown-header">Browse By Platform</h6></li>
                                <li><button className="dropdown-item text-light" onClick={() => { setSelectPlatValue("all"); setPlatformValue("All") }}>All</button></li>
                                <li><button className="dropdown-item text-light" onClick={() => { setSelectPlatValue("browser"); setPlatformValue("Browser") }}><i className="fa-regular fa-window-maximize"></i> Browser</button></li>
                                <li><button className="dropdown-item text-light" onClick={() => { setSelectPlatValue("pc"); setPlatformValue("PC") }}><i className="fa-brands fa-windows"></i> PC</button></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center align-items-center">
                            <button className="btn btn-dark text-light dropdown-toggle" style={{ cursor: "pointer", textDecoration: "none" }} data-bs-toggle="dropdown" aria-expanded="false">
                                Genre/Tag: {genreValue}
                            </button>
                            <ul className="dropdown-menu overflow-auto" style={{ backgroundColor: "rgba(35, 37, 46, 0.9)", height: "200px" }}>
                                <li><h6 className="dropdown-header">Browse By Genre/Tag</h6></li>
                                {genre.map((genre, ind) => {
                                    return <li key={ind}><button className="dropdown-item text-light" onClick={() => { setSelectGenreValue(genre); setGenreValue(genre) }}>{genre}</button></li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mx-auto mt-3 d-flex justify-content-center">
                <div className="col-9">
                    <div className="row mx-auto d-flex justify-content-center">
                        {store.games.length > 0 ? store.games.slice(0, 16).map((data, ind) => {
                            sessionStorage.setItem('arrValue', ind + 1)
                            return (
                                <div className="card-shadow col-lg-3 col-md-6 col-xs-1 d-flex justify-content-center mx-0 mb-3 p-0 overflow-auto" key={ind}>
                                    <Link to={`/game/${data.id}`} state={data} style={{ textDecoration: 'none' }}>
                                        <div className="card card-styling h-100" style={{ width: "17rem" }}>
                                            <img src={data.thumbnail} className="card-img-top" alt={data.title} />
                                            <div className="card-body">
                                                <h5 className="card-title">{data.title}</h5>
                                                <p className="card-text scroll">{data.short_description}</p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between align-items-center">
                                                <span className="badge rounded-pill bg-secondary text-light m-0">{data.genre}</span>
                                                <span className="text-light m-0">{(data.platform == 'PC (Windows)') ? <i className="fa-brands fa-windows"></i> : <i className="fa-regular fa-window-maximize"></i>}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }) : <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                    </div>
                    <div className="row mx-auto d-flex justify-content-center">
                    </div>
                </div>
            </div>
        </div>
    )
}