import React from "react";

export const AdvancedFilter = () => {
    return (<div className="col-3 responsiveBreakpoint">
                <div className="filterContainer sticky-top">
                    <div className="row d-flex justify-content-center">
                        <div className="col-10 d-flex justify-content-center">
                            <p className="text-white">Search Filters</p>
                        </div> 
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-10 d-flex justify-content-center">
                            <label className="form-label" htmlFor="categorySearch">Sort by:</label>
                            <select className="form-select" id="categorySearch" onChange={(e)=>{setSelectValue(e.target.value)}}>
                                <option value={"placeholder"}>Select a category</option>
                                <option value={"release-date"}>Release Date</option>
                                <option value={"relevance"}>Relevance</option>
                                <option value={"alphabetical"}>Alphabetical</option>
                                <option value={"popularity"}>Popularity</option>
                            </select>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center mt-2">
                        <div className="col-10 d-flex justify-content-center">
                            <button className="btn btn-light" onClick={()=>{getFilteredGames(selectValue);console.log(selectValue)}}>Filter</button>
                        </div>
                    </div>
                </div>
            </div>)
}