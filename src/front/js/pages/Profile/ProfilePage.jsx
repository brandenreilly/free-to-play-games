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
    const [profPic, setProfPic] = useState(null)
    const [photoFile, setPhotoFile] = useState(null)
    const [photoData, setPhotoData] = useState(null)
    const backend = process.env.BACKEND_URL
    const selectedFile = document.getElementById("profPic")

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

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const response = await fetch(backend + 'api/get-photo/1');
                const data = await response.json();
                setPhotoData(data.photo_data)
            } catch (error) {
                console.error('Error fetching photo', error)
            }
        }

        fetchPhoto()
    }, [])

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPhotoFile(file); // Assuming you have a state variable to store the file
    };

    /* async function handleSubmit() {
        if (show) {
            const uploadForm = document.getElementById('profPicUpload')
            uploadForm.addEventListener('submit', function (e) {
                e.preventDefault()
                let file = e.target.profPic.files[0]
                let formData = new FormData()
                formData.append('file', file)
                formData.append('img', profPic)
                sendData(formData)
            })
        }
    } */

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('photo', photoFile); // 'photo' should match the name used in Flask

        // Example of sending the FormData to a backend API
        try {
            await fetch(backend + 'api/update/picture', {
                method: 'POST',
                body: formData
            });
            alert('Photo uploaded successfully');
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };

    async function sendData(data) {
        let url = 'api/update/picture'
        let opts = {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: data
        }
        fetch(backend + url, opts)
            .then(resp => resp.json())
            .then(data => console.log(data))
    }

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
                .then(data => actions.setMessage(data))
        }
        else {
            alert("Please fill out the Bio field.")
        }
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
                                {photoData && (
                                    console.log('photoData', photoData)
                                )}
                            </div>
                            <div className="col-6">
                                <h6 className="text-light">{userData != undefined ? userData.user.username : 'Loading...'}</h6>
                                <p className="text-light">{userData != undefined ? userData.user.bio != null ? userData.user.bio : <button className="btn btn-light text-dark" onClick={handleShow} style={{ textDecoration: 'none' }} href="/update/bio">Click to update Bio</button> : 'Loading...'}</p>\
                            </div>
                        </div>
                    </div>
                    <div className="col-2"><button className="border-0 bg-transparent" onClick={handleShow}><i className="fas fa-user-edit fa-lg text-white"></i></button></div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile Information:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="profPicUpload">
                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="profPic">Upload Profile Picture:</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <input type="file" name="profPic" id="profPic" accept="image/png, image/jpeg" onChange={handleFileChange} />
                            </div>
                            <div className="col-12">
                                <button className="btn btn-dark" type="submit" id="submitBtn" onClick={handleSubmit}>Upload Photo</button>
                            </div>
                        </div>
                    </form>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="updateBio">Update Bio:</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <textarea id="updateBio" value={textAreaInput} onChange={(e) => setTextAreaInput(e.target.value)} placeholder="Update..." />
                        </div>
                    </div>
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