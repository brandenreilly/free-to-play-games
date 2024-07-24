import React, { useState, useEffect, useRef } from "react";
import '../Profile/ProfilePage.css'
import { useContext } from "react";
import { Context } from "../../store/appContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function ProfilePage() {
    const { store, actions } = useContext(Context)
    const [textAreaInput, setTextAreaInput] = useState('')
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(undefined)
    const [show, setShow] = useState(false);
    const backend = process.env.BACKEND_URL

    useEffect(() => {
        if (token != null) return;
        else getToken()
    }, [])

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
            .then(data => actions.setMessage(data))
    }


    return (
        <>
            <div className="container py-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-6" style={{ height: '250px', width: '250px' }}>
                                <img className="rounded-circle h-100 w-100" src={userData != undefined ? userData.user.profile_pic ? userData.user.profile_pic : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' : 'Loading...'} />
                            </div>
                            <div className="col-6">
                                <h6 className="text-light">{userData != undefined ? userData.user.username : 'Loading...'}</h6>
                                <p className="text-light">{userData != undefined ? userData.user.bio != null ? userData.user.bio : <button className="btn btn-light text-dark" onClick={handleShow} style={{ textDecoration: 'none' }} href="/update/bio">Click to update Bio</button> : 'Loading...'}</p>\
                            </div>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea value={textAreaInput} onChange={(e) => setTextAreaInput(e.target.value)} placeholder="Update..." />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { sendUpdateBio(); handleClose() }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}