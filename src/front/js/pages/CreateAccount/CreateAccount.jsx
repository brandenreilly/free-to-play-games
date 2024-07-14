import React, { useEffect, useState } from "react";
import '../CreateAccount/CreateAccount.css'

export function CreateAccount() {
    const [usernameInput, setUsernameInput] = useState(null)
    const [passwordInput, setPasswordInput] = useState(null)
    const [emailInput, setEmailInput] = useState(null)
    const [msg, setMsg] = useState(undefined)

    useEffect(() => {
        resetFields()
    }, [msg])

    function sendData() {
        const url = 'https://super-duper-space-adventure-x55g9595w54j2ggq-3001.app.github.dev/api/create'
        const opts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailInput,
                username: usernameInput,
                password: passwordInput
            })
        }
        fetch(url, opts)
            .then(resp => resp.json())
            .then(data => setMsg(data))
    }

    function resetFields() {
        setEmailInput('');
        setUsernameInput('');
        setPasswordInput('');
    }

    return (
        <div className="container mt-5 mx-auto" style={{ color: "white", height: "80vh" }}>
            <div className="mx-auto loginFormContainer" style={{ width: "470px" }}>
                <div className="row mx-auto" style={{ height: "35%", width: "470px" }}>
                    <div className="col-12 text-center">
                        <h1 className="mt-5" style={{ fontSize: "72px" }}>Signup</h1>
                    </div>
                </div>
                {msg != undefined && msg.completed == true && <div className="mt-3 row mx-auto">
                    <div className="col-12 text-center">
                        <div class="alert alert-success" role="alert">
                            {msg.msg}
                        </div>
                    </div>
                </div>}
                {msg != undefined && msg.completed == false && <div className="mt-3 row mx-auto">
                    <div className="col-12 text-center">
                        <div class="alert alert-danger" role="alert">
                            {msg.msg}
                        </div>
                    </div>
                </div>}
                <div className="row mx-auto" style={{ height: "35%", width: "470px" }}>
                    <form>
                        <div className="row mt-5">
                            <div className="col-12 d-flex justify-content-center align-items-center">
                                <label htmlFor="emailInput" className=""><i className="fa-solid fa-envelope" style={{ fontSize: "28px" }}></i></label>
                                <label htmlFor="emailInput" className="sr-only">Email</label>
                                <input placeholder="Email" className="mx-2 loginInput" id="emailInput" type="email" style={{ fontSize: "18px" }} value={emailInput} onChange={(e) => { setEmailInput(e.target.value) }}></input>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-12 d-flex justify-content-center align-items-center">
                                <label htmlFor="usernameInput" className=""><i className="fa-solid fa-user" style={{ fontSize: "30px" }}></i></label>
                                <label htmlFor="usernameInput" className="sr-only">Username</label>
                                <input placeholder="Username" className="mx-2 loginInput" id="usernameInput" type="text" style={{ fontSize: "18px" }} value={usernameInput} onChange={(e) => { setUsernameInput(e.target.value) }}></input>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-12 d-flex justify-content-center align-items-center">
                                <label htmlFor="passwordInput"><i className="fa-solid fa-lock" style={{ fontSize: "30px" }}></i></label>
                                <label htmlFor="passwordInput" className="sr-only">Password</label>
                                <input placeholder="Password" className="mx-2 loginInput" id="passwordInput" style={{ fontSize: "18px" }} type="password" value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value) }}></input>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12 d-flex justify-content-center align-items-center mb-5">
                                <button type="button" className="btn btn-light loginFormButton" onClick={() => { sendData() }}>Create Account</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
} 