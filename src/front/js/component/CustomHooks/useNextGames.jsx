import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const useNextGames = (arr, min, max) => {
    let newArr = []
    arr.slice(min, max).map((data, ind) => {
        newArr.push(data)
    })
    return newArr
}



export default useNextGames