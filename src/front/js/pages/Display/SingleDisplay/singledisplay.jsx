import React, { useContext, useEffect, useState, useRef } from "react";
import "../SingleDisplay/singledisplay.css"
import { Context } from "../../../store/appContext";
import { useLocation } from "react-router-dom";
import ScrollToTop from "../../../component/scrollToTop";

export const SingleDisplay = () => {
    let location = useLocation()
    const { store, actions } = useContext(Context)
    const [gameDetails, setGameDetails] = useState({})
    const [activeImage, setActiveImage] = useState()
    const data = location.state
    const dialogRef = useRef()

    useEffect(() => {     // Happens once on page load.
        getGameById(data)
        document.body.addEventListener('click', clickClose)
        console.log(window.location.pathname)
        return () => {
            document.body.removeEventListener('click', clickClose)
        }
    }, [])

    useEffect(() => {
        if (!activeImage) return;
        dialogRef.current.showModal();
        window.scrollTo(0, 0)
        dialogRef.current.addEventListener('close', closeModal);
        document.body.style.overflow = 'hidden';
        document.body.addEventListener('keydown', handleOnKeyDown);

        return () => {
            dialogRef.current.removeEventListener('close', closeModal)
            document.body.removeEventListener('keydown', handleOnKeyDown);
        }
    }, [activeImage])

    function clickClose(e) {
        const diagContainer = document.querySelector('.dialogContainer')
        if (diagContainer && !e.composedPath().includes(diagContainer)) {
            dialogRef.current.close();
            setActiveImage(undefined);
            document.body.style.overflow = '';
            console.log(e.composedPath())
        }
    }

    const closeModal = () => {
        if (!activeImage) return
        else dialogRef.current.close(); setActiveImage(undefined); document.body.style.overflow = ''
    }

    function handleOnKeyDown(e) {
        if (!gameDetails.screenshots) return;
        const currentIndex = gameDetails.screenshots?.findIndex(({ id }) => id === activeImage.id)
        if (typeof currentIndex === 'undefined') return;
        if (e.key === 'ArrowRight') {
            if (currentIndex + 1 < gameDetails.screenshots.length) {
                const nextImage = gameDetails.screenshots[currentIndex + 1]
                setActiveImage(nextImage)
            } else {
                const nextImage = gameDetails.screenshots[0]
                setActiveImage(nextImage)
            }
        }
        else if (e.key === 'ArrowLeft') {
            if (currentIndex !== 0) {
                const nextImage = gameDetails.screenshots[currentIndex - 1]
                setActiveImage(nextImage)
            } else {
                const nextImage = gameDetails.screenshots[gameDetails.screenshots.length - 1]
                setActiveImage(nextImage)
            }
        }
    }

    function handleLeft() {
        if (!gameDetails.screenshots) return;
        const currentIndex = gameDetails.screenshots?.findIndex(({ id }) => id === activeImage.id)
        if (typeof currentIndex === 'undefined') return;
        if (currentIndex !== 0) {
            const nextImage = gameDetails.screenshots[currentIndex - 1]
            setActiveImage(nextImage)
        } else {
            const nextImage = gameDetails.screenshots[gameDetails.screenshots.length - 1]
            setActiveImage(nextImage)
        }
    }

    function handleRight() {
        if (!gameDetails.screenshots) return;
        const currentIndex = gameDetails.screenshots?.findIndex(({ id }) => id === activeImage.id)
        if (typeof currentIndex === 'undefined') return;
        if (currentIndex + 1 < gameDetails.screenshots.length) {
            const nextImage = gameDetails.screenshots[currentIndex + 1]
            setActiveImage(nextImage)
        } else {
            const nextImage = gameDetails.screenshots[0]
            setActiveImage(nextImage)
        }
    }

    const getGameById = (id) => {
        let url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}}`
        let options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        }
        fetch(url, options)
            .then(resp => resp.json())
            .then(data => setGameDetails(data))
    }

    var date = new Date(gameDetails.release_date)
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: 'America/New_York',
    };
    return (
        <div className="container mb-5">
            <div className="row mt-5">
                <div className="col-lg-4 col-sm-12">
                    <div className="sticky-top" style={{ top: '80px' }}>
                        <div className="row d-flex justify-content-center">
                            <img src={gameDetails.thumbnail} alt={gameDetails.title} className="" />
                        </div>
                        <div className="row mt-2">
                            <div className="col-2 d-flex justify-content-center align-items-center">
                                <span className="badge rounded-pill bg-secondary text-light">{(gameDetails) && gameDetails.status?.toUpperCase()}</span>
                            </div>
                            <div className="col-10 d-flex justify-content-end">
                                <a className="btn btn-secondary text-light w-100 h-100" href={gameDetails.game_url} target="_blank">Play Game</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-7 px-3">
                    <div className="row">
                        <div className="col-12">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/" style={{ textDecoration: 'none', color: 'white' }}>Home</a></li>
                                <li className="breadcrumb-item"><a href="/games" style={{ textDecoration: 'none', color: 'white' }}>Games List</a></li>
                                <li className="breadcrumb-item" aria-current="page">{gameDetails.title}</li>
                            </ol>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-lg-start text-sm-center">
                            <h1 className="text-light">{gameDetails.title}</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-secondary my-2"><strong>About {gameDetails.title}</strong></h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p className="text-light">{gameDetails.description}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-secondary my-2"><strong>{gameDetails.title} Screenshots</strong></h3>
                        </div>
                    </div>
                    <div className="row">
                        {(gameDetails.screenshots) ? gameDetails.screenshots.map((data, ind) => {
                            return (
                                <div className="col-4" key={`${data.id}_${ind}`}>
                                    <a className="" onClick={() => setActiveImage({ image: data.image, id: data.id })}>
                                        <img className="rounded img-fluid" src={data.image} />
                                    </a>
                                </div>
                            )
                        }) : <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <h3 className="text-secondary"><strong>Additional Information</strong></h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h6 className="text-secondary"><i className="fa-solid fa-circle-info"></i> Please note this free-to-play game may or may not offer optional in-game purchases.</h6>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>Publisher</p>
                            <p className="text-light my-auto">{gameDetails.publisher}</p>
                        </div>
                        <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>Developer</p>
                            <p className="text-light my-auto">{gameDetails.developer}</p>
                        </div>
                        <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>Release Date</p>
                            <p className="text-light my-auto">{date.toLocaleString('en-US', options)}</p>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>Genre</p>
                            <p className="text-light my-auto">{gameDetails.genre}</p>
                        </div>
                        <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>Platform</p>
                            {(gameDetails.platform == 'Windows') ? <div className="d-flex"><i className="fa-brands fa-windows text-light my-auto"></i><p className="text-light ms-1 my-auto"> Windows (Client)</p></div> : <div className="d-flex"><i className="fa-regular fa-window-maximize text-light my-auto"></i><p className="text-light ms-1 my-auto">Browser</p></div>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-secondary my-2"><strong>Minimum System Requirements</strong></h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>OS:</p>
                            <p className="text-light">{(gameDetails.minimum_system_requirements) && gameDetails.minimum_system_requirements.os}</p>
                        </div>
                        <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>Memory:</p>
                            <p className="text-light my-auto">{(gameDetails.minimum_system_requirements) && gameDetails.minimum_system_requirements.memory}</p>
                        </div>
                        <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>Graphics:</p>
                            <p className="text-light my-auto">{(gameDetails.minimum_system_requirements) && gameDetails.minimum_system_requirements.graphics}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>Storage:</p>
                            <p className="text-light my-auto">{(gameDetails.minimum_system_requirements) && gameDetails.minimum_system_requirements.storage}</p>
                        </div>
                        <div className="col-4">
                            <p className="text-secondary my-auto" style={{ display: 'block' }}>Processor:</p>
                            <p className="text-light my-auto">{(gameDetails.minimum_system_requirements) && gameDetails.minimum_system_requirements.processor}</p>
                        </div>
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
            <dialog className="p-0 position-relative overflow-visible" ref={dialogRef}>
                <div className="position-relative dialogContainer" style={{ zIndex: '0' }}>
                    {(activeImage && <img className="" style={{ width: "100%", height: "95%" }} src={activeImage.image} />)}
                    <button className="shadow p-0 d-flex justify-content-center align-items-center position-absolute" onClick={handleLeft} style={{ top: '50%', left: '-0px', zIndex: 'auto', border: 'none', height: '28px', width: '28px', backgroundColor: 'transparent' }}><i className="fa-solid fa-chevron-left fa-xl text-light"></i></button>
                    <button className="shadow p-0 d-flex justify-content-center align-items-center position-absolute" onClick={handleRight} style={{ top: '50%', right: '-0px', zIndex: 'auto', border: 'none', height: '28px', width: '28px', backgroundColor: 'transparent' }}><i className="fa-solid fa-chevron-right fa-xl text-light"></i></button>
                </div>
                <button className="shadow p-0 d-flex justify-content-center align-items-center position-absolute" onClick={closeModal} style={{ top: '-15px', right: '-15px', zIndex: 'auto', border: 'none', height: '28px', width: '28px', backgroundColor: 'transparent' }}><i className="fa-solid fa-circle-xmark fa-xl text-light"></i></button>
            </dialog>
        </div>
    )
}