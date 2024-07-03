import React, { useContext, useState, useEffect } from "react";
import "../Login/login.css"


import { Context } from "../../store/appContext";


export const Login = () => {
    const { store , actions } = useContext(Context)
    const [ usernameInput, setUsernameInput ] = useState("")
    const [ passwordInput, setPasswordInput ] = useState("")

    const handleResetFields = () => {
        setUsernameInput("")
        setPasswordInput("")
    }

    return (
        <div className="container mt-5 mx-auto" style={{color: "white", height: "80vh"}}>
            <div className="mx-auto loginFormContainer" style={{width: "470px"}}>
                <div className="row mx-auto" style={{height: "35%", width: "470px"}}>
                    <div className="col-12 text-center">
                        <h1 className="mt-5" style={{fontSize: "72px"}}>Login</h1>
                    </div>
                </div>
                <div className="row mx-auto" style={{height: "35%", width: "470px"}}>
                    <form>
                        <div className="row mt-5">
                            <div className="col-12 d-flex justify-content-center align-items-center">
                                <label htmlFor="usernameInput"><i className="fa-solid fa-user" style={{fontSize: "30px"}}></i></label>
                                <input className="mx-2 loginInput" id="usernameInput" type="text" style={{fontSize: "18px"}} value={usernameInput} onChange={(e)=>{setUsernameInput(e.target.value)}}></input>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-12 d-flex justify-content-center align-items-center">
                                <label htmlFor="passwordInput"><i className="fa-solid fa-lock" style={{fontSize: "30px"}}></i></label>
                                <input className="mx-2 loginInput" id="passwordInput" style={{fontSize: "18px"}} type="password" value={passwordInput} onChange={(e)=>{setPasswordInput(e.target.value)}}></input>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12 d-flex justify-content-center align-items-center mb-5">
                                <button type="button" className="btn btn-light loginFormButton" onClick={()=>{actions.handleLogIn(usernameInput, passwordInput); handleResetFields()}}>Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )








}

