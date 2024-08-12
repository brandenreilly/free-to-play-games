import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import FollowersModal from "./ProfileComponents/FollowersModal.jsx";
import { Context } from "../../store/appContext.js";

export default function OtherProfile() {
    const { store } = useContext(Context)
    const images = require.context('../../../img/pfp-avatars', false);
    const imageList = images.keys().map(image => images(image));
    const [userObj, setUserObj] = useState(null)
    const [followingShow, setFollowingShow] = useState(false)
    const [newShow, setNewShow] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const [cookies] = useCookies()
    if (userObj?.followers) var follower_count = `${userObj.followers.length} followers`
    if (userObj?.following) var following_count = `${userObj.following.length} following`
    const token = cookies.token
    const backend = process.env.BACKEND_URL

    useEffect(() => {
        handleFetchProfile();
    }, [])

    useEffect(() => {
        if (store.user) {
            handleCheckFollowing();
        }
    }, [userObj, store.user])

    const handleNewShow = () => setNewShow(true);
    const handleNewClose = () => setNewShow(false)
    const handleFollowingShow = () => setFollowingShow(true)
    const handleFollowingClose = () => setFollowingShow(false)

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
                setUserObj({
                    data: data.user,
                    favorites: data.favorites,
                    followers: data.follow_data.followers,
                    following: data.follow_data.following
                });
            })
    }

    function handleCheckFollowing() {
        if (userObj) {
            userObj?.followers.filter((item) => {
                if (item.username === store.user.user.username) {
                    console.log('Following')
                    setIsFollowing(true)
                } else {
                    console.log('Not Following')
                    setIsFollowing(false)
                }
            })
        }
    }

    async function handleFollowUser() {
        const url = `api/follow/${userObj?.data?.username}`
        const opts = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const resp = await fetch(backend + url, opts)
        const data = await resp.json()
        let new_followers = data.just_followed
        setUserObj({ ...userObj, followers: new_followers })
        setIsFollowing(true)
    }

    async function handleUnfollowUser() {
        const url = `api/unfollow/${userObj?.data.username}`
        const opts = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const resp = await fetch(backend + url, opts)
        const data = await resp.json()
        let new_followers = data.just_unfollowed
        setUserObj({ ...userObj, followers: new_followers })
        setIsFollowing(false)
    }

    if (userObj === null) {
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
            <div className="container py-4 w-100">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="row w-100 mb-5 d-flex justify-content-center">
                            <div className="col-4 d-flex justify-content-center align-items-center" style={{ height: '250px', width: '250px' }}>
                                <img className="rounded-circle h-75 w-75" src={imageList.length != 0 && userObj != null ? userObj ? userObj.data.profile_pic ? imageList[userObj.data.profile_pic].default : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'} />
                            </div>
                            <div className="col-8 text-left mt-5">
                                <div className="row mb-3">
                                    <div className="col-8">
                                        <h2 className="text-light">{userObj != null ? userObj.data.username : 'Loading...'}</h2>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end">
                                        {isFollowing ? <button
                                            className="btn btn-outline-light text-white"
                                            style={{ borderRadius: '10px' }}
                                            onClick={() => { handleUnfollowUser() }}
                                        >Unfollow</button>
                                            : <button
                                                className="btn btn-outline-light text-white"
                                                style={{ borderRadius: '10px', backgroundColor: 'rgba(35, 37, 46, 0.9)' }}
                                                onClick={() => { handleFollowUser() }}
                                            >Follow
                                            </button>}
                                    </div>
                                    <div className="col-8">
                                        <div className="row">
                                            <div className="col-4">
                                                <a className="text-muted" style={{ textDecoration: 'none' }} onClick={handleNewShow}>
                                                    <strong style={{ cursor: 'pointer' }}>{follower_count}</strong>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a className="text-muted" style={{ textDecoration: 'none' }} onClick={handleFollowingShow}>
                                                    <strong style={{ cursor: 'pointer' }}>{following_count}</strong>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <p className="text-light mt-4 mb-2">{userObj != null ? userObj.data.bio != null ? userObj.data.bio : `${userObj?.data.username} has not set up a Bio yet.` : 'Loading...'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-12">
                        <div className="row d-flex justify-content-center text-center">
                            <h6 className="text-white mx-auto">{userObj !== null ? userObj.data.username : 'Loading...'}'s Favorites</h6>
                        </div>
                        <div className="row d-flex justify-content-start">
                            {userObj?.favorites.length !== 0 && userObj?.favorites.map((item, index) => {
                                return (
                                    <div className="mt-3 col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center my-2" key={index}>
                                        <div className="card card-styling h-100" style={{ width: "18rem", backgroundColor: 'rgba(35, 37, 46, 0.9)' }}>
                                            <img src={item.pic} className="card-img-top" alt={item.title} />
                                            <div className="card-body">
                                                <h5 className="card-title text-white">{item.title}</h5>
                                                <p className="card-text text-white scroll">{item.description}</p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-center ">
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
            </div>
            <FollowersModal show={newShow} onHide={handleNewClose} followers={userObj?.followers} title={'Followers'} />
            <FollowersModal show={followingShow} onHide={handleFollowingClose} followers={userObj?.following} title={'Following'} />
        </>
    )
}