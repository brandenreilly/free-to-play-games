import React, { useContext, useEffect, useState } from "react";
import '../AdvFilter/AdvFilter.css'
import { Display } from "../display.jsx";
import { Context } from "../../../store/appContext";

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
        if (searchInput !== '') {
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

    function testFunction() {
        if (keyword === 'release-date') return 'Release Date'
        else if (keyword === 'popularity') return 'Popularity'
        else if (keyword === 'alphabetical') return 'Alphabetical'
        else if (keyword === 'relevance') return 'Relevance'
    }


    if (games === null) {
        return (
            <div className="container d-flex justify-content-center">
                <div className="row text-center d-flex justify-content-center">
                    <div className="col-6 text-center d-flex justify-content-center">
                        <h6 className="text-white display-6 1h-1 fw-bold">Loading...</h6>
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
                                        Sort By: {testFunction}
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
                            {filteredGames !== null && filteredGames.map((item, ind) => {
                                return (
                                    <h6 key={ind} className="text-white">{item.title}</h6>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}