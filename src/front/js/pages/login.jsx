import React, { useContext, useState, useEffect } from "react";


import { Context } from "../store/appContext";


export const Login = () => {
    const { store , actions } = useContext(Context)
    const [ usernameInput, setUsernameInput ] = useState("")
    const [ passwordInput, setPasswordInput ] = useState("")

    const handleResetFields = () => {
        setUsernameInput("")
        setPasswordInput("")
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <h1 className="mt-5" style={{fontSize: "72px"}}>Login</h1>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <i className="fa-solid fa-user" style={{fontSize: "30px"}}></i>
                    <input className="mx-2" type="text" style={{fontSize: "18px"}} value={usernameInput} onChange={(e)=>{setUsernameInput(e.target.value)}}></input>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <i className="fa-solid fa-lock" style={{fontSize: "30px"}}></i>
                    <input className="mx-2" style={{fontSize: "18px"}} type="password" value={passwordInput} onChange={(e)=>{setPasswordInput(e.target.value)}}></input>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <button type="button" className="btn btn-dark" onClick={()=>{actions.handleLogIn(usernameInput, passwordInput); handleResetFields()}}>Login</button>
                </div>
            </div>
        </div>
    )








}

