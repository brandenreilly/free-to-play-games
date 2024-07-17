import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom"
import "./SearchOptions.css"

import { Context } from "../../store/appContext";
export const SearchOptions = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const location = useLocation()

    const whiteColor = { color: 'white' }

    return (
        <div className="container" style={{ width: "90vw" }}>
            <div className="row justify-content-center">

                <div className="col-5">
                    <div className="row mt-2 justify-content-center">
                        <div className="col d-flex justify-content-center" style={{ color: 'white' }}>
                            <button type="button searchbutton" style={whiteColor} className={`btn btn-outline-light button-rounded ${location.pathname == '/search/title' && 'active'}`} onClick={() => navigate("/search/title")}>Title</button>
                            <button type="button searchbutton" style={whiteColor} className={`btn btn-outline-light button-rounded ${location.pathname == '/search/genre' && 'active'}`} onClick={() => navigate("/search/genre")}>Genre</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
};