import React, { useContext, useEffect, useState } from "react";
import '../AdvFilter/AdvFilter.css'
import { Context } from "../../../store/appContext";
import { Link } from "react-router-dom";

export const AdvancedFilter = () => {
    const { store, actions } = useContext(Context)
    const [games, setGames] = useState(null)
    const [filteredGames, setFilteredGames] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [keyword, setKeyWord] = useState('placeholder')

    useEffect(() => {
        if (games === null) {
            getGames()
        } else { }
    }, [])

    useEffect(() => {
        if (keyword !== 'placeholder') {
            handleSort(keyword)
        }
    }, [keyword])

    useEffect(() => {
        if (searchInput !== '' && searchInput !== ' ') {
            handleSearchGames(searchInput)
        } else if (searchInput === '') {
            setFilteredGames(null)
        }
    }, [searchInput])

    function handleSearchGames(filter) {
        if (store.games) {
            setFilteredGames(store.games.filter((game) => {
                if (game.title.toLowerCase().includes(filter.toLowerCase())) {
                    return game
                }
            }))
        }
    }

    async function getGames() {
        const opts = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        }
        const resp = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', opts)
        const data = await resp.json()
        setGames(data)
    }

    async function handleSort(key) {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${key}`
        const opts = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        }
        const resp = await fetch(url, opts)
        const data = await resp.json()
        setGames(data)
    }

    function returnJSX() {
        if (keyword === 'release-date') return 'Release Date'
        else if (keyword === 'popularity') return 'Popularity'
        else if (keyword === 'alphabetical') return 'Alphabetical'
        else if (keyword === 'relevance') return 'Relevance'
    }


    if (games === null) {
        return (
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-6 text-end">
                    <h1 className="text-light 1h-1">Loading...</h1>
                </div>
                <div className="col-6 text-start">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-3">
                        <div className="text-center filterBox">
                            <div className="row">
                                <div className="col-12">
                                    <input className="w-75 bg-dark text-white searchInputStyle" type="text" placeholder="Search Games" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <button className="btn btn-dark button-rounded text-light dropdown-toggle" style={{ cursor: "pointer", textDecoration: "none" }} data-bs-toggle="dropdown" aria-expanded="false">
                                        Sort By: {returnJSX()}
                                    </button>
                                    <ul className="dropdown-menu" style={{ backgroundColor: "rgba(35, 37, 46, 0.9)" }}>
                                        <li><h6 className="dropdown-header">Sort By Category</h6></li>
                                        <li><button className="dropdown-item text-light" onClick={() => { setKeyWord('relevance') }}>Relevance</button></li>
                                        <li><button className="dropdown-item text-light" onClick={() => { setKeyWord('alphabetical') }}>Alphabetical</button></li>
                                        <li><button className="dropdown-item text-light" onClick={() => { setKeyWord('popularity') }}>Popularity</button></li>
                                        <li><button className="dropdown-item text-light" onClick={() => { setKeyWord("release-date") }}>Release Date</button></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row mt-3">
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row d-flex justify-content-center">
                            {filteredGames !== null ? filteredGames.map((data, ind) => {
                                return (
                                    <div className="card-shadow col-xxxl-2 col-xxxxl-2 col-lg-4 col-md-6 col-xs-1 d-flex justify-content-center mx-0 mb-3 p-0 overflow-auto" style={{ position: 'relative' }} key={ind}>
                                        <div className="card card-styling h-100" style={{ width: "20rem" }}>
                                            <Link to={`/game/${data.id}`} className="card-styling h-100" state={data.id} style={{ textDecoration: 'none' }}>
                                                <img src={data.thumbnail} className="card-img-top" alt={data.title} />
                                                <div className="card-body text-white">
                                                    <h5 className="card-title">{data.title}</h5>
                                                    <p className="card-text scroll">{data.short_description}</p>
                                                </div>
                                                <div className="card-footer d-flex justify-content-between align-items-center">
                                                    <span className="text-light m-0">{(data.platform == 'PC (Windows)') ? <i className="fa-brands fa-lg fa-windows"></i> : <i className="fa-regular fa-lg fa-window-maximize"></i>}</span>
                                                    <span className="badge rounded-pill bg-secondary text-light m-0 ms-3">{data.genre}</span>
                                                    <div className="ms-auto">
                                                        {/* <button className="text-light m-0 bg-transparent border-0"><i className="far fa-star fa-lg"></i></button> */}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }) : <div className="text-center"><h6 className="mt-3 display-6 1h-1 fw-bold text-white">Start searching to display games.</h6></div>}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}