import React from "react";
import { Link } from "react-router-dom";

export default function Games({ games, loading }) {
    if (loading) {
        return <h2 className="text-light">Loading...</h2>
    }

    return (
        games.map((data, ind) => (
            <div className="card-shadow col-xxxl-2 col-xxxxl-2 col-lg-3 col-md-6 col-xs-1 d-flex justify-content-center mx-0 mb-3 p-0 overflow-auto" style={{ position: 'relative' }} key={ind}>
                <div className="card card-styling h-100" style={{ width: "17rem" }}>
                    <Link to={`/game/${data.id}`} className="card-styling h-100" state={data.id} style={{ textDecoration: 'none' }}>
                        <img src={data.thumbnail} className="card-img-top" alt={data.title} />
                        <div className="card-body text-white">
                            <h5 className="card-title">{data.title}</h5>
                            <p className="card-text scroll">{data.short_description}</p>
                        </div>
                    </Link>
                    <div className="card-footer d-flex justify-content-between align-items-center">
                        <span className="text-light m-0">{(data.platform == 'PC (Windows)') ? <i className="fa-brands fa-lg fa-windows"></i> : <i className="fa-regular fa-lg fa-window-maximize"></i>}</span>
                        <span className="badge rounded-pill bg-secondary text-light m-0 ms-3">{data.genre}</span>
                        <div className="ms-auto">
                            <button className="text-light m-0 bg-transparent border-0 favBTN" onClick={() => { actions.handleAddToWatch(data) }}><i className="far fa-star fa-lg"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}