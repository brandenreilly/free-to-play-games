import React, { useState, useEffect } from 'react'
import '../SearchPage/SearchPage.css'


export const SearchPage = () => {
    const [gamesArr, setGamesArr] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (gamesArr.length <= 0) handleFetch()
    }, [])

    useEffect(() => {
        if (gamesArr.length >= 0) handleSearch()
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

    const handleSearch = () => {
        setLoading(true)
        if (inputValue.length > 2) {
            gamesArr.map((data, ind) => {
                if (data.title.toLowerCase().includes(inputValue.toLowerCase())) {
                    setSearchResults(prevSearchResults => {
                        if (prevSearchResults.id != data.id)
                            return [...prevSearchResults, data];
                    });
                }
            })
        }
    }



    return (
        <>
            <form className='mt-3'>
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
            </form>

            <div className='row mt-5 d-flex justify-content-center mx-auto'>
                <div className='col-6 mx-auto'>
                    <p className='text-light text-center'>Search Results</p>
                    {searchResults.length > 0 && searchResults.map((data, ind) => {
                        return <p key={data.id} className='text-light text-center'>{data.title}</p>
                    })}
                </div>
            </div>
        </>
    )
}