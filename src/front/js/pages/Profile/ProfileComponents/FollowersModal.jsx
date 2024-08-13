import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function FollowersModal({ show, onHide, followers, title }) {
    const images = require.context('../../../../img/pfp-avatars', false);
    const imageList = images.keys().map(image => images(image));
    const [searchInput, setSearchInput] = useState('')
    const [searchFollowers, setSearchFollowers] = useState(null)

    useEffect(() => {
        if (searchInput !== '') {
            handleFollowerSearch(searchInput)
        } else if (searchInput === '') {
            setSearchFollowers(followers)
        }
    }, [searchInput])

    function handleFollowerSearch(filter) {
        if (followers) {
            setSearchFollowers(followers.filter((item) => {
                if (item.username.includes(filter)) {
                    return item
                }
            }))
        }
    }

    function handleClose() {
        setSearchFollowers(null)
        setSearchInput('')
    }

    if (searchFollowers !== null && searchFollowers.length == 0) {
        return (
            <Modal
                className="updateInfo text-white bg-dark"
                show={show}
                onHide={() => { handleClose(); onHide() }}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex justify-content-center mb-3">
                        <input className="bg-dark w-75 searchInp text-white" placeholder="Search" type="text" value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
                    </div>
                    <div className="row d-flex justify-content-center mb-3 text-center">
                        <h1 className="1h-1 fw-bold display-6 text-white">No Results Found.</h1>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }

    return (
        <Modal
            className="updateInfo text-white bg-dark"
            show={show}
            onHide={() => { handleClose(); onHide() }}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton closeVariant="white">
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row d-flex justify-content-center mb-3">
                    <input className="bg-dark w-75 searchInp text-white" placeholder="Search" type="text" value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
                </div>
                <div className="" style={{ maxHeight: '350px', overflowY: 'auto', overflowX: 'hidden' }}>
                    {searchFollowers === null && followers ? followers.map((data, ind) => {
                        return (
                            <div className="row w-100 mx-5 my-2 d-flex align-items-center" key={ind} style={{ maxHeight: '75px' }}>
                                <div className="col-2">
                                    <img className="img-fluid rounded-circle" alt={data.username} src={imageList[data.profile_pic]?.default ? imageList[data.profile_pic]?.default : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'} />
                                </div>
                                <div className="col-6 ps-0 text-left">
                                    <a href={`/profile/${data.username}`} style={{ textDecoration: 'none' }}>
                                        <h6 className="text-white">{data.username}</h6>
                                    </a>
                                </div>
                                <div className="col-2">
                                    {/* Make a working unfollow button */}
                                </div>
                            </div>
                        )
                    }) : searchFollowers.map((data, ind) => {
                        return (
                            <div className="row w-100 mx-5 my-2 d-flex align-items-center" key={ind} style={{ maxHeight: '75px' }}>
                                <div className="col-2">
                                    <img className="img-fluid rounded-circle" alt={data.username} src={imageList[data.profile_pic]?.default ? imageList[data.profile_pic]?.default : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'} />
                                </div>
                                <div className="col-6 ps-0 text-left">
                                    <a href={`/profile/${data.username}`} style={{ textDecoration: 'none' }}>
                                        <h6 className="text-white">{data.username}</h6>
                                    </a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Modal.Body>
        </Modal>
    )
}