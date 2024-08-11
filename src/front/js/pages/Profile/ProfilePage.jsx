import React, { useState, useEffect, useRef } from "react";
import '../Profile/ProfilePage.css'
import '../Display/display.css'
import { useContext } from "react";
import { Context } from "../../store/appContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";

// Continue Refactoring.
// Try to reduce this component down to smaller mini-components.

export function ProfilePage() {
    const images = require.context('../../../img/pfp-avatars', false);
    const imageList = images.keys().map(image => images(image));
    const { store } = useContext(Context)
    const [textAreaInput, setTextAreaInput] = useState('')
    const [userObj, setUserObj] = useState(null)
    const [searchFollower, setSearchFollower] = useState(null)
    const [show, setShow] = useState(false);
    const [confirmShow, setConfirmShow] = useState(false)
    const [radioGroup, setRadioGroup] = useState(null)
    const [TBD, setTBD] = useState(null)
    const [newShow, setNewShow] = useState(false)
    const [searchInput, setSearchInput] = useState('')
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
    useEffect(() => {
        handleFollowerSearch(searchInput)
    }, [searchInput])

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleConfirmShow = (id, index) => { setTBD({ id: id, ind: index }); setConfirmShow(true) }
    const handleConfirmClose = () => setConfirmShow(false)
    const handleNewShow = () => setNewShow(true);
    const handleNewClose = () => {
        setNewShow(false)
        setSearchFollower(null)
        setSearchInput('')
    }

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

    function sendUpdateBio() {
        if (textAreaInput !== "") {
            const url = 'api/update/bio'
            const opts = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ "bio": textAreaInput })
            }
            fetch(backend + url, opts)
                .then(resp => resp.json())
                .then(data => {
                    const newBio = { ...userObj.data, bio: data.updated.bio }
                    setUserObj({ ...userObj, data: newBio })
                })
        }
    }

    function sendUpdateAvatar() {
        if (radioGroup !== null) {
            const url = "api/update/avatar"
            const opts = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ "profile_pic": radioGroup })
            }
            fetch(backend + url, opts)
                .then(resp => resp.json())
                .then(data => {
                    const newProfPic = { ...userObj.data, profile_pic: data.updated.profile_pic }
                    setUserObj({ ...userObj, data: newProfPic })
                })
        }
    }

    const updateUserProfile = async () => {
        const url = 'api/update/bio/profile'
        const opts = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ "profile_pic": radioGroup, "bio": textAreaInput })
        }
        try {
            const resp = await fetch(backend + url, opts);
            const data = await resp.json();
            const newInfo = { ...userObj.data, profile_pic: data.updated.pic.profile_pic, bio: data.updated.bio.bio };
            setUserObj({ ...userObj, data: newInfo });
        } catch (error) {
            console.error('Error updating the profile', error)
        }
    }

    function handleFunctions() {
        if (radioGroup !== null && textAreaInput === '') {
            sendUpdateAvatar();
        }
        else if (textAreaInput !== '' && radioGroup === null) {
            sendUpdateBio()
        }
        else if (radioGroup !== null && textAreaInput !== '') {
            updateUserProfile();
        }

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

    function handleFollowerSearch(filter) {
        if (userObj?.followers) {
            setSearchFollower(userObj.followers.filter((item) => {
                if (item.username.includes(filter)) {
                    return item
                }
            }))
        }
    }

    if (!userObj) {
        return (
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-6 text-end">
                    <h1 className="text-light 1h-1">Loading...</h1>
                </div>
                <div className="col-6 text-start">
                    <div class="spinner-border text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="container py-4 w-100">
                <div className="row d-flex justify-content-center">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="row mb-5">
                            <div className="col-4 d-flex justify-content-center align-items-center" style={{ height: '250px', width: '250px' }}>
                                <img className="rounded-circle h-75 w-75" src={imageList.length != 0 && userObj != null ? userObj ? userObj.data.profile_pic ? imageList[userObj.data.profile_pic].default : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'} />
                            </div>
                            <div className="col-8 text-left mt-5">
                                <div className="row mb-3">
                                    <div className="col-8">
                                        <h2 className="text-light">{userObj != null ? userObj.data.username : 'Loading...'}</h2>
                                    </div>
                                    <div className="col-4">
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
                                                <p className="text-muted"><strong>{following_count}</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <p className="text-light mt-4 mb-2">{userObj != null ? userObj.data.bio != null ? userObj.data.bio : <button className="btn btn-light text-dark" onClick={handleShow} style={{ textDecoration: 'none' }} href="/update/bio">Click to update Bio</button> : 'Loading...'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 p-0 mt-5">
                                <div className="row">
                                    <div className="col-6 text-left p-0">
                                    </div>
                                    <div className="col-6 text-left p-0">
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

            <Modal
                className="updateInfo text-white bg-dark"
                show={newShow}
                onHide={handleNewClose}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>Followers</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex justify-content-center mb-3">
                        <input className="bg-dark w-75 searchInp text-white" placeholder="Search" type="text" value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
                    </div>
                    {searchFollower === null && userObj?.followers ? userObj?.followers.map((data, ind) => {
                        return (
                            <div className="row w-100 mx-5 my-2 d-flex align-items-center" key={ind} style={{ maxHeight: '75px' }}>
                                <div className="col-2">
                                    <img className="img-fluid rounded-circle" alt={data.username} src={imageList[data.profile_pic]?.default ? imageList[data.profile_pic]?.default : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'} />
                                </div>
                                <div className="col-6 ps-0 text-left">
                                    <h6 className="text-white">{data.username}</h6>
                                </div>
                            </div>
                        )
                    }) : searchFollower.map((data, ind) => {
                        return (
                            <div className="row w-100 mx-5 my-2 d-flex align-items-center" key={ind} style={{ maxHeight: '75px' }}>
                                <div className="col-2">
                                    <img className="img-fluid rounded-circle" alt={data.username} src={imageList[data.profile_pic]?.default ? imageList[data.profile_pic]?.default : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'} />
                                </div>
                                <div className="col-6 ps-0 text-left">
                                    <h6 className="text-white">{data.username}</h6>
                                </div>
                            </div>
                        )
                    })}
                </Modal.Body>
            </Modal>

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
            <Modal
                className="updateInfo text-white bg-dark"
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>Update Profile Information:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex justify-content-center">
                        <div className="col-6 text-center">
                            <h6 className="text-white">
                                Update Avatar:
                            </h6>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center mt-2">
                        <div className="col-10">
                            <div className="row d-flex justify-content-center">
                                {imageList.length != 0 && imageList.map((image, index) => {
                                    return (
                                        <div className="col-lg-3 text-center" style={{ height: '150px', width: '150px' }} key={index}>
                                            <label htmlFor={`pfp-${index}`}><img className="h-75 w-75 rounded-circle" src={image.default} /></label>
                                            <input type="radio" checked={radioGroup == index} value={index} name="pfpRadioGroup" id={`pfp-${index}`} onChange={(e) => { setRadioGroup(e.target.value) }} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center mt-5">
                        <div className="col-12 text-center">
                            <h6 className="text-white">Update Bio:</h6>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center mt-2">
                        <div className="col-12 text-center">
                            <label className="sr-only">Update Bio</label>
                            <textarea className="w-50 h-100 text-white bg-transparent" id="updateBio" value={textAreaInput} onChange={(e) => setTextAreaInput(e.target.value)} placeholder="Update..." />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handleFunctions(); handleClose() }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}