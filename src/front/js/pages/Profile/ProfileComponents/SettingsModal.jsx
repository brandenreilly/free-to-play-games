import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function SettingsModal({ show, onHide, userObj, setUserObj }) {
    const images = require.context('../../../../img/pfp-avatars', false);
    const imageList = images.keys().map(image => images(image));
    const [radioGroup, setRadioGroup] = useState(null)
    const [textAreaInput, setTextAreaInput] = useState('')
    const token = sessionStorage.getItem('token')
    const backend = process.env.BACKEND_URL

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

    return (
        <Modal
            className="updateInfo text-white bg-dark"
            show={show}
            onHide={onHide}
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
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => { handleFunctions(); onHide() }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}