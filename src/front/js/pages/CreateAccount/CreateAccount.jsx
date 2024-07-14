import React, { useState } from "react";

export function CreateAccount() {
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [emailInput, setEmailInput] = useState()
    const [msg, setMsg] = useState(undefined)


    function sendData() {
        const url = ''
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


    return (
        <div className="container p-5">
            {msg != undefined && <div className="row d-flex justify-content-center mb-3"><div className="col-2"><p>Account Created</p></div></div>}
            <form>
                <div className="row d-flex justify-content-center mb-3">
                    <div className="col-2">
                        <label htmlFor="emailText" className="sr-only">Email</label>
                        <input className="" id="emailText" type="email" placeholder="Email" value={emailInput} onChange={(e) => { setEmailInput(e.target.value) }}></input>
                    </div>
                </div>
                <div className="row d-flex justify-content-center mb-3">
                    <div className="col-2">
                        <label htmlFor="usernameText" className="sr-only">Username</label>
                        <input className="" id="usernameText" type="text" placeholder="Username" value={usernameInput} onChange={(e) => { setUsernameInput(e.target.value) }}></input>
                    </div>
                </div>
                <div className="row d-flex justify-content-center mb-3">
                    <div className="col-2">
                        <label htmlFor="passwordText" className="sr-only">Password</label>
                        <input className="" id="passwordText" type="password" placeholder="Password" value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value) }}></input>
                    </div>
                </div>
            </form>
        </div>
    )
} 