import React, { useContext, useState, useEffect } from "react";
import "../Login/login.css"


import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const { store, actions } = useContext(Context)
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const user = store.user
    const err = store.error
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            return
        }
        else {
            navigate('/')
        }
    }, [user])

    useEffect(() => {
        if (!err) {
            return
        }
        else {
            console.log(err)
        }
    }, [err])

    const handleResetFields = () => {
        setUsernameInput("")
        setPasswordInput("")
    }

    function handleClick() {
        if (usernameInput !== "" && passwordInput !== "") {
            actions.handleLogin(usernameInput, passwordInput);
            actions.setError('')
            handleResetFields();
        }
    }

    function handleEnter(e) {
        if (e.key === "Enter") {
            if (usernameInput !== "" && passwordInput !== "") {
                actions.handleLogin(usernameInput, passwordInput);
                actions.setError('')
                handleResetFields();
            }
        }
        else {
            return
        }
    }

    return (
        <div className="container mt-5 mx-auto mb-5" style={{ color: "white", height: "70vh" }}>
            <div className="mx-auto loginFormContainer" style={{ width: "470px" }}>
                <div className="row mx-auto" style={{ height: "35%", width: "470px" }}>
                    <div className="col-12 text-center">
                        <h1 className="mt-5" style={{ fontSize: "72px" }}>Login</h1>
                    </div>
                </div>
                <div className="row mx-auto" style={{ height: "35%", width: "470px" }}>
                    <form>
                        <div className="row mt-5">
                            <div className="col-12 d-flex justify-content-center align-items-center">
                                <label htmlFor="usernameInput" className=""><i className="fa-solid fa-user" style={{ fontSize: "30px" }}></i></label>
                                <label htmlFor="usernameInput" className="sr-only">Username</label>
                                <input placeholder="Username" className="mx-2 loginInput" id="usernameInput" type="text" style={{ fontSize: "18px" }} value={usernameInput} onChange={(e) => { setUsernameInput(e.target.value) }} onKeyDown={(e) => { handleEnter(e) }}></input>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-12 d-flex justify-content-center align-items-center">
                                <label htmlFor="passwordInput"><i className="fa-solid fa-lock" style={{ fontSize: "30px" }}></i></label>
                                <label htmlFor="passwordInput" className="sr-only">Password</label>
                                <input placeholder="Password" className="mx-2 loginInput" id="passwordInput" style={{ fontSize: "18px" }} type="password" value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value) }} onKeyDown={(e) => { handleEnter(e) }}></input>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12 d-flex justify-content-center align-items-center mb-5">
                                <button type="button" className="btn btn-light loginFormButton" onClick={handleClick}>Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="mx-auto mb-5 mobileLoginFormContainer">
                <div className="row d-flex justify-content-center align-items-center">
                    <h6 className="mt-5 display-3 fw-bold 1h-1 text-center">Login</h6>
                </div>
                <div className="row mt-4">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <label htmlFor="mobileUserInput" className="me-2 mobileLabels"><i className="fa-solid fa-user"></i></label>
                        <input id="mobileUserInput" type="username" className="w-50 mobileInputs" value={usernameInput} onChange={(e) => { setUsernameInput(e.target.value) }} onKeyDown={(e) => { handleEnter(e) }}></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <label htmlFor="mobilePassInput" className="me-2 mobileLabels"><i className="fa-solid fa-lock"></i></label>
                        <input id="mobilePassInput" type="password" className="w-50 mobileInputs" value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value) }} onKeyDown={(e) => { handleEnter(e) }}></input>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <button className="btn btn-light text-dark" onClick={handleClick}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )








}

