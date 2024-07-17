import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../SearchPage/SearchPage.css'
import { SearchOptions } from './SearchOptions.jsx'


export const SearchPage = () => {
    const [gamesArr, setGamesArr] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [type, setType] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (gamesArr.length <= 0) handleFetch()
    }, [])

    useEffect(() => {
        if (gamesArr.length >= 0) handleSearch(type)
    }, [inputValue])

    const handleFetch = () => {
        const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
        const opts = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        fetch(url, opts)
            .then(resp => resp.json())
            .then(data => setGamesArr(data))
    }

    const handleSearch = (type) => {
        setLoading(true)

        if (inputValue.length > 2) {
            let newArr = []
            if (type === 'title') {
                gamesArr.map((data, ind) => {
                    if (data.title.toLowerCase().includes(inputValue.toLowerCase())) {
                        newArr.push(data)
                        setSearchResults(newArr)
                    }
                })
            } else if (type === 'dev') {
                gamesArr.map((data, ind) => {
                    if (data.developer.toLowerCase().includes(inputValue.toLowerCase())) {
                        newArr.push(data)
                        setSearchResults(newArr)
                    }
                })
            } else if (type === 'pub') {
                gamesArr.map((data, ind) => {
                    if (data.publisher.toLowerCase().includes(inputValue.toLowerCase())) {
                        newArr.push(data)
                        setSearchResults(newArr)
                    }
                })
            }
        }
        else if (inputValue.length === 0) {
            setSearchResults([])
        }
    }



    return (
        <>
            <div className='row mt-5 justify-content-center'>
                <div className='col-6 text-center'>
                    <h6 className='text-light'>Search By:</h6>
                </div>
            </div>
            <div className="row mt-2 justify-content-center">
                <div className="col d-flex justify-content-center" style={{ color: 'white' }}>
                    <button type="button searchbutton" style={{ color: 'white' }} className={`btn btn-outline-light button-rounded ${location.pathname == '/search/title' && 'active'}`} onClick={() => { navigate("/search/title"); setType('title') }}>Title</button>
                    <button type="button searchbutton" style={{ color: 'white' }} className={`btn btn-outline-light button-rounded ${location.pathname == '/search/dev' && 'active'}`} onClick={() => { navigate("/search/dev"); setType('dev') }}>Developer</button>
                    <button type="button searchbutton" style={{ color: 'white' }} className={`btn btn-outline-light button-rounded ${location.pathname == '/search/pub' && 'active'}`} onClick={() => { navigate("/search/pub"); setType('pub') }}>Publisher</button>
                </div>
            </div>
            {type !== null && <form className='mt-3'>
                <div className='row mx-auto'>
                    <div className='col-6 d-flex justify-content-center mx-auto'>
                        <input type='text' aria-label='Search' value={inputValue} onChange={(e) => setInputValue(e.target.value)} className=' w-25 form-control' />
                    </div>
                </div>
                <div className='row mx-auto'>
                    <div className='col-6 d-flex justify-content-center mx-auto'>
                        <button className='btn btn-success'>Search</button>
                    </div>
                </div>
            </form>}
            <div className='row mt-5 d-flex justify-content-center mx-auto'>
                <div className='col-10 mx-auto'>
                    <div className="row mx-auto d-flex justify-content-center">
                        {searchResults.length > 0 && searchResults.map((data, ind) => {
                            return (<div className="card-shadow col-lg-3 col-md-6 col-xs-1 d-flex justify-content-center mx-0 mb-3 p-0 overflow-auto" key={ind}>
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
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}