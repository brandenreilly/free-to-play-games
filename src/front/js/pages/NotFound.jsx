import React from "react";
import HeroImage from "../component/Hero/hero.jsx";
import img from '../../img/hero_img_1.png'

export default function NotFound() {
    const heroData = {
        title: "Not Found!",
        desc: "The URL you entered is not a valid area, click one of the buttons below to get started on Free2PlayFinder.",
        btn1Desc: 'Games List',
        btn1Nav: '/games',
        btn2Desc: { loggedIn: 'Profile', notLoggedIn: 'Signup' },
        btn2Nav: { loggedIn: '/profile', notLoggedIn: '/signup' },
        src: img
    }
    return (
        <div className="container-fluid" style={{ height: '75vh' }}>
            <div className="row text-center">
                <HeroImage data={heroData} />
            </div>
        </div>
    )
}