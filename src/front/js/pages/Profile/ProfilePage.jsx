import React, { useState, useEffect, useRef } from "react";
import '../Profile/ProfilePage.css'
import '../Display/display.css'
import { useContext } from "react";
import { Context } from "../../store/appContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";

export function ProfilePage() {
    const images = require.context('../../../img/pfp-avatars', false);
    const imageList = images.keys().map(image => images(image));
    const { store, actions } = useContext(Context)
    const [textAreaInput, setTextAreaInput] = useState('')
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(undefined)
    const [userFavs, setUserFavs] = useState([])
    const [show, setShow] = useState(false);
    const [confirmShow, setConfirmShow] = useState(false)
    const [radioGroup, setRadioGroup] = useState(null)
    const [respMsg, setRespMsg] = useState(null)
    const [TBD, setTBD] = useState(null)
    const navigate = useNavigate()
    const backend = process.env.BACKEND_URL
    const err = store.error

    useEffect(() => {
        if (err === 'Invalid Token') {
            navigate('/')
        }
    }, [err])

    useEffect(() => {
        if (token != null) return;
        else getToken()
    }, [])

    useEffect(() => {
        if (respMsg !== null) window.location.reload()
    }, [respMsg])

    useEffect(() => {
        if (userData !== undefined) return;
        else {
            if (token !== null) getUserData()
        }
    }, [token])

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleConfirmClose = () => setConfirmShow(false)
    const handleConfirmShow = (id, index) => { setTBD({ id: id, ind: index }); setConfirmShow(true) }

    function getToken() {
        let token = sessionStorage.getItem('token')
        setToken(token)
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
                setUserData(data.user);
                setUserFavs(data.favorites)
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
                .then(data => setRespMsg(data))
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
                .then(data => setRespMsg(data))
        }
    }

    function handleAllUpdates() {
        const url1 = 'api/update/avatar'
        const url2 = 'api/update/bio'
        const opts1 = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ "profile_pic": radioGroup })
        }
        const opts2 = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ "bio": textAreaInput })
        }
        fetch(backend + url1, opts1)
            .then(
                fetch(backend + url2, opts2)
                    .then(resp => resp.json())
                    .then(data => setRespMsg(data.msg))
            )
    }

    function handleFunctions() {
        if (radioGroup !== null && textAreaInput === '') {
            sendUpdateAvatar();
        }
        else if (textAreaInput !== '' && radioGroup === null) {
            sendUpdateBio()
        }
        else if (radioGroup !== null && textAreaInput !== '') {
            handleAllUpdates();
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
                        let newArr = userFavs.filter((item, ind) => { if (ind != TBD.ind) { return item } })
                        setUserFavs(newArr)
                        handleConfirmClose()
                        setTBD(null)
                    }
                    else {
                        alert('There was an error processing your request.')
                    }
                })
        }
    }

    return (
        <>
            <div className="container py-4 w-100">
                <div className="row d-flex justify-content-center">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-4 d-flex justify-content-center align-items-center" style={{ height: '250px', width: '250px' }}>
                                <img className="rounded-circle h-75 w-75" src={imageList.length != 0 && userData != undefined ? userData ? userData.profile_pic ? imageList[userData.profile_pic].default : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'} />
                            </div>
                            <div className="col-6 text-left mt-5">
                                <h2 className="text-light">{userData != undefined ? userData.username : 'Loading...'}</h2>
                                <p className="text-light mt-4">{userData != undefined ? userData.bio != null ? userData.bio : <button className="btn btn-light text-dark" onClick={handleShow} style={{ textDecoration: 'none' }} href="/update/bio">Click to update Bio</button> : 'Loading...'}</p>
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
                    <div className="col-1"><button className="border-0 bg-transparent" onClick={handleShow}><i className="fas fa-user-edit fa-lg text-white"></i></button></div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-12">
                        <div className="row d-flex justify-content-center text-center">
                            <h6 className="text-white mx-auto">{userData !== undefined ? userData.username : 'Loading...'}'s Favorites</h6>
                        </div>
                        <div className="row d-flex justify-content-start">
                            {userFavs.length !== 0 && userFavs.map((item, index) => {
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
                                                <button class="btn btn-secondary" onClick={() => handleConfirmShow(item.id, index)}>
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