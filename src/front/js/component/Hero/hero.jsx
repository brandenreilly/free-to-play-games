import React from "react";
import { useNavigate } from "react-router-dom";

export const HeroImage = ({ data }) => {
    const navigate = useNavigate()

    function handleNav(loc) {
        navigate(loc)
    }

    // HeroImage takes {Data} which has the following Object Layout:
    //  data = {
    //      title: "",
    //      desc: "",
    //      btn1Desc: "",
    //	    btn1Nav: '/',
    //	    btn2Desc: "",
    //	    btn2Nav: '/',
    //	    src: ""
    //  }

    return (
        <div className="container col-xxl-10 px-4 pb-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img style={{ border: '1px solid rgba(255,255,255,0.4)' }} src={data.src} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
                </div>
                <div className="col-lg-6 text-white">
                    <h6 className="display-6 fw-bold lh-1 mb-3">{data.title}</h6>
                    <p className="lead">{data.desc}</p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start justify-content-lg-center">
                        <button className="btn btn-primary btn-lg px-4 me-md-2" onClick={() => { handleNav(data.btn1Nav) }}>{data.btn1Desc}</button>
                        <button className="btn btn-outline-secondary btn-lg px-4" onClick={() => { handleNav(data.btn2Nav) }}>{data.btn2Desc}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroImage