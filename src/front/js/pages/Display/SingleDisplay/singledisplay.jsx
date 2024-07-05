import React, { useContext, useState } from "react";
import "../SingleDisplay/singledisplay.css"
import { Context } from "../../../store/appContext";
import { useLocation } from "react-router-dom";

export const SingleDisplay = () => {
    let location = useLocation()
    const { store , actions } = useContext(Context)
    const data = location.state


    return (
        <div className="container">

        </div>
    )
}