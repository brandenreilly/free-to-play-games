import React, { useState, useEffect, useRef } from "react";
import '../Profile/ProfilePage.css'

export function ProfilePage() {
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(undefined)

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

    function getToken() {
        let token = sessionStorage.getItem('token')
        setToken(token)
    }

    function getUserData() {
        const url = 'https://super-duper-space-adventure-x55g9595w54j2ggq-3001.app.github.dev/api/token'
        const opts = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        fetch(url, opts)
            .then(resp => resp.json())
            .then(data => setUserData(data))
    }


    return (
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
                            <p className="text-light">{userData != undefined ? userData.user.bio != null ? userData.user.bio : 'Please Update Bio' : 'Loading...'}</p>\
                        </div>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    )
}