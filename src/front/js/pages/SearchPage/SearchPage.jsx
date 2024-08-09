import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../SearchPage/SearchPage.css'
import { SearchOptions } from './SearchOptions.jsx'
import { useCookies } from 'react-cookie'
import { Context } from '../../store/appContext.js'

export const SearchPage = () => {
    const images = require.context('../../../img/pfp-avatars', false);
    const imageList = images.keys().map(image => images(image));
    const { store, actions } = useContext(Context)
    const [searchResults, setSearchResults] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies()
    const token = cookies.token
    const backend = process.env.BACKEND_URL
    const navigate = useNavigate()
    const controller = new AbortController();
    const signal = controller.signal

    useEffect(() => {
        if (searchInput !== '') {
            handleFetch()
        } else if (searchInput === '') {
            setSearchResults([])
        }
        return () => controller.abort()
    }, [searchInput])

    function handleFetch() {
        setLoading(true)
        const url = 'api/findusers'
        const opts = {
            method: 'POST',
            signal: signal,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(searchInput)
        }
        fetch(backend + url, opts)
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else if (resp.status == 422) {
                    throw new Error('No Authorization Token, Please Login')
                }
            })
            .then(data => {
                setSearchResults(data.results)
                setLoading(false)
            })
            .catch(e => alert(e))
    }
    return (
        <>
            <div className='row mt-5 justify-content-center'>
                <div className='col-6 text-center'>
                    <h6 className='text-light display-6 1h-1 fw-bold'>Search Users:</h6>
                </div>
            </div>
            <div className="row mt-2 justify-content-center">
                <div className="col-6 d-flex justify-content-center">
                    <label htmlFor="searchInput" className="sr-only">Username</label>
                    <input autoComplete='off' type="text" id="searchInput" className=" w-25 b-0" onChange={(e) => { setSearchInput(e.target.value) }} />
                </div>
            </div>
            <div className="row mt-2 justify-content-center d-flex text-center">
                {loading && <h1 className='text-white'>Loading...</h1>}
                {searchResults.length !== 0 && searchResults.map((data, ind) => {
                    return (
                        <div className="col-3" key={ind}>
                            <div className="card mb-4" style={{ backgroundColor: "rgba(35, 37, 46, 0.9)", maxWidth: '300px', maxheight: '300px' }}>
                                <div className="card-body text-center text-white">
                                    <img
                                        className="rounded-circle h-25 w-25"
                                        src={data.profile_pic !== null ? imageList[data.profile_pic].default : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'}
                                        alt={data.username}
                                        style={{ width: "150px" }}
                                    />
                                    <h5 className="mt-1">{data.username}</h5>
                                    <p className="text-muted overflow-auto">{data.bio !== null ? data.bio : 'This User has not added a Bio yet.'}</p>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-center mb-2">
                                        <Link to={`/profile/${data.username}`}>
                                            <button className='btn btn-outline-light text-light'>Profile</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>)
                })}
            </div>
        </>
    )
}