import React, { useContext, useState, useEffect, StrictMode } from "react";
import { Context } from "../../store/appContext";
import "../Display/display.css"
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useNextGames from "../../component/CustomHooks/useNextGames.jsx";
import Games from "../../component/CustomHooks/Games.js";
import Pagination from "../../component/CustomHooks/usePagination.js";
import useNextPageScroll from "../../component/CustomHooks/useNextPageScroll.js";

export const Display = () => {
    const { store, actions } = useContext(Context)
    const [games, setGames] = useState([])
    const [newGames, setNewGames] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const [type, setType] = useState(null)
    const [selectValue, setSelectValue] = useState("placeholder")
    const [categoryValue, setCategoryValue] = useState("Relevance")
    const [selectPlatValue, setSelectPlatValue] = useState("placeholder")
    const [platformValue, setPlatformValue] = useState("All")
    const [selectGenreValue, setSelectGenreValue] = useState("placeholder")
    const [genreValue, setGenreValue] = useState("All")
    const [show, setShow] = useState(false);
    const [last16, setLast16] = useState(0)
    const [next16, setNext16] = useState(16)
    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage] = useState(16)
    const navigate = useNavigate()
    const genre = ["All", "mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel", "zombie", "turn-based", "first-person", "third-Person", "top-down", "tank", "space", "sailing", "side-scroller", "superhero", "permadeath", "card", "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"]

    useEffect(() => {       // Happens once on page load.
        if (games.length != 0) return;
        else if (games.length == 0) {
            handleGetGames()
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    useEffect(() => {
        handleFirst16()
    }, [games])

    useEffect(() => {
        handleGetNextPage()
    }, [last16, next16])

    useEffect(() => {
        if (games.length >= 0) handleSearch(type)
    }, [inputValue])

    useEffect(() => {     // Happens when the Variable "selectValue" updates.
        handleSortGames(selectValue)
    }, [selectValue])

    useEffect(() => {     // Happens when the Variable "platformValue" updates.
        handleSortByPlatform(selectPlatValue)
    }, [platformValue])

    useEffect(() => {     // Happens when the Variable "genreValue" updates.
        handleSortByGenre(selectGenreValue)
    }, [genreValue])

    /* useEffect(() => {
        document.querySelector('#searchDropdown').addEventListener('click', function (event) {
            event.preventDefault()
        });
        return () => {
            document.querySelector('#searchDropdown').removeEventListener('click', function (event) {
                event.preventDefault()
            })
        }
    }, []) */

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSearch = (type) => {
        if (inputValue.length > 1) {
            let newArr = []
            if (type === 'title') {
                games.map((data, ind) => {
                    if (data.title.toLowerCase().includes(inputValue.toLowerCase())) {
                        newArr.push(data)
                        setGames(newArr)
                    }
                })
            } else if (type === 'dev') {
                games.map((data, ind) => {
                    if (data.developer.toLowerCase().includes(inputValue.toLowerCase())) {
                        newArr.push(data)
                        setGames(newArr)
                    }
                })
            } else if (type === 'pub') {
                games.map((data, ind) => {
                    if (data.publisher.toLowerCase().includes(inputValue.toLowerCase())) {
                        newArr.push(data)
                        setGames(newArr)
                    }
                })
            }
        }
        else if (inputValue.length === 0) {
            setNewGames(games)
        }
    }

    function handleGetGames() {
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

    function handleSortGames(keyword) {
        if (keyword == "placeholder") {
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

    function handleSortByGenre(keyword) {
        if (keyword == "placeholder") {
        }
        else if (keyword == "All") {
            let url = `https://free-to-play-games-database.p.rapidapi.com/api/games`
            let options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                }
            }
            fetch(url, options)
                .then(resp => resp.json())
                .then(data => setGames(data))
        } else {
            let url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${keyword}`
            let options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                }
            }
            fetch(url, options)
                .then(resp => resp.json())
                .then(data => setGames(data))
        }
    }
    function handleSortByPlatform(keyword) {
        if (keyword == "placeholder") {
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
            fetch(url, options)
                .then(resp => resp.json())
                .then(data => setGames(data))
        }
    }

    function handleType(clicked) {
        if (type == null || type != clicked) {
            setType(clicked)
        } else if (type == clicked) {
            setType(null)
        }
    }

    function handleNextPage() {
        if (last16 === undefined && next16 === undefined) {
            setLast16(0)
            setNext16(16)
        } else {
            setLast16(last16 + 16)
            setNext16(next16 + 16)
        }
    }

    function handleFirst16() {
        if (last16 === 0 && next16 === 16) {
            let newArr = useNextGames(games, 0, 16)
            setNewGames(newArr)
        }
        if (selectValue !== 'placeholder') {
            setLast16(0)
            setNext16(16)
        }
        if (selectGenreValue !== 'placeholder') {
            setLast16(0)
            setNext16(16)
        }
        if (selectPlatValue !== 'placeholder') {
            setLast16(0)
            setNext16(16)
        }
    }

    function handleGetNextPage() {
        setIsLoading(true)
        let nextPage = useNextGames(games, last16, next16)
        if (last16 === 0 && next16 === 16) {
            setNewGames(nextPage)
            setIsLoading(false)
        } else {
            setNewGames([...newGames, ...nextPage])
            setIsLoading(false)
        }
    }

    async function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.scrollHeight) {
            return;
        }
        setIsLoading(true)
        setLast16(last16 + 16)
        setNext16(next16 + 16)
        setIsLoading(false)
        /* setIsLoading(true);
        useNextPageScroll(gamesPerPage, games.length, currentPage, scrollPaginate)
        setIsLoading(false); */
    };

    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGame = indexOfLastGame - gamesPerPage
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame)

    function scrollPaginate(number) {
        setCurrentPage(number)
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="">
            {/* <div className="row mx-auto mt-3 d-flex justify-content-center">
                <div className="col-9" style={{ color: 'white' }}>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 text-center align-items-center">
                        <button type="button searchbutton" style={{ color: 'white' }} className={`btn btn-dark button-rounded ${type == 'title' && 'active'}`} onClick={() => handleType('title')}>Title</button>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center align-items-center">
                            <button type="button searchbutton" style={{ color: 'white' }} className={`btn btn-dark button-rounded ${type == 'dev' && 'active'}`} onClick={() => handleType('dev')}>Developer</button>
                            </div>
                        <div className="col-lg-4 col-md-6 text-center align-items-center">
                        <button type="button searchbutton" style={{ color: 'white' }} className={`btn btn-dark button-rounded ${type == 'pub' && 'active'}`} onClick={() => handleType('pub')}>Publisher</button>
                        </div>
                        </div>
                        </div>
                        </div>
                        {type !== null && <form className='mt-3'>
                        <div className='row mx-auto'>
                    <div className='col-6 d-flex justify-content-center mx-auto'>
                    <input type='text' aria-label='Search' placeholder="Search..." value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} className=' w-25 form-control' />
                    </div>
                    </div>
                    </form>} */}
            <div className="row mx-auto mt-3 d-flex justify-content-center">
                <div className="col-9">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 text-center align-items-center">
                            <button className="btn btn-dark button-rounded text-light dropdown-toggle" style={{ cursor: "pointer", textDecoration: "none" }} data-bs-toggle="dropdown" aria-expanded="false">
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
                        <div className="col-lg-3 col-md-6 text-center align-items-center">
                            <button className="button-rounded btn btn-dark text-light dropdown-toggle" style={{ cursor: "pointer", textDecoration: "none" }} data-bs-toggle="dropdown" aria-expanded="false">
                                Platform: {selectPlatValue != "all" ? platformValue : "All"}
                            </button>
                            <ul className="dropdown-menu" style={{ backgroundColor: "rgba(35, 37, 46, 0.9)" }}>
                                <li><h6 className="dropdown-header">Browse By Platform</h6></li>
                                <li><button className="dropdown-item text-light" onClick={() => { setSelectPlatValue("all"); setPlatformValue("All") }}>All</button></li>
                                <li><button className="dropdown-item text-light" onClick={() => { setSelectPlatValue("browser"); setPlatformValue("Browser") }}><i className="fa-regular fa-window-maximize"></i> Browser</button></li>
                                <li><button className="dropdown-item text-light" onClick={() => { setSelectPlatValue("pc"); setPlatformValue("PC") }}><i className="fa-brands fa-windows"></i> PC</button></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center align-items-center">
                            <button className="button-rounded btn btn-dark text-light dropdown-toggle" style={{ cursor: "pointer", textDecoration: "none" }} data-bs-toggle="dropdown" aria-expanded="false">
                                Genre/Tag: {genreValue}
                            </button>
                            <ul className="dropdown-menu overflow-auto" style={{ backgroundColor: "rgba(35, 37, 46, 0.9)", height: "200px" }}>
                                <li><h6 className="dropdown-header">Browse By Genre/Tag</h6></li>
                                {genre.map((genre, ind) => {
                                    return <li key={ind}><button className="dropdown-item text-light" onClick={() => { setSelectGenreValue(genre); setGenreValue(genre) }}>{genre}</button></li>
                                })}
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center align-items-center">
                            <button
                                className="btn btn-dark text-light button-rounded dropdown-toggle"
                                onClick={handleShow}
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >Search...</button>
                            <ul className="dropdown-menu bg-dark" id="searchDropdown">
                                <li className="dropdown-item">
                                    <label htmlFor="searchRadio1" className="sr-only">Title</label>
                                    <input type="radio" name="searchRadio" id="searchRadio1" className="btn btn-dark button-rounded" onClick={() => handleType('title')} />
                                    <label htmlFor="searchRadio1" className="text-light">Title</label>
                                </li>
                                <li className="dropdown-item">
                                    <label htmlFor="searchRadio2" className="sr-only">Developer</label>
                                    <input type="radio" name="searchRadio" id="searchRadio2" className="btn btn-dark button-rounded" onClick={() => handleType('dev')} />
                                    <label htmlFor="searchRadio2" className="text-light">Developer</label>
                                </li>
                                <li className="dropdown-item">
                                    <label htmlFor="searchRadio3" className="sr-only">Publisher</label>
                                    <input type="radio" name="searchRadio" id="searchRadio3" className="btn btn-dark button-rounded" onClick={() => handleType('pub')} />
                                    <label htmlFor="searchRadio3" className="text-light">Publisher</label>
                                </li>
                                {type !== null && <li className="dropdown-item">
                                    <label htmlFor="searchText" className="sr-only">Search</label>
                                    <input type="text" name="searchText" id="searchText" className="bg-light" aria-label='Search' placeholder="Search..." value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} />
                                </li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mx-auto mt-3 d-flex justify-content-center">
                <div className="col-10">
                    <div className="row mx-auto d-flex justify-content-center">
                        {newGames.length > 0 ? newGames.map((data, ind) => {
                            return (
                                <div className="card-shadow col-xxxl-2 col-xxxxl-2 col-lg-3 col-md-6 col-xs-1 d-flex justify-content-center mx-0 mb-3 p-0 overflow-auto" style={{ position: 'relative' }} key={ind}>
                                    <div className="card card-styling h-100" style={{ width: "17rem" }}>
                                        <Link to={`/game/${data.id}`} className="card-styling h-100" state={data.id} style={{ textDecoration: 'none' }}>
                                            <img src={data.thumbnail} className="card-img-top" alt={data.title} />
                                            <div className="card-body text-white">
                                                <h5 className="card-title">{data.title}</h5>
                                                <p className="card-text scroll">{data.short_description}</p>
                                            </div>
                                        </Link>
                                        <div className="card-footer d-flex justify-content-between align-items-center">
                                            <span className="text-light m-0">{(data.platform == 'PC (Windows)') ? <i className="fa-brands fa-lg fa-windows"></i> : <i className="fa-regular fa-lg fa-window-maximize"></i>}</span>
                                            <span className="badge rounded-pill bg-secondary text-light m-0 ms-3">{data.genre}</span>
                                            <div className="ms-auto">
                                                {/* <button className="text-light m-0 bg-transparent border-0"><i className="far fa-star fa-lg"></i></button> */}
                                                <button className="text-light m-0 bg-transparent border-0 favBTN" onClick={() => { actions.handleAddToWatch(data) }}><i className="far fa-eye fa-lg"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                    </div>
                    {/* <div className="row mx-auto d-flex justify-content-center">
                        <Pagination gamesPerPage={gamesPerPage} paginate={paginate} totalGames={games.length} />
                    </div> */}
                    <div className="row mx-auto d-flex justify-content-center">
                        {isLoading && <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}