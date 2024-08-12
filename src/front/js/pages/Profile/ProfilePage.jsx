import React, { useState, useEffect, useRef } from "react";
import '../Profile/ProfilePage.css'
import '../Display/display.css'
import { useContext } from "react";
import { Context } from "../../store/appContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";
import FollowersModal from "./ProfileComponents/FollowersModal.jsx";
import SettingsModal from "./ProfileComponents/SettingsModal.jsx";

export function ProfilePage() {
    const images = require.context('../../../img/pfp-avatars', false);
    const imageList = images.keys().map(image => images(image));
    const { store } = useContext(Context)
    const [userObj, setUserObj] = useState(null)
    const [show, setShow] = useState(false);
    const [confirmShow, setConfirmShow] = useState(false)
    const [TBD, setTBD] = useState(null)
    const [followingShow, setFollowingShow] = useState(false)
    const [newShow, setNewShow] = useState(false)
    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')
    const backend = process.env.BACKEND_URL
    const err = store.error
    if (userObj?.followers) var follower_count = `${userObj.followers.length} followers`
    if (userObj?.following) var following_count = `${userObj.following.length} following`

    useEffect(() => {
        if (!userObj) {
            getUserData()
        }
    }, [])
    useEffect(() => {
        if (err === 'Invalid Token') {
            navigate('/')
        }
    }, [err])

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleConfirmShow = (id, ind) => { setTBD({ id: id, ind: ind }); setConfirmShow(true) }
    const handleConfirmClose = () => setConfirmShow(false)
    const handleNewShow = () => setNewShow(true);
    const handleNewClose = () => setNewShow(false)
    const handleFollowingShow = () => setFollowingShow(true)
    const handleFollowingClose = () => setFollowingShow(false)

    function getUserData() {
        const url = 'api/getuser'
        const opts = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        fetch(backend + url, opts)
            .then(resp => resp.json())
            .then(data => {
                setUserObj({
                    data: data.user,
                    favorites: data.favorites,
                    followers: data.follow_data.followers,
                    following: data.follow_data.following
                })
            })
    }

    function handleConfirm() {
        if (TBD !== null) {
            const url = `api/removefavorite/${TBD.id}`
            const opts = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            fetch(backend + url, opts)
                .then(resp => resp.json())
                .then(data => {
                    if (data?.msg === 'Deleted Successfully') {
                        let newArr = userObj.favorites.filter((item, ind) => { if (ind != TBD.ind) { return item } })
                        setUserObj({ ...userObj, favorites: newArr })
                        handleConfirmClose()
                        setTBD(null)
                    }
                    else {
                        alert('There was an error processing your request.')
                    }
                })
        }
    }

    if (!userObj) {
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
                                        <button className="border-0 bg-transparent" onClick={handleShow}>
                                            <i className="fas fa-cog fa-lg text-white"></i>
                                        </button>
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
                                        <p className="text-light mt-4 mb-2">{userObj != null ? userObj.data.bio != null ? userObj.data.bio : <button className="btn btn-light text-dark" onClick={handleShow} style={{ textDecoration: 'none' }} href="/update/bio">Click to update Bio</button> : 'Loading...'}</p>
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
                                            <div className="card-footer d-flex justify-content-between">
                                                <Link to={`/game/${item.game_id}`} state={item.game_id} style={{ textDecoration: 'none' }}>
                                                    <button className="btn btn-secondary text-light">Click for more details.</button>
                                                </Link>
                                                <button className="btn btn-secondary" onClick={() => handleConfirmShow(item.id, index)}>
                                                    <i className="fas fa-trash text-danger fa-lg"></i>
                                                </button>
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
            <SettingsModal show={show} onHide={handleClose} userObj={userObj} setUserObj={setUserObj} />

            <Modal
                className="updateInfo text-white"
                show={confirmShow}
                onHide={handleConfirmClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex justify-content-center">
                        <h4 className="">Are you sure you want to remove this game from favorites?</h4>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleConfirmClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}