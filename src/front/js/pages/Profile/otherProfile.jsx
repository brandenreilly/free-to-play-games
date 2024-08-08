import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export default function OtherProfile() {
    const images = require.context('../../../img/pfp-avatars', false);
    const imageList = images.keys().map(image => images(image));
    const [profileDetails, setProfileDetails] = useState(null)
    const [favs, setFavs] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies()
    const token = cookies.token
    const backend = process.env.BACKEND_URL

    useEffect(() => {
        handleFetchProfile()
    }, [])

    useEffect(() => {
        if (profileDetails !== null) console.log(profileDetails)
    }, [profileDetails])

    function handleFetchProfile() {
        const url = backend + `api${location.pathname}`
        const opts = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(url, opts)
            .then(resp => resp.json())
            .then(data => {
                setProfileDetails(data.user);
                setFavs(data.favorites)
            })
    }

    return (
        <>
            {profileDetails !== null ? <div className="container py-4 w-100">
                <div className="row d-flex justify-content-center">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-4 d-flex justify-content-center align-items-center" style={{ height: '250px', width: '250px' }}>
                                <img className="rounded-circle h-75 w-75" src={imageList.length != 0 && profileDetails != undefined ? profileDetails ? profileDetails.profile_pic ? imageList[profileDetails.profile_pic].default : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'} />
                            </div>
                            <div className="col-6 text-left mt-5">
                                <h2 className="text-light">{profileDetails != undefined ? profileDetails.username : 'Loading...'}</h2>
                                <p className="text-light mt-4">{profileDetails != undefined ? profileDetails.bio != null ? profileDetails.bio : <button className="btn btn-light text-dark" onClick={handleShow} style={{ textDecoration: 'none' }} href="/update/bio">Click to update Bio</button> : 'Loading...'}</p>
                            </div>
                            <div className="col-2 text-left mt-5">
                                <div className="row mt-2 socialIcon">
                                    <div className="col-2 d-flex align-items-center">
                                        <i className="fab fa-discord fa-lg text-white"></i>
                                    </div>
                                    <div className="col-10 d-flex align-items-center">
                                        <p className="text-white m-0">martxl</p>
                                    </div>
                                </div>
                                <div className="row mt-3 socialIcon">
                                    <div className="col-2 d-flex align-items-center">
                                        <i className="fab fa-steam fa-lg text-white"></i>
                                    </div>
                                    <div className="col-10 d-flex align-items-center">
                                        <p className="text-white m-0">martxl</p>
                                    </div>
                                </div>
                                <div className="row mt-3 socialIcon d-flex justify-content-center align-items-center">
                                    <div className="col-2 d-flex align-items-center">
                                        <i className="fab fa-battle-net fa-lg text-white"></i>
                                    </div>
                                    <div className="col-10 d-flex align-items-center">
                                        <p className="text-white m-0">martxl</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-12">
                        <div className="row d-flex justify-content-center text-center">
                            <h6 className="text-white mx-auto">{profileDetails !== undefined ? profileDetails.username : 'Loading...'}'s Favorites</h6>
                        </div>
                        <div className="row d-flex justify-content-start">
                            {favs.length !== 0 && favs.map((item, index) => {
                                return (
                                    <div className="mt-3 col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center my-2" key={index}>
                                        <div className="card card-styling h-100" style={{ width: "18rem", backgroundColor: 'rgba(35, 37, 46, 0.9)' }}>
                                            <img src={item.pic} className="card-img-top" alt={item.title} />
                                            <div className="card-body">
                                                <h5 className="card-title text-white">{item.title}</h5>
                                                <p className="card-text text-white scroll">{item.description}</p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <Link to={`/game/${item.game_id}`} state={item.game_id} style={{ textDecoration: 'none' }}>
                                                    <button className="btn btn-secondary text-light">Click for more details.</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div> : <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>}
        </>
    )
}