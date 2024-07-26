import React, { useState, useEffect, useRef } from "react";
import '../Profile/ProfilePage.css'
import { useContext } from "react";
import { Context } from "../../store/appContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
    const images = require.context('../../../img/pfp-avatars', false);
    const imageList = images.keys().map(image => images(image));
    const { store, actions } = useContext(Context)
    const [textAreaInput, setTextAreaInput] = useState('')
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(undefined)
    const [show, setShow] = useState(false);
    const [radioGroup, setRadioGroup] = useState(null)
    const [respMsg, setRespMsg] = useState(null)
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

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    function getToken() {
        let token = sessionStorage.getItem('token')
        setToken(token)
    }

    function getUserData() {
        const url = 'api/token'
        const opts = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        fetch(backend + url, opts)
            .then(resp => resp.json())
            .then(data => setUserData(data))
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

    return (
        <>
            <div className="container py-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-6 d-flex justify-content-center align-items-center" style={{ height: '250px', width: '250px' }}>
                                <img className="rounded-circle h-75 w-75" src={imageList.length != 0 && userData != undefined ? userData.user ? userData.user.profile_pic ? imageList[userData.user.profile_pic].default : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'} />
                            </div>
                            <div className="col-6 text-center mt-5">
                                <h6 className="text-light">{userData != undefined ? userData.user.username : 'Loading...'}</h6>
                                <p className="text-light mt-4">{userData != undefined ? userData.user.bio != null ? userData.user.bio : <button className="btn btn-light text-dark" onClick={handleShow} style={{ textDecoration: 'none' }} href="/update/bio">Click to update Bio</button> : 'Loading...'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-2"><button className="border-0 bg-transparent" onClick={handleShow}><i className="fas fa-user-edit fa-lg text-white"></i></button></div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="row">
                            {store.watchList.length !== 0 && store.watchList.map((item, index) => {
                                return (
                                    <div className="text-white" key={index}>
                                        <h6 className="text-white"></h6>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
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
                                        <div className="col-3 text-center" style={{ height: '150px', width: '150px' }} key={index}>
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